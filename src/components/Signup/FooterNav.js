'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import FooterArrow from '@/assets/signup/footerarrow.png'
import Back from '@/assets/signup/back.png'
import styles from '@/app/styles/footerNav.module.css'

gsap.registerPlugin(useGSAP)

const FooterNav = () => {
  // Elements
  const backWrapperRef = useRef(null)

  // Animations
  const backEmphasis = useRef(null)

  useGSAP(() => {
    backEmphasis.current = gsap.to(backWrapperRef.current, {
      scale: 1.07,
      paused: true,
    })
  })

  return (
    <Link href="/">
    <div
      className={styles['footer__nav--wrapper']}
      onMouseEnter={() => backEmphasis.current.play()}
      onMouseLeave={() => backEmphasis.current.reverse()}
    >
      <figure className={styles['figure__arrow--wrapper']} ref={backWrapperRef}>
        <Image src={FooterArrow} alt="Back arrow" />
      </figure>
      <figure className={styles.back__wrapper}>
        <Image src={Back} alt="Back" />
      </figure>
    </div>
    </Link>
  )
}

export default FooterNav
