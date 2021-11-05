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
    },

    updateUser: (root, { input, id }) => {

        let toEdit = db.users.get(id)
        let data = {}
        !input.username ? data.username = toEdit.username : data.username = input.username
        !input.email ? data.email = toEdit.email : data.email = input.email
        !input.password ? data.password = toEdit.password : data.password = input.password

        db.users.update({
            id: id,
            username: data.username,
            email: data.email,
            password: data.password
        })
    
        return db.users.get(id)
    }
}
module.exports = { Query, Mutation }
