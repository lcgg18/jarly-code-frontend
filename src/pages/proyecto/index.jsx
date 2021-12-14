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
import DropDown from "components/DropDown";



const Proyectos = () => {


  const { loading, error, data } = useQuery(GET_PROYECTOS);

  // const [EditarEstado, setEditarEstado]=useState(true);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;


  return (
    <div>
      <PrivateComponent roleList={['LIDER', 'ADMINISTRADOR']}>
        <Link to={`/proyectos/crear/`}>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-green-600 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
          >
            Crear un proyecto
          </button>
        </Link>
      </PrivateComponent>

      <div className='self-start p-3'>
        <h1 className='font-bold text-xl'>Datos del Proyecto</h1>
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
            <th>Nombre del lider</th>
            <PrivateComponent roleList={['ESTUDIANTE', 'ADMINISTRADOR']}>
              <th>Correo del lider</th>
              <th>Estudiantes</th>
              <th>Objetivos</th>
              <th>Avances</th>
              <th>Inscribirme</th>
            </PrivateComponent>
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
                  {p.fechaInicio ? (
                    <td>{p.fechaInicio.slice(0, 10)}</td>
                  ) : <td>  Por Iniciar</td>}
                  {p.fechaFin ? (
                    <td>{p.fechaFin.slice(0, 10)}</td>
                  ) : <td>  No aplica</td>}
                  <td>
                    <div className='flex'>
                      <div >
                       {/* {
                         EditarEstado ? (
                           <>
                           <DropDown
                          name='estado'
                          defaultValue={[p.estado]}
                          required={true}
                          options={Enum_EstadoProyecto}
                        />

                           </>
                        
                        ):()
                       }  */}
<span>{Enum_EstadoProyecto[p.estado]}</span>
                      </div>
                      <div className='mt-4 px-3'>
                        <i className="fas fa-pen text-blue-500 hover:text-yellow-400 cursor-pointer"
                        // onClick={setEditarEstado(!EditarEstado)}
                        />
                      </div>

                    </div>


                  </td>

                  <td>
                    <DropDown size="sm"
                      name='estado'
                      defaultValue={[p.fase]}
                      required={true}
                      options={Enum_FaseProyecto}
                    /></td>
                  <td>
                    {p.lider.nombre} {p.lider.apellido}
                  </td>
                  <PrivateComponent roleList={['ESTUDIANTE', 'ADMINISTRADOR']}>
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


                      <InscripcionProyecto
                        idProyecto={p._id}
                        estado={p.estado}
                        inscripciones={p.inscripciones}

                      />

                    </td>
                  </PrivateComponent>
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

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {

  const { userData } = useUser();
  const [estadoInscripcion, setEstadoInscripcion] = useState('');
  const [crearInscripcion, { data, loading, error }] = useMutation(CREAR_INSCRIPCION, { refetchQueries: [{ GET_INSCRIPCIONES }] });

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter((el) => el.estudiante._id === userData._id);
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  const { data: dataInscripcion } = useQuery(GET_INSCRIPCIONES, {
    variables: {
      flitro: { estudiante: userData._id }
    }
  });
  useEffect((dataInscripcion) => {
    if (dataInscripcion) {
      console.log(dataInscripcion)
    }
  }, [dataInscripcion])





  useEffect(() => {
    if (data) {
      toast.success('inscripcion creada con exito');
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('No se pudo crear la inscripcion');
    }
  }, [error]);

  const confirmarInscripcion = () => {
    crearInscripcion({ variables: { proyecto: idProyecto, estudiante: userData._id } });
  };

  return (
    <>
      {estadoInscripcion !== '' ? (
        <span>{estadoInscripcion}</span>
      ) : (
        <ButtonLoading2
          onClick={() => confirmarInscripcion()}
          disabled={estado === 'INACTIVO'}
          loading={loading}
          text='Inscribirme'
          color='blue'
        />
      )}
    </>
  );
};
export default Proyectos;
