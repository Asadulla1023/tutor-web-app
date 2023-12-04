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
    const videoRef = useRef<any>()
    useEffect(() => {
        if (open === false) {
            setModalIntro(false)
        }
    }, [open])
    const handleVideoController = () => {
        if (videoRef.current) {
            if (videoRef.current.duration === videoRef.current.currentTime) {
                setOpen(false)
                setModalIntro(false)
            } else {
                setErr(true)
            }
        }
    }

    useEffect(() => {
        if (videoRef.current && videoRef.current.wrapper && videoRef.current.wrapper.firstChild) {

        }
    })
    const [visible, setVisible] = useState(true)
    return (
        <div style={modalIntro ? {
            opacity: 1,
            transition: "0.4s"
        } : {
            opacity: 0,
            transition: "0.4s",
            zIndex: -100
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
                    <button style={visible ? {
                        opacity: 1
                    }: {
                        opacity: 0
                    }} className={styles.playButton} onClick={()=> {
                         if (videoRef.current && videoRef.current.paused === true) {
                            videoRef.current.play()
                            setVisible(false)
                         } else {
                            if (videoRef.current && videoRef.current.paused === false) {
                                videoRef.current.pause()
                                setVisible(true)
                            }
                         }
                    }}>
                        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#29cb73">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.4800000000000001"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#29cb73" strokeWidth="0.984" strokeLinejoin="round"></path>
                            </g>
                        </svg>
                    </button>
                    {modalIntro === true ? <video ref={videoRef} onClick={()=> {
                        if (videoRef.current && videoRef.current.paused === true) {
                            videoRef.current.play()
                            setVisible(false)
                         } else {
                            if (videoRef.current && videoRef.current.paused === false) {
                                videoRef.current.pause()
                                setVisible(true)
                            }
                         }
                    }} width={"100%"} muted={false} autoPlay height={"fit-content"} loop={false} src={"/images/intro.mp4"} /> : ""}
                </div>
            </div>
            <div className={styles.bg} />
            <Error error={err} msg='Wait until video ends' setError={setErr} />
        </div>
    )
}

export default ModalIntro