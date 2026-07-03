import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTableWrapper from '../components/DataTableWrapper';
import { fetchWithAuth } from '../../api/fetchClient';
import { API_BASE_URL } from '../../constants/api';
import { getIcons, IconItem } from '../../api/iconApi';

export default function VocabSets() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSet, setSelectedSet] = useState<any>(null);
  const navigate = useNavigate();

  const [sets, setSets] = useState<any[]>([]);
  const [iconsList, setIconsList] = useState<IconItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSets();
    fetchIconsList();
  }, []);

  const fetchIconsList = async () => {
    try {
      const result = await getIcons();
      setIconsList(Array.isArray(result) ? result : result || []);
    } catch (error) {
      console.error('Error fetching icons', error);
    }
  };

  const fetchSets = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/api/vocab-set/get-all`);
      if (response.ok) {
        const data = await response.json();
        setSets(Array.isArray(data) ? data : data || []);
      } else {
        console.error('Failed to fetch vocab sets');
      }
    } catch (error) {
      console.error('Error fetching vocab sets', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'ID', data: 'id' },
    { title: 'Title', data: 'title', render: (data: string) => `<strong>${data}</strong>` },
    { title: 'Words Count', data: 'numOfWords' },
    { title: 'Category ID', data: 'categoryID' },
    { title: 'Icon', data: 'icon', render: (data: string) => 
      data ? `<div class="d-flex align-items-center gap-2"><span class="material-symbols-outlined text-primary">${data}</span> <small>${data}</small></div>` : 'N/A' 
    },
    { title: 'Created At', data: 'created_at', render: (data: string) => data || 'N/A' },
  ];

  const handleManage = (id: string) => {
    navigate(`/admin/vocab-sets/${id}/words`);
  };

  const handleEdit = (id: string) => {
    const s = sets.find(x => x.id === id);
    setSelectedSet(s);
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    const s = sets.find(x => x.id === id);
    setSelectedSet(s);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setSets(sets.filter(x => x.id !== selectedSet.id));
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Vocabulary Sets</h2>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => { setSelectedSet(null); setShowModal(true); }}>
          <Plus size={18} /> Add New Set
        </button>
      </div>

      <div className="card p-4">
        <DataTableWrapper 
          data={sets} 
          columns={columns} 
          onEdit={handleEdit} 
          onDelete={handleDeleteClick} 
          onManage={handleManage}
          manageLabel="Words" 
        />
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(40, 63, 59, 0.5)' }}></div>
          <div className="modal d-block show" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ border: 'var(--beelish-border)', boxShadow: 'var(--beelish-shadow)' }}>
                <div className="modal-header border-bottom border-dark border-3" style={{ backgroundColor: 'var(--beelish-primary)' }}>
                  <h5 className="modal-title fw-bold" style={{ color: 'var(--beelish-secondary)' }}>
                    {selectedSet ? 'Edit Set' : 'Add New Set'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Title</label>
                    <input type="text" className="form-control border-dark border-2" defaultValue={selectedSet?.title} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category ID</label>
                    <input type="number" className="form-control border-dark border-2" defaultValue={selectedSet?.categoryID} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Icon Name</label>
                    <select className="form-select border-dark border-2" defaultValue={selectedSet?.icon || ''}>
                      <option value="">-- Chọn Icon --</option>
                      {iconsList.map(icon => (
                        <option key={icon.id} value={icon.code}>
                          {icon.name} ({icon.code})
                        </option>
                      ))}
                    </select>
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
                  <p>Are you sure you want to delete the set <strong>"{selectedSet?.title}"</strong>?</p>
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
