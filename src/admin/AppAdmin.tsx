import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import VocabWords from './pages/VocabWords';
import VocabSets from './pages/VocabSets';
import Videos from './pages/Videos';
import Users from './pages/Users';
import { useAuth } from '../contexts/AuthContext';

export default function AppAdmin() {
  const { user } = useAuth();

  // Protect admin routes: only ROLE_ADMIN can access
  if (!user || user.roleId !== 'ROLE_ADMIN') {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="words" element={<VocabWords />} />
        <Route path="vocab-sets" element={<VocabSets />} />
        <Route path="videos" element={<Videos />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
