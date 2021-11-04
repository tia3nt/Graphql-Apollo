'use strict'

const db = require('../db')

const Query = {
    users : () => db.users.list(),

    user : (root, args) => {
        console.log('resolve2', args.id)
       return db.users.get(args.id)
    },

    server : () => `Graphql Server running successfully`
}
module.exports = { Query }
