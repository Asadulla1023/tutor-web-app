"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/styles/profile/profile.module.css"
import Container from '../../global/Container'
import Navigation from '../../global/Navigation'
import Image from 'next/image'
import SendMessage from '../utils/Messages/SendMessage'
import CourseCard from '../category/CourseCard'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
import Error from '@/app/components/local/event/Error'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];



const cities: {
    country: string,
    city: string,
}[] = [
        {
            country: "Tashkent",
            city: "Tashkent",
        },
        {
            country: "Tashkent Region",
            city: "Nurafshon"
        }
        ,
        {
            country: "Andijan Region",
            city: "Andijan"
        },
        {
            country: "Bukhara Region",
            city: "Bukhara"
        },

        {
            country: "Fergana Region",
            city: "Fergana"
        },
        {
            country: "Jizzakh Region",
            city: "Jizzakh"
        },
        {
            country: "Namangan Region",
            city: "Namangan"
        },
        {
            country: "Navoiy Region",
            city: "Navoiy"
        },
        {
            country: "Qashqadaryo Region",
            city: "Qarshi"
        },
        {
            country: "Samarqand Region",
            city: "Samarkand"
        },
        {
            country: "Sirdaryo Region",
            city: "Guliston"
        },
        {
            country: "Surxondaryo Region",
            city: "Termez"
        },
        {
            country: "Xorazm Region",
            city: "Urgench"
        },
        {
            country: "Republic of Karakalpakstan",
            city: "Nukus"
        },

    ]

