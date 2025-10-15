import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const pathParts = location.pathname.split('/');
    const sceneId = pathParts[2] || 'chat';
    return <Navigate to={`/login/${sceneId}`} replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;