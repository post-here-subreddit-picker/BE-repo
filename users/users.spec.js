const server = require('../api/server')
const request = require('supertest')
const db = require('../data/dbConfig')
const supertest = require("supertest")
// const jesta = require("jest")

beforeEach(() => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
})

describe('Register User', () => {
    it('Post /api/auth/register', async () => {
        const res = await request(server)
            .post("/api/auth/register")
            .send({ username: "coltyn4", password: "pass4" })
        expect(res.status).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.username).toBe("coltyn4")
        expect(res.charset).toBe("utf-8")
        expect(res.body.id).toBeLessThan(500)
        expect(res.header).toBeDefined()
        expect(res.forbidden).toBe(false)
    })
}),

describe('Login User', () => {
    it('Post /api/auth/login', async () => {
        const register = await request(server)
            .post("/api/auth/register")
            .send({ username: "coltyn5", password: "pass5" })
                .then(async () => {
                    const res = await request(server)
                    .post('/api/auth/login')
                    .send({ username: "coltyn5", password: "pass5" })
                    expect(res.status).toBe(500)
                    expect(res.type).toBe('application/json')
                })
            })
})


describe('delete user', () => {
    it('Delete /api/users/1', async () => {
        const register = await request(server)
            .post("/api/auth/register")
            .send({ username: "coltyn6", password: "pass6" })
                .then(async () => {
                    const res = await request(server)
                    .post('/api/users/1')
                    expect(res.status).toBe(404)
                    expect(res.type).toBe('text/html')
                })
            })
})

// describe('get /:id/subreddit', () => {
//     it('Get /api/posts/1/subreddit', async () => {
//         // const register = await request(server)
//         //     .post("/api/auth/register")
//         //     .send({ username: "coltyn7", password: "pass7" })
//         //     .set('athorization', register.body.token)
//         //     console.log(res.status)
//         const get = await request(server)
//             .get("/api/posts/1/")
//              console.log(res.status)
//             })
// })

