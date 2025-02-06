'use client'
import { quizzData } from '@/QuizzStructure';
import React, { useContext, useEffect, useState } from 'react'
const MyContext = React.createContext();

export function MyContextProvider({ children }) {
    const [allquizzes, setAllquizzes] = useState([])
    const [startquizzId, setstartquizzId] = useState(null)
    useEffect(() => {
        setAllquizzes(quizzData)
    }, [])

    return (
        <MyContext.Provider value={{ allquizzes, setAllquizzes, quizToStartObjict: { startquizzId, setstartquizzId } }}> {children}</MyContext.Provider >
    )
}

export default function useMyContext() {
    return useContext(MyContext)
}