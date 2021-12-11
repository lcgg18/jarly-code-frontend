import { gql } from '@apollo/client';

const GET_PROYECTOS = gql`
query Proyectos {
  Proyectos {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      nombre
      apellido
      _id
      correo
    }
    
  }
}
`;

const GET_PROYECTO = gql`
query Proyecto($id: String!) {
  Proyecto(_id: $id) {
    objetivos {
      _id
      descripcion
      tipo
    }
  }
}
`;

export { GET_PROYECTOS, GET_PROYECTO}
