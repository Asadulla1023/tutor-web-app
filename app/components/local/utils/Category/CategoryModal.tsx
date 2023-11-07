"use client"

import React, { useState } from 'react'
import styles from "@/styles/category/category.module.css"
import { NextPage } from 'next'
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

interface IModal {
    isOpen: boolean
}

const CategoryModal = ({ isOpen }: IModal) => {
    const [countryModalOpener, setCountryModalOpener] = useState(false)
    const [country, setCountry] = useState<any>({
        address: {
            street: "",
            city: "Choose",
            country: "",
        },
    })
    return (
        <div style={isOpen === true ? {
            opacity: 1,
            zIndex: 10,
            transition: "0.2s ease-in-out"
        } : {
            opacity: 0,
            zIndex: -10,
            transition: "0.2s ease-in-out"
        }} className={styles.modal}>
            <div className={styles.modalContainer}>
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
            </div>
        </div>
    )
}

export default CategoryModal