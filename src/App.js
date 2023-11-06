import React from "react";
import Home from '../src/components/Home'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./project-ui/Dashboard";

import './components/search/SearchComponent.css';
import DashboardLanding from "./project-ui/DashboardLanding";
import ProfileForm from "./project-ui/ProfileForm";
import PostProjectForm from "./project-ui/PostProjectForm";
import ScrollToTop from "./project-ui/ScrollToTop";
import AdminDashboard from "./components/admin/AdminDashbboard";


const router = createBrowserRouter([

    {
        path: "/",
        element: <Home/>
    }, {
        path: "Dashboard",
        element: <Dashboard/>,
        children: [{
            path: "landing",
            element: <DashboardLanding/>,
        }, {
            path: "profile",
            element: <ProfileForm/>
        }, {
            path: "postProject",
            element: <PostProjectForm/>
        }, {
            path: "admin",
            element: <AdminDashboard/>
        }]
    }
]);

function App() {

    return <RouterProvider router={router}> </RouterProvider>
}

export default App;
