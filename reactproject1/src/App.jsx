import { useState, useEffect } from 'react'
import './App.css'
import NoteList from './components/NoteList'
import NoteEditorModal from './components/NoteEditorModal'
import Settings, { THEMES } from './components/Settings'
import Login from './components/Login'
import { getCurrentUser, setCurrentUser, logout as authLogout } from './utils/auth'

function App() {
    const [currentUser, setCurrentUserState] = useState(() => getCurrentUser())
    const [notes, setNotes] = useState(() => {
        const user = getCurrentUser()
        if (user) {
            const userNotes = localStorage.getItem(`noteAppNotes_${user.username}`)
            return userNotes ? JSON.parse(userNotes) : []
        }
        return []
    })
    const [selectedNote, setSelectedNote] = useState(null)
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const [currentTheme, setCurrentTheme] = useState(() => {
        // Detect system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return 'light'
    })
    const [settingsOpen, setSettingsOpen] = useState(false)

    // Save notes whenever they change
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`noteAppNotes_${currentUser.username}`, JSON.stringify(notes))
        }
    }, [notes, currentUser])

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
            id: null, // No ID until saved
            title: '',
            content: '',
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        }
        setSelectedNote(newNote)
        setIsEditorOpen(true)
    }

    const handleSaveNote = (updates) => {
        if (selectedNote.id === null) {
            // New note - create it
            const newNote = {
                id: Date.now(),
                ...updates,
                createdAt: new Date().toLocaleString(),
                updatedAt: new Date().toLocaleString(),
            }
            setNotes([newNote, ...notes])
            setSelectedNote(newNote)
        } else {
            // Existing note - update it
            const updatedNote = {
                ...selectedNote,
                ...updates,
                updatedAt: new Date().toLocaleString(),
            }
            setNotes(notes.map(note =>
                note.id === selectedNote.id ? updatedNote : note
            ))
            setSelectedNote(updatedNote)
        }
        setIsEditorOpen(false)
    }

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id))
        if (selectedNote?.id === id) {
            setSelectedNote(null)
            setIsEditorOpen(false)
        }
    }

    const selectNote = (note) => {
        setSelectedNote(note)
        setIsEditorOpen(true)
    }

    const handleEditorCancel = () => {
        setIsEditorOpen(false)
    }

    const getSortedNotes = () => {
        return [...notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    }

    const sortedNotes = getSortedNotes()

    // Handle login
    const handleLogin = (user) => {
        setCurrentUserState(user)
        setCurrentUser(user)
        // Load user's saved notes
        const userNotes = localStorage.getItem(`noteAppNotes_${user.username}`)
        setNotes(userNotes ? JSON.parse(userNotes) : [])
        setSelectedNote(null)
        setIsEditorOpen(false)
    }

    // Handle logout
    const handleLogout = () => {
        authLogout()
        setCurrentUserState(null)
        setNotes([])
        setSelectedNote(null)
        setIsEditorOpen(false)
    }

    // Show login page if not authenticated
    if (!currentUser) {
        return <Login onLoginSuccess={handleLogin} />
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-left">
                    <h1>📝 My Notes</h1>
                    <span className="user-info">Welcome, {currentUser.username}!</span>
                </div>
                <div className="header-actions">
                    <button onClick={createNote} className="btn-create">
                        + New Note
                    </button>
                    <button
                        onClick={() => setSettingsOpen(true)}
                        className="btn-settings"
                        title="Settings"
                    >
                        ⚙️
                    </button>
                    <button
                        onClick={handleLogout}
                        className="btn-logout"
                        title="Logout"
                    >
                        🚪 Logout
                    </button>
                </div>
            </header>

            <div className="app-body">
                <NoteList
                    notes={sortedNotes}
                    onSelectNote={selectNote}
                    onDeleteNote={deleteNote}
                />
            </div>

            <NoteEditorModal
                isOpen={isEditorOpen}
                note={selectedNote}
                onSave={handleSaveNote}
                onCancel={handleEditorCancel}
                onDelete={deleteNote}
            />

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
