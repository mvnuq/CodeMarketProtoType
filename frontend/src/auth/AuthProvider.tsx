import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode' // ✅ CORRECTO
import axios from 'axios'

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null)
  const [tokens, setTokens] = useState<any>(() => {
    const stored = localStorage.getItem('tokens')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (tokens) {
      const decoded: any = jwtDecode(tokens.access) // ✅ CORRECTO
      setUser(decoded)
    }
  }, [tokens])

  const login = async (email: string, password: string) => {
    const res = await axios.post('http://localhost:8000/api/auth/login/', {
      email,
      password
    })
    localStorage.setItem('tokens', JSON.stringify(res.data))
    setTokens(res.data)
  }

  const logout = () => {
    localStorage.removeItem('tokens')
    setUser(null)
    setTokens(null)
  }

  const value = { user, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
