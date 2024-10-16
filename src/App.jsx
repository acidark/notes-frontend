import './index.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
const Footer = () => {
  const footerStyle = {
  color : 'green',
  fontStyle:'italic',
  fontSize:16
}
  return (
    <div style={footerStyle}>
      <br />
      <em>Dpt of compuer sciencehelsinki</em>
    </div>
    )}

const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState('new note..')
  const [showAll,setShowAll] = useState(true)
  const [errorMessage,setErrorMessage] = useState('pollito')
  const handleNoteChange=(event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  const toggleImportanceOf = id=> {
    // console.log(`need to toggle the imporantance ${id}`)
    // const url = `http://localhost:3001/notes/${id}`
    // console.log(url)
    const note = notes.find(n=>n.id===id)
    // console.log(note)
    const changedNote = {...note,important:!note.important}
    // console.log(changedNote)
    noteService

    .update(id,changedNote)
    .then(returnedNote => {
      // console.log(returnedNote)
      setNotes(notes.map(note=>note.id != id
        ? note
        : returnedNote))
    })
    .catch(error => {
      setErrorMessage(`the note '${note.content}' was already eliminated`)
      // alert(`the note '${note.content}' was already eliminated`)
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
      setNotes(notes.filter(n => n.id != id))
    })
  }
  const hook = () => {
    // console.log('effect')
    noteService
    .getAll()
    .then(initialNotes => {
       setNotes(initialNotes)
    })
  }
 useEffect(hook,[])
  // }
  // useEffect(() =>{
  //   console.log('effect')
  //   axios
  //   .get('http://localhost:3001/notes')
  //   .then(response => {
  //     console.log('promise fulfilled')
  //     setNotes(response.data)
  //   })
  // },[])
  // console.log('render',notes.length,'notes')
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)
  // console.log(notes)
  const addNote = (event) => {
    event.preventDefault()
    // console.log('button clicked',event.target)
    const noteObject = {
      content : newNote,
      important : Math.random() < 0.5,
      id: String(notes.length+1),
    }
    
    
    noteService
    .create(noteObject)
    .then(returnedNote => {
      // console.log(response)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }
   return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
    <ul>
        {notesToShow.map(note=> <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App