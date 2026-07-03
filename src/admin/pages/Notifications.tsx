import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DataTableWrapper from '../components/DataTableWrapper';
import { getNotificationHistory, sendNotification, NotificationLog } from '../../api/notificationAdminApi';
import { API_BASE_URL, API_ENDPOINTS } from '../../constants/api';
import { fetchWithAuth } from '../../api/fetchClient';

export default function Notifications() {
  const [history, setHistory] = useState<NotificationLog[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // Form states
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetType, setTargetType] = useState('ALL');
  const [targetUserId, setTargetUserId] = useState('');

  useEffect(() => {
    fetchHistory();
    fetchUsers();
  }, []);

  const fetchHistory = async () => {
    try {
      const result = await getNotificationHistory();
      setHistory(Array.isArray(result) ? result : result || []);
    } catch (error) {
      console.error('Error fetching notification history', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.ADMIN}/user/get-all`, { method: 'GET' });
      const result = await response.json();
      if (response.ok && result) {
        setUsers(result);
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách người dùng', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) {
      alert('Vui lòng nhập đủ Tiêu đề và Nội dung!');
      return;
    }
    if (targetType === 'SPECIFIC' && !targetUserId) {
      alert('Vui lòng chọn Người dùng nhận!');
      return;
    }

    try {
      setIsSending(true);
      await sendNotification({ title, message, targetType, targetUserId });
      setShowModal(false);
      
      // Reset form
      setTitle('');
      setMessage('');
      setTargetType('ALL');
      setTargetUserId('');
      
      // Refresh history
      fetchHistory();
      alert('Gửi thông báo thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi gửi thông báo');
    } finally {
      setIsSending(false);
    }
  };

  const renderTarget = (type: string, userId?: string) => {
    switch (type) {
      case 'ALL': return '<span class="badge bg-primary">Tất cả</span>';
      case 'ADMIN': return '<span class="badge bg-danger">Quản trị viên</span>';
      case 'USER': return '<span class="badge bg-info text-dark">Học viên</span>';
      case 'SPECIFIC': 
        const u = users.find(x => x.id === userId);
        return `<span class="badge bg-secondary">Cá nhân: ${u ? u.name || u.email : userId}</span>`;
      default: return type;
    }
  };

  const columns = [
    { title: 'Tiêu đề', data: 'title', width: '25%' },
    { title: 'Nội dung', data: 'message', width: '40%' },
    { 
      title: 'Đối tượng', 
      data: 'targetType',
      render: (data: string, type: any, row: any) => renderTarget(data, row.targetUserId)
    },
    { 
      title: 'Ngày gửi', 
      data: 'createdAt',
      render: (data: string) => {
        if (!data) return 'N/A';
        const d = new Date(data);
        return d.toLocaleString('vi-VN');
      }
    }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Lịch sử Thông báo</h2>
        <button 
          className="btn btn-primary fw-bold chunky-border border-3 py-2 px-4 shadow-[4px_4px_0px_0px_#000]"
          onClick={() => setShowModal(true)}
        >
          <span className="material-symbols-outlined align-middle me-2">send</span>
          Gửi Thông Báo Mới
        </button>
      </div>

      <div className="card p-4 chunky-border border-3">
        <DataTableWrapper 
          data={history} 
          columns={columns} 
        />
      </div>

      {/* Send Modal */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="card p-4 chunky-border border-3 bg-white w-100" style={{ maxWidth: '600px' }}>
            <h4 className="fw-bold mb-4">Gửi Thông Báo Hệ Thống</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="fw-bold mb-2">Tiêu đề *:</label>
                <input 
                  type="text" 
                  className="form-control border-3 border-dark" 
                  placeholder="Ví dụ: Cập nhật hệ thống" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="fw-bold mb-2">Nội dung *:</label>
                <textarea 
                  className="form-control border-3 border-dark" 
                  rows={4}
                  placeholder="Nhập chi tiết thông báo..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="fw-bold mb-2">Gửi đến *:</label>
                <select 
                  className="form-select border-3 border-dark" 
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value)}
                >
                  <option value="ALL">Tất cả người dùng</option>
                  <option value="ADMIN">Chỉ Quản trị viên (Admin)</option>
                  <option value="USER">Chỉ Học viên (User)</option>
                  <option value="SPECIFIC">Người dùng cụ thể</option>
                </select>
              </div>

              {targetType === 'SPECIFIC' && (
                <div className="mb-4">
                  <label className="fw-bold mb-2">Chọn Người dùng *:</label>
                  <select 
                    className="form-select border-3 border-dark" 
                    value={targetUserId}
                    onChange={(e) => setTargetUserId(e.target.value)}
                    required
                  >
                    <option value="">-- Chọn User --</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.name || u.email} ({u.email}) - {u.roleId}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-secondary fw-bold" onClick={() => setShowModal(false)} disabled={isSending}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary fw-bold" disabled={isSending}>
                  {isSending ? 'Đang gửi...' : 'Gửi Thông Báo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
