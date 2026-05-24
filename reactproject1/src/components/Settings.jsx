import '../styles/Settings.css'

const THEMES = {
  light: {
    name: 'Light',
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
  ocean: {
    name: 'Ocean',
    colors: {
      primaryColor: '#0ea5e9',
      primaryDark: '#0284c7',
      dangerColor: '#f97316',
      textPrimary: '#0c2340',
      textSecondary: '#334155',
      borderColor: '#bae6fd',
      bgLight: '#e0f2fe',
      bgWhite: '#f0f9ff',
    }
  },
  forest: {
    name: 'Forest',
    colors: {
      primaryColor: '#10b981',
      primaryDark: '#059669',
      dangerColor: '#dc2626',
      textPrimary: '#064e3b',
      textSecondary: '#047857',
      borderColor: '#a7f3d0',
      bgLight: '#ecfdf5',
      bgWhite: '#f0fdf4',
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primaryColor: '#f97316',
      primaryDark: '#ea580c',
      dangerColor: '#dc2626',
      textPrimary: '#7c2d12',
      textSecondary: '#92400e',
      borderColor: '#fed7aa',
      bgLight: '#fef3c7',
      bgWhite: '#fefce8',
    }
  },
  lavender: {
    name: 'Lavender',
    colors: {
      primaryColor: '#a855f7',
      primaryDark: '#9333ea',
      dangerColor: '#ec4899',
      textPrimary: '#3f0f5c',
      textSecondary: '#6b21a8',
      borderColor: '#e9d5ff',
      bgLight: '#f3e8ff',
      bgWhite: '#faf5ff',
    }
  },
  mint: {
    name: 'Mint',
    colors: {
      primaryColor: '#14b8a6',
      primaryDark: '#0d9488',
      dangerColor: '#f43f5e',
      textPrimary: '#0d3331',
      textSecondary: '#14534d',
      borderColor: '#99f6e4',
      bgLight: '#f0fdfa',
      bgWhite: '#f7fffd',
    }
  },
  rose: {
    name: 'Rose',
    colors: {
      primaryColor: '#fb7185',
      primaryDark: '#f43f5e',
      dangerColor: '#dc2626',
      textPrimary: '#4c0519',
      textSecondary: '#831843',
      borderColor: '#fbcfe8',
      bgLight: '#ffe4e6',
      bgWhite: '#fff7ed',
    }
  },
  amber: {
    name: 'Amber',
    colors: {
      primaryColor: '#f59e0b',
      primaryDark: '#d97706',
      dangerColor: '#dc2626',
      textPrimary: '#5a2e0f',
      textSecondary: '#92400e',
      borderColor: '#fde68a',
      bgLight: '#fffbeb',
      bgWhite: '#fffaec',
    }
  },
  slate: {
    name: 'Slate',
    colors: {
      primaryColor: '#64748b',
      primaryDark: '#475569',
      dangerColor: '#ef4444',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      borderColor: '#cbd5e1',
      bgLight: '#f1f5f9',
      bgWhite: '#f8fafc',
    }
  },
  fuchsia: {
    name: 'Fuchsia',
    colors: {
      primaryColor: '#d946ef',
      primaryDark: '#c026d3',
      dangerColor: '#f43f5e',
      textPrimary: '#4a044e',
      textSecondary: '#831843',
      borderColor: '#f0d9ff',
      bgLight: '#fdf4ff',
      bgWhite: '#fefafb',
    }
  },
  cyan: {
    name: 'Cyan',
    colors: {
      primaryColor: '#06b6d4',
      primaryDark: '#0891b2',
      dangerColor: '#ef4444',
      textPrimary: '#082f49',
      textSecondary: '#164e63',
      borderColor: '#a5f3fc',
      bgLight: '#ecf8ff',
      bgWhite: '#f0f9ff',
    }
  },
  midnight: {
    name: 'Midnight',
    colors: {
      primaryColor: '#3b82f6',
      primaryDark: '#1d4ed8',
      dangerColor: '#ff6b6b',
      textPrimary: '#eff6ff',
      textSecondary: '#bfdbfe',
      borderColor: '#1e3a8a',
      bgLight: '#0f172a',
      bgWhite: '#020617',
    }
  }
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
            <h3>Theme</h3>
            <div className="theme-grid">
              {Object.entries(THEMES).map(([key, theme]) => (
                <button
                  key={key}
                  className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                  onClick={() => {
                    onThemeChange(key)
                  }}
                  title={theme.name}
                >
                  <div className="theme-preview">
                    <div
                      className="theme-color-primary"
                      style={{ backgroundColor: theme.colors.primaryColor }}
                    />
                    <div
                      className="theme-color-bg"
                      style={{ backgroundColor: theme.colors.bgWhite }}
                    />
                  </div>
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h3>Preview</h3>
            <div className="theme-info">
              {THEMES[currentTheme] && (
                <div>
                  <p><strong>Current Theme:</strong> {THEMES[currentTheme].name}</p>
                  <div className="color-swatches">
                    {Object.entries(THEMES[currentTheme].colors).map(([key, color]) => (
                      <div key={key} className="color-swatch">
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
