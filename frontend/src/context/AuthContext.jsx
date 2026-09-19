import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"

import {
    getProfile,
    loginUser,
    logoutUser,
} from "../services/auth.service"

const AuthContext = createContext()

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    // Load logged-in user when application starts
    useEffect(() => {

        const loadUser = async () => {

            try {

                const data = await getProfile()

                console.log("Current user:", data.user)

                setUser(data.user)

            } catch (error) {

                setUser(null)

            } finally {

                setLoading(false)

            }

        }

        loadUser()

    }, [])

    // Login user
    const login = async (userData) => {

        try {

            await loginUser(userData)

            // After login, fetch the actual logged-in user
            const data = await getProfile()

            console.log("Logged-in user:", data.user)

            setUser(data.user)

            return data.user

        } catch (error) {

            console.error("Login failed:", error)

            throw error

        }
    }

    // Logout user
    const logout = async () => {

        try {

            await logoutUser()

            setUser(null)

        } catch (error) {

            console.error("Logout failed:", error)

        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export default AuthProvider
