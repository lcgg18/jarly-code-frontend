import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_AVANCES } from "graphql/avance/queries";
import PrivateComponent from "components/PrivateComponet";

const AvancesProyecto = () => {
  const { _id } = useParams();

  const { loading, error, data } = useQuery(GET_AVANCES, {
    variables: {
      filtro: { proyecto: _id },
    },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <div>
      <PrivateComponent roleList={["ESTUDIANTE"]}>
        <Link to={`/proyectos/avance/crear/${_id}`} >
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-green-600 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
          >
            Crear un avance
          </button>
        </Link>
      </PrivateComponent>

      <div className="self-start p-3">
        <PrivateComponent roleList={["LIDER"]}>
          <Link to="/proyectosliderados">
            <i className="fas fa-arrow-left" />
          </Link>
        </PrivateComponent>
        <PrivateComponent roleList={["ESTUDIANTE"]}>
          <Link to="/proyectos">
            <i className="fas fa-arrow-left" />
          </Link>
        </PrivateComponent>

        <h1 className="font-bold text-xl">Avances del Proyecto</h1>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Nombre del Proyecto</th>
            <th>Creador del Avance</th>
            <th>Observación</th>
            <PrivateComponent roleList={["LIDER"]}>
              <th>agregar observaciones</th>
            </PrivateComponent>
            <PrivateComponent roleList={["ESTUDIANTE"]}>
              <th>Editar</th>
            </PrivateComponent>
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
                  <td>{console.log(data.filtrarAvance.indexOf) }{a.observaciones.join(",  ")}</td>
                  <PrivateComponent roleList={["LIDER"]}>
                    <td>
                      <Link to={`/proyectos/nuevaobservacion/${a._id}`}>
                        <i className="fas fa-pen text-blue-500 hover:text-yellow-400 cursor-pointer" />
                      </Link>
                    </td>
                  </PrivateComponent>
                  <PrivateComponent roleList={["ESTUDIANTE"]}>
                    <td>
                      <Link to={`/proyectos/editarAvances/${a._id}`}>
                        <i className="fas fa-pen text-blue-500 hover:text-yellow-400 cursor-pointer" />
                      </Link>
                    </td>
                  </PrivateComponent>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AvancesProyecto;
