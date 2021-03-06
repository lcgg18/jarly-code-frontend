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

const GET_USUARIOS_FILTRADOS = gql`
  query Query($filtro: FiltroUsuarios) {
    Usuarios(filtro: $filtro) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const GET_ESTUDIANTE = gql`
 query Avances($rol: Enum_Rol!) {
  Estudiantes(rol: $rol) {
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
export { GET_USUARIOS, GET_USUARIO, GET_ESTUDIANTE, GET_USUARIOS_FILTRADOS };
