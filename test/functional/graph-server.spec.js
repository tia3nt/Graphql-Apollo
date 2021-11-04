'use strict'

const testUser = require('../../data/user.json')
const { test, trait } = use('Test/Suite')('Graph Server')

trait('Test/ApiClient')

test('make sure graphql server running when /login is posted', async ({ client }) => {
  const response = await client
    .post('/login')
    .header({'content-type': 'application/json'})
    .send(
      JSON.stringify({
        query: `query { server }`
      })
    )
    .end()

  response.assertStatus(200)
  response.assertJSONSubset(
    {
      server: 'Graphql Server running successfully'
    }
  )
})

test('graph Server should return specific user information', async ({ client }) => {
  const id = 1
  const response = await client
    .get(`/user/${ id }`)
    .header({
      'content-type': 'application/json'
    })
    .send(JSON.stringify({
      query: `
        query User($id: String!) {
          user(id: $id) {
            username
            email
          }
        }`
    }))
    .end()
    
  console.log('error', response.error)
  response.assertStatus(200)
  response.assertJSONSubset({
      username: testUser[0].username,
      email: testUser[0].email 
  })
})
