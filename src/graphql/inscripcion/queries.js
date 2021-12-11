import { gql } from '@apollo/client';


const GET_INSCRIPCIONES= gql`
query InscripcionesFiltradas($filtro: FiltrarInscripciones) {
  InscripcionesFiltradas(filtro: $filtro) {
    _id
    estado
    estudiante {
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
  }
}
`;

export {GET_INSCRIPCIONES}