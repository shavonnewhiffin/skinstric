import React from 'react'
import Image from 'next/image'
import LeftRectangle from '@/assets/hero/leftrectangle.png'
import RightRectangle from '@/assets/hero/rightrectangle.png'
import Description from '@/assets/hero/skinstricpara.png'
import HeroText from '@/assets/hero/herotext.png'
import Discover from '@/assets/hero/discover.png'
import TakeTest from '@/assets/hero/taketest.png'
import LeftArrow from '@/assets/hero/leftarrow.png'
import RightArrow from '@/assets/hero/rightarrow.png'
import styles from '@/app/styles/hero.module.css'

const Hero = () => {
  return (
    <div className="hero">
        <div className="right__section--wrapper">
            <div className="right__section--figure">
                <div className="right__section--cta">
                    <figure className="img__wrapper">
                       <Image src={LeftRectangle} alt="" className={styles['rectangle--left']}/>
                    <div className={`${styles['cta__wrapper']} ${styles['cta__wrapper--left']}`}>
                        <figure className="arrow">
                            <Image src={LeftArrow} alt="" />
                        </figure>
                        <figure className={styles.cta}>
                            <Image src={Discover} alt="Discover A.I." />
                        </figure>
                    </div>
                    </figure>
                </div>
            </div>
        </div>
        <div className={styles['hero__img--container']}>
            <Image src={HeroText} alt=""/>
        </div>
        <div className="right__section--wrapper">
            <div className="right__section--figure">
                <div className="right__section--cta">
                    <figure className="img__wrapper">
                       <Image src={RightRectangle} alt="" className= {styles['rectangle--right']} />
                    <div className={`${styles.cta__wrapper} ${styles['cta__wrapper--right']}`}>
                        <figure className="arrow">
                            <Image src={RightArrow} alt="" />
                        </figure>
                        <figure className={styles.cta}>
                            <Image src={TakeTest} alt="TakeTest" />
                        </figure>
                    </div>
                    </figure>
                </div>
            </div>
        </div>
        <div className={styles['skinstric__description--wrapper']}>
            <Image src={Description} alt="Skinstric developed an A.I that creates a highly personalized routine tailored to what your skin needs." />
        </div>
    </div>
  )
}

export default Hero