import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  // ici je définis le state initial de mon user
  // à savoir
  // si j'ai un item de type 'user', utilise le json.parse pour lire les propriétés
  // internes à l'objet
  // sinon, mon code ne bouge pas
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken")
      ? JSON.parse(localStorage.getItem("userToken"))
      : null
  );

  // pour le cycle de vie de mon context
  // si je passe bien un user, dans ce cas je setItem = je l'enregistre dans le navigateur
  // sinon je le supprime (on peut imaginer ici un acte de déconnexion)
  useEffect(() => {
    if (userToken) {
      localStorage.setItem("userToken", JSON.stringify(userToken));
    } else {
      localStorage.removeItem("userToken");
    }
  }, [userToken]);

  // Je prépare ici la diffusion de mon context à l'aide du Provider
  // Je choisis les states/setStates que je veux diffuser (ici donc, ce qui touche au user)
  // on veut idéalement créer un context par "thème"
  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};

// J'exporte ma fonction useUser pour l'invoquer quand j'ai besoin du state ou du setState dans un composant
export const useUser = () => useContext(UserContext);

export default UserProvider;
