'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import FooterArrow from '@/assets/signup/footerarrow.png'
import Back from '@/assets/signup/back.png'
import styles from '@/app/styles/footerNav.module.css'
import Proceed from '@/assets/signup/proceed.png'
import ProceedArrow from '@/assets/signup/proceedarrow.png'
import ifWrong from '@/assets/demographics/ifwrong.png'
import Reset from '@/assets/demographics/reset.png'
import Confirm from '@/assets/demographics/confirm.png'

gsap.registerPlugin(useGSAP)

const FooterNav = ({ showProceed, showMessage }) => {
  // Elements
  const backWrapperRef = useRef(null)
  const proceedWrapperRef = useRef(null)
  const proceedArrowRef = useRef(null)

  // Animations
  const backEmphasis = useRef(null)
  const proceedEmphasis = useRef(null)

  useGSAP(() => {
    backEmphasis.current = gsap.to(backWrapperRef.current, {
      scale: 1.07,
      paused: true,
    })
  })

  // Re-runs when showProceed changes, so the element exists by then
  useGSAP(() => {
    if (!showProceed) return

    // Slide in from the left edge of the screen (plays right away)
    gsap.from(proceedWrapperRef.current, {
      x: -window.innerWidth,
      duration: 1,
      ease: 'power2.out',
    })

    // Hover grow on the arrow only (paused until hover)
    proceedEmphasis.current = gsap.to(proceedArrowRef.current, {
      scale: 1.07,
      paused: true,
    })
  }, { dependencies: [showProceed] })

  return (
    // One row across the bottom: back on the left, message in the middle, actions on the right
    <footer className={styles['footer__row']}>
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

      {showMessage && (
        <div className={styles['ifwrong__wrapper']}>
          If the A.I. estimate is wrong, please edit to the correct value.
        </div>
      )}

      {showMessage && (
        <div className={styles['message__buttons']}>
          <Image src={Reset} alt="Reset" />
          <Image src={Confirm} alt="Confirm" />
        </div>
      )}

      {showProceed && (
        <Link href="/start">
          <div
            className={styles['proceed__wrapper']}
            ref={proceedWrapperRef}
            onMouseEnter={() => proceedEmphasis.current.play()}
            onMouseLeave={() => proceedEmphasis.current.reverse()}
          >
            <figure>
              <Image src={Proceed} alt="Proceed" />
            </figure>
            <figure className={styles['proceed__arrow--wrapper']} ref={proceedArrowRef}>
              <Image src={ProceedArrow} alt="Proceed arrow" />
            </figure>
          </div>
        </Link>
      )}
    </footer>
  )
}

export default FooterNav
