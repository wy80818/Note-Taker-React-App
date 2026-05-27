function ConfirmDeleteModal({ noteTitle, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Delete Note?</h2>
                <p>Are you sure you want to delete "<strong>{noteTitle}</strong>"?</p>
                <p className="modal-warning">This action cannot be undone.</p>
                <div className="modal-actions">
                    <button onClick={onCancel} className="btn-modal-cancel">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="btn-modal-delete">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal
