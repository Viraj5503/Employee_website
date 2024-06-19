import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import PageNotFound from './PageNotFound';
import Employee from '../Pages/Employee';
import Contact from '../Pages/Contact';

export const router = createBrowserRouter([
    { 
      path : "/",
      element: <Login />,
    },
    { 
      path : "/login",
      element: <Login />,
    },
    { 
      path : "/signup",
      element: <Signup />,
    },
    { 
      path : "/homepage",
      element: <HomePage />,
    },
    {
      path: "*",
      element: <PageNotFound />
    },
    { 
      path : "/employee",
      element: <Employee />,
    },
    { 
      path : "/contact",
      element: <Contact />,
    },
    // { 
    //   path : "/popups",
    //   element: <Popups />,
    // },
  ]);

export default function Routes() {
  return (
      <RouterProvider router={router}></RouterProvider>
  )
}
