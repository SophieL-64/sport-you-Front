import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext(null);

const AdminProvider = ({ children }) => {
  // s'il y a un item de type 'adminToken', le json.parse va  lire les propriétés
  // internes à l'objet et remplir la state
  // sinon, la state est initialisée en "null"
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken")
      ? JSON.parse(localStorage.getItem("adminToken"))
      : null
  );

  // pour le cycle de vie de mon context
  // si je passe bien un admin, dans ce cas je setItem = je l'enregistre dans le navigateur
  // sinon je le supprime (on peut imaginer ici un acte de déconnexion)
  useEffect(() => {
    if (adminToken) {
      localStorage.setItem("adminToken", JSON.stringify(adminToken));
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [adminToken]);

  // Je prépare ici la diffusion de mon context à l'aide du Provider
  // Je choisis les states/setStates que je veux diffuser (ici donc, ce qui touche à l'admin)
  // on veut idéalement créer un context par "thème"
  return (
    <AdminContext.Provider value={{ adminToken, setAdminToken }}>
      {children}
    </AdminContext.Provider>
  );
};

// J'exporte ma fonction useAdmin pour l'invoquer quand j'ai besoin du state ou du setState dans un composant
export const useAdmin = () => useContext(AdminContext);

export default AdminProvider;
