import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Home from './Home.jsx';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={false}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
