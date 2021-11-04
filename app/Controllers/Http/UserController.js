'use strict'

class UserController {
    async login ({ request }) {
        return request.result.data
    }
}

module.exports = UserController
