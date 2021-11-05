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
  const response = await client
    .get('/user/1')
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
    
  response.assertStatus(200)
  response.assertJSONSubset({
      username: testUser[0].username,
      email: testUser[0].email 
  })
})

test('graphql should create new user', async ({ client}) => {
  const response = await client
    .post('/signup')
    .header({
      'content-type': 'application/json'
    })
    .send(JSON.stringify({
      query: `
        mutation MutationCreateUser(
          $id: String, 
          $username: String!,
          $email: String!,
          $password: String!
          ) {
          createUser(
            id: $id,
            username: $username,
            email: $email,
            password: $password
            ){
            username
            email
          }
        }
      `,
      variables: {
        id: "2",
        username: "Yanti",
        email: "yanti@mail.com",
        password: "yanti123"
      }
    }))
    .end()

    response.assertStatus(200)
    response.assertJSONSubset({
      user: 'Yanti is created'
    })
})
