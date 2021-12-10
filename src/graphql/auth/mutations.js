import { gql } from "@apollo/client";

const REGISTRO = gql`
  mutation Registro(
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $rol: Enum_Rol!
    $password: String!
  ) {
    registro(
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      rol: $rol
      password: $password
    ) {
      token
      error
    }
  }
`;

const LOGIN = gql`
  mutation Login($correo: String!, $password: String!) {
    login(correo: $correo, password: $password) {
      token
      error
    }
  }
`;

const EDITAR_PERFIL=gql`
mutation EditarPerfil(
  $id: String!
  $nombre: String
  $apellido: String
  $password: String
  $identificacion: String
  $correo: String
) {
  editarPerfil(
    _id: $id
    nombre: $nombre
    apellido: $apellido
    password: $password
    identificacion: $identificacion
    correo: $correo
  )
}

`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      error
    }
  }
`;

export { REGISTRO, LOGIN, REFRESH_TOKEN, EDITAR_PERFIL };
