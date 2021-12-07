import { gql } from "@apollo/client";

const GET_USUARIOS = gql`
  query Usuarios {
    Usuarios {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
  }
`;

const GET_USUARIO = gql`
  query ($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombre
      apellido
      correo
      identificacion
      rol
      estado
    }
  }
`;
const GET_ESTUDIANTE = gql`
  query Estudiantes {
    Estudiantes(rol: "ESTUDIANTE") {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
  }
`;
export { GET_USUARIOS, GET_USUARIO, GET_ESTUDIANTE };
