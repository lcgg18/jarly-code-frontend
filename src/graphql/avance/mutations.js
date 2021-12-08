import { gql } from '@apollo/client';


const CREAR_AVACE= gql`

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

export { CREAR_AVACE };