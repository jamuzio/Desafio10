import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

import {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
} from '../GraphQL/Controllers/productosController_GQL.js'

const schema = buildSchema(`  
  input ProductoInput {
    nombre: String!
    precio: Int!
    imagen: String!
  }

  input ProductoUpdate {
    precio: Int
    imagen: String
  }

  type Producto {
    id: ID!
    nombre: String
    precio: Int
    imagen: String
  }

  type ResOP {
    OK: Boolean
  }

  type Query {
    getProducto(id: ID!): Producto
    getProductos(datos: String): [Producto]
  }
  
  type Mutation {
    createProducto(datos: ProductoInput!): Producto
    updateProducto(id: ID!, datos: ProductoUpdate!): Producto
    deleteProducto(id: ID!): ResOP
  }
`)

export const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto,
  },
  graphiql: true,
})

// const schema = buildSchema(`
//   input PersonaInput {
//     nombre: String
//     edad: Int
//   }
//   type Persona {
//     id: ID!
//     nombre: String
//     edad: Int
//   }
//   type Query {
//     getPersona(id: ID!): Persona
//     getPersonas(campo: String, valor: String): [Persona]
//   }
//   type Mutation {
//     createPersona(datos: PersonaInput!): Persona
//     updatePersona(id: ID!, datos: PersonaInput!): Persona
//     deletePersona(id: ID!): Persona
//   }
// `)