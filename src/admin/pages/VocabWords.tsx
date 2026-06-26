import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import DataTableWrapper from '../components/DataTableWrapper';

export default function VocabWords() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState<any>(null);

  // Dummy Data for Words
  const [words, setWords] = useState([
    { id: '1', word: 'Exacerbate', mean: 'Làm trầm trọng thêm', type: 'Verb', example: 'The new law will exacerbate the problem.', vocabID: 'Set 1' },
    { id: '2', word: 'Meticulous', mean: 'Tỉ mỉ, cẩn thận', type: 'Adjective', example: 'He is meticulous about his appearance.', vocabID: 'Set 2' },
    { id: '3', word: 'Ephemeral', mean: 'Phù du, chốc lát', type: 'Adjective', example: 'Fame in the world of rock and pop is largely ephemeral.', vocabID: 'Set 1' },
    { id: '4', word: 'Cacophony', mean: 'Âm thanh chói tai', type: 'Noun', example: 'As we entered the farmyard we were met with a cacophony of animal sounds.', vocabID: 'Set 3' },
    { id: '5', word: 'Ubiquitous', mean: 'Có mặt ở khắp nơi', type: 'Adjective', example: 'Leather is very much in fashion this season, as is the ubiquitous denim.', vocabID: 'Set 2' },
  ]);

  const columns = [
    { title: 'ID', data: 'id' },
    { title: 'Word', data: 'word', render: (data: string) => `<strong>${data}</strong>` },
    { title: 'Meaning', data: 'mean' },
    { title: 'Type', data: 'type' },
    { title: 'Example', data: 'example' },
    { title: 'Vocab Set', data: 'vocabID' },
  ];

  const handleEdit = (id: string) => {
    const word = words.find(w => w.id === id);
    setSelectedWord(word);
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    const word = words.find(w => w.id === id);
    setSelectedWord(word);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setWords(words.filter(w => w.id !== selectedWord.id));
    setShowDeleteModal(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    // Logic to save word would go here
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Vocabulary Management</h2>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => { setSelectedWord(null); setShowModal(true); }}>
          <Plus size={18} /> Add New Word
        </button>
      </div>

      <div className="card p-4">
        <DataTableWrapper 
          data={words} 
          columns={columns} 
          onEdit={handleEdit} 
          onDelete={handleDeleteClick} 
        />
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(40, 63, 59, 0.5)' }}></div>
          <div className="modal d-block show" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content" style={{ border: 'var(--beelish-border)', boxShadow: 'var(--beelish-shadow)' }}>
                <div className="modal-header border-bottom border-dark border-3" style={{ backgroundColor: 'var(--beelish-primary)' }}>
                  <h5 className="modal-title fw-bold" style={{ color: 'var(--beelish-secondary)' }}>
                    {selectedWord ? 'Edit Word' : 'Add New Word'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSave}>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Word</label>
                        <input type="text" className="form-control border-dark border-2" defaultValue={selectedWord?.word} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Meaning</label>
                        <input type="text" className="form-control border-dark border-2" defaultValue={selectedWord?.mean} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Type</label>
                        <select className="form-select border-dark border-2" defaultValue={selectedWord?.type || 'Noun'}>
                          <option value="Noun">Noun</option>
                          <option value="Verb">Verb</option>
                          <option value="Adjective">Adjective</option>
                          <option value="Adverb">Adverb</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Vocab Set</label>
                        <select className="form-select border-dark border-2" defaultValue={selectedWord?.vocabID || 'Set 1'}>
                          <option value="Set 1">Set 1 (Advanced English)</option>
                          <option value="Set 2">Set 2 (IELTS 7.0)</option>
                          <option value="Set 3">Set 3 (Everyday Phrasal Verbs)</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold">Example Sentence</label>
                        <textarea className="form-control border-dark border-2" rows={3} defaultValue={selectedWord?.example} required></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-top border-dark border-3">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Word</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
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
                  <p className="text-danger small mb-0">This action cannot be undone.</p>
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
