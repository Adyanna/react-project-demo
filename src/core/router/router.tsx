import React from "react";
import { createBrowserRouter, redirect } from "react-router";
import { ProtectedRoute } from "@core/guards/protected-route";
import { NotFoundPage } from "@core/components/not-found/not-found";

const HomePage = React.lazy(() => import('@features/home/home-page'));
const App = React.lazy(() => import('@core/components/app/App'));
const ProductsPage = React.lazy(() => import('@features/products/pages/products-page'));
const LoginPage = React.lazy(()=>import('@features/auth/pages/login/login-page'));
const ProductDetailPage = React.lazy(() => import('@features/products/pages/products-detail'));
const ProductNew = React.lazy(() => import('@features/products/pages/products-new'));


export const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [{
            index: true,
            loader: () => redirect('/products')
        }, {
            path: 'home',
            element: <HomePage />
        },
        {
            path: 'products',
           // loader: ProtectedRoute,
            element: <ProductsPage />
        },

        {
            path: 'products/:id',
            element: <ProductDetailPage />
        },
        {
            path: 'products/new',
            loader: ProtectedRoute,
            element: <ProductNew />
        }
        ]
    },
    {
        path: '/login',
        element: (<LoginPage />)
    },
    {
        path: '/logout',
        element: (<HomePage />)
    },
    {
        path: '/signin',
        element: (<HomePage />)
    },
    {
        path:'*',
        element:(<NotFoundPage/>)
    }


])