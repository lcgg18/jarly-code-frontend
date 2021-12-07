import { gql } from '@apollo/client';

const GET_AVANCES = gql`


query Avances {
    Avances {
      _id
      fecha
      descripcion
      observaciones
      proyecto {
        nombre
      }
      creadoPor {
        nombre
        apellido
        estado
      }
    }
  }`;


export { GET_AVANCES}