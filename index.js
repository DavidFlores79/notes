const data = [
    {
        id: 1,
        content: "Nota numero 1 modificada",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Nota numero 2",
        date: "2022-05-30T17:59:20.098Z",
        important: true
    },
    {
        id: 3,
        content: "Nota numero 3",
        date: "2022-05-30T18:03:31.098Z",
        important: true
    },
    {
        id: 4,
        content: "Nota numero 4",
        date: "2022-05-30T23:30:31.098Z",
        important: false
    },
]

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

// respond with "hello world" when a GET request is made to the homepage
app.get('/api/notes', (req, res) => {
  res.json(data)
})
app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = data.find( note => note.id == id)
    console.log(note);
    res.send(note)
})

app.post('/api/notes', (req, res) => {
    const note = req.body

    note.id = Math.max(... data.map(note => note.id)) + 1
    note.important = ( typeof note.important != 'undefined' ) ? note.important : false
    note.date = new Date()

    data.push(note)
    res.json(data)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server escuchando en el puerto ${PORT}.`);
})
