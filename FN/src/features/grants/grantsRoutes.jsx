import { Route } from 'react-router-dom';
import Grants from './pages/Grants';

export const GrantsRoutes = () => [

     <Route key="grants" path="/grants" element={<Grants />} />,
];