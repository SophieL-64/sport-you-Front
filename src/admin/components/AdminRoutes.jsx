import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserProvider";
import axios from "axios";
import { useEffect } from "react";

const AdminRoutes = () => {
  // ici j'ai besoin d'invoquer l'état du user
  const { userToken } = useUser();

  // axios.post("http://localhost:5000/users/token", {
  //   headers: { authorization: "bearer" + userToken.token },
  // });

  // Ici on prépare un outlet qui permet d'emmenener arpès vérif du user vers le
  // composant/route enfant : panel admin
  return userToken ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
