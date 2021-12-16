import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "context/userContext";
import { AuthContext } from "context/authContext";
import jwt_decode from "jwt-decode";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import EditarUsuario from "pages/usuarios/editar";
import Index from "pages/Index";
import PrivateLayout from "layouts/PrivateLayout";
import Proyectos from "pages/proyecto";
import Usuarios from "pages/usuarios/index";
import EditarProyecto from "pages/proyecto/EditarProyecto";
import AvancesProyecto from "pages/proyecto/AvancesProyecto";
import ObjetivosProyecto from "pages/proyecto/ObjetivosProyecto";
import EstudiantesProyecto from "pages/estudiantes/EstudiantesProyecto";
import AuthLayout from "layouts/AuthLayout";
import Registro from "pages/auth/Registro";
import Login from "pages/auth/Login";
import Perfil from "pages/usuarios/Perfil";
import EditarPerfil from "pages/auth/EditarPerfil";
import NuevoProyecto from "pages/proyecto/CrearProyecto";
import EditarAvance from "pages/proyecto/EditarAvance";
import CrearAvance from "pages/proyecto/CrearAvance";
import ProyectosLiderados from "pages/proyecto/ProyectosLiderados";



const httpLink = createHttpLink({
    uri:"http://localhost:4000/graphql",
    // uri: process.env.REACT_APP_HTTP_LINK,
    // uri: "https://backend-gestion-de-proyectos.herokuapp.com/graphql",
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

const AppRouter = () => {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState("");

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
        estado: decoded.estado,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PrivateLayout />}>
                <Route path="perfil" element={<Perfil />}/>

                <Route path="" element={<Index />} />
                <Route path="usuarios/" element={<Usuarios />} />
                <Route
                  path="usuarios/editar/:_id"
                  element={<EditarUsuario />}
                />
                <Route
                  path="perfil/editar/:_id"
                  element={<EditarPerfil />}
                />                 
                <Route
                  path="proyectos/editar/:_id"
                  element={<EditarProyecto />}
                />
                 <Route
                  path="proyectos/avance/crear"
                  element={<CrearAvance />}
                />
                <Route
                  path="proyectos/avances/:_id"
                  element={<AvancesProyecto />}
                />
                <Route
                  path="proyectos/editarAvances/:_id"
                  element={<EditarAvance />}
                />
                <Route
                  path="proyectos/objetivos/:_id"
                  element={<ObjetivosProyecto />}
                />
                               
                  <Route path="proyectos/crear" element={<NuevoProyecto />} />
               
                             
                <Route
                  path="/estudiantes/proyecto/:_id"
                  element={<EstudiantesProyecto />}
                />
                <Route path="proyectosliderados" element={<ProyectosLiderados />} />
                <Route path="proyectos" element={<Proyectos />} />
              </Route>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="registro" element={<Registro />} />
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default AppRouter
