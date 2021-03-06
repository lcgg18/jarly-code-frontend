import { useQuery } from "@apollo/client";
import { PROYECTOS_LIDERADOS } from "graphql/proyecto/queries";
import React from "react";
import { Link } from "react-router-dom";
import { Enum_EstadoProyecto } from "utils/enums";
import { Enum_FaseProyecto } from "utils/enums";

const ProyectosLiderados = () => {
  const { loading, error, data } = useQuery(PROYECTOS_LIDERADOS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <div>
        <Link to={`/proyectos/crear/`}>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-green-600 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
          >
            Crear un proyecto
          </button>
        </Link>

      <div className="self-start p-3">
        <h1 className="font-bold text-xl">Datos del Proyecto</h1>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre del Proyecto</th>
            <th>presupuesto</th>
            <th>Fecha de inicio</th>
            <th>Fecha final</th>
            <th>Estado</th>
            <th>Fase</th>
            <th>Estudiantes</th>
            <th>Objetivos</th>
            <th>Avances</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.ProyectosLiderados.map((p) => {
              return (
                <tr key={p._id}>
                  <td>{p.nombre}</td>
                  <td>{p.presupuesto}</td>
                  {p.fechaInicio ? (
                    <td>{p.fechaInicio.slice(0, 10)}</td>
                  ) : (
                    <td> Por Iniciar</td>
                  )}
                  {p.fechaFin ? (
                    <td>{p.fechaFin.slice(0, 10)}</td>
                  ) : (
                    <td> No aplica</td>
                  )}
                  <td>
                      <span>{Enum_EstadoProyecto[p.estado]}</span>
                    </td>
                 
               
                    <td>
                      <span>{Enum_FaseProyecto[p.fase]}</span>
                    </td>

                    <td>
                      <Link to={`/estudiantes/proyecto/${p._id}`}>
                        <i className="fas fa-user-friends text-blue-500 hover:text-yellow-400 cursor-pointer" />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/proyectos/objetivos/${p._id}`}>
                        <i className="fas fa-thumbtack text-blue-500 hover:text-yellow-400 cursor-pointer" />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/proyectos/avances/${p._id}`}>
                        <i className="fas fa-chart-pie text-blue-500 hover:text-yellow-400 cursor-pointer" />
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

export default ProyectosLiderados;
