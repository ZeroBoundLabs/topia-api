import models from '../models'

// run npm test

describe('Sequelize relations', () => {
  let joe

  beforeAll(async () => {
    joe = await models.user.create({ name: 'Joe Tester' })
  })

  test('getting list of comments', async () => {
    let comments = await joe.getComments() // auto generated method by sequelize
    expect(comments.length).toBe(0) // no comments yet
  })

  test('creating new comment', async () => {
    await joe.createComment({ value: 'Some comment' }) // auto generated method by sequelize
    const comments = await joe.getComments()

    expect(comments[0].value).toBe('Some comment')
  })
})
