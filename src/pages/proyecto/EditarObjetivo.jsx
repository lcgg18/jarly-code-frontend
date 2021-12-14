import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';
import { Enum_TipoObjecto } from 'utils/enums';
import DropDown from 'components/DropDown';
import { EDITAR_PROYECTO } from 'graphql/proyecto/mutations';






const EditarObjetivo = () => {
    const { _id } = useParams();


    const { form, formData, updateFormData } = useFormData(null);
    


    const [editarObjetivo,{ data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(EDITAR_PROYECTO, { 
        variables:{
            editarAvanceId: _id
        }
    });
    
    const submitForm = async (e) => {
        e.preventDefault();
        await editarObjetivo({
            variables: { _id, ...formData },
        });
    };
    

    useEffect(() => {
        if (dataMutation) {
            toast.success('Avance modificado con exito');
           
        }

    }, [dataMutation]);

    useEffect(() => {
        if (errorMutation) {
            toast.error('Error modificando el avance');
        }
        
    }, [errorMutation]);

    if (loadingMutation) return <div>Loading</div>;

    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/proyectos'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Objetivo</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='flex flex-col items-center justify-center'
            >
                <DropDown
                          name='estado'
                          defaultValue={[]}
                          required={true}
                          options={Enum_TipoObjecto}
                        />
                <Input
                    label='Descripcion:'
                    type='text'
                    name='descripcion'
                    defaultValue={''}
                    required={true}
                />


                <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={loadingMutation}
                    text='Confirmar'
                />
            </form>
        </div>
    )
}

export default EditarObjetivo
