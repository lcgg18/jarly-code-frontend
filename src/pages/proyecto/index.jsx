import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_PROYECTOS } from "graphql/proyecto/queries";
import { Enum_EstadoProyecto } from "utils/enums";
import { Enum_FaseProyecto } from "utils/enums";

const Proyectos = () => {
  const { loading, error, data } = useQuery(GET_PROYECTOS);

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
      <br />
      
      Datos Proyectos:
      <br />
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre del Proyecto</th>
            <th>presupuesto</th>
            <th>Fecha de inicio</th>
            <th>Fecha final</th>
            <th>Estado</th>
            <th>Fase</th>
            <th>Nombre del lider</th>
            <th>Correo del lider</th>
            <th>Integrantes</th>
            <th>Objetivos</th>
            <th>Avances</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Proyectos.map((p) => {
              return (
                <tr key={p._id}>
                  <td>{p.nombre}</td>
                  <td>{p.presupuesto}</td>
                  <td>{p.fechaInicio.slice(0, 10)}</td>
                  <td>{p.fechaFin.slice(0, 10)}</td>
                  <td>{Enum_EstadoProyecto[p.estado]}</td>
                  <td>{Enum_FaseProyecto[p.fase]}</td>
                  <td>
                    {p.lider.nombre} {p.lider.apellido}
                  </td>
                  <td>{p.lider.correo}</td>
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
                  <td>
                    <Link to={`/proyectos/editar/${p._id}`}>
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

export default Proyectos;
