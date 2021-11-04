'use strict'

const { ApolloServer } = require('apollo-server')
const { gql } = require('apollo-server-core')

const fs = require('fs')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Graph {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    const typeDefs = gql(fs.readFileSync('graph/schema.graphql', { encoding: 'utf8' }))
    const resolvers = require('../../graph/resolver')
    const graphServer = new ApolloServer(
      {
        typeDefs,
        resolvers
      }
    )    
    request.result = await graphServer.executeOperation({
      query: request.body.query,
      variables: request.body.variables
    })
    next()
  }
}

module.exports = Graph
