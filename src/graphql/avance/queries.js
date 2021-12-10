import { gql } from '@apollo/client';

const GET_AVANCES = gql`

query FiltrarAvance($idProyecto: String!) {
  filtrarAvance(idProyecto: $idProyecto) {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      nombre
      _id
    }
    creadoPor {
      nombre
      apellido
      estado
    }
  }
}
  `;


export { GET_AVANCES}