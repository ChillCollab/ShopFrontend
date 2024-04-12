import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { configRoutes } from './config/routeConfig/RouteConfig.tsx';
import './styles/global.scss';
const router = createBrowserRouter(configRoutes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
