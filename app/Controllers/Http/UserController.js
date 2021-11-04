'use strict'

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
}

module.exports = UserController
