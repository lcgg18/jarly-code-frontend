import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import useFormData from "hooks/useFormData";
import Input from "components/Input";
import { toast } from "react-toastify";
import ButtonLoading from "components/ButtonLoading";
import { EDITAR_PERFIL } from "graphql/auth/mutations";
import { useUser } from "context/userContext";

const EditarPerfil = () => {
  const { userData } = useUser();

  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const [
    editUser,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(EDITAR_PERFIL, {
    variables: { id: _id },
  });

  useEffect(
    (dataMutation) => {
      console.log(dataMutation);
    },
    [dataMutation]
  );

  const submitForm = async (e) => {
    e.preventDefault();
    delete formData.rol;
    await editUser({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (dataMutation) {
      toast.success("Usuario modificado con exito");
    }
  }, [dataMutation]);

  useEffect(() => {
    if (errorMutation) {
      toast.error("Error modificando el usuario");
    }
  }, [errorMutation]);

  return (
    <div className="flew flex-col w-full h-full items-center justify-center p-10">
      <Link to="/perfil">
        <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
        Actualizar Perfil
      </h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-center justify-center"
      >
        <Input
          label="Nombre de la persona:"
          type="text"
          name="nombre"
          defaultValue={userData.nombre}
          required={true}
        />
        <Input
          label="Apellido de la persona:"
          type="text"
          name="apellido"
          defaultValue={userData.apellido}
          required={true}
        />
        <Input
          label="Correo de la persona:"
          type="email"
          name="correo"
          defaultValue={userData.correo}
          required={true}
        />
        <Input
          label="Identificación de la persona:"
          type="text"
          name="identificacion"
          defaultValue={userData.identificacion}
          required={true}
        />
        <Input
          label="Nueva Contraseña:"
          type="text"
          name="password"
          defaultValue={userData.identificacion}
          required={true}
        />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={loadingMutation}
          text="Confirmar"
        />
      </form>
    </div>
  );
};

export default EditarPerfil;
