import React, { useEffect } from 'react'
import { GET_INSCRIPCIONES } from 'graphql/inscripcion/queries';
import { useMutation, useQuery } from '@apollo/client';
import { Enum_Rol } from 'utils/enums';
import { Link, useParams } from 'react-router-dom';
import { APROBAR_INSCRIPCION } from 'graphql/inscripcion/mutations';
import { toast } from 'react-toastify';
import ButtonLoading2 from 'components/ButtonLoading2';
import { Enum_EstadoInscripcion } from 'utils/enums';

const EstudiantesProyecto = () => {

    const {_id} = useParams();
    const { loading, error, data } = useQuery(GET_INSCRIPCIONES,{
        variables:{ 
            filtro:{ proyecto : _id

        }}
    });

    

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error...</div>;

    return (
        <div>
            <div className='self-start p-3'>
        <Link to='/proyectos'>
          <i className='fas fa-arrow-left' />
        </Link>
        <h1 className='font-bold text-xl'>Estudiantes Inscrito</h1>
      </div>
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Identificación</th>
            <th>Rol</th>
            <th>Estado Inscripción</th>
            <th>Aceptar</th>
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
                  <td>{Enum_EstadoInscripcion[i.estado]}</td>
                  <td>
                    <Inscripcion  />
                  </td>
                  <td>
                    <Link to={`/usuarios/editar/${i._id}`}>
                      <i className='fas fa-ban text-red-500 hover:text-red-800 cursor-pointer' />
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

const Inscripcion = () => {
  const {_id} = useParams();
    const {  data:qdata } = useQuery(GET_INSCRIPCIONES,{
        variables:{ 
            filtro:{ proyecto : _id

        }}
    });
  const [aprobarInscripcion, { data, loading, error }] = useMutation(APROBAR_INSCRIPCION);

  useEffect(() => {
    if (data) {
      toast.success('Inscripcion aprobada con exito');

    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error aprobando la inscripcion');
    }
  }, [error]);

  const cambiarEstadoInscripcion = () => {
    aprobarInscripcion({
      variables: {
        aprobarInscripcionId : _id,
      },
    });
  };


  return (
    <>

      {(qdata.InscripcionesFiltradas.estado !== 'PENDIENTE') ? (
        <ButtonLoading2
          onClick={() => {
            cambiarEstadoInscripcion();
          }}
          text='Aprobar'
          loading={loading}
          disabled={false}
        />
      ):( <span>agf</span> )}
    </>
  );
};


export default EstudiantesProyecto
