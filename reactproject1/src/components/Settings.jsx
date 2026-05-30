import '../styles/Settings.css'

const THEMES = {
  light: {
    name: 'Light',
    category: 'light',
    colors: {
      primaryColor: '#6366f1',
      primaryDark: '#4f46e5',
      dangerColor: '#ef4444',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      borderColor: '#e5e7eb',
      bgLight: '#f9fafb',
      bgWhite: '#ffffff',
    }
  },
  dark: {
    name: 'Dark',
    category: 'dark',
    colors: {
      primaryColor: '#818cf8',
      primaryDark: '#6366f1',
      dangerColor: '#f87171',
      textPrimary: '#f3f4f6',
      textSecondary: '#d1d5db',
      borderColor: '#374151',
      bgLight: '#1f2937',
      bgWhite: '#111827',
    }
  },
}

function Settings({ isOpen, onClose, currentTheme, onThemeChange }) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="settings-backdrop" onClick={onClose} />

      {/* Settings Modal */}
      <div className="settings-modal">
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>🌓 Theme</h3>
            <div className="theme-toggle-container">
              <div className="theme-toggle">
                <button
                  className={`theme-toggle-btn ${currentTheme === 'light' ? 'active' : ''}`}
                  onClick={() => onThemeChange('light')}
                  title="Light Theme"
                >
                  ☀️ Light
                </button>
                <button
                  className={`theme-toggle-btn ${currentTheme === 'dark' ? 'active' : ''}`}
                  onClick={() => onThemeChange('dark')}
                  title="Dark Theme"
                >
                  🌙 Dark
                </button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Preview</h3>
            <div className="theme-info">
              {THEMES[currentTheme] && (
                <div>
                  <p><strong>Theme:</strong> {THEMES[currentTheme].name}</p>
                  <div className="color-swatches">
                    {Object.entries(THEMES[currentTheme].colors).map(([key, color]) => (
                      <div key={key} className="color-swatch" title={key}>
                        <div
                          className="color-box"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { THEMES }
export default Settings
