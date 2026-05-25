// Simple password hashing (for demo only - NOT secure for production)
const simpleHash = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16)
}

// Get all users from localStorage
const getAllUsers = () => {
  const users = localStorage.getItem('noteAppUsers')
  return users ? JSON.parse(users) : {}
}

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('noteAppUsers', JSON.stringify(users))
}

// Check if username exists
const usernameExists = (username) => {
  const users = getAllUsers()
  return username.toLowerCase() in users
}

// Sign up a new user
const signup = (username, password) => {
  // Validate inputs
  if (!username || !password) {
    return { success: false, message: 'Username and password are required' }
  }

  if (username.length < 3) {
    return { success: false, message: 'Username must be at least 3 characters' }
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters' }
  }

  // Check if username already exists
  if (usernameExists(username)) {
    return { success: false, message: 'Username already taken' }
  }

  // Create new user
  const users = getAllUsers()
  users[username.toLowerCase()] = {
    username,
    passwordHash: simpleHash(password),
    createdAt: new Date().toISOString(),
  }

  saveUsers(users)

  return {
    success: true,
    message: 'Account created successfully',
    user: { username },
  }
}

// Login user
const login = (username, password) => {
  // Validate inputs
  if (!username || !password) {
    return { success: false, message: 'Username and password are required' }
  }

  const users = getAllUsers()
  const user = users[username.toLowerCase()]

  // Check if user exists
  if (!user) {
    return { success: false, message: 'User not found' }
  }

  // Check password
  const passwordHash = simpleHash(password)
  if (passwordHash !== user.passwordHash) {
    return { success: false, message: 'Invalid password' }
  }

  return {
    success: true,
    message: 'Logged in successfully',
    user: { username: user.username },
  }
}

// Get current user from localStorage
const getCurrentUser = () => {
  const user = localStorage.getItem('noteAppCurrentUser')
  return user ? JSON.parse(user) : null
}

// Set current user
const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem('noteAppCurrentUser', JSON.stringify(user))
  } else {
    localStorage.removeItem('noteAppCurrentUser')
  }
}

// Logout
const logout = () => {
  setCurrentUser(null)
}

export {
  signup,
  login,
  logout,
  getCurrentUser,
  setCurrentUser,
  usernameExists,
  getAllUsers,
}
