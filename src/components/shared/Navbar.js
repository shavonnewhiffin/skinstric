"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Skinstric from '@/assets/nav/Skinstric.png'
import Intro from '@/assets/nav/Intro.png'
import Analysis from '@/assets/nav/analysis.png'
import Button from '@/assets/nav/button.png'
import leftbracket from '@/assets/nav/leftbracket.png'
import rightbracket from '@/assets/nav/rightbracket.png'
import styles from '@/app/styles/navbar.module.css'

const Navbar = () => {
  const pathname = usePathname();

  const analysisPages = ['/analysis', '/demographics']
  const isAnalysis = analysisPages.includes(pathname);

  return (
    <nav>
    <div className={styles.navbar__wrapper}>
        <div className={styles['navbar__wrapper--left']}>
            <Link href="/">
            <div className={styles['logo__img--wrapper']}>
                  <Image src={Skinstric} alt="Skinstric" className={styles.logo}/>
            </div>
            </Link>
            <div className={styles['section__img--wrapper']}>
             <Image src={leftbracket} alt="" className={styles.bracket}/>
            <Image src={isAnalysis ? Analysis : Intro} alt={isAnalysis ? "Analysis section" : "Intro section"} className={styles.intro} />
              <Image src={rightbracket} alt="" className={styles.bracket}/>
            </div>
        </div>
        <div className={styles['navbar__wrapper--right']}>
            {pathname === '/' &&(<div className={styles.button__wrapper}>
              <Image src={Button} alt="button" />
              </div>)}
        </div>
    </div>
    </nav>
  )
}

export default Navbar