import '../styles/Settings.css'

const THEMES = {
  // Light Themes
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
  ocean: {
    name: 'Ocean',
    category: 'light',
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
    category: 'light',
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
    category: 'light',
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
    category: 'light',
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
    category: 'light',
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
    category: 'light',
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
    category: 'light',
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
    category: 'light',
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
    category: 'light',
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
    category: 'light',
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

  // Dark Themes
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
  midnight: {
    name: 'Midnight',
    category: 'dark',
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
  },
  darkOcean: {
    name: 'Dark Ocean',
    category: 'dark',
    colors: {
      primaryColor: '#0ea5e9',
      primaryDark: '#0284c7',
      dangerColor: '#ff6b6b',
      textPrimary: '#e0f2fe',
      textSecondary: '#7dd3fc',
      borderColor: '#0c4a6e',
      bgLight: '#082f49',
      bgWhite: '#0c1e30',
    }
  },
  darkForest: {
    name: 'Dark Forest',
    category: 'dark',
    colors: {
      primaryColor: '#10b981',
      primaryDark: '#059669',
      dangerColor: '#ff6b6b',
      textPrimary: '#d1fae5',
      textSecondary: '#6ee7b7',
      borderColor: '#064e3b',
      bgLight: '#032e24',
      bgWhite: '#0a1f1a',
    }
  },
  darkSunset: {
    name: 'Dark Sunset',
    category: 'dark',
    colors: {
      primaryColor: '#f97316',
      primaryDark: '#ea580c',
      dangerColor: '#ff6b6b',
      textPrimary: '#fed7aa',
      textSecondary: '#fdba74',
      borderColor: '#7c2d12',
      bgLight: '#42220f',
      bgWhite: '#2d1810',
    }
  },
  darkLavender: {
    name: 'Dark Lavender',
    category: 'dark',
    colors: {
      primaryColor: '#d8b4fe',
      primaryDark: '#c084fc',
      dangerColor: '#ff6b6b',
      textPrimary: '#f3e8ff',
      textSecondary: '#ddd6fe',
      borderColor: '#6b21a8',
      bgLight: '#3f0f5c',
      bgWhite: '#2a0e4b',
    }
  },
  darkMint: {
    name: 'Dark Mint',
    category: 'dark',
    colors: {
      primaryColor: '#2dd4bf',
      primaryDark: '#14b8a6',
      dangerColor: '#ff6b6b',
      textPrimary: '#ccfbf1',
      textSecondary: '#99f6e4',
      borderColor: '#0d504f',
      bgLight: '#042f2e',
      bgWhite: '#031f1e',
    }
  },
  darkRose: {
    name: 'Dark Rose',
    category: 'dark',
    colors: {
      primaryColor: '#fb7185',
      primaryDark: '#f43f5e',
      dangerColor: '#ff6b6b',
      textPrimary: '#ffe4e6',
      textSecondary: '#ffb3ba',
      borderColor: '#881337',
      bgLight: '#500724',
      bgWhite: '#3a051c',
    }
  },
  darkGray: {
    name: 'Dark Gray',
    category: 'dark',
    colors: {
      primaryColor: '#64748b',
      primaryDark: '#475569',
      dangerColor: '#ff6b6b',
      textPrimary: '#f1f5f9',
      textSecondary: '#cbd5e1',
      borderColor: '#334155',
      bgLight: '#1e293b',
      bgWhite: '#0f172a',
    }
  },
  darkAbyss: {
    name: 'Dark Abyss',
    category: 'dark',
    colors: {
      primaryColor: '#6d28d9',
      primaryDark: '#5b21b6',
      dangerColor: '#ff6b6b',
      textPrimary: '#ede9fe',
      textSecondary: '#ddd6fe',
      borderColor: '#5b21b6',
      bgLight: '#1e1b4b',
      bgWhite: '#0f0a1a',
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
            <h3>💡 Light Themes</h3>
            <div className="theme-grid">
              {Object.entries(THEMES)
                .filter(([, theme]) => theme.category === 'light')
                .map(([key, theme]) => (
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
            <h3>🌙 Dark Themes</h3>
            <div className="theme-grid">
              {Object.entries(THEMES)
                .filter(([, theme]) => theme.category === 'dark')
                .map(([key, theme]) => (
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
                        <small>{key}</small>
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
