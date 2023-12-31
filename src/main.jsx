import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import './index.css';
import Privacy from './pages/Privacy.jsx';
import About from './pages/About.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={false}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
