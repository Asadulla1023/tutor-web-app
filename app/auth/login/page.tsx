"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/styles/auth.module.css"
import Container from '@/app/components/global/Container'
import Image from 'next/image'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
import Error from '@/app/components/local/event/Error'
import axios from 'axios'
export default function Page() {
    const [cookie, setCookie] = useCookies(["hasAccount"])
    const [userName, setUseName] = useState("")
    const [password, setPassWord] = useState("")
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState("")
    const handleSubmitAcc = (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault()
        if (userName.length && password.length) {
            const test = /\d/.test(userName)
            if (test === true) {
                if (password.length > 7) {
                    axios.post(`${process.env.NEXT_PUBLIC_API}/api/users/login`, {
                        user: {
                            phone: `998${userName}`,
                            password: password
                        }
                    }).then(res => {
                        if (res.status < 250) {
                            setCookie("hasAccount", {
                                user: res.data
                            }, { path: "/" })
                        }
                    }).catch(err => {
                        setError(true)
                        setMsg(err.response.data.message)
                        // console.clear()
                        console.log(err);
                    })
                } else {
                    setError(true)
                    setMsg("Password is short")
                }
            } else {
                setError(true)
                setMsg("Type of phone number must be integer")
            }
        } else {
            setError(true)
            setMsg("Please fill in the blanks")
        }
    }

    const { push } = useRouter()
    useEffect(() => {
        if (cookie.hasAccount) {
            push("/profile")
        }
    })



    return (
        <>
            <Error setError={setError} error={error} msg={msg} />
            <div style={{
                marginTop: 50
            }} className={styles.auth}>
                <Container>
                    <div className={styles.content}>
                        <h2>Авторизация</h2>
                        <div className={styles.logIn}>
                            <Image src={"/images/wall.png"} alt='image' width={1000} height={1000} />
                            <form onSubmit={handleSubmitAcc} className={styles.form}>
                                <input value={userName} maxLength={9} minLength={9} onChange={(t) => setUseName(t.target.value)} autoComplete='false' type="text" placeholder='Номер телефона' className={styles.getInfo} />
                                <input value={password} autoComplete='false' minLength={8} maxLength={24} onChange={(t) => setPassWord(t.target.value)} type="password" placeholder='Пароль' className={styles.getInfo} />
                                <button >Забыли пароль?</button>
                                <div className={styles.complete}>
                                    <button>Войти</button>
                                    <Link href={"/auth/register"}>
                                        Нет аккаунта?
                                    </Link>
                                </div>
                                <div className={styles.authWith}>
                                    <p>или авторизируйтесь при помощи</p>
                                    <Image src={"/images/facebookIcon.png"} alt='facebook icon' width={40} height={40} />
                                    <Image src={"/images/googleIcon.png"} alt='google icon' width={40} height={40} />
                                </div>
                            </form>
                        </div>
                    </div>
                </Container>
            </div></>
    )
}
