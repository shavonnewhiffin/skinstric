'use client'

import { useState } from 'react'
import styles from '@/app/styles/demographics.module.css'
import Image from 'next/image'
import Analysis from '@/assets/demographics/aianalysis.png'
import DemoTitle from '@/assets/demographics/demotitle.png'
import Predicted from '@/assets/demographics/predicted.png'
import Icon from '@/assets/demographics/icon.png'
import ActiveIcon from '@/assets/demographics/iconactive.png'
import FooterNav from '@/components/Signup/FooterNav'


const Page = () => {
const [isactive, setActive] = useState(false);

  return (
    <>
    <div className={styles.row}>
    <div className={styles['demo__results--wrapper']}>
        <div className={styles['demo__upper--wrapper']}>
            <Image src={Analysis} alt="A.I Analysis" />
            <Image src={DemoTitle} alt="Demographics"/>
            <Image src={Predicted} alt="Predicted Race and Age"/>
        </div>
        <div className={styles['demo__results--container']}>
            <div className={styles['demo__results--left']}>
                <div className={styles['demo__results']}>
                    <div className={styles['result']}>Black</div>
                    <h4 className={styles['label']}>RACE</h4>
                </div>
                <div className={styles['demo__results']}>
                    <div className={styles['result']}>10-19</div>
                    <h4 className={styles['label']}>AGE</h4>
                </div>
                <div className={styles['demo__results']}>
                    <div className={styles['result']}>FEMALE</div>
                    <h4 className={styles['label']}>SEX</h4>
                </div>
            </div>
            <div className={styles['demo__results--middle']}>
                <div className={styles['highlight']}> 
                10 -19 y.o. 
                </div>   
                <div className={styles['percentage__circle--wrapper']}> 
                    <div className={styles['percentage__circle--value']}>
                        95%
                    </div>
                </div>   
            </div>
            <div className={styles['demo__results--right']}>
                <div className={styles['demo__right--upper']}>
                    <div className={styles['demo__right--label']}>RACE</div>
                    <div className={styles['demo__right--confidence']}>A.I. CONFIDENCE</div>
                </div>
                <div className={styles['demo__right--lower']}>
                  <div className={`${styles['demo__item']} ${styles['demo__item--active']}`}>
                    <div className={styles['demo__item--left']}>
                        <Image src={ActiveIcon} alt="" />
                        <div className={styles['demo__item--text']}>FEMALE</div>
                    </div>
                    <div className={styles['demo__item--right']}>45%</div>
                  </div>
                  <div className={styles['demo__item']}>
                    <div className={styles['demo__item--left']}>
                        <Image src={Icon} alt="" />
                        <div className={styles['demo__item--text']}>FEMALE</div>
                    </div>
                    <div className={styles['demo__item--right']}>45%</div>
                  </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <FooterNav />
    </>
  )
}

export default Page