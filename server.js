const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const passport = require('passport')
const path = require('path')

// routes
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const jobs = require('./routes/api/jobs')

const app = express()

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// connect to MongoDB
const db = require('./config/keys').mongoURI
mongoose
    .connect(db,  { useNewUrlParser: true })
    .then(()=> { console.log('Mongo DB connected') })
    .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport Config 
require('./config/passport')(passport)

// Use Routes
app.use('/api/users/', users)
app.use('/api/profile/', profile)
app.use('/api/posts/', posts)
app.use('/api/jobs/', jobs)

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})