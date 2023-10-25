import React from 'react'
import CategoryCard from '../components/local/category/CategoryCard'
import styles from '@/styles/category/category.module.css'
import Container from '../components/global/Container'
const i = [1, 2, 3, 4, 45, 5, 7]
export default function Page() {
    return (
        <div className={styles.category}>
            <Container >
                <div className={styles.content}>
                    <h2>Категории</h2>
                    <div className={styles.wrapper}>
                        {i.map(i => {
                            return <CategoryCard key={i + Math.random() + Math.random() * 3 / Math.random()} />
                        })}
                    </div>
                </div>
            </Container>
        </div>
    )
}
