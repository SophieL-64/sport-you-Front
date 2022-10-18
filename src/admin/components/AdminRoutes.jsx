import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";

const AdminRoutes = () => {
  // on invoque l'état de l'admin
  const { adminToken } = useAdmin();

  // on prépare un outlet qui permet, après vérif de l'adminToken, d'aller vers les
  // composants/routes enfants. En l'absence d'adminToken, on est redirigé vers la page de login
  return adminToken ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
