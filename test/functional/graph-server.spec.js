'use strict'

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
