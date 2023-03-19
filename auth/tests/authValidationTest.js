module.exports = (app) => {
  describe('Test Auth Validation', () => {
    describe('Empty body', () => {
      it('responds error with status code 400 because body was empty.', (done) => {
        app.post('/auth')
          .send()
          .expect(400, done)
      })
    })
    describe('Empty email and password', () => {
      it('responds error with status code 400 because email and password was empty.', (done) => {
        app.post('/auth').send({
          email: '',
          password: ''
        }).expect(400, done)
      })
    })
    describe('Empty email and correct password', () => {
      it('responds error with status code 400 because email was empty.', (done) => {
        app.post('/auth').send({
          email: '',
          password: 'Test1234'
        }).expect(400, done)
      })
    })
    describe('Correct email and empty password', () => {
      it('responds error with status code 400 because password was empty.', (done) => {
        app.post('/auth').send({
          email: 'test@test.com',
          password: ''
        }).expect(400, done)
      })
    })
    describe('Incorrect email and incorrect password', () => {
      it('responds error with status code 400 because email and password was incorrect.', (done) => {
        app.post('/auth').send({
          email: 'test.com',
          password: 'test'
        }).expect(400, done)
      })
    })
    describe('Correct email and incorrect password', () => {
      it('responds error with status code 400 because password was incorrect.', (done) => {
        app.post('/auth').send({
          email: 'test@test.com',
          password: 'test'
        }).expect(400, done)
      })
    })
    describe('Incorrect email and correct password', () => {
      it('responds error with status code 400 because email was incorrect.', (done) => {
        app.post('/auth').send({
          email: 'test.com',
          password: 'Test1234'
        }).expect(400, done)
      })
    })
    describe('Correct email and correct password', () => {
      it('responds success with status code 200.', (done) => {
        app.post('/auth').send({
          email: 'test@test.com',
          password: 'Test1234'
        }).expect(200, done)
      })
    })
  })
}
