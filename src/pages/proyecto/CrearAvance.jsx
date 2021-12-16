import { useMutation } from "@apollo/client";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import { useUser } from "context/userContext";
import { CREAR_AVANCE } from "graphql/avance/mutations";
import { GET_AVANCES } from "graphql/avance/queries";
import useFormData from "hooks/useFormData";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CrearAvance = ({  setOpenDialog }) => {
    const { proyecto } = useParams();
    const { userData } = useUser();
    const { form, formData, updateFormData } = useFormData();
  
    const [crearAvance, { loading }] = useMutation(CREAR_AVANCE, {
      refetchQueries: [GET_AVANCES],
    });
  
    const submitForm = (e) => {
      e.preventDefault();
        
      crearAvance({
        variables: { ...formData, proyecto ,creadoPor: userData._id },
      })
        .then(() => {
          toast.success('avance creado con exito');
          setOpenDialog(false);
        })
        .catch(() => {
          toast.error('error creando el avance');
        });
    };
    return (
      <div className='p-4'>
        <h1 className='text-2xl font-bold text-gray-900'>Crear Nuevo Avance</h1>
        <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
          <Input name='descripcion' label='Descripción' type='text' />
          <ButtonLoading
            text='Crear Avance'
            loading={loading}
            disabled={Object.keys(formData).length === 0}
          />
        </form>
      </div>
    );
  };

export default CrearAvance
