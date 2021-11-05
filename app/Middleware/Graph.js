'use strict'

const { ApolloServer } = require('apollo-server')
const { gql } = require('apollo-server-core')

const fs = require('fs')
const { IncomingMessage } = require('http')

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
    const methode = request.method
    request.method = 'POST'
    const typeDefs = gql(fs.readFileSync('graph/schema.graphql', { encoding: 'utf8' }))
    const resolvers = require('../../graph/resolver')
    
    const graphServer = new ApolloServer(
      {
        typeDefs,
        resolvers
      }
    )    
    
    let variables = {...request.body.variables, ...request.params}
    
      request.result = await graphServer.executeOperation({
      query: request.body.query,
      variables: variables
    })
  
    request.method = methode
    next()
  }
}

module.exports = Graph
