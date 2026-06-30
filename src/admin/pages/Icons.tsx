import { useState, useEffect } from 'react';
import DataTableWrapper from '../components/DataTableWrapper';
import { getIcons, createIcon, deleteIcon, IconItem } from '../../api/iconApi';

export default function Icons() {
  const [icons, setIcons] = useState<IconItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  
  // Create form state
  const [iconName, setIconName] = useState('');
  const [iconCode, setIconCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchIcons();
  }, []);

  const fetchIcons = async () => {
    try {
      setLoading(true);
      const result = await getIcons();
      if (Array.isArray(result)) {
        setIcons(result);
      } else if (result && result.data) {
        setIcons(result.data);
      } else {
        setError(result.message || 'Lỗi khi tải danh sách icon');
      }
    } catch (err) {
      setError('Lỗi kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedIconId(id);
    setShowDeleteModal(true);
  };

  const submitDelete = async () => {
    if (!selectedIconId) return;
    try {
      await deleteIcon(selectedIconId);
      setShowDeleteModal(false);
      fetchIcons();
    } catch (err) {
      alert('Lỗi kết nối đến server khi xóa icon');
    }
  };

  const submitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!iconName || !iconCode) {
      alert('Vui lòng nhập Tên và Mã Icon');
      return;
    }

    try {
      setIsCreating(true);
      await createIcon(iconName, iconCode);
      setShowUploadModal(false);
      setIconName('');
      setIconCode('');
      fetchIcons();
    } catch (err) {
      alert('Lỗi khi thêm icon');
    } finally {
      setIsCreating(false);
    }
  };

  const columns = [
    { 
      title: 'Icon', 
      data: 'code', 
      width: '100px',
      render: (data: string) => 
        `<span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1">${data}</span>` 
    },
    { title: 'Tên Icon', data: 'name', width: '30%' },
    { 
      title: 'Mã Code', 
      data: 'code',
      render: (data: string) => `<code>${data}</code>` 
    },
    { 
      title: 'Ngày tạo', 
      data: 'createdAt',
      render: (data: string) => new Date(data).toLocaleString()
    }
  ];

  if (loading) {
    return <div className="p-4 text-center fw-bold">Đang tải dữ liệu icon...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Quản lý Icon</h2>
        <button 
          className="btn btn-primary fw-bold chunky-border border-3 py-2 px-4 shadow-[4px_4px_0px_0px_#000]"
          onClick={() => setShowUploadModal(true)}
        >
          <span className="material-symbols-outlined align-middle me-2">add</span>
          Thêm Icon
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card p-4 chunky-border border-3">
        <DataTableWrapper 
          data={icons} 
          columns={columns} 
          onDelete={openDeleteModal}
          deleteLabel="Xóa"
        />
      </div>

      {/* Create Modal overlay */}
      {showUploadModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="card p-4 chunky-border border-3 bg-white" style={{ minWidth: '400px' }}>
            <h4 className="fw-bold mb-3">Thêm Icon Mới</h4>
            <form onSubmit={submitCreate}>
              <div className="mb-3">
                <label className="fw-bold mb-2">Tên Icon *:</label>
                <input 
                  type="text" 
                  className="form-control border-3 border-dark" 
                  placeholder="VD: Trường học, Du lịch..." 
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="fw-bold mb-2">Mã Icon (Material Symbol) *:</label>
                <input 
                  type="text" 
                  className="form-control border-3 border-dark" 
                  placeholder="VD: school, home..." 
                  value={iconCode}
                  onChange={(e) => setIconCode(e.target.value)}
                  required
                />
                <small className="form-text text-muted mt-1 d-block">
                  Tham khảo mã tại <a href="https://fonts.google.com/icons" target="_blank" rel="noreferrer">Google Fonts Icons</a>
                </small>
              </div>
              {iconCode && (
                <div className="mb-4 text-center">
                  <label className="fw-bold d-block mb-2">Xem trước:</label>
                  <span className="material-symbols-outlined text-5xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>
                    {iconCode}
                  </span>
                </div>
              )}
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary fw-bold" onClick={() => setShowUploadModal(false)} disabled={isCreating}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary fw-bold" disabled={isCreating}>
                  {isCreating ? 'Đang thêm...' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal overlay */}
      {showDeleteModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="card p-4 chunky-border border-3 bg-white" style={{ minWidth: '400px' }}>
            <h4 className="fw-bold text-danger mb-3">Xóa Icon</h4>
            <p className="mb-4">
              Bạn có chắc chắn muốn xóa icon này không? Hành động này không thể hoàn tác.
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary fw-bold" onClick={() => setShowDeleteModal(false)}>Hủy</button>
              <button className="btn btn-danger fw-bold" onClick={submitDelete}>
                Xác nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
