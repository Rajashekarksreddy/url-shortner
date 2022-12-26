const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const route = require('./route');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://jaganreddy-functionup:ORj2ygJHT7jbS3y8@cluster0.nduth.mongodb.net/url-shortner?retryWrites=true&w=majority', {
    useNewUrlParser:true
})

.then(console.log('db connect'))
.catch(err => console.log(err))

app.use('/', route);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Example app running on port ${port}`)
})

