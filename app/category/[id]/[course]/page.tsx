"use client"
import React, { useState } from 'react'
import styles from "@/styles/category/course.module.css"
import Container from '@/app/components/global/Container'
import Image from 'next/image'
import Link from 'next/link'
import CourseCard from '@/app/components/local/category/CourseCard'
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import Review from '@/app/components/local/utils/Review'
import "keen-slider/keen-slider.min.css"

const AdaptiveHeight: KeenSliderPlugin = (slider) => {
    function updateHeight() {
        slider.container.style.height =
            slider.slides[slider.track.details.rel].offsetHeight + "px"
    }
    slider.on("created", updateHeight)
    slider.on("slideChanged", updateHeight)
}
const Page = () => {
    const [isCourse, setIsCourse] = useState<boolean>(false)
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slideChanged(s) {
                setCurrentSlide(s.track.details.rel)
            },
            created() {
                setLoaded(true)
            },
        },
        [AdaptiveHeight]
    )
    return (
        isCourse === false ? <>
            <div className={styles.author}>
                <Container>
                    <div className={styles.content}>
                        <h2>Курс по программированию</h2>
                        <p>
                            Подпишитесь и вы будете в курсе все наших акций, скидок, появление
                            Новых предметов, дисциплин и учебных центров.
                        </p>
                        <div className={styles.courseAuthor}>
                            <div className={styles.authorInfo}>
                                <h3>Автор: </h3>
                                <h4 onClick={() => {
                                    setIsCourse(true)
                                }}>Рафаэль Ройтман</h4>
                            </div>
                            <div className={styles.authorInfo}>
                                <div className={styles.seen}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.83347 11.1952C9.9787 11.1952 12.6669 11.6718 12.6669 13.5756C12.6669 15.4795 9.99661 15.9697 6.83347 15.9697C3.68739 15.9697 1 15.4974 1 13.5927C1 11.688 3.66948 11.1952 6.83347 11.1952Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.833 8.47728C4.76801 8.47728 3.09351 6.80363 3.09351 4.73864C3.09351 2.67365 4.76801 1 6.833 1C8.89714 1 10.5716 2.67365 10.5716 4.73864C10.5793 6.79596 8.91675 8.46961 6.85943 8.47728H6.833Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.7087 7.50706C14.0737 7.31523 15.125 6.14376 15.1276 4.72589C15.1276 3.32848 14.1087 2.16895 12.7727 1.94983" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.5088 10.79C15.8312 10.987 16.7545 11.4508 16.7545 12.4057C16.7545 13.0631 16.3197 13.4894 15.6172 13.7562" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <h4>189</h4>
                                </div>
                                <div className={styles.stars}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.42021 0.597358L9.94306 3.81861C10.0923 4.13484 10.3804 4.35412 10.7145 4.40487L14.1211 4.92407C14.9628 5.05274 15.2977 6.13283 14.6886 6.75171L12.2252 9.25804C11.9831 9.5045 11.8729 9.85879 11.9301 10.2067L12.5115 13.7451C12.6547 14.6204 11.7748 15.2883 11.0225 14.8742L7.97768 13.2024C7.67918 13.0384 7.32168 13.0384 7.02232 13.2024L3.9775 14.8742C3.22519 15.2883 2.34533 14.6204 2.48937 13.7451L3.06987 10.2067C3.12714 9.85879 3.01694 9.5045 2.77485 9.25804L0.3114 6.75171C-0.297737 6.13283 0.0372014 5.05274 0.878887 4.92407L4.28554 4.40487C4.61961 4.35412 4.90856 4.13484 5.05781 3.81861L6.57979 0.597358C6.95638 -0.199119 8.04362 -0.199119 8.42021 0.597358Z" fill="#ffffff" />
                                    </svg>
                                    <h4>5.0</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <div className={styles.course}>
                <Container>
                    <div className={styles.content}>
                        <div className={styles.leftSide}>
                            <div className={styles.aboutCourse}>
                                <h3>Чему вы научитесь:</h3>
                                <div className={styles.checks}>
                                    {[1, 2, 3, 4].map((i) => {
                                        return <div key={i + Math.random() * Math.random() / Math.random() ** Math.random()} className={styles.courseInfo}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
                                                <path d="M20.3823 0.511971C20.7625 0.853534 20.9844 1.3246 20.9992 1.82159C21.014 2.31859 20.8205 2.80083 20.4612 3.16228L9.27849 14.4136C9.09725 14.5956 8.87945 14.7413 8.63797 14.842C8.39649 14.9426 8.13622 14.9963 7.87253 14.9998C7.60885 15.0033 7.3471 14.9566 7.10276 14.8623C6.85842 14.7681 6.63643 14.6282 6.44991 14.4511L0.529645 8.82543C0.18106 8.46995 -0.00871298 7.99978 0.000307451 7.51397C0.00932788 7.02816 0.216437 6.56465 0.578003 6.22108C0.939568 5.8775 1.42736 5.6807 1.93861 5.67213C2.44986 5.66356 2.94465 5.84389 3.31875 6.17512L7.805 10.4356L17.5932 0.58698C17.9526 0.225681 18.4484 0.0148173 18.9714 0.000751445C19.4944 -0.0133144 20.0019 0.170569 20.3823 0.511971Z" fill="#29CB73" />
                                            </svg>
                                            <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className={styles.aboutCourse}>
                                <div className={styles.titleAbCourse}>
                                    <h3>Материалы курса</h3>
                                    <div className={styles.info}>
                                        <p>101 раздел</p> • <p>635 лекций</p>
                                    </div>
                                </div>
                                <div className={styles.checks}>
                                    {[1, 2, 3, 4].map((i) => {
                                        return <div key={i + Math.random() * Math.random() / Math.random() ** Math.random()} className={styles.daysInfo}>
                                            <div className={styles.days}>
                                                <h4>{i} - день.</h4>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
                                                    <path d="M1.5045 0L0 1.50382L8.5 10L17 1.50382L15.4955 0L8.5 6.99235L1.5045 0Z" fill="#343936" />
                                                </svg>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className={styles.aboutCourse}>
                                <h3>Описание</h3>
                                <div className={styles.checks}>
                                    <p>
                                        You will master the Python programming language by building 100 unique projects over 100 days.
                                        You will master the Python programming language by building 100 unique projects over 100 days.
                                        You will master the Python programming language by building 100 unique projects over 100 days.
                                        You will master the Python programming language by building 100 unique projects over 100 days.
                                        You will master the Python programming language by building 100 unique projects over 100 days.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.aboutCourse}>
                                <h3>Описание</h3>
                                <div className={styles.checks}>
                                    <p>
                                        You will master the Python programming language by building 100 unique projects over 100 days.
                                        You will master the Python programming language by building 100 unique projects over 100 days.
                                        You will master the Python programming language by building 100 unique projects over 100 days.
                                        You will master the Python programming language by building 100 unique projects over 100 days.
                                        You will master the Python programming language by building 100 unique projects over 100 days.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.aboutCourse}>
                                <h3>Автор курса</h3>
                                <div className={styles.courseInfo}>
                                    <div className={styles.aboutAuthor}>
                                        <Image onClick={() => {
                                            setIsCourse(true)
                                        }} src={"/images/author.png"} alt='author' width={71} height={71} />
                                        <div onClick={() => {
                                            setIsCourse(true)
                                        }} className={styles.authorName}>
                                            <h3>Рафаэль Ройтман</h3>
                                            <h4>Преподаватель</h4>
                                        </div>
                                        <div className={styles.stars}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.42021 0.597358L9.94306 3.81861C10.0923 4.13484 10.3804 4.35412 10.7145 4.40487L14.1211 4.92407C14.9628 5.05274 15.2977 6.13283 14.6886 6.75171L12.2252 9.25804C11.9831 9.5045 11.8729 9.85879 11.9301 10.2067L12.5115 13.7451C12.6547 14.6204 11.7748 15.2883 11.0225 14.8742L7.97768 13.2024C7.67918 13.0384 7.32168 13.0384 7.02232 13.2024L3.9775 14.8742C3.22519 15.2883 2.34533 14.6204 2.48937 13.7451L3.06987 10.2067C3.12714 9.85879 3.01694 9.5045 2.77485 9.25804L0.3114 6.75171C-0.297737 6.13283 0.0372014 5.05274 0.878887 4.92407L4.28554 4.40487C4.61961 4.35412 4.90856 4.13484 5.05781 3.81861L6.57979 0.597358C6.95638 -0.199119 8.04362 -0.199119 8.42021 0.597358Z" fill="#29CB73" />
                                            </svg>
                                            <h4 style={{
                                                color: "#29CB73"
                                            }}>5.0</h4>
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        setIsCourse(true)
                                    }}>Посмотреть профиль</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rightSide}>
                            <video src='/images/intro.mp4' style={{
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20,
                                height: 280,
                                objectFit: "cover"
                            }} onLoad={(e) => console.log(e.target)} controls width={480} />
                            <div className={styles.card}>
                                <div className={styles.courseCost}>
                                    <h3>10$</h3>
                                    <h4>15$</h4>
                                    <div className={styles.sale}>
                                        <h3>Скидка: 30%</h3>
                                    </div>
                                </div>
                                <button className={styles.buy}>Купить</button>
                                <button className={styles.like}>Добавить в избранное</button>
                                <h3>Этот курс включает:</h3>
                                <div className={styles.lessonsWrapper}>
                                    <div className={styles.lesson}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24" fill="none">
                                            <path d="M21.1143 1H6.02857C3.25137 1 1 3.18883 1 5.88889V18.1111C1 20.8111 3.25137 23 6.02857 23H21.1143C23.8914 23 26.1429 20.8111 26.1429 18.1111V5.88889C26.1429 3.18883 23.8914 1 21.1143 1Z" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11.8652 7.33646C10.6418 7.79094 10.4285 10.2264 10.4285 11.9977C10.4285 13.7691 10.6418 16.1463 11.8652 16.6591C13.0887 17.1718 18.2856 13.9905 18.2856 11.9977C18.2856 10.005 13.1672 6.84702 11.8652 7.33646Z" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p>55 ч видео по запросу</p>
                                    </div>
                                    <div className={styles.lesson}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                            <path d="M12.448 8.5863H18.2411" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5.82739 8.58632L6.65498 9.41391L9.13774 6.93115" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12.448 16.3104H18.2411" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5.82739 16.3104L6.65498 17.138L9.13774 14.6553" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.72414 23H15.3448C20.8621 23 23.069 20.8 23.069 15.3V8.7C23.069 3.2 20.8621 1 15.3448 1H8.72414C3.2069 1 1 3.2 1 8.7V15.3C1 20.8 3.2069 23 8.72414 23Z" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p>500 заданий</p>
                                    </div>
                                    <div className={styles.lesson}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="25" viewBox="0 0 23 25" fill="none">
                                            <path d="M15.5651 17.401H6.77637" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.5651 12.3049H6.77637" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.13 7.22082H6.77637" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.7996 1C15.7996 1 6.4546 1.00487 6.43999 1.00487C3.08032 1.02556 1 3.23613 1 6.60798V17.802C1 21.1909 3.09614 23.41 6.48503 23.41C6.48503 23.41 15.8288 23.4063 15.8446 23.4063C19.2043 23.3857 21.2859 21.1739 21.2859 17.802V6.60798C21.2859 3.21909 19.1885 1 15.7996 1Z" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p>230 статей</p>
                                    </div>
                                    <div className={styles.lesson}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.34171 1.96143e-07C7.34656 1.96143e-07 6.51728 0.759858 6.42985 1.75114C6.24834 3.82236 6.20239 5.90322 6.29228 7.98043L5.96699 8.00357L4.05128 8.14243C3.7715 8.16287 3.50183 8.25561 3.26865 8.41157C3.03548 8.56753 2.84681 8.78137 2.72109 9.03214C2.59538 9.28292 2.53694 9.56204 2.5515 9.84219C2.56605 10.1223 2.65311 10.3939 2.80413 10.6303C4.21381 12.8362 6.03024 14.7539 8.15656 16.281L8.92285 16.8326C9.22631 17.0507 9.59058 17.168 9.96428 17.168C10.338 17.168 10.7022 17.0507 11.0057 16.8326L11.772 16.281C13.8979 14.7538 15.7139 12.8361 17.1231 10.6303C17.2742 10.3939 17.3612 10.1223 17.3758 9.84219C17.3903 9.56204 17.3319 9.28292 17.2062 9.03214C17.0805 8.78137 16.8918 8.56753 16.6586 8.41157C16.4254 8.25561 16.1558 8.16287 15.876 8.14243L13.9603 8.00357C13.8523 7.99554 13.7443 7.98783 13.6363 7.98043C13.7263 5.904 13.68 3.82243 13.4987 1.75114C13.4569 1.27299 13.2373 0.827892 12.8834 0.503701C12.5294 0.179509 12.0668 -0.000216731 11.5869 1.96143e-07H8.34171ZM8.26971 8.82643C8.12327 6.52838 8.15035 4.22255 8.35071 1.92857H11.5779C11.7787 4.22252 11.8062 6.52835 11.6601 8.82643C11.6521 8.95383 11.6695 9.08155 11.7113 9.20218C11.753 9.32281 11.8183 9.43395 11.9034 9.52916C11.9884 9.62436 12.0915 9.70173 12.2067 9.75678C12.3218 9.81184 12.4468 9.84347 12.5743 9.84986C12.9909 9.87043 13.4061 9.89615 13.8214 9.927L15.2113 10.0286C13.9768 11.8466 12.4318 13.433 10.647 14.715L9.96556 15.2049L9.28156 14.715C7.49664 13.4326 5.9516 11.8458 4.71728 10.0273L6.10713 9.92829C6.52242 9.89743 6.93899 9.87172 7.35428 9.85115C7.48188 9.84492 7.60697 9.81341 7.72229 9.75843C7.83761 9.70345 7.94085 9.6261 8.02603 9.53088C8.1112 9.43566 8.1766 9.32446 8.21843 9.20375C8.26026 9.08304 8.27769 8.95522 8.26971 8.82772V8.82643Z" fill="#29CB73" />
                                            <path d="M1.92857 17.6784C1.92857 17.4227 1.82698 17.1774 1.64614 16.9965C1.4653 16.8157 1.22003 16.7141 0.964286 16.7141C0.708542 16.7141 0.463271 16.8157 0.282433 16.9965C0.101594 17.1774 0 17.4227 0 17.6784V20.2498C0 21.4918 1.008 22.4998 2.25 22.4998H17.6786C18.2753 22.4998 18.8476 22.2628 19.2696 21.8408C19.6915 21.4189 19.9286 20.8466 19.9286 20.2498V17.6784C19.9286 17.4227 19.827 17.1774 19.6461 16.9965C19.4653 16.8157 19.22 16.7141 18.9643 16.7141C18.7085 16.7141 18.4633 16.8157 18.2824 16.9965C18.1016 17.1774 18 17.4227 18 17.6784V20.2498C18 20.3351 17.9661 20.4168 17.9059 20.4771C17.8456 20.5374 17.7638 20.5713 17.6786 20.5713H2.25C2.16475 20.5713 2.083 20.5374 2.02272 20.4771C1.96244 20.4168 1.92857 20.3351 1.92857 20.2498V17.6784Z" fill="#29CB73" />
                                        </svg>
                                        <p>153 ресурсов для скачивания</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </> :
            <>
                <div className={styles.author}>
                    <Container>
                        <div className={styles.contentAuthor}>
                            <Image src={"/images/author.png"} alt='author of course' width={93} height={93} />
                            <div className={styles.bio}>
                                <h2>Рафаэль Ройтман</h2>
                                <h4>Преподаватель</h4>
                            </div>
                            <div className={styles.courseAuthor}>
                                <div className={styles.authorInfo}>
                                    <div className={styles.seen}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.83347 11.1952C9.9787 11.1952 12.6669 11.6718 12.6669 13.5756C12.6669 15.4795 9.99661 15.9697 6.83347 15.9697C3.68739 15.9697 1 15.4974 1 13.5927C1 11.688 3.66948 11.1952 6.83347 11.1952Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.833 8.47728C4.76801 8.47728 3.09351 6.80363 3.09351 4.73864C3.09351 2.67365 4.76801 1 6.833 1C8.89714 1 10.5716 2.67365 10.5716 4.73864C10.5793 6.79596 8.91675 8.46961 6.85943 8.47728H6.833Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12.7087 7.50706C14.0737 7.31523 15.125 6.14376 15.1276 4.72589C15.1276 3.32848 14.1087 2.16895 12.7727 1.94983" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.5088 10.79C15.8312 10.987 16.7545 11.4508 16.7545 12.4057C16.7545 13.0631 16.3197 13.4894 15.6172 13.7562" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <h4>189</h4>
                                    </div>
                                    <div className={styles.stars}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.42021 0.597358L9.94306 3.81861C10.0923 4.13484 10.3804 4.35412 10.7145 4.40487L14.1211 4.92407C14.9628 5.05274 15.2977 6.13283 14.6886 6.75171L12.2252 9.25804C11.9831 9.5045 11.8729 9.85879 11.9301 10.2067L12.5115 13.7451C12.6547 14.6204 11.7748 15.2883 11.0225 14.8742L7.97768 13.2024C7.67918 13.0384 7.32168 13.0384 7.02232 13.2024L3.9775 14.8742C3.22519 15.2883 2.34533 14.6204 2.48937 13.7451L3.06987 10.2067C3.12714 9.85879 3.01694 9.5045 2.77485 9.25804L0.3114 6.75171C-0.297737 6.13283 0.0372014 5.05274 0.878887 4.92407L4.28554 4.40487C4.61961 4.35412 4.90856 4.13484 5.05781 3.81861L6.57979 0.597358C6.95638 -0.199119 8.04362 -0.199119 8.42021 0.597358Z" fill="#ffffff" />
                                        </svg>
                                        <h4>5.0</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className={styles.course}>
                    <Container>
                        <div className={styles.authorContent}>
                            <h2 style={{
                                color: "#000"
                            }}>КУРСЫ</h2>
                            <div className={styles.courseWrapper}>
                                {[1, 2, 3, 4].map((i) => {
                                    return <CourseCard key={i} />
                                })}
                            </div>
                        </div>
                    </Container>
                    <div className={styles.teaching}>
                        <Container>
                            <div className={styles.authorContent}>
                                <h2>О ПРЕПОДАВАТЕЛЕ</h2>
                                <p>
                                    You will master the Python programming language by building 100
                                    unique projects over 100 days. You will master the Python programming language by
                                    building 100 unique projects over 100 days. You will master the Python
                                    programming language by building 100 unique projects over 100 days.
                                    You will master the Python programming language by building 100 unique projects over 100 days.You will
                                    master the Python programming language by building 100 unique projects over 100 days.
                                </p>
                            </div>
                        </Container>
                    </div>
                    <div className={styles.reviews}>
                        <Container>
                            <div className={styles.authorContent}>
                                <div className={styles.titleOfContent}>
                                    <h2>ОТЗЫВЫ</h2>
                                </div>
                                <div ref={sliderRef} className={`keen-slider ${styles.reviewWrapper}`} style={{
                                    gap: 8,
                                    height: 180,
                                }}>
                                    {[16, 26, 36, 46].map((i, index) => {
                                        return <div key={i} className={`keen-slider__slide number-slide${index} ${styles.sliderItem}`}><Review key={index + Math.random()} /><Review /></div>
                                    })}
                                </div>
                                {loaded && instanceRef.current && (
                                    <div className={styles.controller}>
                                        {
                                            // @ts-ignore
                                            [
                                                0, 1, 2, 3
                                            ].map((idx) => {
                                                return (
                                                    <button
                                                        key={idx * Math.random() ** 10 + "sheeesh"}
                                                        onClick={() => {
                                                            instanceRef.current?.moveToIdx(idx)
                                                        }}
                                                        className={(currentSlide === idx ? styles.active : styles.unActive)}
                                                    ></button>
                                                )
                                            })}
                                    </div>
                                )}

                            </div>
                        </Container>
                    </div>
                </div>
            </>
    )
}

export default Page