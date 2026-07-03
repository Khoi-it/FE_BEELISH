import { useState, useRef, useEffect } from 'react';
import { Plus, ArrowLeft, Upload, Download } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import DataTableWrapper from '../components/DataTableWrapper';
import { fetchWithAuth } from '../../api/fetchClient';
import { API_BASE_URL, API_ENDPOINTS } from '../../constants/api';

export default function VocabSetWords() {
  const { id: setId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState<any>(null);
  
  const [wordForm, setWordForm] = useState({ word: '', mean: '', type: '', example: '' });

  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [conflictData, setConflictData] = useState<any[]>([]);
  const [selectedConflicts, setSelectedConflicts] = useState<Set<string>>(new Set());
  const [pendingActionType, setPendingActionType] = useState<'excel'|'manual'|null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  // Mock data for now
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchWords();
  }, [setId]);

  const fetchWords = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/vocab-set/get-words/${setId}`);
      if (response.ok) {
        const data = await response.json();
        // The API wraps the response in an ApiResponse, so we check data
        setWords(data || []);
      } else {
        console.error('Failed to fetch words');
      }
    } catch (error) {
      console.error('Error fetching words', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Word', data: 'word', render: (data: string) => `<strong>${data ? data.toLowerCase() : ''}</strong>` },
    { title: 'Meaning', data: 'mean' },
    { title: 'Type', data: 'type' },
    { title: 'Example', data: 'example' },
  ];

  const handleEdit = (id: string) => {
    const w = words.find(x => x.id === id);
    setSelectedWord(w);
    setWordForm({ word: w.word, mean: w.mean, type: w.type, example: w.example });
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    const w = words.find(x => x.id === id);
    setSelectedWord(w);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/vocab-set/delete-word/${selectedWord.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setWords(words.filter(x => x.id !== selectedWord.id));
        setShowDeleteModal(false);
      } else {
        alert('Xoá thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi xoá', error);
      alert('Đã xảy ra lỗi khi xoá.');
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/vocab-set/excel-template`);
      if (!response.ok) {throw new Error('Failed to download');}
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Vocabulary_Template.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download template', error);
      alert('Không thể tải template.');
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processExcelUpload = async (file: File, action: string, wordsToReplace?: Set<string>) => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (wordsToReplace && wordsToReplace.size > 0) {
      Array.from(wordsToReplace).forEach(word => {
        formData.append('wordsToReplace', word);
      });
    } else if (wordsToReplace && wordsToReplace.size === 0 && action === 'replace') {
      // Báo cho backend biết là mảng rỗng để phân biệt với null
      formData.append('wordsToReplace', ''); 
    }
    
    try {
      setImporting(true);
      const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/vocab-set/import-words/${setId}?action=${action}`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Upload file Excel thành công!');
        setConflictModalOpen(false);
        setPendingFile(null);
        fetchWords(); // Refresh words list here
      } else if (response.status === 409) {
        const result = await response.json();
        setConflictData(result);
        
        const allWords = new Set<string>();
        result.forEach((c: any) => allWords.add(c.newWord.word));
        setSelectedConflicts(allWords);

        setPendingFile(file);
        setPendingActionType('excel');
        setConflictModalOpen(true);
      } else {
        alert('Có lỗi xảy ra khi upload.');
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
        setImporting(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processExcelUpload(file, 'check');
    }
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSaveWord = async (action: string = 'check') => {
    try {
      const isEdit = !!selectedWord;
      const url = selectedWord 
        ? `${API_BASE_URL}${API_ENDPOINTS.ADMIN}/vocab-set/update-word/${selectedWord.id}`
        : `${API_BASE_URL}${API_ENDPOINTS.ADMIN}/vocab-set/create-word/${setId}?action=${action}`;
      
      const method = selectedWord ? 'PUT' : 'POST';

      const response = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(wordForm)
      });

      if (response.ok) {
        setShowModal(false);
        setConflictModalOpen(false);
        fetchWords();
      } else if (response.status === 409 && !isEdit) {
        const result = await response.json();
        setConflictData(result);
        const allWords = new Set<string>();
        result.forEach((c: any) => allWords.add(c.newWord.word));
        setSelectedConflicts(allWords);
        setPendingActionType('manual');
        setConflictModalOpen(true);
      } else {
        alert('Có lỗi xảy ra khi lưu.');
      }
    } catch (error) {
      console.error('Save failed', error);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4 gap-3">
        <button className="btn btn-light border-dark border-2 rounded-circle p-2" onClick={() => navigate('/admin/vocab-sets')}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="fw-bold m-0 flex-grow-1">Words in Set: {setId}</h2>
        
        <button className="btn btn-info text-white d-flex align-items-center gap-2" onClick={downloadTemplate}>
          <Download size={18} /> Template
        </button>
        <button className="btn btn-success d-flex align-items-center gap-2" onClick={handleUploadClick}>
          <Upload size={18} /> Excel Upload
        </button>
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          style={{ display: 'none' }} 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => { 
          setSelectedWord(null); 
          setWordForm({ word: '', mean: '', type: '', example: '' });
          setShowModal(true); 
        }}>
          <Plus size={18} /> Add Word
        </button>
      </div>

      <div className="card p-4">
        <DataTableWrapper data={words} columns={columns} onEdit={handleEdit} onDelete={handleDeleteClick} />
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(40, 63, 59, 0.5)' }}></div>
          <div className="modal d-block show" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ border: 'var(--beelish-border)', boxShadow: 'var(--beelish-shadow)' }}>
                <div className="modal-header border-bottom border-dark border-3" style={{ backgroundColor: 'var(--beelish-primary)' }}>
                  <h5 className="modal-title fw-bold" style={{ color: 'var(--beelish-secondary)' }}>
                    {selectedWord ? 'Edit Word' : 'Add New Word'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Word</label>
                    <input type="text" className="form-control border-dark border-2" 
                           value={wordForm.word} onChange={(e) => setWordForm({...wordForm, word: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Meaning</label>
                    <input type="text" className="form-control border-dark border-2" 
                           value={wordForm.mean} onChange={(e) => setWordForm({...wordForm, mean: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Type (Noun, Verb, etc.)</label>
                    <input type="text" className="form-control border-dark border-2" 
                           value={wordForm.type} onChange={(e) => setWordForm({...wordForm, type: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Example</label>
                    <input type="text" className="form-control border-dark border-2" 
                           value={wordForm.example} onChange={(e) => setWordForm({...wordForm, example: e.target.value})} />
                  </div>
                </div>
                <div className="modal-footer border-top border-dark border-3">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => handleSaveWord('check')}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {showDeleteModal && (
        <>
          <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(40, 63, 59, 0.5)' }}></div>
          <div className="modal d-block show" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ border: '3px solid var(--beelish-danger)', boxShadow: '4px 4px 0px 0px var(--beelish-danger)' }}>
                <div className="modal-header border-bottom border-danger bg-danger text-white">
                  <h5 className="modal-title fw-bold">Confirm Deletion</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete the word <strong>"{selectedWord?.word}"</strong>?</p>
                </div>
                <div className="modal-footer border-top border-danger">
                  <button type="button" className="btn btn-light border-dark border-2" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger border-dark border-2" onClick={confirmDelete}>Yes, Delete</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {conflictModalOpen && (
        <>
          <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(40, 63, 59, 0.5)', zIndex: 1050 }}></div>
          <div className="modal d-block show" tabIndex={-1} style={{ zIndex: 1055 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content" style={{ border: 'var(--beelish-border)', boxShadow: 'var(--beelish-shadow)' }}>
                <div className="modal-header border-bottom border-dark border-3 bg-warning text-dark">
                  <h5 className="modal-title fw-bold">Phát hiện từ vựng trùng lặp</h5>
                  <button type="button" className="btn-close" onClick={() => setConflictModalOpen(false)}></button>
                </div>
                <div className="modal-body overflow-auto" style={{ maxHeight: '60vh' }}>
                  <p>Các từ vựng sau đã tồn tại trong bộ từ này. Hãy tích chọn các từ bạn muốn ghi đè bằng dữ liệu mới.</p>
                  <table className="table table-bordered border-dark mt-3">
                    <thead className="table-light">
                      <tr>
                        <th className="text-center" style={{ width: '5%' }}>
                            <input type="checkbox" className="form-check-input border-dark"
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
                        <th>Từ vựng</th>
                        <th style={{ width: '40%' }}>Dữ liệu hiện tại (Cũ)</th>
                        <th style={{ width: '40%' }}>Dữ liệu tải lên (Mới)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conflictData.map((conflict, idx) => (
                        <tr key={idx}>
                          <td className="text-center">
                             <input type="checkbox" className="form-check-input border-dark"
                               checked={selectedConflicts.has(conflict.newWord.word)}
                               onChange={(e) => {
                                  const newSet = new Set(selectedConflicts);
                                  if (e.target.checked) newSet.add(conflict.newWord.word);
                                  else newSet.delete(conflict.newWord.word);
                                  setSelectedConflicts(newSet);
                               }}
                             />
                          </td>
                          <td className="fw-bold">{conflict.newWord?.word}</td>
                          <td>
                            <div><strong>Nghĩa:</strong> {conflict.existingWord?.mean}</div>
                            <div><strong>Loại:</strong> {conflict.existingWord?.type}</div>
                            <div><strong>VD:</strong> {conflict.existingWord?.example}</div>
                          </td>
                          <td className="bg-light">
                            <div><strong>Nghĩa:</strong> {conflict.newWord?.mean}</div>
                            <div><strong>Loại:</strong> {conflict.newWord?.type}</div>
                            <div><strong>VD:</strong> {conflict.newWord?.example}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer border-top border-dark border-3 bg-light">
                  <button type="button" className="btn btn-secondary border-dark border-2" onClick={() => setConflictModalOpen(false)}>Hủy bỏ</button>
                  <button type="button" className="btn btn-warning border-dark border-2 fw-bold" onClick={() => {
                    if (pendingActionType === 'excel' && pendingFile) {
                      processExcelUpload(pendingFile, 'replace', selectedConflicts);
                    } else if (pendingActionType === 'manual') {
                      if (selectedConflicts.has(conflictData[0]?.newWord?.word)) {
                         handleSaveWord('replace');
                      } else {
                         setConflictModalOpen(false);
                      }
                    }
                  }}>Xác nhận thay thế</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
