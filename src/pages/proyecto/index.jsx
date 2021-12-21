import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_PROYECTOS } from "graphql/proyecto/queries";
import { Enum_EstadoProyecto } from "utils/enums";
import { Enum_FaseProyecto } from "utils/enums";
import PrivateComponent from "components/PrivateComponet";
import { CREAR_INSCRIPCION } from "graphql/inscripcion/mutations";
import { GET_INSCRIPCIONES } from "graphql/inscripcion/queries";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import ButtonLoading2 from "components/ButtonLoading2";
import { ACTUALIZAR_ESTADO_PROYECTO } from "graphql/proyecto/mutations";
import { TERMINAR_PROYECTO } from "graphql/proyecto/mutations";
import ButtonLoading3 from "components/ButtonLoading3";

const Proyectos = () => {
  const { loading, error, data } = useQuery(GET_PROYECTOS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <div>
    <PrivateComponent roleList={["ESTUDIANTE", "ADMINISTRADOR"]}>
        
      

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
            <PrivateComponent roleList={["ESTUDIANTE", "ADMINISTRADOR"]}>
              <th>Nombre del lider</th>
              <th>Correo del lider</th>
            </PrivateComponent>
            
              <PrivateComponent roleList={["LIDER","ESTUDIANTE"]}>
               <th>Estudiantes</th>
              <th>Objetivos</th>
              <th>Avances</th> 
              </PrivateComponent>
              <PrivateComponent roleList={["ESTUDIANTE"]}> 
              <th>Inscribirme</th>
            </PrivateComponent>
            <PrivateComponent roleList={["ADMINISTRADOR"]}>
              <th>Editar</th>
            </PrivateComponent>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Proyectos.map((p) => {
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
                  <PrivateComponent roleList={["ESTUDIANTE","LIDER"]}>
                    <td>
                      <span>{Enum_EstadoProyecto[p.estado]}</span>
                    </td>
                  </PrivateComponent>
                  <PrivateComponent roleList={["ADMINISTRADOR"]}>
                    <td>
                      <ActivarProyecto
                        id={p._id}
                        estadoP={p.estado}
                        faseP={p.fase}
                      />
                    </td>
                  </PrivateComponent>
                  <PrivateComponent roleList={["ESTUDIANTE","LIDER"]}>
                    <td>
                      <span>{Enum_FaseProyecto[p.fase]}</span>
                    </td>
                  </PrivateComponent>
                  <PrivateComponent roleList={["ADMINISTRADOR"]}>
                    <td>
                      <FinalizarProyecto id={p._id} faseP={p.fase} />
                    </td>
                  </PrivateComponent>
                  <PrivateComponent roleList={["ESTUDIANTE", "ADMINISTRADOR"]}>
                    <td>
                    {p.lider.nombre} {p.lider.apellido}
                  </td>
                  
                    <td>{p.lider.correo}</td>
                  </PrivateComponent>
                  
                    <PrivateComponent roleList={["ESTUDIANTE","LIDER"]}>
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
                    <PrivateComponent roleList={["ESTUDIANTE"]}>
                      <td>
                      <InscripcionProyecto
                        idProyecto={p._id}
                        estado={p.estado}
                        inscripciones={p.inscripciones}
                      />
                    </td>
                    </PrivateComponent>
                    
                  </PrivateComponent>
                  <PrivateComponent roleList={["ADMINISTRADOR"]}>
                    <td>
                      <Link to={`/proyectos/editar/${p._id}`}>
                        <i className="fas fa-pen text-blue-500 hover:text-yellow-400 cursor-pointer" />
                      </Link>
                    </td>
                  </PrivateComponent>
                </tr>
              );
            })}
        </tbody>
      </table>
      </PrivateComponent>
    </div>
    
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const { userData } = useUser();
  const [estadoInscripcion, setEstadoInscripcion] = useState("");
  const [crearInscripcion, { data, loading, error }] = useMutation(
    CREAR_INSCRIPCION,
    { refetchQueries: [{ GET_INSCRIPCIONES }] }
  );

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter(
        (el) => el.estudiante._id === userData._id
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  const { data: dataInscripcion } = useQuery(GET_INSCRIPCIONES, {
    variables: {
      flitro: { estudiante: userData._id },
    },
  });
  useEffect(
    (dataInscripcion) => {
      if (dataInscripcion) {
        console.log(dataInscripcion);
      }
    },
    [dataInscripcion]
  );

  useEffect(() => {
    if (data) {
      toast.success("inscripcion creada con exito");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("No se pudo crear la inscripcion");
    }
  }, [error]);

  const confirmarInscripcion = () => {
    crearInscripcion({
      variables: { proyecto: idProyecto, estudiante: userData._id },
    });
  };

  return (
    <>
      {estadoInscripcion !== "" ? (
        <span>{estadoInscripcion}</span>
      ) : (
        <ButtonLoading2
          onClick={() => confirmarInscripcion()}
          disabled={estado === "INACTIVO"}
          loading={loading}
          text="Inscribirme"
        />
      )}
    </>
  );
};

const ActivarProyecto = ({ id, estadoP, faseP }) => {
  const [
    cambiarEstadoProyecto,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(ACTUALIZAR_ESTADO_PROYECTO, {
    refetchQueries: [{ query: GET_PROYECTOS }],
  });

  useEffect(() => {
    if (dataMutation) {
      toast.success("Se activo el proyecto con exito");
    }
  }, [dataMutation]);

  useEffect(() => {
    if (errorMutation) {
      toast.error("Error activando el proyecto");
    }
  }, [errorMutation]);

  useEffect(() => {}, [loadingMutation]);

  const confirmacionProyecto = () => {
    cambiarEstadoProyecto({
      variables: {
        id,
        estado: "ACTIVO",
      },
    });
  };

  return (
    <div>
      {estadoP === "INACTIVO" && faseP === "NULO" ? (
        <ButtonLoading2
          onClick={() => confirmacionProyecto()}
          disabled={false}
          loading={loadingMutation}
          text="Activar"
        />
      ) : (
        <span>{Enum_EstadoProyecto[estadoP]}</span>
      )}
    </div>
  );
};

const FinalizarProyecto = ({ id, faseP }) => {
  const [
    cambiarFaseProyecto,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(TERMINAR_PROYECTO, {
    refetchQueries: [{ query: GET_PROYECTOS }],
  });

  useEffect(() => {
    if (dataMutation) {
      toast.success("Se finalizó el proyecto con exito");
    }
  }, [dataMutation]);

  useEffect(() => {
    if (errorMutation) {
      toast.error("Error finalizando el proyecto");
    }
  }, [errorMutation]);

  useEffect(() => {}, [loadingMutation]);

  const confirmacionProyecto = () => {
    cambiarFaseProyecto({
      variables: {
        id,
        fase: "TERMINADO",
      },
    });
  };

  return (
    <div>
      {faseP === "DESARROLLO" ? (
        <ButtonLoading3
          onClick={() => confirmacionProyecto()}
          disabled={false}
          loading={loadingMutation}
          text="Terminar"
        />
      ) : (
        <span>{Enum_FaseProyecto[faseP]}</span>
      )}
    </div>
  );
};

export default Proyectos;
