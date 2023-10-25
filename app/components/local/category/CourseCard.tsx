import React from 'react'
import styles from "@/styles/category/card.module.css"
import Link from 'next/link'
import Image from 'next/image'
const CourseCard = () => {
    return (
        <Link href={`/category/111/course`} className={styles.courseCard}>
            <Image src={"/images/course.png"} alt='course' width={280} height={159} />
            <div className={styles.description}>
                <div className={styles.descTop}>
                    <div className={styles.seen}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.83347 11.1952C9.9787 11.1952 12.6669 11.6718 12.6669 13.5756C12.6669 15.4795 9.99661 15.9697 6.83347 15.9697C3.68739 15.9697 1 15.4974 1 13.5927C1 11.688 3.66948 11.1952 6.83347 11.1952Z" stroke="#9A9A9A" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.833 8.47728C4.76801 8.47728 3.09351 6.80363 3.09351 4.73864C3.09351 2.67365 4.76801 1 6.833 1C8.89714 1 10.5716 2.67365 10.5716 4.73864C10.5793 6.79596 8.91675 8.46961 6.85943 8.47728H6.833Z" stroke="#9A9A9A" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.7087 7.50706C14.0737 7.31523 15.125 6.14376 15.1276 4.72589C15.1276 3.32848 14.1087 2.16895 12.7727 1.94983" stroke="#9A9A9A" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.5088 10.79C15.8312 10.987 16.7545 11.4508 16.7545 12.4057C16.7545 13.0631 16.3197 13.4894 15.6172 13.7562" stroke="#9A9A9A" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h4>189</h4>
                    </div>
                    <div className={styles.stars}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.42021 0.597358L9.94306 3.81861C10.0923 4.13484 10.3804 4.35412 10.7145 4.40487L14.1211 4.92407C14.9628 5.05274 15.2977 6.13283 14.6886 6.75171L12.2252 9.25804C11.9831 9.5045 11.8729 9.85879 11.9301 10.2067L12.5115 13.7451C12.6547 14.6204 11.7748 15.2883 11.0225 14.8742L7.97768 13.2024C7.67918 13.0384 7.32168 13.0384 7.02232 13.2024L3.9775 14.8742C3.22519 15.2883 2.34533 14.6204 2.48937 13.7451L3.06987 10.2067C3.12714 9.85879 3.01694 9.5045 2.77485 9.25804L0.3114 6.75171C-0.297737 6.13283 0.0372014 5.05274 0.878887 4.92407L4.28554 4.40487C4.61961 4.35412 4.90856 4.13484 5.05781 3.81861L6.57979 0.597358C6.95638 -0.199119 8.04362 -0.199119 8.42021 0.597358Z" fill="#29CB73" />
                        </svg>
                        <h4>5.0</h4>
                    </div>
                </div>
                <h3 className={styles.courseTitle}>
                    Курс по программированию
                </h3>
                <div className={styles.courseCost}>
                    <h3>10$</h3>
                    <h4>15$</h4>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard