"use client";

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from '@/app/styles/accessModal.module.css'
import AllowMsg from '@/assets/accessModal/allowmsg.png'
import Line from '@/assets/accessModal/whiteline.png'


export default function AccessModal({ isVisible, setIsVisible, onAllow }) {
    const modalRef = useRef(null)

useEffect(() => {
    function handleClickOutside(event){
        if(modalRef.current && !modalRef.current.contains(event.target)){
                setIsVisible(false)
        }
    }

    if(isVisible) {
        document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [isVisible, setIsVisible])

if (!isVisible) return null;

  return (
    <>
    <div className={styles['modal__wrapper']} ref={modalRef}>
        <div className={styles['modal__top']}>
            <Image src={AllowMsg} alt="Allow A.I. to access your camera" className={styles['allow__message']} />
        </div>
        <figure className={styles['modal__divider--wrapper']}>
            <Image src={Line} alt="" className={styles['modal__divider']}/>
        </figure>
        <div className={styles['modal__bottom']}>
            <div className={styles['modal__buttons--wrapper']}>
                <button className={`${styles['modal__button--deny']} ${styles['modal__button']}`}onClick={() => setIsVisible(false)}>DENY</button>
                <button className={`${styles['modal__button--allow']} ${styles['modal__button']}`} onClick={onAllow}>ALLOW</button>
            </div>
        </div>
    </div>
    </>
  )
}
