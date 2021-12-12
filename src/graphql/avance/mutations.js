import { gql } from '@apollo/client';


const CREAR_AVANCE= gql`

mutation CrearAvance($descripcion: String!, $proyecto: String!, $creadoPor: String!, $id: String!, $fase: Enum_FaseProyecto) {
  crearAvance(descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
    fecha
    _id
  }
  editarProyecto(_id: $id, fase: $fase) {
    fase
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

export { CREAR_AVANCE, EDITAR_AVANCE };