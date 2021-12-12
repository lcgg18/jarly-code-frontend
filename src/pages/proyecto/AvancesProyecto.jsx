import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_AVANCES } from "graphql/avance/queries";

const AvancesProyecto = () => {
  const  {_id}  = useParams();

  const { loading, error, data } = useQuery(GET_AVANCES, { 
    variables:{
      filtro:{proyecto : _id},
    } 
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <div>
      <div className='self-start p-3'>
        <Link to='/proyectos'>
          <i className='fas fa-arrow-left' />
        </Link>
        <h1 className='font-bold text-xl'>Avances del Proyecto</h1>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Nombre del Proyecto</th>
            <th>Creador del Avance</th>
            <th>Observación</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.filtrarAvance.map((a) => {
              return (
                <tr key={a._id}>
                  <td>{a.fecha.slice(0, 10)}</td>
                  <td>{a.descripcion}</td>
                  <td>{a.proyecto.nombre}</td>
                  <td>
                    {a.creadoPor.nombre} {a.creadoPor.apellido}
                  </td>
                  <td>{a.observaciones.join(',  ')}</td>
                  <td>
                    <Link to={`/proyectos/editarAvances/${a._id}`}>
                      <i className="fas fa-pen text-blue-500 hover:text-yellow-400 cursor-pointer" />
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

export default AvancesProyecto;
