import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
  mutation Mutation($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      _id
      estado
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
  $nombre: String!
  $presupuesto: Float!
  $lider: String!
  $objetivos: [crearObjetivo]
) {
  crearProyecto(
    nombre: $nombre
    presupuesto: $presupuesto
    lider: $lider
    objetivos: $objetivos
  ) {
    nombre
  }
}
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO };
