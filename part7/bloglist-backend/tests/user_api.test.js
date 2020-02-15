const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('user creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('fails with status 400 when given a user with no password', async () => {
    const newUser = {
      name: 'binh',
      username: 'binp'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body).toEqual({ error: 'password missing' })
  })

  test('fails with status 400 when given a user with password less than 3 characters', async () => {
    const newUser = {
      name: 'binh',
      username: 'binp',
      password: 'pa'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body).toEqual({ error: 'password less than 3 characters' })
  })

  test('fails with status 400 when given a user with username less than 3', async () => {
    const newUser = {
      name: 'binh',
      username: 'bi',
      password: 'password'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body).toEqual({
      error:
        'User validation failed: username: Path `username` (`bi`) is shorter than the minimum allowed length (3).'
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
