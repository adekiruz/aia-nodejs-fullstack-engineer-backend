const request = require('supertest')
const app = require('../app')

describe('Get Endpoints', () => {
    it('GET without tags query string', async () => {
        const res = await request(app)
            .get('/flickr-photos-feed')
            
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('feed.entry')
    })
    
    it('GET with tags query string', async () => {
        const res = await request(app)
            .get('/flickr-photos-feed')
            .query({
                tags: 'anime'
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('feed.entry')
        expect(res.body.feed.title).toContain('anime')
    })

    it('GET with weird tags query string', async () => {
        const res = await request(app)
            .get('/flickr-photos-feed')
            .query({
                tags: 'w6PugXuEK76pZmg^uvC='
            })
            
        expect(res.statusCode).toEqual(200)
        expect(res.body).not.toHaveProperty('feed.entry')
    })
})
