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

export { EDITAR_PROYECTO, CREAR_PROYECTO,EDITAR_OBJETIVO };
