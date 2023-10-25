"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/styles/auth.module.css"
import Container from '@/app/components/global/Container'
import Image from 'next/image'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [cookie, setCookie] = useCookies(["hasAccount"])
    const [userName, setUseName] = useState("")
    const [password, setPassWord] = useState("")
    const handleSubmitAcc = (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault()
        setCookie("hasAccount", {
            userName: userName,
            password: password
        }, { path: "/" })
        setUseName("")
        setPassWord("")
    }

    const { push } = useRouter()
    useEffect(() => {
        if (cookie.hasAccount) {
            push("/profile")
        }
    })

    return (
        <div className={styles.auth}>
            <Container>
                <div className={styles.content}>
                    <h2>Авторизация</h2>
                    <div className={styles.logIn}>
                        <Image src={"/images/wall.png"} alt='image' width={1000} height={1000} />
                        <form onSubmit={handleSubmitAcc} className={styles.form}>
                            <input value={userName} onChange={(t) => setUseName(t.target.value)} required autoComplete='false' type="text" placeholder='Имя' className={styles.getInfo} />
                            <input value={password} autoComplete='false' onChange={(t) => setPassWord(t.target.value)} required type="text" placeholder='Номер телефона' className={styles.getInfo} />
                            <button>Забыли пароль?</button>
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
        </div>
    )
}
