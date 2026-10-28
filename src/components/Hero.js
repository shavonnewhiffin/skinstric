'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import LeftRectangle from '@/assets/hero/leftrectangle.png'
import RightRectangle from '@/assets/hero/rightrectangle.png'
import MultiLine from '@/assets/hero/multiline.png'
import HeroText from '@/assets/hero/herotext.png'
import Description from '@/assets/hero/skinstricpara.png'
import LeftArrow from '@/assets/hero/leftarrow.png'
import RightArrow from '@/assets/hero/rightarrow.png'
import Discover from '@/assets/hero/discover.png'
import TakeTest from '@/assets/hero/taketest.png'
import styles from '@/app/styles/hero.module.css'

gsap.registerPlugin(useGSAP)

const Hero = () => {
  // Elements
  const heroTextRef = useRef(null)
  const leftCtaRef = useRef(null)
  const rightCtaRef = useRef(null)
  const leftRectRef = useRef(null)
  const rightRectRef = useRef(null)
  const multiLineRef = useRef(null)
  const leftArrowRef = useRef(null)
  const rightArrowRef = useRef(null)

  // Animations
  const leftTl = useRef(null)
  const rightTl = useRef(null)
  const multiLinePulse = useRef(null)

  useGSAP(() => {
    // Hover "Discover A.I.": slide text right, hide the right side
    leftTl.current = gsap
      .timeline({ paused: true })
      .to(heroTextRef.current, { x: 600, ease: 'none' })
      .to(rightCtaRef.current, { opacity: 0 }, '<')
      .to(rightRectRef.current, { opacity: 0 }, '<')
      .to(leftArrowRef.current, { scale: 1.05 }, '<')

    // Hover "Take Test": slide text left, hide the left side, show the multi-line
    rightTl.current = gsap
      .timeline({ paused: true })
      .to(heroTextRef.current, { x: -600, ease: 'none' })
      .to(leftCtaRef.current, { opacity: 0 }, '<')
      .to(leftRectRef.current, { opacity: 0 }, '<')
      .to(rightRectRef.current, { opacity: 0 }, '<')
      .to(multiLineRef.current, { opacity: 1 }, '<')
      .to(rightArrowRef.current, { scale: 1.05 }, '<')

    // Kept out of rightTl so its endless repeat doesn't slow down reverse()
    multiLinePulse.current = gsap.to(multiLineRef.current, {
      scale: 1.1,
      ease: 'power1.inOut',
      duration: 0.6,
      yoyo: true,
      repeat: -1,
      paused: true,
    })
  })

  const handleRightEnter = () => {
    rightTl.current.play()
    multiLinePulse.current.restart()
  }

  const handleRightLeave = () => {
    rightTl.current.reverse()
    multiLinePulse.current.pause()
  }

  return (
    <div className="hero">
      {/* Left side */}
      <Image
        src={LeftRectangle}
        alt=""
        className={styles['rectangle--left']}
        ref={leftRectRef}
      />
      <div
        className={`${styles.cta__wrapper} ${styles['cta__wrapper--left']}`}
        onMouseEnter={() => leftTl.current.play()}
        onMouseLeave={() => leftTl.current.reverse()}
        ref={leftCtaRef}
      >
        <figure>
          <Image src={LeftArrow} alt="" ref={leftArrowRef} />
        </figure>
        <figure className={styles.cta}>
          <Image src={Discover} alt="Discover A.I." />
        </figure>
      </div>

      {/* Center */}
      <div className={styles['hero__img--container']} ref={heroTextRef}>
        <Image src={HeroText} alt="Sophisticated skincare" />
      </div>

      {/* Right side */}
      <Image
        src={RightRectangle}
        alt=""
        className={styles['rectangle--right']}
        ref={rightRectRef}
      />
      <Image
        src={MultiLine}
        alt=""
        className={styles['rectangle--multi']}
        ref={multiLineRef}
      />
      <div
        className={`${styles.cta__wrapper} ${styles['cta__wrapper--right']}`}
        onMouseEnter={handleRightEnter}
        onMouseLeave={handleRightLeave}
        ref={rightCtaRef}
      >
        <figure>
          <Image src={TakeTest} alt="Take test" />
        </figure>
        <figure className={styles.cta}>
          <Image src={RightArrow} alt="" ref={rightArrowRef} />
        </figure>
      </div>

      {/* Bottom-left description */}
      <div className={styles['skinstric__description--wrapper']}>
        <Image
          src={Description}
          alt="Skinstric developed an A.I that creates a highly personalized routine tailored to what your skin needs."
        />
      </div>
    </div>
  )
}

export default Hero
