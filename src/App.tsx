import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/global.scss';
import { routeConfig } from './config/configRoutes/configRoutes.tsx';

const router = createBrowserRouter(routeConfig);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
