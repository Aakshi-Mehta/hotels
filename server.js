const express = require('express')
const app = express()
const db=require('./db');
const port = 3000

const bodyParser=require('body-parser');
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const personRoutes=require('./routes/personRoutes')
app.use('/person',personRoutes);

const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})