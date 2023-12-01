import React, { useEffect, useRef, useState } from 'react'
import styles from "@/styles/utils/modal.module.css"
import ReactPlayer from 'react-player'
import Error from '../event/Error'

interface Modal {
    setModalIntro: Function
    modalIntro: boolean
}

const ModalIntro = ({ setModalIntro, modalIntro }: Modal) => {
    useEffect(() => {
        if (modalIntro === true) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [modalIntro])
    const [err, setErr] = useState(false)
    const [open, setOpen] = useState(true)
    const videoRef=useRef<any>()
    useEffect(()=> {
        if (open === false) {
            setModalIntro(false)
        }
    }, [open])
    const handleVideoController = () => {
        if (videoRef.current) {
            if (videoRef.current.player) {
                if (videoRef.current.player.player.player.duration === videoRef.current.getCurrentTime()) {
                    setModalIntro(!modalIntro)
                    setOpen(false)
                } else {
                    setErr(!err)
                }
            } else {
                setErr(!err)
            }
        } else {
            setErr(!err)
        }
    }

    return (
        <div style={modalIntro ? {
            opacity: 1,
            transition: "0.4s"
        } : {
            opacity: 0,
            transition: "0.4s"
        }} className={styles.modal}>
            <div className={styles.container}>
                <div onClick={() => {
                    setModalIntro(true)
                }} className={styles.content}>
                    <button onClick={handleVideoController}>
                        <svg width="24px" height="32px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.6"></g>
                            <g id="SVGRepo_iconCarrier"> <path d="M3 21.32L21 3.32001" stroke="#ffffff" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M3 3.32001L21 21.32" stroke="#ffffff" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </svg>
                    </button>   
                    {modalIntro === true ? <ReactPlayer ref={videoRef} width={"100%"} height={"fit-content"} loop={false} controls url={"/images/480/480p_manifest.mpd"} /> : ""}
                </div>
            </div>
            <div className={styles.bg} />
            <Error error={err} msg='Wait until video ends' setError={setErr} />
        </div>
    )
}

export default ModalIntro