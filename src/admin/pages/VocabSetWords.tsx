import { useState, useRef, useEffect } from 'react';
import { Plus, ArrowLeft, Upload, Download } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import DataTableWrapper from '../components/DataTableWrapper';
import { fetchWithAuth } from '../../api/fetchClient';

export default function VocabSetWords() {
  const { id: setId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState<any>(null);

  // Mock data for now
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWords();
  }, [setId]);

  const fetchWords = async () => {
    try {
      const response = await fetchWithAuth(`http://localhost:8080/api/admin/vocab-sets/${setId}/words`);
      if (response.ok) {
        const data = await response.json();
        // The API wraps the response in an ApiResponse, so we check data.data
        setWords(data.data || []);
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
    { title: 'Word', data: 'word', render: (data: string) => `<strong>${data}</strong>` },
    { title: 'Meaning', data: 'mean' },
    { title: 'Type', data: 'type' },
    { title: 'Example', data: 'example' },
  ];

  const handleEdit = (id: string) => {
    const w = words.find(x => x.id === id);
    setSelectedWord(w);
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    const w = words.find(x => x.id === id);
    setSelectedWord(w);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setWords(words.filter(x => x.id !== selectedWord.id));
    setShowDeleteModal(false);
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetchWithAuth('http://localhost:8080/api/admin/vocab-sets/excel-template');
      if (!response.ok) throw new Error('Failed to download');
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetchWithAuth(`http://localhost:8080/api/admin/vocab-sets/${setId}/words/excel`, {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          alert('Upload file Excel thành công!');
          fetchWords(); // Refresh words list here
        } else {
          alert('Có lỗi xảy ra khi upload.');
        }
      } catch (error) {
        console.error('Upload failed', error);
      }
    }
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4 gap-3">
        <button className="btn btn-light border-dark border-2 rounded-circle p-2" onClick={() => navigate('/admin/vocab-sets')}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="fw-bold m-0 flex-grow-1">Words in Set: {setId}</h2>
        
        <button className="btn btn-info text-white d-flex align-items-center gap-2" onClick={handleDownloadTemplate}>
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
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => { setSelectedWord(null); setShowModal(true); }}>
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
                    <input type="text" className="form-control border-dark border-2" defaultValue={selectedWord?.word} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Meaning</label>
                    <input type="text" className="form-control border-dark border-2" defaultValue={selectedWord?.mean} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Type (Noun, Verb, etc.)</label>
                    <input type="text" className="form-control border-dark border-2" defaultValue={selectedWord?.type} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Example</label>
                    <input type="text" className="form-control border-dark border-2" defaultValue={selectedWord?.example} />
                  </div>
                </div>
                <div className="modal-footer border-top border-dark border-3">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Save</button>
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
    </div>
  );
}
