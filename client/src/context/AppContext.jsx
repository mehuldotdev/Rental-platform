import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider = ({children})=> {

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setpickupDate] = useState('')
    const [returnDate, setreturnDate] = useState('')

    const [cars, setCars] = useState([])

    // checking if user is logged in

    const fetchUser = async()=>{
        try {
            const {data} = await axios.get('/api/user/data')
            if(data.success) {
                setUser(data.user)
                setIsOwner(data.user.role === 'owner')
            }
            else {
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Fetching all cars from server

    const fetchCars = async ()=> {
        try {
            const {data} = await axios.get('/api/user/cars')
            data.success ? setCars(data.cars) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Logging out the user

    const logout = ()=>{
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
        setIsOwner(false)
        delete axios.defaults.headers.common.Authorization
        toast.success("You have been logged out successfully")
        navigate('/')
    }

    // Finding token from storage

    useEffect(()=>{
        const token = localStorage.getItem('token')
        setToken(token)
        fetchCars()
    }, [])

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            fetchUser()
        }
    }, [token])

    const value = {navigate, currency, axios, user, setUser, token, setToken, isOwner, setIsOwner, fetchUser, fetchCars, logout, showLogin, setShowLogin, cars, setCars, pickupDate, returnDate, setpickupDate, setreturnDate}


    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> {
    return useContext(AppContext)
}