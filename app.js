const express = require('express')
const fetch = require('node-fetch')
const parser = require('xml2json')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/list', async (req, res) => {
    try {
        let xmlResult = await fetch('https://www.flickr.com/services/feeds/photos_public.gne')
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