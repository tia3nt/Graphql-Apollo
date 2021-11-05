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
    createUser: (root, { id, username, email, password }) => {
        
        db.users.create({
            id: id,
            username: username,
            email: email,
            password: password
        })

        return db.users.get(id)
    }
}
module.exports = { Query, Mutation }
