'use strict';
import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundTemplate from './templates/NotFound';
import DefaultTemplate from './templates/Default';
import TemplateHome from './templates/Home';
import TemplateStart from './templates/Start';
import TemplateContact from './templates/Contact';
import PageTransition from './inc/PageTransition';
import Metas from './inc/Metas';
import './inc/Loader';
import './inc/Scroller';
import './inc/Ham';
import './inc/Footer';
import './inc/Mouse';

const templates = {
    DefaultTemplate,
    TemplateHome,
    TemplateContact,
    TemplateStart
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
                            />
                        </>
                    ),
                };
            }),
            {
                path: "*",
                element: (
                    <>
                        <Metas seo={{ pageTitle: CL === 'fr' ? 'Erreur 404' : 'Error 404', do_not_index: true }} />
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