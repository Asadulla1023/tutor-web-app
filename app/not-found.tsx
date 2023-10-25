"use client"
import styles from '@/styles/404.module.css'
import Container from './components/global/Container'
const Page = () => {
    return (
        <div className={styles.notFound}>
            <Container>
                Page not found - 404
            </Container>
        </div>
    )
}

export default Page