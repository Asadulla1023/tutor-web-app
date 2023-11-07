"use client"
import React, { useState } from 'react'
import styles from "@/styles/category/category.module.css"
import Container from '@/app/components/global/Container'
import CourseCard from '@/app/components/local/category/CourseCard'
import Navigation from '@/app/components/global/Navigation'
import { NextPage } from 'next'
import CategoryModal from '@/app/components/local/utils/Category/CategoryModal'
const Client: NextPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <div className={styles.category}>
                <Container>
                    <Navigation navigation='Главная/Категории/Английский' />
                </Container>
            </div>
            <div className={styles.category}>
                <Container>
                    <div className={styles.content}>
                        <h2>Английский</h2>
                        <div className={styles.sort}>
                            <div className={styles.sortBy}>
                                <h4>Сортировка:</h4>
                                <div className={styles.setType}>
                                    <p>По рейтингу</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M0.9735 0L0 1.05268L5.5 7L11 1.05268L10.0265 0L5.5 4.89465L0.9735 0Z" fill="#9A9A9A" />
                                    </svg>
                                </div>
                                <div className={styles.setType}>
                                    <p>По цене</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M0.9735 0L0 1.05268L5.5 7L11 1.05268L10.0265 0L5.5 4.89465L0.9735 0Z" fill="#9A9A9A" />
                                    </svg>
                                </div>
                            </div>
                            <div onClick={() => {
                                setIsModalOpen(!isModalOpen)
                            }} className={styles.filter}>
                                <h3>Фильтр</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 13 8" fill="none">
                                    <path d="M1.1505 0L0 1.20306L6.5 8L13 1.20306L11.8495 0L6.5 5.59388L1.1505 0Z" fill="#29CB73" />
                                </svg>
                            </div>
                            <CategoryModal isOpen={isModalOpen} />
                        </div>
                        <div className={styles.wrapper}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11].map((i) => {
                                return <CourseCard key={i + Math.random() + "comdom" + Math.random() ** 4} />
                            })}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Client