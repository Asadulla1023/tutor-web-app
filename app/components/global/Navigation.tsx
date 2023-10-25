"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import styles from "@/styles/navigator.module.css"
import Container from './Container'
const informs = [
    {
        name: "/auth/login",
        translation: "/Авторизация"
    },
    {
        name: "/auth/register",
        translation: "/Регистрация"
    },
    {
        name: "/category",
        translation: "/Категории"
    },
    {
        name: "/category/111",
        translation: "/Категории/Английский"
    },
    {
        name: "/category/111/course",
        translation: "/Категории/Английский/Наименования курса"
    }
]


const Navigation = ({navigation}: {
    navigation: string
}) => {
    const path = usePathname()
    const i = informs.find(inform => inform.name === path)
    return (
        <div className={styles.navigator}>
            <Container>
                <h4 style={i?.name === "/category/111/course" ? {
                    color: "#fff"
                }: {}}>{navigation}</h4>
            </Container>
        </div>
    )
}

export default Navigation