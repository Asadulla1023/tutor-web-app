import React from 'react'
import styles from "@/styles/utils/review.module.css"
import Image from 'next/image'
const Review = () => {
    return (
        <div className={styles.review}>
            <div className={styles.container}>
                <div className={styles.user}>
                    <div className={styles.userInfo}>
                        <Image src={"/images/author.png"} alt='user image' width={54} height={54} />
                        <h3>Рафаэль Ройтман</h3>
                    </div>
                    <div className={styles.stars}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.42021 0.597358L9.94306 3.81861C10.0923 4.13484 10.3804 4.35412 10.7145 4.40487L14.1211 4.92407C14.9628 5.05274 15.2977 6.13283 14.6886 6.75171L12.2252 9.25804C11.9831 9.5045 11.8729 9.85879 11.9301 10.2067L12.5115 13.7451C12.6547 14.6204 11.7748 15.2883 11.0225 14.8742L7.97768 13.2024C7.67918 13.0384 7.32168 13.0384 7.02232 13.2024L3.9775 14.8742C3.22519 15.2883 2.34533 14.6204 2.48937 13.7451L3.06987 10.2067C3.12714 9.85879 3.01694 9.5045 2.77485 9.25804L0.3114 6.75171C-0.297737 6.13283 0.0372014 5.05274 0.878887 4.92407L4.28554 4.40487C4.61961 4.35412 4.90856 4.13484 5.05781 3.81861L6.57979 0.597358C6.95638 -0.199119 8.04362 -0.199119 8.42021 0.597358Z" fill="#29CB73" />
                        </svg>
                        <h4>5.0</h4>
                    </div>
                </div>
                <div className={styles.description}>
                    <p>Отличная система, лучшие курсы.</p>
                </div>
            </div>
        </div>
    )
}

export default Review