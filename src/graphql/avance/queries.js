import { gql } from '@apollo/client';

const GET_AVANCES = gql`

query FiltrarAvance($filtro: FiltroAvances) {
  filtrarAvance(filtro: $filtro) {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      _id
      nombre
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