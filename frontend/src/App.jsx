import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './views/root';
import DashboardRoot from './views/dashboard/root';

import Login from './views/auth/login';
import Register from './views/auth/register';
import ErrorPage from './views/error-page';
import DashboardHome from './views/dashboard/home';
import DashboardUser from './views/dashboard/user';
import ChangePassword from './views/dashboard/change-password';
import DashboardPosts from './views/dashboard/posts';
import ContextProvider from './lib/context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      {
        path: 'register/',
        element: <Register />,
      },
    ],
  },
  {
    path: '/dashboard/',
    errorElement: <ErrorPage />,
    element: <DashboardRoot />,
    children: [
      { index: true, element: <DashboardHome /> },
      {
        path: 'user',
        element: <DashboardUser />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
      {
        path: 'posts',
        element: <DashboardPosts />,
      },
    ],
  },
]);

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
