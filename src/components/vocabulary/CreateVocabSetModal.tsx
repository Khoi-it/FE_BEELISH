import { useState, useEffect, useRef } from 'react';
import { downloadUserExcelTemplate, parseUserExcel } from '../../api/vocabularyApi';

interface WordInput {
    word: string;
    mean: string;
    type: string;
    example: string;
}

interface ConflictInfo {
    existingWord: WordInput;
    newWord: WordInput;
}

interface CreateVocabSetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vocabSet: { title: string; icon: string; categoryID: number; numOfWords: number }, words: WordInput[]) => Promise<void>;
    initialData?: {
        title: string;
        icon: string;
        words: WordInput[];
    };
}

export default function CreateVocabSetModal({ isOpen, onClose, onSave, initialData }: CreateVocabSetModalProps) {
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('folder');
    const [words, setWords] = useState<WordInput[]>([{ word: '', mean: '', type: '', example: '' }]);
    const [isSaving, setIsSaving] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [conflictModalOpen, setConflictModalOpen] = useState(false);
    const [conflictData, setConflictData] = useState<ConflictInfo[]>([]);
    const [selectedConflicts, setSelectedConflicts] = useState<Set<string>>(new Set());
    const [pendingNonConflicts, setPendingNonConflicts] = useState<WordInput[]>([]);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setTitle(initialData.title);
                setIcon(initialData.icon);
                setWords(initialData.words.length > 0 ? initialData.words : [{ word: '', mean: '', type: '', example: '' }]);
            } else {
                setTitle('');
                setIcon('folder');
                setWords([{ word: '', mean: '', type: '', example: '' }]);
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleAddWord = () => {
        setWords([...words, { word: '', mean: '', type: '', example: '' }]);
    };

    const handleRemoveWord = (index: number) => {
        if (words.length > 1) {
            const newWords = [...words];
            newWords.splice(index, 1);
            setWords(newWords);
        }
    };

    const handleWordChange = (index: number, field: keyof WordInput, value: string) => {
        const newWords = [...words];
        newWords[index][field] = value;
        setWords(newWords);
    };

    const downloadTemplate = async () => {
        try {
            await downloadUserExcelTemplate();
        } catch (error) {
            alert('Không thể tải template.');
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const parsedWords: WordInput[] = await parseUserExcel(file);
            
            const existingWordsMap = new Map(words.filter(w => w.word.trim() !== '').map(w => [w.word.trim().toLowerCase(), w]));
            const conflicts: ConflictInfo[] = [];
            const nonConflicts: WordInput[] = [];

            parsedWords.forEach(pw => {
                const cleanWord = pw.word.trim().toLowerCase();
                if (existingWordsMap.has(cleanWord)) {
                    conflicts.push({
                        existingWord: existingWordsMap.get(cleanWord)!,
                        newWord: pw
                    });
                } else {
                    nonConflicts.push(pw);
                }
            });

            if (conflicts.length > 0) {
                setConflictData(conflicts);
                const allWords = new Set<string>();
                conflicts.forEach(c => allWords.add(c.newWord.word));
                setSelectedConflicts(allWords);
                setPendingNonConflicts(nonConflicts);
                setConflictModalOpen(true);
            } else {
                setWords(prev => {
                    const validPrev = prev.filter(w => w.word.trim() !== '' || w.mean.trim() !== '');
                    return [...validPrev, ...nonConflicts];
                });
                alert('Tải lên Excel thành công!');
            }
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra khi đọc file Excel.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleConfirmConflicts = () => {
        setWords(prev => {
            const currentMap = new Map(prev.map(w => [w.word.trim().toLowerCase(), w]));
            
            conflictData.forEach(conflict => {
                const wordKey = conflict.newWord.word.trim().toLowerCase();
                if (selectedConflicts.has(conflict.newWord.word)) {
                    currentMap.set(wordKey, conflict.newWord);
                }
            });
            
            pendingNonConflicts.forEach(w => {
                currentMap.set(w.word.trim().toLowerCase(), w);
            });
            
            return Array.from(currentMap.values());
        });
        
        setConflictModalOpen(false);
        setConflictData([]);
        setPendingNonConflicts([]);
        alert('Đã thêm từ vựng thành công!');
    };

    const handleSave = async () => {
        if (!title.trim()) {
            alert('Vui lòng nhập tên bộ từ');
            return;
        }
        
        // Filter out empty words
        const validWords = words.filter(w => w.word.trim() && w.mean.trim());
        if (validWords.length === 0) {
            alert('Vui lòng nhập ít nhất một từ vựng');
            return;
        }

        setIsSaving(true);
        try {
            await onSave({ title, icon, categoryID: 0, numOfWords: 0 }, validWords);
            onClose();
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra khi lưu bộ từ!');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border-[3px] border-secondary bg-white chunky-shadow flex flex-col">
                <div className="flex items-center justify-between border-b-2 border-secondary/20 p-6 bg-surface">
                    <h2 className="font-headline text-3xl font-black uppercase text-secondary">
                        {initialData ? 'Chỉnh sửa bộ từ' : 'Tạo bộ từ cá nhân'}
                    </h2>
                    <button onClick={onClose} className="rounded-xl border-2 border-secondary p-2 transition-transform hover:-translate-y-1 hover:bg-secondary hover:text-white">
                        <span className="material-symbols-outlined block">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-surface-variant/30 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-2">
                            <label className="font-bold uppercase tracking-widest text-secondary/70 text-sm">Tên bộ từ</label>
                            <input 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-xl border-2 border-secondary p-4 font-bold focus:outline-none focus:ring-4 focus:ring-primary/30"
                                placeholder="VD: IELTS Vocabulary..."
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-headline text-2xl font-black uppercase text-secondary">Danh sách từ vựng</h3>
                            <div className="flex gap-2">
                                <button onClick={downloadTemplate} className="flex items-center gap-2 rounded-lg border-2 border-secondary px-4 py-2 font-bold uppercase transition-transform hover:-translate-y-1 bg-white text-secondary">
                                    <span className="material-symbols-outlined">download</span>
                                    Template
                                </button>
                                <button onClick={handleUploadClick} disabled={isUploading} className="flex items-center gap-2 rounded-lg border-2 border-secondary px-4 py-2 font-bold uppercase transition-transform hover:-translate-y-1 bg-white text-secondary">
                                    <span className="material-symbols-outlined">upload</span>
                                    {isUploading ? 'Đang tải...' : 'Upload'}
                                </button>
                                <input 
                                    type="file" 
                                    accept=".xlsx, .xls" 
                                    style={{ display: 'none' }} 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                />
                                <button onClick={handleAddWord} className="flex items-center gap-2 rounded-lg border-2 border-secondary px-4 py-2 font-bold uppercase transition-transform hover:-translate-y-1 bg-tertiary text-white">
                                    <span className="material-symbols-outlined">add</span>
                                    Thêm từ
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {words.map((w, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border-2 border-dashed border-secondary/30 bg-white">
                                    <div className="flex-1 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <input value={w.word} onChange={(e) => handleWordChange(i, 'word', e.target.value)} placeholder="Từ vựng" className="w-full border-b-2 border-secondary/20 p-2 font-bold focus:border-secondary focus:outline-none" />
                                            <input value={w.mean} onChange={(e) => handleWordChange(i, 'mean', e.target.value)} placeholder="Nghĩa" className="w-full border-b-2 border-secondary/20 p-2 focus:border-secondary focus:outline-none" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <input value={w.type} onChange={(e) => handleWordChange(i, 'type', e.target.value)} placeholder="Loại từ (n, v, adj...)" className="w-full border-b-2 border-secondary/20 p-2 text-sm focus:border-secondary focus:outline-none" />
                                            <input value={w.example} onChange={(e) => handleWordChange(i, 'example', e.target.value)} placeholder="Ví dụ câu" className="w-full col-span-2 border-b-2 border-secondary/20 p-2 text-sm focus:border-secondary focus:outline-none" />
                                        </div>
                                    </div>
                                    {words.length > 1 && (
                                        <button onClick={() => handleRemoveWord(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg self-start md:self-center">
                                            <span className="material-symbols-outlined block">delete</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t-2 border-secondary/20 p-6 bg-surface flex justify-end gap-4">
                    <button onClick={onClose} className="rounded-xl border-2 border-secondary px-6 py-3 font-black uppercase text-secondary transition-all hover:bg-secondary/5">Hủy</button>
                    <button onClick={handleSave} disabled={isSaving} className="rounded-xl border-2 border-secondary bg-primary px-8 py-3 font-black uppercase text-secondary transition-all hover:-translate-y-1 disabled:opacity-50 chunky-shadow">
                        {isSaving ? 'Đang lưu...' : 'Lưu bộ từ'}
                    </button>
                </div>
            </div>

            {conflictModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm">
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border-[3px] border-secondary bg-white chunky-shadow flex flex-col">
                        <div className="flex items-center justify-between border-b-2 border-secondary/20 p-6 bg-yellow-100">
                            <h2 className="font-headline text-2xl font-black uppercase text-yellow-800">Phát hiện từ vựng trùng lặp</h2>
                            <button onClick={() => setConflictModalOpen(false)} className="rounded-xl border-2 border-secondary p-2 transition-transform hover:-translate-y-1 hover:bg-yellow-200">
                                <span className="material-symbols-outlined block">close</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            <p className="font-bold text-secondary/70">Các từ vựng sau đã có sẵn trong danh sách của bạn. Hãy tích chọn các từ bạn muốn ghi đè bằng dữ liệu mới từ file Excel.</p>
                            <div className="overflow-x-auto rounded-xl border-2 border-secondary">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-surface border-b-2 border-secondary">
                                        <tr>
                                            <th className="p-3 text-center border-r-2 border-secondary">
                                                <input type="checkbox" className="w-5 h-5 accent-secondary"
                                                    checked={selectedConflicts.size === conflictData.length && conflictData.length > 0}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            const all = new Set<string>(conflictData.map(c => c.newWord.word));
                                                            setSelectedConflicts(all);
                                                        } else {
                                                            setSelectedConflicts(new Set());
                                                        }
                                                    }}
                                                />
                                            </th>
                                            <th className="p-3 font-black uppercase text-secondary border-r-2 border-secondary">Từ vựng</th>
                                            <th className="p-3 font-black uppercase text-secondary border-r-2 border-secondary w-2/5">Đang có (Cũ)</th>
                                            <th className="p-3 font-black uppercase text-secondary w-2/5">Tải lên (Mới)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {conflictData.map((conflict, idx) => (
                                            <tr key={idx} className="border-b-2 border-secondary/20 hover:bg-secondary/5">
                                                <td className="p-3 text-center border-r-2 border-secondary">
                                                    <input type="checkbox" className="w-5 h-5 accent-secondary"
                                                        checked={selectedConflicts.has(conflict.newWord.word)}
                                                        onChange={(e) => {
                                                            const newSet = new Set(selectedConflicts);
                                                            if (e.target.checked) newSet.add(conflict.newWord.word);
                                                            else newSet.delete(conflict.newWord.word);
                                                            setSelectedConflicts(newSet);
                                                        }}
                                                    />
                                                </td>
                                                <td className="p-3 font-black text-secondary border-r-2 border-secondary">{conflict.newWord.word}</td>
                                                <td className="p-3 text-sm border-r-2 border-secondary">
                                                    <div><span className="font-bold opacity-70">Nghĩa:</span> {conflict.existingWord.mean}</div>
                                                    <div><span className="font-bold opacity-70">Loại:</span> {conflict.existingWord.type}</div>
                                                    <div><span className="font-bold opacity-70">VD:</span> {conflict.existingWord.example}</div>
                                                </td>
                                                <td className="p-3 text-sm bg-yellow-50/50">
                                                    <div><span className="font-bold opacity-70">Nghĩa:</span> {conflict.newWord.mean}</div>
                                                    <div><span className="font-bold opacity-70">Loại:</span> {conflict.newWord.type}</div>
                                                    <div><span className="font-bold opacity-70">VD:</span> {conflict.newWord.example}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="border-t-2 border-secondary/20 p-6 bg-surface flex justify-end gap-4">
                            <button onClick={() => setConflictModalOpen(false)} className="rounded-xl border-2 border-secondary px-6 py-3 font-black uppercase text-secondary transition-all hover:bg-secondary/5">Hủy bỏ</button>
                            <button onClick={handleConfirmConflicts} className="rounded-xl border-2 border-yellow-600 bg-yellow-400 px-8 py-3 font-black uppercase text-yellow-900 transition-all hover:-translate-y-1 chunky-shadow">
                                Xác nhận thay thế
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
