import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
require('dotenv').config();

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
