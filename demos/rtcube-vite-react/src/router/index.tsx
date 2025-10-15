import React from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ChatPage from '../scenes/ChatPage';
import CallPage from '../scenes/CallPage';
import LivePage from '../scenes/LivePage';
import RoomPage from '../scenes/RoomPage';
import { StagesPage } from '@/pages';

export const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login/:sceneId?',
    element: <LoginPage />
  },
  {
    path: '/stages/:sceneId?',
    element: (
      <ProtectedRoute>
        <StagesPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'chat',
        element: <ChatPage />
      },
      {
        path: 'call',
        element: <CallPage />
      },
      {
        path: 'live', 
        element: <LivePage />
      },
      {
        path: 'room',
        element: <RoomPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);