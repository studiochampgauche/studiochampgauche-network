'use strict';
import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundTemplate from './templates/NotFound';
import DefaultTemplate from './templates/Default';
import TemplateDocs from './templates/TemplateDocs';
import PageTransition from './inc/PageTransition';
import Metas from './inc/Metas';
import './inc/Loader';
import './inc/Scroller';
import './inc/Ham';

const templates = {
    DefaultTemplate,
    TemplateDocs
};

const App = () => {

    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <>
            <PageTransition />
            <Outlet />
        </>
    );
    
};


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            ...ROUTES.map((route, i) => {
                const Template = templates[route.template] || templates['DefaultTemplate'];

                route.seo.pageTitle = route.pageName;

                return {
                    path: route.path,
                    element: (
                        <>
                            <Metas extraDatas={route?.extraDatas} seo={route?.seo} />
                            <Template
                                id={route.id}
                                type={route.type}
                                routeName={route.routeName}
                                pageName={route.pageName}
                                path={route.path}
                                seo={route.seo}
                                acf={route.acf}
                                extraDatas={route?.extraDatas}
                                breadcrumb_datas={route?.breadcrumb_datas}
                            />
                        </>
                    ),
                };
            }),
            {
                path: "*",
                element: (
                    <>
                        <Metas seo={{ pageTitle: CL.value === 'fr' ? 'Erreur 404' : 'Error 404', do_not_index: true }} />
                        <NotFoundTemplate />
                    </>
                ),
            },
        ],
    },
]);


const mainNode = document.getElementById('app');
const root = createRoot(mainNode);

root.render(
    <HelmetProvider>
        <RouterProvider router={router} />
    </HelmetProvider>
);