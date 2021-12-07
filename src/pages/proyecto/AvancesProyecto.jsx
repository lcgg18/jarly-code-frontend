import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_AVANCES } from "graphql/avance/queries";

const AvancesProyecto = () => {
  const { loading, error, data } = useQuery(GET_AVANCES);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <div>
      Datos Usuarios:
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
            data.Avances.map((a) => {
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
                    <Link to={`/avances/editar/${a._id}`}>
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
