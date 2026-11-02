'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styles from '@/app/styles/analysis.module.css'
import Outer from '@/assets/analysis/outer.png'
import Middle from '@/assets/analysis/middle.png'
import Inner from '@/assets/analysis/inner.png'
import Demo from '@/assets/analysis/demographics.png'
import CosmeticConcerns from '@/assets/analysis/cosmetic.png'
import Weather from '@/assets/analysis/weather.png'
import SkintypeDetails from '@/assets/analysis/skintype.png'

gsap.registerPlugin(useGSAP)

const AnalysisShapes = () => {
  // GSAP Elements
  const outerDiamond = useRef(null)
  const middleDiamond = useRef(null)
  const innerDiamond = useRef(null)

  // GSAP Animations
  const outerGrow = useRef(null)
  const middleGrow = useRef(null)
  const innerGrow = useRef(null)

  useGSAP(() => {
    // Each shape grows out of the center: from a tiny point (scale 0) to full size (scale 1)
    const grow = (element) => gsap.fromTo(element,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out', paused: true }
    )

    outerGrow.current = grow(outerDiamond.current)
    middleGrow.current = grow(middleDiamond.current)
    innerGrow.current = grow(innerDiamond.current)
  })

  return (
    <div className={styles['shapes__container']}>
      <Image src={Outer} alt="" ref={outerDiamond} />
      <Image src={Middle} alt="" ref={middleDiamond} />
      <Image src={Inner} alt="" ref={innerDiamond} />
      {/* The quadrants are a 4th layer, stacked in the center of the shapes */}
      <div className={styles['quadrant__container']}>
        <Link href="/demographics" className={`${styles['quadrant']} ${styles['quadrant--demographics']}`} onMouseEnter={() => innerGrow.current.play()} onMouseLeave={() => innerGrow.current.reverse()}>
          <Image src={Demo} alt="Demographics" className={styles['quadrant__title']} />
        </Link>
        <div className={`${styles['quadrant']} ${styles['quadrant--cosmetic']}`} onMouseEnter={() => middleGrow.current.play()} onMouseLeave={() => middleGrow.current.reverse()}>
          <Image src={CosmeticConcerns} alt="Cosmetic concerns" className={styles['quadrant__title']} />
        </div>
        <div className={`${styles['quadrant']} ${styles['quadrant--skintype']}`} onMouseEnter={() => middleGrow.current.play()} onMouseLeave={() => middleGrow.current.reverse()}>
          <Image src={SkintypeDetails} alt="Skin type details" className={styles['quadrant__title']} />
        </div>
        <div className={`${styles['quadrant']} ${styles['quadrant--weather']}`} onMouseEnter={() => outerGrow.current.play()} onMouseLeave={() => outerGrow.current.reverse()}>
          <Image src={Weather} alt="Weather" className={styles['quadrant__title']} />
        </div>
      </div>
    </div>
  )
}

export default AnalysisShapes
