"use client"
import React, { useEffect } from 'react'
import styles from "@/styles/event/event.module.css"
interface Event {
    msg: string
    error: boolean
    setError: React.Dispatch<React.SetStateAction<boolean>>
}
const Error = ({ error, msg, setError }: Event) => {
    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 2500)
    }, [error])

    return (
        <div style={error === true ? {
            opacity: 1,
            zIndex: 10,
            transition: "0.2s ease-in-out"
        } : {
            opacity: 0,
            zIndex: -10,
            transition: "0.2s ease-in-out"
        }} className={styles.event}>
            <div className={styles.container}>
                <p>{msg}</p>
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.45600000000000007"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z" fill="#ff0000"></path> </g></svg>
            </div>
        </div>
    )
}

export default Error