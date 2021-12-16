import { gql } from '@apollo/client';


const CREAR_AVANCE = gql`
  mutation Mutation(
    $fecha: Date
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      _id
    }
  }
`;

const EDITAR_AVANCE = gql`
mutation EditarAvance($editarAvanceId: String!, $descripcion: String) {
  editarAvance(id: $editarAvanceId, descripcion: $descripcion) {
    _id
  }
}

`;

const CREAR_OBSERVACION = gql` 
mutation CrearObservacion($id: String!, $observacion: String!) {
  crearObservacion(_id: $id, observacion: $observacion) {
    _id
    observaciones
  }
}
`;

export { CREAR_AVANCE, EDITAR_AVANCE, CREAR_OBSERVACION };