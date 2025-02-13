'use client'
import Loader from '@/components/Loader';


import React, { useContext, useEffect, useState } from 'react'
const MyContext = React.createContext();

export function MyContextProvider({ children }) {
    const [allquizzes, setAllquizzes] = useState([])
    const [startquizzId, setstartquizzId] = useState(null)
    const [selectedQuiz, setselectedQuiz] = useState(null)
    const [UpdateMode, setUpdateMode] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setuser] = useState(null);


    async function fetchAllQuizzes(userId) {
        const response = await fetch(`/api/quizzes?userId=${userId}`, { cache: 'no-store' });
        const data = await response.json();
        return data
    }






    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            return
        }
        setuser(user)
        fetchAllQuizzes(user.userId)
            .then(data => {
                setAllquizzes(data.quizzes);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    }, [])
    useEffect(() => {
        setselectedQuiz(allquizzes.find((q) => q._id === startquizzId))
    }, [startquizzId])


    if (loading) return <div>
        <div className="fixed top-0 left-0 w-full h-full bg-gray-100 opacity-50 flex items-center justify-center">
            <Loader />
        </div>

        {/* Your component content */}
    </div>;
    if (error) return <p>Error: {error}</p>;



    return (
        <MyContext.Provider value={{ allquizzes, setAllquizzes, quizToStartObjict: { startquizzId, setstartquizzId }, mode: { setUpdateMode, UpdateMode }, selectedQuiz, user }}> {children}</MyContext.Provider >
    )
}

export default function useMyContext() {
    return useContext(MyContext)
}