// SHA512 hashing using Web Crypto API
const sha512Hash = async (str) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-512', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
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
const signup = async (username, password) => {
    const lower = /[a-z]/
    const upper = /[A-Z]/
    const number = /[0-9]/
    const result = { success: true, message: '' }
    const minUserLen = 6
    const minPassLen = 8

    // Validate inputs
    if (!username || !password) {
        result.success = false
        result.message += 'Username and password are required\n'
    }

    if (username && username.length < minUserLen) {
        result.success = false
        result.message += `Username must be at least ${minUserLen} characters long\n`
    }

    if (password && password.length < minPassLen) {
        result.success = false
        result.message += `Password must be at least ${minPassLen} characters long\n`
    }

    if (password && !lower.test(password)) {
        result.success = false
        result.message += 'Password must have at least one lowercase letter\n'
    }

    if (password && !upper.test(password)) {
        result.success = false
        result.message += 'Password must have at least one uppercase letter\n'
    }

    if (password && !number.test(password)) {
        result.success = false
        result.message += 'Password must have at least one number\n'
    }

    if (!result.success) {
        return result
    }

    // Check if username already exists
    if (usernameExists(username)) {
        return { success: false, message: 'Username already taken' }
    }

    // Create new user
    const users = getAllUsers()
    const passwordHash = await sha512Hash(password)
    users[username.toLowerCase()] = {
        username,
        passwordHash,
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
const login = async (username, password) => {
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
    const passwordHash = await sha512Hash(password)
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
