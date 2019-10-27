const express = require('express');

const app = express();
const PORT = 3000;

// Routers
const vegetableRouter = require('./routes/vegetableRouter')

// Main routes
app.use('/inventory/vegetables', vegetableRouter)

app.get('/inventory', (req, res, next) => {
  res.send('This is /inventory')
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
