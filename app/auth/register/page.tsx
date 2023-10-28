"use client"
import React, { use, useEffect, useState } from 'react'
import styles from "@/styles/auth.module.css"
import Container from '@/app/components/global/Container'
import Link from 'next/link'
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

const countryToSelect = "Uzbekistan"

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

const Page = () => {
  const [cookie, setCookie] = useCookies(["hasAccount"])
  const [selectGender, setSelectGender] = useState(false)
  const [selectSex, setSelectSex] = useState("Choose")
  const [date, setDate] = useState<Value>(new Date());
  const [countryModalOpener, setCountryModalOpener] = useState(false)
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState("")
  const [verify, setVerify] = useState<{
    token: string,
    message: string
  }>()
  const [country, setCountry] = useState({
    address: {
      street: "",
      city: "Choose",
      country: "",
    }
  })
  const { push } = useRouter()
  useEffect(() => {
    if (cookie.hasAccount) {
      push("/profile")
    }
  }, [])


  const verifyUser = (phone: string, code = "0000") => {
    let userInfo
    return axios.put(`${process.env.NEXT_PUBLIC_API}/api/users/verify`, {
      user: {
        phone,
        code
      }
    })
  }

  const getOTPHandler = (phone: string) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API}/api/users/get-code`, {
      user: {
        phone
      }
    })
  }


  const handleSubmit = async (e: {
    preventDefault: () => void,
    target: any
  }) => {
    e.preventDefault()
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data.entries());
    if (obj.password === obj.password2 && selectSex !== "Choose" && country.address.city !== "Choose" && obj.datetime) {
      const otp = await getOTPHandler(`998${obj.phone}`)
      const verificatio = await verifyUser(`998${obj.phone}`).catch(err => {
        setError(true)
        setMsg(err.response.data.message)
      })
      const user = {
        phone: `998${obj.phone}`,
        name: obj.name,
        surname: obj.surName,
        email: obj.email,
        dateOfBirth: obj.datetime,
        password: obj.password,
        address: country.address,
        gender: selectSex,
        lastname: obj.lastName
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/users/register`, {
        user
      }, {
        headers: {
          Authorization: verificatio?.data.token
        }
      }).then(res => {
        setCookie("hasAccount", { user, userToken: res.data.token }, { path: "/" })
        push("/profile")
      }).catch(err => {
        setError(true)
        setMsg("This phone or email has already used");
        // console.log(err.response.data.message);
      })
    } else {
      setMsg("Please fill in the blanks correctly")
      setError(true)
    }
  }
  return (
    <>
      <Error error={error} setError={setError} msg={msg} />
      <div className={styles.auth}>
        <Container>
          <div className={styles.content}>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit} className={styles.singIn}>
              <input autoComplete='false' tabIndex={1} name='name' required type="text" placeholder='Имя' className={styles.getInfo} />
              <input autoComplete='false' required name='phone' type="text" maxLength={9} minLength={9} tabIndex={3} placeholder='Номер телефона' className={styles.getInfo} />
              <input autoComplete='false' required name='password' type="password" tabIndex={5} placeholder='Пароль' className={styles.getInfo} />
              <input autoComplete='false' required name='lastName' tabIndex={2} type="text" placeholder='Фамилия' className={styles.getInfo} />
              <input autoComplete='false' required name='email' type="email" tabIndex={4} placeholder='Email' className={styles.getInfo} />
              <input autoComplete='false' required name='password2' type="password" tabIndex={6} placeholder='Подтвердите парль' className={styles.getInfo} />
              <input autoComplete='false' name='surName' tabIndex={2.1} required type="text" placeholder='Отчество' className={styles.getInfo} />
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
              <div className={styles.selectValue} onClick={() => {
                setCountryModalOpener(!countryModalOpener)
              }}>
                <div className={styles.selected}><p>{country.address.city}</p></div>
                <div className={styles.choose} style={countryModalOpener === false ? {
                  left: 0,
                  opacity: 0,
                  transition: "0.1s ease-in-out",
                  zIndex: -100,
                } : {
                  zIndex: 1,
                  left: 0,
                  opacity: 1,
                  transition: "0.2s ease-in-out"
                }}>
                  {cities.map(e => {
                    return <div key={e.city} onClick={() => {
                      setCountry({
                        address: {
                          city: e.city,
                          country: e.country,
                          street: "Хз"
                        }
                      })
                    }} className={styles.gender}>{e.city}</div>
                  })}
                </div>
              </div>
              <div className={styles.selectValue} style={{
                visibility: "hidden"
              }} />
              <div className={styles.selectValue} style={{
                visibility: "hidden"
              }} />
              <div className={styles.complete}>
                <button tabIndex={9}>Зарегестрироваться</button>
                <Link tabIndex={9.1} href={"/auth/login"}>Уже есть аккаунт?</Link>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  )
}
export default Page