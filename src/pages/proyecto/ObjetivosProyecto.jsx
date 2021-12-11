import { useQuery } from '@apollo/client';
import { GET_PROYECTO } from 'graphql/proyecto/queries';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Enum_TipoObjecto } from 'utils/enums';

const ObjetivosProyecto = () => {
    const { _id } = useParams();
    const { loading, error, data } = useQuery(GET_PROYECTO,{
        variables: {id:_id}
    });


    if (loading) return <div>Loading...</div>;
  
    if (error) return <div>Error...</div>;

    return (
        <div className='p-5'>
        Objetivos proyectos: 
          
      <table className='tabla'>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Editar</th>            
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Proyecto.objetivos.map((p) => {
              return (
                <tr key={p._id}>
                  <td>{p.descripcion}</td>
                  <td>{Enum_TipoObjecto[p.tipo]}</td>
                  <td>
                    <Link to={`/usuarios/editar/${p._id}`}>
                      <i className='fas fa-pen text-blue-500 hover:text-yellow-400 cursor-pointer' />
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

export default ObjetivosProyecto
