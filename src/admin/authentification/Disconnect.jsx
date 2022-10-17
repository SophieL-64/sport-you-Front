// import React from "react";
// import { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// // import { useUser } from "../../contexts/UserProvider";

// const Disconnect = () => {
//   // pour se déconnecter, j'ai besoin vu verbe d'action du state
//   // afin de repasser l'état du user à null
//   // comme dans mon context j'ai préparer également un useEffect, celui-ci comprend
//   // la deuxième étape à savoir : removeItem (dans le localStorage)
//   const { setUser } = useUser();

//   useEffect(() => {
//     setUser(null);
//   }, []);

//   return <Navigate to="/" />;
// };

// export default Disconnect;
