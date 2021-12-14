import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import Input from 'components/Input';
import { Link } from 'react-router-dom';
import DropDown from 'components/DropDown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { nanoid } from 'nanoid';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';
import { CREAR_PROYECTO } from 'graphql/proyecto/mutations';
import { Enum_TipoObjecto } from 'utils/enums';
import { toast } from 'react-toastify';
import { useUser } from 'context/userContext';

const NuevoProyecto = () => {
  const {userData} = useUser();
  const { form, formData, updateFormData } = useFormData();
  
  const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_PROYECTO);


  const submitForm = (e) => {
    e.preventDefault();
    formData.objetivos = Object.values(formData.objetivos);
    formData.presupuesto = parseFloat(formData.presupuesto);
    formData.lider = userData._id
    

    crearProyecto({
      variables: formData,
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto creado con exito');
    }
    
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error( 'Error creando el proyecto' );
    }

   
  }, [mutationError]);

  if (mutationLoading ) return <div>...Loading</div>;

  return (
    <div className='p-10 flex flex-col items-center'>
      <div className='self-start'>
        <Link to='/proyectos'>
          <i className='fas fa-arrow-left' />
        </Link>
      </div>
      <h1 className='text-2xl font-bold text-gray-900'>Crear Nuevo Proyecto</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input name='nombre' label='Nombre del Proyecto' required={true} type='text' />
        <Input name='presupuesto' label='Presupuesto del Proyecto' required={true} type='number' />
        <span>Lider del proyecto: {userData.nombre}</span>
        <Objetivos />
        <ButtonLoading text='Crear Proyecto' loading={false} disabled={false} />
      </form>
    </div>
  );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObjetivos.length > 5) {
      setMaxObjetivos(true);
    } else {
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span>Objetivos del Proyecto</span>
        {!maxObjetivos && (
          <i
            onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}
            className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
          />
        )}
        {listaObjetivos.map((objetivo) => {
          return objetivo;
        })}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div className='flex items-center'>
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label='Descripción'
        type='textarea'
        required={true}
      />
      <DropDown
        name={`nested||objetivos||${id}||tipo`}
        options={Enum_TipoObjecto}
        label='Tipo de Objetivo'
        required={true}
      />
      <i
        onClick={() => eliminarObjetivo(id)}
        className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6'
      />
    </div>
  );
};

export default NuevoProyecto;