export default function UserInformation() {
    const [cookie, setCookie] = useCookies(["hasAccount"])
    const { hasAccount } = cookie
    const [navigation, setNavigation] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [countryModalOpener, setCountryModalOpener] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>(hasAccount?.user?.name)
    const [lastName, setLastName] = useState<string>(hasAccount?.user?.surname)
    const [email, setEmail] = useState<string>(hasAccount?.user?.email)
    const [phoneNumber, setPhoneNumber] = useState<string>(hasAccount?.user?.phone)
    const [password, setPassWord] = useState<string>(hasAccount?.user?.password)
    const [selectSex, setSelectSex] = useState<string>(hasAccount?.user?.gender)
    const [address, setAddress] = useState(hasAccount?.user?.address)
    const [surName, setSurName] = useState<string>(hasAccount?.user?.lastname)
    const [dateOfBirth, setDateOfBirth] = useState(hasAccount?.user?.dateOfBirth)
    const [date, setDate] = useState<Value>(dateOfBirth ? dateOfBirth : new Date());
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState<string>("")
    const [selectGender, setSelectGender] = useState(false)
    const { push } = useRouter()

    useEffect(() => {
        if (hasAccount === undefined) {
            push("/auth/login")
        }
    }, [hasAccount])
    useEffect(()=> {
        if(hasAccount !== undefined) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/api/users/current`, {
                headers: {
                    Authorization: hasAccount.userToken
                }
            }).then((res)=> console.log(res.data)).catch(err => console.log(err))
        }
    }, [])
    const handleUpdate = (e: {
        preventDefault: () => void,
        target: any
    }) => {
        e.preventDefault();
        if (userName && lastName && phoneNumber.length > 8 && email && dateOfBirth && address && surName) {
            const user = {
                phone: phoneNumber.length === 9 ? `998${phoneNumber}` : phoneNumber,
                name: userName,
                surname: lastName,
                email: email,
                dateOfBirth,
                password,
                address,
                lastname: lastName,
                gender: selectSex
            }
            axios.put(`${process.env.NEXT_PUBLIC_API}/api/users/update`, {
                user
            }, {
                headers: {
                    Authorization: hasAccount.userToken
                }
            }).then(res => {
                setCookie("hasAccount", { user }, { path: "/" })
                setDisabled(true)
                console.log(res.data);
            }).catch(err => {
                setError(true)
                setMsg(err.response.data.message)
            })
        }
        else {
            setError(true)
            setMsg("Fill in the blanks")
        }
    }
    if (hasAccount) {
        return (
            <>
                <Error error={error} msg={msg} setError={setError} />
                <div className={styles.profile}>
                    <Container>
                        <Navigation navigation='Главная/Личный кабинет' />
                        <div className={styles.content}>
                            <h2>Личный кабинет</h2>
                            <section className={styles.profileInformation}>
                                <div className={styles.navigator}>
                                    <div onClick={() => {
                                        setNavigation(0)
                                    }} className={`${styles.navigation} ${navigation === 0 ? styles.active : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.89526 14.6172C4.63671 14.6172 1 15.2526 1 17.7972C1 20.3419 4.61364 21.0001 8.89526 21.0001C13.1538 21.0001 16.7895 20.3636 16.7895 17.82C16.7895 15.2764 13.1769 14.6172 8.89526 14.6172Z" stroke="#9A9A9A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.89381 10.9872C11.6885 10.9872 13.9535 8.75092 13.9535 5.99308C13.9535 3.23525 11.6885 1 8.89381 1C6.09916 1 3.83304 3.23525 3.83304 5.99308C3.8236 8.74161 6.074 10.9779 8.85815 10.9872H8.89381Z" stroke="#9A9A9A" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <h4>Личные данные</h4>
                                    </div>
                                    <div onClick={() => {
                                        setNavigation(1)
                                    }} className={`${styles.navigation} ${navigation === 1 ? styles.active : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <path d="M20.3828 5.32066C18.5311 5.93789 16.0622 3.46895 16.6794 1.61724M16.5296 1.767L12.5403 5.75636C10.8059 7.4907 9.57556 9.66378 8.98069 12.0433L8.78793 12.8143C8.72786 13.0546 8.94548 13.2722 9.18573 13.2121L9.95679 13.0194C12.3363 12.4245 14.5094 11.1941 16.2437 9.45978L20.233 5.47042C20.7242 4.97932 21.0001 4.31324 21.0001 3.61871C21.0001 2.17244 19.8276 1 18.3813 1C17.6868 1 17.0207 1.2759 16.5296 1.767Z" stroke="#9A9A9A" strokeWidth="1.5" />
                                            <path d="M11 1C9.86297 1 8.72594 1.1307 7.61159 1.39209C4.52557 2.11597 2.11597 4.52556 1.39209 7.61159C0.869305 9.84028 0.869305 12.1597 1.39209 14.3884C2.11597 17.4744 4.52557 19.884 7.61159 20.6079C9.84029 21.1307 12.1597 21.1307 14.3884 20.6079C17.4744 19.884 19.884 17.4744 20.6079 14.3884C20.8693 13.2741 21 12.137 21 11" stroke="#9A9A9A" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <h4>Мои чаты</h4>
                                    </div>
                                    <div onClick={() => {
                                        setNavigation(2)
                                    }} className={`${styles.navigation} ${navigation === 2 ? styles.active : ""}`}>
                                        <svg width="25px" height="25px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#9A9A9A"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M16 7C16 6.07003 16 5.60504 15.8978 5.22354C15.6204 4.18827 14.8117 3.37962 13.7765 3.10222C13.395 3 12.93 3 12 3C11.07 3 10.605 3 10.2235 3.10222C9.18827 3.37962 8.37962 4.18827 8.10222 5.22354C8 5.60504 8 6.07003 8 7M14 11.5C13.5 11.376 12.6851 11.3714 12 11.376M12 11.376C11.7709 11.3775 11.9094 11.3678 11.6 11.376C10.7926 11.4012 10.0016 11.7368 10 12.6875C9.99825 13.7004 11 14 12 14C13 14 14 14.2312 14 15.3125C14 16.1251 13.1925 16.4812 12.1861 16.5991C11.3861 16.5991 11 16.625 10 16.5M12 11.376L12 10M12 16.5995V18M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V11.8C21 10.1198 21 9.27976 20.673 8.63803C20.3854 8.07354 19.9265 7.6146 19.362 7.32698C18.7202 7 17.8802 7 16.2 7H7.8C6.11984 7 5.27976 7 4.63803 7.32698C4.07354 7.6146 3.6146 8.07354 3.32698 8.63803C3 9.27976 3 10.1198 3 11.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="#9A9A9A" strokeWidth="1.7759999999999998" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                        <h4>Мой баланс</h4>
                                    </div>
                                    <div onClick={() => {
                                        setNavigation(3)
                                    }} className={`${styles.navigation} ${navigation === 3 ? styles.active : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <path d="M1 6H19M15 1L20 6L15 11M21 16H3M7 11L2 16L7 21" stroke="#9A9A9A" strokeWidth="2" />
                                        </svg>
                                        <h4>Транзакции</h4>
                                    </div>
                                    <div onClick={() => {
                                        setNavigation(4)
                                    }} className={`${styles.navigation} ${navigation === 4 ? styles.active : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="21" viewBox="0 0 16 21" fill="none">
                                            <path d="M13.3331 0.170427L13.3499 0.750605C13.3691 0.75005 13.389 0.75 13.4224 0.75C13.9835 0.75 14.4638 0.920596 14.7885 1.16198C15.1115 1.40202 15.2451 1.67804 15.25 1.92099V18.104C15.25 19.1219 14.0985 19.713 13.2714 19.1197L9.60341 16.4886C8.64538 15.8014 7.35588 15.8014 6.3978 16.4885L2.72851 19.1201C1.90142 19.7133 0.75 19.1222 0.75 18.1044V1.95742C0.750811 1.94313 0.751222 1.92873 0.751222 1.91423V1.91392L13.3331 0.170427ZM13.3331 0.170427V0.750917H13.3282L13.3331 0.170427Z" stroke="#9A9A9A" strokeWidth="1.5" />
                                        </svg>
                                        <h4>Избранное</h4>
                                    </div>
                                    <div onClick={() => {
                                        setNavigation(5)
                                    }} className={styles.navigation}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                            <path d="M6.80761 7.39448H13.5489M6.80761 11.0427H11.0975M11.7414 17.8116H12.9276C16.154 17.8116 18.9607 15.6194 19.718 12.5078C20.094 10.9626 20.094 9.35078 19.718 7.8056L19.6187 7.39759C18.8887 4.39845 16.5096 2.06826 13.4776 1.38279L13.0516 1.28649C11.362 0.904503 9.60736 0.904502 7.91771 1.28649L7.66842 1.34285C4.52815 2.05279 2.06413 4.46614 1.30815 7.57233C0.894774 9.27082 0.898551 11.058 1.31193 12.7565C2.07973 15.9113 4.33828 18.5368 7.3681 19.7602L7.50016 19.8135C8.81128 20.3429 10.3132 19.7053 10.8512 18.4063C10.9993 18.0488 11.3518 17.8116 11.7414 17.8116Z" stroke="#9A9A9A" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <h4>Мои отзывы</h4>
                                    </div>
                                    <div onClick={() => {
                                        setNavigation(6)
                                    }} className={styles.navigation}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                                            <path d="M13.7876 6.27333V5.20793C13.7876 2.88415 12.0644 1 9.939 1H4.84756C2.72326 1 1 2.88415 1 5.20793V17.9174C1 20.2412 2.72326 22.1253 4.84756 22.1253H9.94945C12.0685 22.1253 13.7876 20.2469 13.7876 17.9299V16.8531" stroke="#9A9A9A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M20.8822 11.5629H8.30664" stroke="#9A9A9A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17.8237 8.23389L20.8817 11.5626L17.8237 14.8924" stroke="#9A9A9A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <h4>Выйти</h4>
                                    </div>
                                </div>
                                {navigation === 0 ? <div className={styles.personalData}>
                                    <div className={styles.userInfo}>
                                        <h3>{userName} {lastName}</h3>
                                    </div>
                                    <form className={styles.form}>
                                        <fieldset disabled={disabled}>
                                            <input type="text" value={userName} onChange={(t) => setUserName(t.target.value)} name='username' placeholder={userName} />
                                            <input type="text" value={lastName} onChange={(t) => setLastName(t.target.value)} name='lastname' placeholder={lastName} />
                                            <input type="text" value={surName} onChange={(t) => setSurName(t.target.value)} name='surname' placeholder={surName} />
                                            <input type="text" value={email} onChange={(t) => setEmail(t.target.value)} name='email' placeholder={email} />
                                            <div className={disabled !== true ? styles.selectValue : `${styles.disabled} ${styles.selectValue}`} onClick={() => {
                                                disabled === true ? "" : setSelectGender(!selectGender)
                                            }} >
                                                <div className={styles.selected}><p>{selectSex}</p></div>
                                                <div className={styles.choose} style={selectGender === false ? {
                                                    left: 0,
                                                    opacity: 0,
                                                    transition: "0.1s ease-in-out",
                                                    zIndex: -100,
                                                    // background: "#fff"
                                                } : {
                                                    zIndex: 1,
                                                    left: 0,
                                                    opacity: 1,
                                                    transition: "0.2s ease-in-out"
                                                }}>
                                                    {["Male", "Female", "Mentally ill", "Prefer not to say"].map(e => {
                                                        return <div key={e} onClick={() => {
                                                            setSelectSex(e)
                                                        }} className={styles.gender}>{e}</div>
                                                    })}
                                                </div>
                                            </div>
                                            <div className={styles.phoneNumber}>
                                                <DateTimePicker className={styles.dateTimePicker} onChange={setDate} value={date} />
                                            </div>
                                            <div className={styles.phoneNumber}>
                                                <p>+998</p>
                                                <input value={phoneNumber.slice(3)} onChange={(t) => setPhoneNumber(t.target.value)} minLength={9} maxLength={9} required type="text" placeholder={phoneNumber} />
                                            </div>
                                            <div className={disabled !== true ? styles.selectValue : `${styles.selectValue} ${styles.disabeld}`} onClick={() => {
                                                disabled === false && setCountryModalOpener(!countryModalOpener)
                                            }}>
                                                <div className={styles.selected}><p>{address?.country}, {address?.city}</p></div>
                                                <div className={styles.choose} style={countryModalOpener === false ? {
                                                    left: 0,
                                                    opacity: 0,
                                                    transition: "0.5s",
                                                    zIndex: -10,
                                                } : {
                                                    zIndex: 1,
                                                    left: 0,
                                                    opacity: 1,
                                                    transition: "0.3s"
                                                }}>
                                                    {cities.map(e => {
                                                        return <div key={e.city} onClick={() => {
                                                            setAddress({
                                                                city: e.city,
                                                                country: e.country,
                                                                street: "Хз"
                                                            })
                                                        }} className={styles.gender}>{e.city}</div>
                                                    })}
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                    <div className={styles.changeInformation}>
                                        {disabled === true && <button onClick={() => { }}>Изменить пароль</button>}
                                        <button onClick={(e) => {
                                            setDisabled(false)
                                            if (disabled === false) {
                                                handleUpdate(e)
                                                console.log("updating");
                                            }
                                        }}>{disabled === true ? "Изменить" : "Сохранить"}</button>
                                    </div>
                                </div> : navigation === 1 ? <div className={styles.chats}>
                                    <div className={styles.chatWith}>
                                        {[1, 2, 3, 4, 5].map((i, index) => {
                                            return <div key={i * Math.random() / Math.random() ** Math.random()} className={styles.eachChat}>
                                                <Image src={"/images/author.png"} width={68} height={68} alt='author image' />
                                                <h3>Рафаэль Ройтман</h3>
                                            </div>
                                        })}
                                    </div>
                                    <div className={styles.chat}>
                                        <h2>Чат</h2>
                                        <div className={styles.messages}>
                                            <div className={styles.messagesWrapper}>
                                                <div className={styles.msg}>
                                                    <div className={styles.gotMsg}>
                                                        <p>Текст</p>
                                                    </div>
                                                    <div className={styles.createdAt}>
                                                        11.30.2022 15:00
                                                    </div>
                                                </div>
                                                <div className={styles.msgR}>
                                                    <div className={styles.gotMsg}>
                                                        <p>Текст</p>
                                                    </div>
                                                    <div className={styles.createdAt}>
                                                        11.30.2022 15:10
                                                    </div>
                                                </div>
                                                <div className={styles.msg}>
                                                    <div className={styles.gotMsg}>
                                                        <p>Текст</p>
                                                    </div>
                                                    <div className={styles.createdAt}>
                                                        11.30.2022 15:00
                                                    </div>
                                                </div>
                                                <div className={styles.msgR}>
                                                    <div className={styles.gotMsg}>
                                                        <p>Текст</p>
                                                    </div>
                                                    <div className={styles.createdAt}>
                                                        11.30.2022 15:10
                                                    </div>
                                                </div>
                                                <div className={styles.msg}>
                                                    <div className={styles.gotMsg}>
                                                        <p>Текст</p>
                                                    </div>
                                                    <div className={styles.createdAt}>
                                                        11.30.2022 15:00
                                                    </div>
                                                </div>
                                                <div className={styles.msgR}>
                                                    <div className={styles.gotMsg}>
                                                        <p>Текст</p>
                                                    </div>
                                                    <div className={styles.createdAt}>
                                                        11.30.2022 15:10
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <SendMessage />
                                    </div>
                                </div> : navigation === 2 ? <div className={styles.chats}>
                                    <div className={styles.balance}>
                                        <h2>Баланс</h2>
                                        <div className={styles.inCash}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                                <path d="M8.52637 9.66711L14.0001 9.66711" stroke="#29CB73" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M1.52738 18.5518L2.50081 18.3228L1.52738 18.5518ZM1.52738 9.44819L2.50081 9.67718L1.52738 9.44819ZM26.4726 9.4482L27.4461 9.21921L26.4726 9.4482ZM26.4726 18.5518L25.4992 18.3228L26.4726 18.5518ZM18.2634 26.5074L18.0357 25.5337H18.0357L18.2634 26.5074ZM9.73659 26.5074L9.96434 25.5337L9.73659 26.5074ZM9.73659 1.49263L9.96434 2.46635H9.96434L9.73659 1.49263ZM18.2634 1.49263L18.4912 0.518906V0.518906L18.2634 1.49263ZM9.1155 26.3621L8.88775 27.3358L9.1155 26.3621ZM18.8845 26.3621L19.1122 27.3358H19.1122L18.8845 26.3621ZM18.8845 1.63789L18.6567 2.61161L18.8845 1.63789ZM9.1155 1.63789L8.88775 0.664175V0.664175L9.1155 1.63789ZM23.1593 17.6164L22.9703 18.5984H22.9703L23.1593 17.6164ZM23.0791 17.6009L23.2681 16.619L23.2681 16.619L23.0791 17.6009ZM23.0791 10.399L23.2681 11.381L23.2681 11.381L23.0791 10.399ZM23.1593 10.3836L22.9703 9.40163L22.9703 9.40163L23.1593 10.3836ZM26.3079 11.7303C26.8094 11.9619 27.4035 11.7431 27.635 11.2417C27.8666 10.7402 27.6478 10.1461 27.1463 9.91456L26.3079 11.7303ZM27.1463 18.0854C27.6478 17.8539 27.8666 17.2598 27.635 16.7583C27.4035 16.2569 26.8094 16.0381 26.3079 16.2696L27.1463 18.0854ZM20.2649 14.9074L19.2996 15.1686L20.2649 14.9074ZM20.2649 13.0926L21.2301 13.3538L20.2649 13.0926ZM9.34325 2.61161L9.96434 2.46635L9.50884 0.518905L8.88775 0.664175L9.34325 2.61161ZM18.0357 2.46635L18.6567 2.61161L19.1122 0.664173L18.4912 0.518906L18.0357 2.46635ZM18.6567 25.3884L18.0357 25.5337L18.4912 27.4811L19.1122 27.3358L18.6567 25.3884ZM9.96434 25.5337L9.34325 25.3884L8.88775 27.3358L9.50884 27.4811L9.96434 25.5337ZM2.50081 18.3228C1.83306 15.4843 1.83306 12.5157 2.50081 9.67718L0.553952 9.2192C-0.18465 12.3589 -0.184651 15.6411 0.553951 18.7808L2.50081 18.3228ZM25.4992 9.67719C26.1669 12.5157 26.1669 15.4843 25.4992 18.3228L27.4461 18.7808C28.1847 15.6411 28.1846 12.3589 27.4461 9.21921L25.4992 9.67719ZM18.0357 25.5337C15.3772 26.1554 12.6228 26.1554 9.96434 25.5337L9.50884 27.4811C12.4669 28.173 15.5331 28.173 18.4912 27.4811L18.0357 25.5337ZM9.96434 2.46635C12.6228 1.84455 15.3772 1.84455 18.0357 2.46635L18.4912 0.518906C15.5331 -0.172968 12.4669 -0.172969 9.50884 0.518905L9.96434 2.46635ZM9.34325 25.3884C6.00747 24.6082 3.33979 21.8893 2.50081 18.3228L0.553951 18.7808C1.55592 23.0401 4.76688 26.372 8.88775 27.3358L9.34325 25.3884ZM19.1122 27.3358C23.2331 26.372 26.4441 23.0401 27.4461 18.7808L25.4992 18.3228C24.6602 21.8893 21.9925 24.6082 18.6567 25.3884L19.1122 27.3358ZM18.6567 2.61161C21.9925 3.39184 24.6602 6.11073 25.4992 9.67719L27.4461 9.21921C26.4441 4.95991 23.2331 1.62803 19.1122 0.664173L18.6567 2.61161ZM8.88775 0.664175C4.76688 1.62803 1.55592 4.95991 0.553952 9.2192L2.50081 9.67718C3.33979 6.11073 6.00748 3.39184 9.34325 2.61161L8.88775 0.664175ZM23.3483 16.6344L23.2681 16.619L22.8901 18.5829L22.9703 18.5984L23.3483 16.6344ZM23.2681 11.381L23.3483 11.3656L22.9703 9.40163L22.8901 9.41707L23.2681 11.381ZM23.3483 11.3656C24.3454 11.1737 25.375 11.2996 26.3079 11.7303L27.1463 9.91456C25.8364 9.30973 24.3816 9.13002 22.9703 9.40163L23.3483 11.3656ZM22.9703 18.5984C24.3816 18.87 25.8364 18.6903 27.1463 18.0854L26.3079 16.2696C25.375 16.7004 24.3454 16.8263 23.3483 16.6344L22.9703 18.5984ZM21.2301 14.6462C21.1159 14.2242 21.1159 13.7758 21.2301 13.3538L19.2996 12.8314C19.0928 13.5955 19.0928 14.4045 19.2996 15.1686L21.2301 14.6462ZM22.8901 9.41707C21.1447 9.753 19.7693 11.0957 19.2996 12.8314L21.2301 13.3538C21.5128 12.3092 22.3193 11.5636 23.2681 11.381L22.8901 9.41707ZM23.2681 16.619C22.3193 16.4364 21.5128 15.6908 21.2301 14.6462L19.2996 15.1686C19.7693 16.9043 21.1447 18.247 22.8901 18.5829L23.2681 16.619Z" fill="#29CB73" />
                                            </svg>
                                            <div className={styles.cash}>
                                                <p>На счету:</p>
                                                <h3>30$</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.balance}>
                                        <h2>Способы пополнения</h2>
                                        <div className={styles.cards}>
                                            {[55, 56, 57].map((i, index) => {
                                                return <div key={i * Math.random() ** Math.random() / Math.random()} className={styles.card}>
                                                    <Image src={"/images/uzcard.png"} alt='uzcard' width={56} height={66} />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <button className={styles.replenish}>Пополнить</button>
                                </div> : navigation === 3 ? <div className={styles.chats}>
                                    <div className={styles.balance}><h2 style={{
                                        padding: 8
                                    }}>Транзакции</h2></div>
                                    <div className={styles.transactions}>
                                        {[32, 34, 35].map((i, index) => {
                                            return <div key={i} className={styles.transaction}>
                                                <p>ID 7</p>
                                                <h3>Английский с Андреем</h3>
                                                <div className={styles.date}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                                        <path d="M1 9.03829C1 5.84744 1 4.25159 1.92086 3.26074C2.84093 2.26904 4.3228 2.26904 7.28573 2.26904H10.4286C13.3915 2.26904 14.8734 2.26904 15.7935 3.26074C16.7143 4.25159 16.7143 5.84744 16.7143 9.03829V10.7306C16.7143 13.9215 16.7143 15.5173 15.7935 16.5082C14.8734 17.4999 13.3915 17.4999 10.4286 17.4999H7.28573C4.3228 17.4999 2.84093 17.4999 1.92086 16.5082C1 15.5173 1 13.9215 1 10.7306V9.03829Z" stroke="#9A9A9A" strokeWidth="1.5" />
                                                        <path d="M4.9283 2.26923V1M12.7855 2.26923V1M1.39258 6.50002H16.3212" stroke="#9A9A9A" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M13.5712 13.2694C13.5712 13.4938 13.4884 13.709 13.341 13.8677C13.1937 14.0264 12.9938 14.1155 12.7855 14.1155C12.5771 14.1155 12.3772 14.0264 12.2299 13.8677C12.0825 13.709 11.9997 13.4938 11.9997 13.2694C11.9997 13.0449 12.0825 12.8297 12.2299 12.671C12.3772 12.5123 12.5771 12.4232 12.7855 12.4232C12.9938 12.4232 13.1937 12.5123 13.341 12.671C13.4884 12.8297 13.5712 13.0449 13.5712 13.2694ZM13.5712 9.88473C13.5712 10.1091 13.4884 10.3244 13.341 10.4831C13.1937 10.6417 12.9938 10.7309 12.7855 10.7309C12.5771 10.7309 12.3772 10.6417 12.2299 10.4831C12.0825 10.3244 11.9997 10.1091 11.9997 9.88473C11.9997 9.66032 12.0825 9.44509 12.2299 9.28641C12.3772 9.12772 12.5771 9.03857 12.7855 9.03857C12.9938 9.03857 13.1937 9.12772 13.341 9.28641C13.4884 9.44509 13.5712 9.66032 13.5712 9.88473ZM9.64259 13.2694C9.64259 13.4938 9.55981 13.709 9.41246 13.8677C9.26511 14.0264 9.06526 14.1155 8.85688 14.1155C8.64849 14.1155 8.44864 14.0264 8.30129 13.8677C8.15394 13.709 8.07116 13.4938 8.07116 13.2694C8.07116 13.0449 8.15394 12.8297 8.30129 12.671C8.44864 12.5123 8.64849 12.4232 8.85688 12.4232C9.06526 12.4232 9.26511 12.5123 9.41246 12.671C9.55981 12.8297 9.64259 13.0449 9.64259 13.2694ZM9.64259 9.88473C9.64259 10.1091 9.55981 10.3244 9.41246 10.4831C9.26511 10.6417 9.06526 10.7309 8.85688 10.7309C8.64849 10.7309 8.44864 10.6417 8.30129 10.4831C8.15394 10.3244 8.07116 10.1091 8.07116 9.88473C8.07116 9.66032 8.15394 9.44509 8.30129 9.28641C8.44864 9.12772 8.64849 9.03857 8.85688 9.03857C9.06526 9.03857 9.26511 9.12772 9.41246 9.28641C9.55981 9.44509 9.64259 9.66032 9.64259 9.88473ZM5.71401 13.2694C5.71401 13.4938 5.63123 13.709 5.48388 13.8677C5.33653 14.0264 5.13668 14.1155 4.92829 14.1155C4.71991 14.1155 4.52006 14.0264 4.37271 13.8677C4.22536 13.709 4.14258 13.4938 4.14258 13.2694C4.14258 13.0449 4.22536 12.8297 4.37271 12.671C4.52006 12.5123 4.71991 12.4232 4.92829 12.4232C5.13668 12.4232 5.33653 12.5123 5.48388 12.671C5.63123 12.8297 5.71401 13.0449 5.71401 13.2694ZM5.71401 9.88473C5.71401 10.1091 5.63123 10.3244 5.48388 10.4831C5.33653 10.6417 5.13668 10.7309 4.92829 10.7309C4.71991 10.7309 4.52006 10.6417 4.37271 10.4831C4.22536 10.3244 4.14258 10.1091 4.14258 9.88473C4.14258 9.66032 4.22536 9.44509 4.37271 9.28641C4.52006 9.12772 4.71991 9.03857 4.92829 9.03857C5.13668 9.03857 5.33653 9.12772 5.48388 9.28641C5.63123 9.44509 5.71401 9.66032 5.71401 9.88473Z" fill="#9A9A9A" />
                                                    </svg><p>16.09.2023</p>
                                                </div>
                                                <div className={styles.status}>
                                                    <h4>Статус:</h4>
                                                    <h3>Оплачено</h3>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div> : navigation === 4 ? <div className={styles.chats}>
                                    <div className={styles.cardWrapper}>
                                        {[66, 78, 9090].map((i, index) => {
                                            return <CourseCard key={i * Math.random() ** Math.random() / Math.random()} />
                                        })}
                                    </div>
                                </div> : navigation === 5 ? <div className={styles.chats}>
                                    <div className={styles.reviews}>

                                    </div>
                                </div> : ""}
                            </section>
                        </div>
                    </Container>
                </div></>
        )
    }
}
