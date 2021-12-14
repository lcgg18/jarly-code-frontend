import { gql } from "@apollo/client";

const EDITAR_PROYECTO = gql`
  mutation Mutation(
    $id: String!
    $nombre: String
    $presupuesto: Float
    $lider: String
  ) {
    editarProyecto(
      _id: $id
      nombre: $nombre
      presupuesto: $presupuesto
      lider: $lider
    ) {
      _id
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      lider: $lider
      objetivos: $objetivos
    ) {
      nombre
    }
  }
`;

const EDITAR_OBJETIVO = gql`
  mutation EditarObjetivo(
    $idProyecto: String!
    $indexObjetivo: Int!
    $campos: camposObjetivo!
  ) {
    editarObjetivo(
      idProyecto: $idProyecto
      indexObjetivo: $indexObjetivo
      campos: $campos
    ) {
      _id
    }
  }
`;

const ACTUALIZAR_ESTADO_PROYECTO = gql`
  mutation ActualizarEstadoProyecto(
    $id: String!
    $estado: Enum_EstadoProyecto
  ) {
    actualizarEstadoProyecto(_id: $id, estado: $estado) {
      _id
    }
  }
`;

const TERMINAR_PROYECTO = gql`
  mutation FinalizarProyecto(
    $id: String!,
     $fase: Enum_FaseProyecto
     ) {
    finalizarProyecto(_id: $id, fase: $fase) {
      _id
      fechaFin
      fase
    }
  }
`;

export {
  EDITAR_PROYECTO,
  CREAR_PROYECTO,
  EDITAR_OBJETIVO,
  ACTUALIZAR_ESTADO_PROYECTO,
  TERMINAR_PROYECTO,
};
