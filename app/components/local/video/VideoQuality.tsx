import React, { useEffect, useState } from 'react';
import videojs from 'video.js';
import ReactPlayer from 'react-player'
// import styles from "@/styles/category/course.module.css"
import { useAnimate, stagger, motion } from "framer-motion";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.5 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)"
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.3,
        delay: isOpen ? staggerMenuItems : 0
      }
    );
  }, [isOpen]);

  return scope;
}


interface IVideo {
  setCurrentSecond: Function
  currentSecond: number
}
const VideoQuality = ({ setCurrentSecond, currentSecond }: IVideo) => {
  const [src, setSrc] = useState("/images/480/480p_manifest.mpd")
  const playerRef = React.useRef<ReactPlayer>(null)
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);
  const changeQuality = (val: string) => {
    if (playerRef.current) {
      setCurrentSecond(Math.floor(playerRef.current?.getCurrentTime()))
      setSrc(`/images/${val}/${val}p_manifest.mpd`)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (playerRef.current && src) {
        playerRef.current.seekTo(currentSecond)
      }
    }, 500)
  }, [src])

  // console.dir(playerRef.current)

  return (
    <div>
      <ReactPlayer width={"100%"} height={"fit-content"} ref={playerRef} controls url={src} />
      <nav className={"menu"} style={{
        width: "100%",
        position:"relative"
      }} ref={scope}>
        <motion.button
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: 16,
            background: "hsl(147, 66%, 48%)",
            fontSize: 18,
            fontWeight: 500,
            color: "#fff"
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Video quality
          <div className={"arrow"} style={{ transformOrigin: "50% 55%" }}>
            <svg fill='#fff' width="15" height="15" viewBox="0 0 20 20">
              <path d="M0 7 L 20 7 L 10 16" />
            </svg>
          </div>
        </motion.button>
        <ul
          style={isOpen ? {
            pointerEvents: "auto",
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            background: "hsl(147, 66%, 48%)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 56,
            position: "absolute",
            width: "100%",
            top: 0
          }: {
            width: "100%",
            position: "absolute",
            pointerEvents: "none"
          }}
        >
          <li style={{
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 20,
            color: "#fff"
          }} onClick={() => {
            changeQuality("1080")
          }}>1080p</li>
          <li style={{
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 20,
            color: "#fff"
          }} onClick={() => {
            changeQuality("720")
          }}>720p</li>
          <li style={{
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 20,
            color: "#fff"
          }} onClick={() => {
            changeQuality("480")
          }}>480p</li>
        </ul>{" "}
      </nav>
    </div>
  );
}

export default VideoQuality