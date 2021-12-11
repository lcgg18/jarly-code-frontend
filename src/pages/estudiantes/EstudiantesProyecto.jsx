import React, { useEffect } from 'react'
import { GET_INSCRIPCIONES } from 'graphql/inscripcion/queries';
import { useQuery } from '@apollo/client';
import { Enum_Rol } from 'utils/enums';
import { Link } from 'react-router-dom';

const EstudiantesProyecto = () => {

    const { loading, error, data } = useQuery(GET_INSCRIPCIONES,{
        variables:{proyecto: "6199042cc458c97634aa742c"}
    });

    useEffect(() => {
      console.log(data)
    }, [data])

    if (data){
        console.log(data)
    }

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error...</div>;

    return (
        <div>
            Datos Usuarios: 
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
                      <i className='fas fa-check text-green-500 hover:text-yellow-400 cursor-pointer' />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/usuarios/editar/${i._id}`}>
                      <i className='fas fa-ban text-red-500 hover:text-yellow-400 cursor-pointer' />
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
