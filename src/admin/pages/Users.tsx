import { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Ban } from 'lucide-react';
import { API_BASE_URL } from '../../constants/api';
import DataTableWrapper from '../components/DataTableWrapper';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal states
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState('ROLE_USER');
  const [isCurrentlyBlocked, setIsCurrentlyBlocked] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/user/get-all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (response.ok && result) {
        setUsers(result);
      } else {
        setError(result.message || 'Lỗi khi tải danh sách người dùng');
      }
    } catch (err) {
      setError('Lỗi kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  const openBlockModal = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setSelectedUserId(id);
      setIsCurrentlyBlocked(user.delete || false);
      setShowBlockModal(true);
    }
  };

  const submitToggleBlock = async () => {
    if (!selectedUserId) return;
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/user/toggle-block/${selectedUserId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setShowBlockModal(false);
        fetchUsers();
      } else {
        alert('Có lỗi xảy ra khi cập nhật trạng thái.');
      }
    } catch (err) {
      alert('Lỗi kết nối đến server');
    }
  };

  const openRoleModal = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setSelectedUserId(id);
      setSelectedRole(user.roleId || 'ROLE_USER');
      setShowRoleModal(true);
    }
  };

  const submitSetRole = async () => {
    if (!selectedUserId) return;
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/user/update-role/${selectedUserId}?roleId=${selectedRole}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setShowRoleModal(false);
        fetchUsers();
      } else {
        alert('Có lỗi xảy ra khi cập nhật quyền.');
      }
    } catch (err) {
      alert('Lỗi kết nối đến server');
    }
  };

  const columns = [
    { 
      title: 'Tên đăng nhập', 
      data: 'name', 
      width: '25%',
      render: (data: string, type: any, row: any) => 
        `<div style="word-break: break-word; min-width: 150px;">
          <strong>${data || row.email || ''}</strong> 
          ${row.isDelete ? '<span class="badge bg-danger ms-2">Bị khóa</span>' : ''}
        </div>` 
    },
    { title: 'Họ tên', data: 'fullName' },
    { title: 'Email', data: 'email' },
    { 
      title: 'Quyền', 
      data: 'roleId',
      render: (data: string) => `<span class="badge ${data === 'ROLE_ADMIN' ? 'bg-danger' : 'bg-primary'}">${data === 'ROLE_ADMIN' ? 'ADMIN' : 'USER'}</span>`
    },
    { title: 'Level', data: 'level', render: (data: string) => data || 'N/A' },
    { title: 'XP', data: 'totalXP' }
  ];

  if (loading) {
    return <div className="p-4 text-center fw-bold">Đang tải dữ liệu người dùng...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Quản lý người dùng</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card p-4 chunky-border border-3">
        <DataTableWrapper 
          data={users} 
          columns={columns} 
          onEdit={openRoleModal} 
          onDelete={openBlockModal}
          editLabel="Cấp quyền"
          deleteLabel="Khóa"
        />
      </div>

      {/* Role Modal overlay */}
      {showRoleModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="card p-4 chunky-border border-3 bg-white" style={{ minWidth: '400px' }}>
            <h4 className="fw-bold mb-3">Cấp quyền người dùng</h4>
            <div className="mb-4">
              <label className="fw-bold mb-2">Chọn quyền mới:</label>
              <select className="form-select border-3 border-dark" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                <option value="ROLE_USER">Người dùng (ROLE_USER)</option>
                <option value="ROLE_ADMIN">Quản trị viên (ROLE_ADMIN)</option>
              </select>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary fw-bold" onClick={() => setShowRoleModal(false)}>Hủy</button>
              <button className="btn btn-primary fw-bold" onClick={submitSetRole}>Lưu thay đổi</button>
            </div>
          </div>
        </div>
      )}

      {/* Block Modal overlay */}
      {showBlockModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="card p-4 chunky-border border-3 bg-white" style={{ minWidth: '400px' }}>
            <h4 className="fw-bold mb-3">{isCurrentlyBlocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}</h4>
            <p className="mb-4">
              Bạn có chắc chắn muốn {isCurrentlyBlocked ? 'mở khóa' : 'khóa'} người dùng này không? 
              {!isCurrentlyBlocked && ' Người dùng bị khóa sẽ không thể đăng nhập vào hệ thống.'}
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary fw-bold" onClick={() => setShowBlockModal(false)}>Hủy</button>
              <button className={`btn fw-bold ${isCurrentlyBlocked ? 'btn-success' : 'btn-danger'}`} onClick={submitToggleBlock}>
                {isCurrentlyBlocked ? 'Xác nhận Mở khóa' : 'Xác nhận Khóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
