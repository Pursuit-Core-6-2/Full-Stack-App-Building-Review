const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 3000;

// Routers
const vegetableRouter = require('./routes/vegetableRouter')

// App level middleware
app.use(express.urlencoded({ // Body parser for urlencoded formatted data built into express
  extended: true
}))

// Parse request bodies coming with a JSON format
app.use(express.json())

app.use(cors())

// Main routes
app.use('/inventory/vegetables', vegetableRouter)

app.get('/inventory', (req, res, next) => {
  res.send('This is /inventory')
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
