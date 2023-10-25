import React from 'react'
import styles from "@/styles/category/card.module.css"
import Image from 'next/image'
import Link from 'next/link'
const CategoryCard = () => {
    return (
        <Link href={`/category/111`} className={styles.categoryCard}>
            <Image src={"/images/category.png"} alt='course image' width={280} height={312} />
            <h3>Английский</h3>
            <div className={styles.gradient} />
        </Link>
    )
}

export default CategoryCard