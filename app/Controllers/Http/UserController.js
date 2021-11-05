'use strict'

const { responsePathAsArray } = require("graphql")

class UserController {
    async login ({ request }) {
        return request.result.data
    }
    async byID ({ request }) {
        const user = request.result.data.user
        return {
            username: user.username,
            email: user.email
        }
    }
    async store ({ request }) {

        let message = ''
        const user = request.result.data.createUser
        !user
        ? message= 'not created'
        : message = 'is created'

        return {
            user: `${user.username} ${message}`
        }
    }
    async deleteID ({ request }) {
        let message = ''
        const user = request.result.data.deleteUser
        !user ? message = 'no user deleted' : message = 'is deleted'

        return {
            user: `${user.username} ${message}`
        }
    }
    async updateID ({ request }) {
        let message = ''
        const user = request.result.data.updateUser

        !user ? message = 'no data updated' : message = 'has updated'
        return {
            user: `${user.id} ${message}`
        }
    }
}

module.exports = UserController
