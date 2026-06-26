import { useState } from 'react';
import DataTableWrapper from '../components/DataTableWrapper';

export default function Users() {
  const [users, setUsers] = useState([
    { id: 'u1', username: 'johndoe', email: 'john@example.com', role: 'LEARNER', status: 'Active' },
    { id: 'u2', username: 'janesmith', email: 'jane@example.com', role: 'LEARNER', status: 'Inactive' },
    { id: 'u3', username: 'admin_user', email: 'admin@beelish.com', role: 'ADMIN', status: 'Active' },
  ]);

  const columns = [
    { title: 'ID', data: 'id' },
    { title: 'Username', data: 'username', render: (data: string) => `<strong>${data}</strong>` },
    { title: 'Email', data: 'email' },
    { 
      title: 'Role', 
      data: 'role',
      render: (data: string) => `<span class="badge ${data === 'ADMIN' ? 'bg-danger' : 'bg-secondary'}">${data}</span>`
    },
    { 
      title: 'Status', 
      data: 'status',
      render: (data: string) => `<span class="badge ${data === 'Active' ? 'bg-success' : 'bg-secondary'}">${data}</span>`
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Users Management</h2>
      </div>

      <div className="card p-4">
        <DataTableWrapper data={users} columns={columns} onEdit={() => {}} onDelete={() => {}} />
      </div>
    </div>
  );
}
