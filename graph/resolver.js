'use strict'

const { responsePathAsArray } = require('graphql')
const db = require('../db')

const Query = {
    users : () => db.users.list(),

    user : (root, { id }) => {
        return db.users.get(id)
    },

    server : () => {
        return `Graphql Server running successfully`
    },
}

const Mutation = {
    createUser: (root, { input }) => {
        db.users.create({
            id: input.id,
            username: input.username,
            email: input.email,
            password: input.password
        })
       
        return db.users.get(input.id)
    },

    deleteUser: (root, { id }) => {
        let toDelete = db.users.get(id)
        db.users.delete(id)
        
        return toDelete
    }
}
module.exports = { Query, Mutation }
