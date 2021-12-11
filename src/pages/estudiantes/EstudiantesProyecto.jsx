import React from 'react'
import { GET_INSCRIPCIONES } from 'graphql/inscripcion/queries';
import { useQuery } from '@apollo/client';
import { Enum_Rol } from 'utils/enums';
import { Link, useParams } from 'react-router-dom';

const EstudiantesProyecto = () => {

    const {_id} = useParams();
    const { loading, error, data } = useQuery(GET_INSCRIPCIONES,{
        variables:{ 
            filtro:{ proyecto : _id

        }}
    });

    

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error...</div>;

    return (
        <div>
            <div className='self-start p-3'>
        <Link to='/proyectos'>
          <i className='fas fa-arrow-left' />
        </Link>
        <h1 className='font-bold text-xl'>Estudiantes Inscripto</h1>
      </div>
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Identificación</th>
            <th>Rol</th>
            <th>Estado Inscription</th>
            <th>Aprobar</th>
            <th>Rechazar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.InscripcionesFiltradas.map((i) => {
              return (
                <tr key={i._id}>
                  <td>{i.estudiante.nombre}</td>
                  <td>{i.estudiante.apellido}</td>
                  <td>{i.estudiante.correo}</td>
                  <td>{i.estudiante.identificacion}</td>
                  <td>{Enum_Rol[i.estudiante.rol]}</td>
                  <td>{i.estado}</td>
                  <td>
                    <Link to={`/usuarios/editar/${i._id}`}>
                      <i className='fas fa-check text-green-500 hover:text-green-800 cursor-pointer' />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/usuarios/editar/${i._id}`}>
                      <i className='fas fa-ban text-red-500 hover:text-red-800 cursor-pointer' />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
        </div>
    )
}

export default EstudiantesProyecto
