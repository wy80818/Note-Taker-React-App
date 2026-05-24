import { useState, useEffect } from 'react'
import './App.css'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import Settings, { THEMES } from './components/Settings'

function App() {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [sortBy, setSortBy] = useState('lastCreated')
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Apply theme when it changes
  useEffect(() => {
    const theme = THEMES[currentTheme]
    if (theme) {
      const root = document.documentElement
      Object.entries(theme.colors).forEach(([key, value]) => {
        const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        root.style.setProperty(cssVarName, value)
      })
    }
  }, [currentTheme])

  // Listen for system theme changes
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      // Only auto-update if user hasn't manually selected a theme
      const userSelectedTheme = localStorage.getItem('noteAppTheme')
      if (!userSelectedTheme) {
        setCurrentTheme(e.matches ? 'dark' : 'light')
      }
    }

    darkModeQuery.addEventListener('change', handleChange)
    return () => darkModeQuery.removeEventListener('change', handleChange)
  }, [])

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('noteAppTheme', currentTheme)
  }, [currentTheme])

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
    setIsEditing(true)
  }

  const updateNote = (id, updates) => {
    setNotes(notes.map(note =>
      note.id === id
        ? { ...note, ...updates, updatedAt: new Date().toLocaleString() }
        : note
    ))
    if (selectedNote?.id === id) {
      setSelectedNote({ ...selectedNote, ...updates })
    }
  }

  const deleteNote = (id) => {
    setDeleteConfirm(id)
  }

  const confirmDelete = () => {
    if (deleteConfirm) {
      setNotes(notes.filter(note => note.id !== deleteConfirm))
      if (selectedNote?.id === deleteConfirm) {
        setSelectedNote(null)
        setIsEditing(false)
      }
      setDeleteConfirm(null)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirm(null)
  }

  const selectNote = (note) => {
    setSelectedNote(note)
    setIsEditing(false)
  }

  const getSortedNotes = () => {
    const notesCopy = [...notes]
    if (sortBy === 'lastCreated') {
      return notesCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === 'lastUpdated') {
      return notesCopy.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    }
    return notesCopy
  }

  const sortedNotes = getSortedNotes()

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Notes</h1>
        <div className="header-actions">
          <button onClick={createNote} className="btn-create">
            New Note
          </button>
          <button 
            onClick={() => setSettingsOpen(true)} 
            className="btn-settings"
            title="Settings"
          >
            ⚙️
          </button>
        </div>
      </header>

      <div className="app-body">
        <NoteList
          notes={sortedNotes}
          selectedNote={selectedNote}
          onSelectNote={selectNote}
          onDeleteNote={deleteNote}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <NoteEditor
          note={selectedNote}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={(updates) => {
            updateNote(selectedNote.id, updates)
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>

      {deleteConfirm && (
        <ConfirmDeleteModal
          noteTitle={notes.find(note => note.id === deleteConfirm)?.title}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />
    </div>
  )
}

export default App
