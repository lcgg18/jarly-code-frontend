import { useMutation } from "@apollo/client";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import PrivateComponent from "components/PrivateComponet";
import { CREAR_OBSERVACION } from "graphql/avance/mutations";
import useFormData from "hooks/useFormData";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CrearObservaciones = () => {
  const { _id } = useParams();

  const { form, formData, updateFormData } = useFormData(null);

  const [
    crearObservacion,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(CREAR_OBSERVACION, {
    variables: {
      id:_id
    },
  });

  const submitForm = async (e) => {
    e.preventDefault();

    await crearObservacion({
      variables: {_id, ...formData},
    });
  };

  useEffect(() => {
    if (dataMutation) {
      toast.success("Observacion modificado con exito");
    }
  }, [dataMutation]);

  useEffect(() => {
    if (errorMutation) {
      toast.error("Error modificando la observacion");
    }
  }, [errorMutation]);

  if (loadingMutation) return <div>Loading...</div>;

  return (
    <div className="flew flex-col w-full h-full items-center justify-center p-10">
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
      </div>
      <h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
        Crear Observaciones
      </h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-center justify-center"
      >
        <Input
          label="Observacion:"
          type="text"
          name="observacion"
          defaultValue={""}
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

export default CrearObservaciones;
