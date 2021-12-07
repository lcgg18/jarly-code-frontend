import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ESTUDIANTE } from 'graphql/usuario/queries';
import { Link } from 'react-router-dom';
import { Enum_Rol } from 'utils/enums';
import { Enum_EstadoUsuario } from 'utils/enums';

const Estudiantes = () => {
  const { loading, error, data } = useQuery(GET_ESTUDIANTE);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;


  return (
    <div>
        Datos Estudiantes: 
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Identificación</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Estudiantes.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.identificacion}</td>
                  <td>{Enum_Rol[u.rol]}</td>
                  <td>{Enum_EstadoUsuario[u.estado]}</td>
                  <td>
                    <Link to={`/estudiantes/editar/${u._id}`}>
                      <i className='fas fa-pen text-blue-500 hover:text-yellow-400 cursor-pointer' />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Estudiantes;
