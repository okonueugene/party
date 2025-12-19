import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          // Add more admin routes here
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/admin/dashboard" replace />,
  },
]);

export default router;