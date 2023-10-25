"use client"
import React, { use, useEffect, useState } from 'react'
import styles from "@/styles/auth.module.css"
import Container from '@/app/components/global/Container'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Page = () => {
  const [cookie, setCookie] = useCookies(["hasAccount"])
  const [userName, setUseName] = useState("")
  const [time, setTime] = useState()
  const [surName, setSurname] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassWord] = useState("")
  const [password2, setPassWord2] = useState("")
  const [selectGender, setSelectGender] = useState(false)
  const [selectSex, setSelectSex] = useState("Choose")
  const { push } = useRouter()
  const [date, setDate] = useState<Value>(new Date());

  useEffect(() => {
    if (cookie.hasAccount) {
      push("/profile")
    }
  })

  const handleSubmit = (e: {
    preventDefault: () => void
  }) => {
    e.preventDefault()
    if (password === password2 && selectSex !== "Choose") {
      axios.post(`${process.env.NEXT_PUBLIC_API}/api/users/register`, {
        user: {
          name: userName,
          surname: lastName,
          phone: phoneNumber,
          email: email,
          password: password,
          dateOfBirth: new Date(),
          address: {
            street: "wefwefwef",
            city: "Tashent",
            country: "Uzbekistan"
          },
          gender: selectSex
        }
      }).then((res) => console.log(res.data)).catch((err) => console.log(err))
      setCookie("hasAccount", {
        userName: userName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        gender: selectSex
      }, { path: "/" })
    } else {
      console.log("passwords are not same");
    }
  }
  return (
    <div className={styles.auth}>
      <Container>
        <div className={styles.content}>
          <h2>Регистрация</h2>
          <form onSubmit={handleSubmit} className={styles.singIn}>
            <input autoComplete='false' value={userName} onChange={(t) => setUseName(t.target.value)} tabIndex={1} required type="text" placeholder='Имя' className={styles.getInfo} />
            <input autoComplete='false' required value={phoneNumber} onChange={(t) => setPhoneNumber(t.target.value)} type="text" maxLength={9} minLength={9} tabIndex={3} placeholder='Номер телефона' className={styles.getInfo} />
            <input autoComplete='false' required value={password} onChange={(t) => setPassWord(t.target.value)} type="password" tabIndex={5} placeholder='Пароль' className={styles.getInfo} />
            <input autoComplete='false' required value={lastName} onChange={(t) => setLastName(t.target.value)} tabIndex={2} type="text" placeholder='Фамилия' className={styles.getInfo} />
            <input autoComplete='false' required value={email} onChange={(t) => setEmail(t.target.value)} type="email" tabIndex={4} placeholder='Email' className={styles.getInfo} />
            <input autoComplete='false' required value={password2} onChange={(t) => setPassWord2(t.target.value)} type="password" tabIndex={6} placeholder='Подтвердите парль' className={styles.getInfo} />
            <input autoComplete='false' value={surName} onChange={(t) => setSurname(t.target.value)} tabIndex={2.1} required type="text" placeholder='Отчество' className={styles.getInfo} />
            <div tabIndex={7} className={styles.selectValue} onClick={() => {
              setSelectGender(!selectGender)
            }}>
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
            <div className={styles.selectValue}>
            <DateTimePicker className={styles.dateTimePicker} onChange={setDate} value={date} />
            </div>
            <div className={styles.complete}>
              <button tabIndex={9}>Зарегестрироваться</button>
              <Link tabIndex={9.1} href={"/auth/login"}>Уже есть аккаунт?</Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Page