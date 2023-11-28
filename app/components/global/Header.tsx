"use client"
import Link from 'next/link'
import React, { memo, useEffect, useState } from 'react'
import Image from 'next/image'
import Notification from '../local/utils/Notification'
import styles from "@/styles/header.module.css"
import Container from './Container'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
import { stagger, useAnimate } from 'framer-motion'
const nav_items = [
  { name: "Главная", link: "/" }, { name: "Категории", link: "/category" }, { name: "Мои чаты", link: "/profile" }
]

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations = isOpen
      ? [
        [
          "nav",
          { transform: "translateX(0%)" },
          { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 }
        ],
        [
          "li",
          { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
          { delay: stagger(0.05), at: "-0.1" }
        ]
      ]
      : [
        [
          "li",
          { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
          { delay: stagger(0.05, { from: "last" }), at: "<" }
        ],
        ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }]
      ];

    animate([
      [
        "path.top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" }
      ],
      ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" }
      ],
      // @ts-ignore
      ...menuAnimations
    ]);
  }, [isOpen]);

  return scope;
}

const languages = ["/icons/ru.svg", "/icons/uz.svg"]
function Header() {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("/icons/ru.svg");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [nav, setNav] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition > lastScrollPosition && isHeaderVisible) {
        setIsHeaderVisible(false);
      } else if (
        currentScrollPosition < lastScrollPosition &&
        !isHeaderVisible
      ) {
        setIsHeaderVisible(true);
      }
      setLastScrollPosition(currentScrollPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHeaderVisible, lastScrollPosition]);
  const changeBgHandler = () => {
    if (window.scrollY >= 16) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeBgHandler);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const scope = useMenuAnimation(isOpen);
  const [notification, setNotification] = useState(false)
  const [cookie, setCookie] = useCookies(["hasAccount"])
  const { push } = useRouter()
  return (
    <header style={
      isHeaderVisible === true
        ? {
          transition: "0.3s",
          opacity: 1,
          transform: "translate3d(0px, 0px, 0px)",
        }
        : {
          opacity: 0,
          transform: "translate3d(0px, -113px, 0px)",
          transition: "0.3s",
        }
    } className={!nav ? styles.header : styles.headerNav}>
      <Container>
        <Link href={"/"} className={styles.headerLogo}>
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="55" viewBox="0 0 70 55" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M34.5813 25.8979L65.1056 0.0374035L67.0902 2.36913L34.5353 29.9499L3.40976 2.34643L5.44673 0.0601083L34.5813 25.8979Z" fill="#29CB73" />
            <path d="M14.1525 11.7432C7.75395 13.5417 3.06605 19.4093 3.06605 26.3654C3.06605 34.7544 9.88232 41.555 18.2908 41.555C21.638 41.555 24.7288 40.4791 27.2408 38.6546L27.243 38.6531L31.9584 35.2L31.9552 35.1977L34.5445 33.2992L34.5492 33.3027L34.5537 33.2994L37.1439 35.1958L37.1399 35.2L41.8574 38.6546C44.3694 40.4791 47.4602 41.555 50.8074 41.555C59.2158 41.555 66.0321 34.7544 66.0321 26.3654C66.0321 19.4093 61.3442 13.5417 54.9456 11.7432L55.777 8.79878C63.4626 10.959 69.0982 18.0036 69.0982 26.3654C69.0982 36.4438 60.9092 44.614 50.8074 44.614C46.7891 44.614 43.0693 43.3194 40.0503 41.1259L40.0457 41.1225L34.5491 37.0973L29.0525 41.1225L29.0479 41.1259C26.0289 43.3194 22.3091 44.614 18.2908 44.614C8.18911 44.614 0 36.4438 0 26.3654C0 18.0036 5.63556 10.959 13.3212 8.79878L14.1525 11.7432Z" fill="#29CB73" />
            <path fillRule="evenodd" clipRule="evenodd" d="M54.098 24.1099C54.098 20.8414 51.7264 18.1223 48.6061 17.5778L49.1344 14.5645C53.6966 15.3608 57.1641 19.3298 57.1641 24.1099C57.1641 29.4619 52.8154 33.8006 47.451 33.8006C42.0867 33.8006 37.738 29.4619 37.738 24.1099H40.8041C40.8041 27.7725 43.78 30.7416 47.451 30.7416C51.1221 30.7416 54.098 27.7725 54.098 24.1099Z" fill="#29CB73" />
            <path fillRule="evenodd" clipRule="evenodd" d="M21.4683 17.4783C17.7973 17.4783 14.8214 20.4474 14.8214 24.11C14.8214 27.7725 17.7973 30.7416 21.4683 30.7416C25.1394 30.7416 28.1153 27.7725 28.1153 24.11H31.1814C31.1814 29.462 26.8327 33.8006 21.4683 33.8006C16.104 33.8006 11.7553 29.462 11.7553 24.11C11.7553 18.7579 16.104 14.4193 21.4683 14.4193V17.4783Z" fill="#29CB73" />
            <path fillRule="evenodd" clipRule="evenodd" d="M42.2052 41.0111L34.5306 54.4106L26.8913 41.0083L29.5565 39.4961L34.537 48.2339L39.5431 39.4934L42.2052 41.0111Z" fill="#29CB73" />
            <path fillRule="evenodd" clipRule="evenodd" d="M13.9731 3.81734C12.9882 3.68201 11.7214 4.02143 9.4592 5.55035L7.73961 3.01775C10.1471 1.39065 12.2319 0.490211 14.3915 0.786957C16.4873 1.07494 18.2706 2.45325 20.1827 4.21136C22.8481 6.66209 25.8233 9.70839 28.4435 12.3913C29.6263 13.6023 30.7367 14.7392 31.7136 15.7139C33.2748 17.2715 34.486 18.4889 35.1918 20.2405C35.8846 21.9601 36.0414 24.0582 36.0414 27.278H32.9754C32.9754 24.0355 32.7933 22.4891 32.347 21.3814C31.9136 20.3057 31.1854 19.513 29.5456 17.877C28.512 16.8457 27.3673 15.6735 26.1643 14.4416C23.5723 11.7872 20.7097 8.85577 18.1049 6.46079C16.1759 4.68716 15.0219 3.96145 13.9731 3.81734Z" fill="#29CB73" />
            <path fillRule="evenodd" clipRule="evenodd" d="M43.5732 13.8604C42.5805 14.6848 41.6177 15.4843 40.6833 16.4166C38.4021 18.6925 37.3672 19.8214 36.7971 21.1115C36.2359 22.3815 36.0703 23.9459 36.0703 27.2725H33.0042C33.0042 23.9876 33.1376 21.8101 33.9915 19.8776C34.8365 17.9653 36.3326 16.4311 38.5153 14.2535C39.5556 13.2156 40.6304 12.3236 41.6142 11.5071C41.743 11.4002 41.8702 11.2947 41.9956 11.1902C43.1015 10.269 44.0717 9.43043 44.8995 8.47507C46.4773 6.65417 47.6383 4.29578 47.6383 0H50.7043C50.7043 4.97871 49.3112 8.06104 47.219 10.4756C46.2118 11.638 45.068 12.6159 43.9607 13.5384C43.831 13.6464 43.7019 13.7536 43.5732 13.8604Z" fill="#29CB73" />
          </svg>
        </Link>
        <nav className={styles.navigation}>
          <div className={styles.navWrapper}>
            {nav_items.map(e => {
              return <Link className={styles.navItem} key={e.name} as={`${e.link}`} href="/">{e.name}</Link>
            })}
          </div>
          <div
            onMouseOver={() => {
              setMouseOver(true);
            }}
            onMouseLeave={() => {
              setMouseOver(false);
            }}
            className={styles.languages}
          >
            <div className={styles.image}>
              <Image src={language} width={30} height={30} alt="vdsdv" />
            </div>
            <div
              className={mouseOver ? styles.selectLanguage : styles.just}
              style={
                !mouseOver
                  ? {
                    display: "none",
                  }
                  : {}
              }
            >
              {languages.map((e: string) => {
                return (
                  <li
                    key={e}
                    onClick={() => {
                      setLanguage(e);
                      setMouseOver(false);
                    }}
                  >
                    <Image src={e} width={30} height={30} alt="j" />
                  </li>
                );
              })}
            </div>
          </div>
          <div onClick={()=> {
            setNotification(!notification)
          }} className={styles.notification}>
            <p>1</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" viewBox="0 0 25 30" fill="none">
              <path d="M3.34262 9.76156L4.30876 10.0196L3.34262 9.76156ZM9.67618 3.02544L9.36379 2.07549V2.07549L9.67618 3.02544ZM3.27388 10.0189L2.30775 9.76089L2.30775 9.76089L3.27388 10.0189ZM2.97733 16.3491L3.96338 16.1827L2.97733 16.3491ZM3.01183 16.5536L2.02578 16.72L2.02578 16.72L3.01183 16.5536ZM3.74097 23.4887L3.94337 22.5094L3.74097 23.4887ZM4.30462 23.6052L4.50701 22.6259H4.50701L4.30462 23.6052ZM20.6954 23.6052L20.493 22.6259L20.6954 23.6052ZM21.259 23.4887L21.4614 24.468L21.259 23.4887ZM21.9948 16.5144L22.9808 16.6808L22.9808 16.6808L21.9948 16.5144ZM22.0314 16.2975L21.0453 16.1311V16.1311L22.0314 16.2975ZM21.764 10.0628L20.7958 10.3132L20.7958 10.3132L21.764 10.0628ZM21.6683 9.69274L22.6364 9.44236V9.44236L21.6683 9.69274ZM15.5162 3.03501L15.8339 2.08681L15.5162 3.03501ZM22.2413 17.0232L21.7476 17.8928L22.2413 17.0232ZM2.79089 17.0052L2.30667 16.1302L2.79089 17.0052ZM13.5 0.999756C13.5 0.447471 13.0523 -0.000244141 12.5 -0.000244141C11.9477 -0.000244141 11.5 0.447471 11.5 0.999756H13.5ZM11.5 2.56268C11.5 3.11497 11.9477 3.56268 12.5 3.56268C13.0523 3.56268 13.5 3.11497 13.5 2.56268H11.5ZM7.91396 24.1828L8.02727 23.1893L6.83035 23.0527L6.91652 24.2543L7.91396 24.1828ZM17.086 24.1828L18.0835 24.2543L18.1697 23.0527L16.9727 23.1893L17.086 24.1828ZM16.9469 25.0754L17.9188 25.311L16.9469 25.0754ZM16.8212 25.594L15.8493 25.3584L16.8212 25.594ZM13.5793 28.8706L13.8151 29.8424H13.8151L13.5793 28.8706ZM11.4207 28.8706L11.1849 29.8424L11.4207 28.8706ZM8.17879 25.594L7.20693 25.8295L8.17879 25.594ZM8.05311 25.0754L9.02497 24.8399L8.05311 25.0754ZM4.30876 10.0196C5.07221 7.16107 7.2321 4.88187 9.98858 3.97539L9.36379 2.07549C5.96128 3.19441 3.31296 5.99718 2.37649 9.50352L4.30876 10.0196ZM4.24002 10.277L4.30876 10.0196L2.37649 9.50352L2.30775 9.76089L4.24002 10.277ZM3.96338 16.1827C3.63164 14.217 3.72611 12.2011 4.24002 10.277L2.30775 9.76089C1.71984 11.9621 1.61187 14.2675 1.99127 16.5155L3.96338 16.1827ZM3.99789 16.3872L3.96338 16.1827L1.99127 16.5155L2.02578 16.72L3.99789 16.3872ZM2 20.0715C2 19.1187 2.51987 18.2981 3.2751 17.8801L2.30667 16.1302C0.928507 16.8929 0 18.3758 0 20.0715H2ZM3.94337 22.5094C2.82562 22.2784 2 21.2687 2 20.0715H0C0 22.1914 1.46686 24.0398 3.53858 24.468L3.94337 22.5094ZM4.50701 22.6259L3.94337 22.5094L3.53858 24.468L4.10222 24.5845L4.50701 22.6259ZM20.493 22.6259C15.2179 23.7161 9.78205 23.7161 4.50701 22.6259L4.10222 24.5845C9.6443 25.7299 15.3557 25.7299 20.8978 24.5845L20.493 22.6259ZM21.0566 22.5094L20.493 22.6259L20.8978 24.5845L21.4614 24.468L21.0566 22.5094ZM23 20.0715C23 21.2687 22.1744 22.2784 21.0566 22.5094L21.4614 24.468C23.5331 24.0398 25 22.1914 25 20.0715H23ZM21.7476 17.8928C22.4906 18.3146 23 19.1283 23 20.0715H25C25 18.3929 24.0901 16.9228 22.7349 16.1535L21.7476 17.8928ZM21.0453 16.1311L21.0087 16.348L22.9808 16.6808L23.0174 16.4639L21.0453 16.1311ZM20.7958 10.3132C21.2868 12.2117 21.3719 14.1959 21.0453 16.1311L23.0174 16.4639C23.3908 14.2516 23.2936 11.9834 22.7321 9.81242L20.7958 10.3132ZM20.7001 9.94312L20.7958 10.3132L22.7321 9.81242L22.6364 9.44236L20.7001 9.94312ZM15.1985 3.9832C17.8962 4.88706 19.9716 7.12607 20.7001 9.94312L22.6364 9.44236C21.7417 5.98272 19.1859 3.20991 15.8339 2.08681L15.1985 3.9832ZM9.98858 3.97539C11.6788 3.41957 13.5158 3.41943 15.1985 3.9832L15.8339 2.08681C13.738 1.38459 11.4589 1.38651 9.36379 2.07549L9.98858 3.97539ZM22.7349 16.1535C22.9046 16.2498 23.0197 16.4504 22.9808 16.6808L21.0087 16.348C20.9009 16.9871 21.2225 17.5947 21.7476 17.8928L22.7349 16.1535ZM2.02578 16.72C1.98304 16.4667 2.11005 16.239 2.30667 16.1302L3.2751 17.8801C3.79047 17.5949 4.10212 17.0048 3.99789 16.3872L2.02578 16.72ZM11.5 0.999756V2.56268H13.5V0.999756H11.5ZM7.80064 25.1764C10.9238 25.5326 14.0762 25.5326 17.1994 25.1764L16.9727 23.1893C14.0002 23.5283 10.9998 23.5283 8.02727 23.1893L7.80064 25.1764ZM17.9188 25.311C18.0029 24.9638 18.058 24.6103 18.0835 24.2543L16.0886 24.1113C16.071 24.3569 16.033 24.6006 15.975 24.8399L17.9188 25.311ZM17.7931 25.8295L17.9188 25.311L15.975 24.8399L15.8493 25.3584L17.7931 25.8295ZM13.8151 29.8424C15.7839 29.3646 17.313 27.8101 17.7931 25.8295L15.8493 25.3584C15.5418 26.6271 14.5689 27.6014 13.3434 27.8988L13.8151 29.8424ZM11.1849 29.8424C12.0495 30.0522 12.9505 30.0522 13.8151 29.8424L13.3434 27.8988C12.7888 28.0334 12.2112 28.0334 11.6566 27.8988L11.1849 29.8424ZM7.20693 25.8295C7.68698 27.8101 9.2161 29.3646 11.1849 29.8424L11.6566 27.8988C10.4311 27.6014 9.45816 26.6271 9.15065 25.3584L7.20693 25.8295ZM7.08125 25.311L7.20693 25.8295L9.15065 25.3584L9.02497 24.8399L7.08125 25.311ZM6.91652 24.2543C6.94204 24.6103 6.9971 24.9638 7.08125 25.311L9.02497 24.8399C8.96698 24.6006 8.929 24.3569 8.91139 24.1113L6.91652 24.2543Z" fill="#DBDBDB" />
            </svg>
            <Notification open={notification} setOpen={setNotification}/>
          </div>
          <button className={styles.navPersonal} onClick={() => {
            if (cookie.hasAccount) {
              push("/profile")
            } else {
              push("/auth/login")
            }
          }}>Личный кабинет</button>
        </nav>
        <div className={styles.burger} ref={scope}>
          <Menu />
          <MenuToggle toggle={() => setIsOpen(!isOpen)} />
        </div>
      </Container>
    </header>
  )
}

const Path = (props: any) => (
  <path
    fill="transparent"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }: any) => (
  <button onClick={toggle}>
    <svg width="23" height="18" viewBox="0 0 23 18">
      <Path
        d="M 2 2.5 L 20 2.5"
        className="top"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle" />
      <Path
        d="M 2 16.346 L 20 16.346"
        className="bottom"
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);


export function Menu() {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>Portfolio</li>
        <li>About</li>
        <li>Contact</li>
        <li>Search</li>
      </ul>
    </nav>
  );
}

export default memo(Header)
