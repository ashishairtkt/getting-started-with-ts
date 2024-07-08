import React from 'react'
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import Home from '../components/pages/Home';
import NotFound from './NotFound';
import Login from '../components/Auth/Login';
import Dashboard from '../components/pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import SignUp from '../components/Auth/SignUp';


const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/SignUp',
        element: <SignUp />,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

const router = createBrowserRouter(routes);

const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />;
}

export default AppRouter
