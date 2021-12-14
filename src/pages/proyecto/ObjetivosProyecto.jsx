import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROYECTO } from "graphql/proyecto/queries";
import { Link, useParams } from "react-router-dom";
import { Enum_TipoObjecto } from "utils/enums";
import { Dialog } from "@material-ui/core";
import useFormData from "hooks/useFormData";
import { EDITAR_OBJETIVO } from "graphql/proyecto/mutations";
import { GET_PROYECTOS } from "graphql/proyecto/queries";
import { toast } from "react-toastify";
import DropDown from "components/DropDown";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";

const ObjetivosProyecto = () => {
  const { _id } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const { loading, error, data } = useQuery(GET_PROYECTO, {
    variables: { id: _id },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <>
      <div className="p-5">
        <div className="self-start p-3">
          <Link to="/proyectos">
            <i className="fas fa-arrow-left" />
          </Link>
          <h1 className="font-bold text-xl">Objetivos del Proyecto</h1>
        </div>

        <table className="tabla">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.Proyecto.objetivos.map((objetivo, index) => {
                return (
                  <tr key={index}>
                    <td>{objetivo.descripcion}</td>
                    <td>{Enum_TipoObjecto[objetivo.tipo]}</td>
                    <td>
                      <i
                        className="fas fa-pen text-blue-500 hover:text-yellow-400 cursor-pointer"
                        onClick={() => {
                          setShowDialog(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
{data && data.Proyecto.objetivos.map((objetivo, index) => {
      return(
       <InfoObjetivos
        key={index}
        index={index}
        idProyecto={_id}
        descripcion={objetivo.descripcion}
        tipo={objetivo.tipo}
        setShowEditDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
)})}
      </div>
      
      
    </>
  );
};

const InfoObjetivos = ({
  descripcion,
  tipo,
  index,
  idProyecto,
  showDialog,
  setShowDialog,
}) => {
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <EditarObjetivo
          index={index}
          idProyecto={idProyecto}
          descripcion={descripcion}
          tipo={tipo}
          showDialog={showDialog}
        />
      </Dialog>
    </div>
  );
};

const EditarObjetivo = ({
  descripcion,
  tipo,
  index,
  idProyecto,
  setShowEditDialog,
}) => {
  const { form, formData, updateFormData } = useFormData();

  const [editarObjetivo, { data: dataMutation, loading }] = useMutation(
    EDITAR_OBJETIVO,
    {
      refetchQueries: [{ query: GET_PROYECTOS }],
    }
  );

  useEffect(() => {
    if (dataMutation) {
      toast.success("Objetivo editado con exito");
    }
  }, [dataMutation, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    editarObjetivo({
      variables: {
        idProyecto,
        indexObjetivo: index,
        campos: formData,
      },
    }).catch((error) => {
      toast.error("Error editando el objetivo", error);
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900">Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label="Tipo de Objetivo"
          name="tipo"
          required={true}
          options={Enum_TipoObjecto}
          defaultValue={tipo}
        />
        <Input
          label="Descripcion del objetivo"
          name="descripcion"
          required={true}
          defaultValue={descripcion}
        />
        <ButtonLoading
          text="Confirmar"
          disabled={Object.keys(formData).length === 0}
          loading={loading}
        />
      </form>
    </div>
  );
};

export default ObjetivosProyecto;
