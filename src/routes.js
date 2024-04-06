import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Ramassage from './pages/Ramassage';
import Envoi from './pages/Envoi';
import CreateRamassage from './pages/CreateRamassage';
import CreateEnvoi from './pages/CreateEnvoi';
import WilayaFee from './pages/WilayaFee';
import ImpressionModel from './pages/ImpressionModel';
import Parameter from './pages/Parameter';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        {
          path: 'ramassage',
          children: [
            { path: '', element: <Ramassage /> },
            { path: 'create', element: <CreateRamassage /> },
          ],
        },
        {
          path: 'envoi',
          children: [
            { path: '', element: <Envoi /> },
            { path: 'create', element: <CreateEnvoi /> },
          ],
        },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'wilaya', element: <WilayaFee /> },
        { path: 'parameter', element: <Parameter /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: 'impression/:id', element: <ImpressionModel /> },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
