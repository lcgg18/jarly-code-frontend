import React, { useEffect } from "react";
import { GET_INSCRIPCIONES } from "graphql/inscripcion/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Enum_Rol } from "utils/enums";
import { Link, useParams } from "react-router-dom";
import { APROBAR_INSCRIPCION } from "graphql/inscripcion/mutations";
import { toast } from "react-toastify";
import ButtonLoading2 from "components/ButtonLoading2";
import { Enum_EstadoInscripcion } from "utils/enums";
import { RECHAZAR_INSCRIPCION } from "graphql/inscripcion/mutations";
import PrivateComponent from "components/PrivateComponet";
import ButtonLoading3 from "components/ButtonLoading3";

const EstudiantesProyecto = () => {
  const { _id } = useParams();
  const { loading, error, data } = useQuery(GET_INSCRIPCIONES, {
    variables: {
      filtro: { proyecto: _id },
    },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <div>
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
        <h1 className="font-bold text-xl">Estudiantes Inscrito</h1>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Identificación</th>
            <th>Rol</th>
            <th>Estado Inscripción</th>
            <PrivateComponent roleList={["LIDER"]}>
              <th>Modificar Estado</th>
            </PrivateComponent>
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
                  <td>{Enum_EstadoInscripcion[i.estado]}</td>
                  <PrivateComponent roleList={["LIDER"]}>
                    <td>
                      <div className="flex p-2">
                        <InscripcionAp _id={i} /> <InscripcionRe _id={i} />
                      </div>
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

const InscripcionAp = (i) => {
  const [aprobarInscripcion, { data, loading, error }] = useMutation(
    APROBAR_INSCRIPCION,
    { refetchQueries: [{ GET_INSCRIPCIONES }] }
  );

  useEffect(() => {
    if (data) {
      toast.success("Inscripcion aprobada con exito");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error aprobando la inscripcion");
    }
  }, [error]);

  const cambiarEstadoInscripcion = () => {
    if (i) {
      aprobarInscripcion({
        variables: {
          aprobarInscripcionId: i._id._id,
        },
      });
    }
  };
  const estado = i._id.estado;

  return (
    <div key={i._id._id}>
      {estado === "PENDIENTE" ? (
        <ButtonLoading2
          onClick={() => {
            cambiarEstadoInscripcion();
          }}
          text="Aprobar"
          loading={loading}
          disabled={false}
        />
      ) : (
        <span></span>
      )}
    </div>
  );
};

const InscripcionRe = (i) => {
  const [rechazarInscripcion, { data, loading, error }] =
    useMutation(RECHAZAR_INSCRIPCION);

  useEffect(() => {
    if (data) {
      toast.success("Inscripcion rechazada con exito");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error arechazando la inscripcion");
    }
  }, [error]);

  const cambiarEstadoInscripcion = () => {
    if (i) {
      rechazarInscripcion({
        variables: {
          rechazarInscripcionId: i._id._id,
        },
      });
    }
  };
  const estado = i._id.estado;

  return (
    <div key={i._id._id}>
      {estado === "PENDIENTE" ? (
        <ButtonLoading3
          onClick={() => {
            cambiarEstadoInscripcion();
          }}
          text="Rechazar"
          loading={loading}
          disabled={false}
        />
      ) : (
        <span>Ya se modifico el estado</span>
      )}
    </div>
  );
};

export default EstudiantesProyecto;
