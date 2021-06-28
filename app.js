const express = require('express')
const fetch = require('node-fetch')
const parser = require('xml2json')

const app = express()

app.get('/', (req, res) => {
    res.send('Yo! This should not the endpoint you are looking for :)')
})

app.get('/flickr-photos-feed', async ({ query }, res) => {
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

module.exports = app