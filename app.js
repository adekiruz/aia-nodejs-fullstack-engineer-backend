const express = require('express')
const fetch = require('node-fetch')
const parser = require('xml2json')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/t', (req, res) => {
    console.log(req)
    res.send("hola")
})

app.get('/list', async ({ query }, res) => {
    let feedURL = new URL('https://www.flickr.com/services/feeds/photos_public.gne')
    if ('tags' in query) {
        feedURL.searchParams.append('tags', query.tags)
    }
    
    try {
        let xmlResult = await fetch(feedURL.href)
            .then(res => res.text())

        let json = parser.toJson(xmlResult, {
            object: true,
        })

        res.send(json)
    } catch (e) {
        console.log('=== error', e)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})