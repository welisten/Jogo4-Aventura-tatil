const express = require('express')
const cors =  require("cors")


const app = express()


app.use(cors())

app.use(express.static('./src'))

app.listen(4040, () => console.log('server running on port 4040'))

