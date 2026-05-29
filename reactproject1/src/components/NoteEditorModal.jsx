import { useState, useEffect, useRef } from 'react'
import '../styles/NoteEditorModal.css'

function NoteEditorModal({ isOpen, note, onSave, onCancel, onDelete }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isNew, setIsNew] = useState(true)
    const lastNoteIdRef = useRef(null)
    const lastOpenStateRef = useRef(false)

    // Update form when note changes or modal opens
    useEffect(() => {
        if (isOpen && note) {
            // If the note ID changed OR the modal just opened (was closed before)
            if (lastNoteIdRef.current !== note.id || !lastOpenStateRef.current) {
                setTitle(note.title || '')
                setContent(note.content || '')
                setIsNew(!note.id)
                lastNoteIdRef.current = note.id
            }
        }
        lastOpenStateRef.current = isOpen
    }, [isOpen, note?.id])

    if (!isOpen || !note) return null

    // Calculate modal size based on content
    const totalLength = title.length + content.length
    let modalSizeClass = 'modal--sm'
    if (totalLength > 1000) {
        modalSizeClass = 'modal--xl'
    } else if (totalLength > 500) {
        modalSizeClass = 'modal--lg'
    } else if (totalLength > 200) {
        modalSizeClass = 'modal--md'
    }

    const handleSave = () => {
        if (!title.trim() && !content.trim()) {
            alert('Please add some content to your note')
            return
        }

        onSave({
            title: title.trim() || 'Untitled Note',
            content: content.trim(),
        })
        // Reset state after save
        setTitle('')
        setContent('')
        setIsNew(true)
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete(note.id)
            // Reset state after delete
            setTitle('')
            setContent('')
            setIsNew(true)
        }
    }

    const handleCancel = () => {
        // Reset state when closing
        setTitle('')
        setContent('')
        setIsNew(true)
        onCancel()
    }

    return (
        <>
            {/* Backdrop */}
            <div className="modal-backdrop" onClick={handleCancel} />

            {/* Modal */}
            <div className={`note-editor-modal ${modalSizeClass}`}>
                <div className="modal-header">
                    <input
                        type="text"
                        className="modal-title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note title..."
                        autoFocus
                    />
                    <div className="modal-actions">
                        <button className="btn-modal-save" onClick={handleSave}>
                            ✅ Save
                        </button>
                        {!isNew && (
                            <button className="btn-modal-delete" onClick={handleDelete}>
                                🗑️ Delete
                            </button>
                        )}
                        <button className="btn-modal-cancel" onClick={handleCancel}>
                            ❌ Close
                        </button>
                    </div>
                </div>

                <textarea
                    className="modal-content-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start typing your note..."
                />

                <div className="modal-footer">
                    <small>
                        {isNew ? 'New note' : `Last updated: ${new Date(note.updatedAt).toLocaleString()}`}
                    </small>
                </div>
            </div>
        </>
    )
}

export default NoteEditorModal
