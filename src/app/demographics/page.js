'use client'

import { useState, useEffect } from 'react'
import styles from '@/app/styles/demographics.module.css'
import Image from 'next/image'
import Analysis from '@/assets/demographics/aianalysis.png'
import DemoTitle from '@/assets/demographics/demotitle.png'
import Predicted from '@/assets/demographics/predicted.png'
import Icon from '@/assets/demographics/icon.png'
import ActiveIcon from '@/assets/demographics/iconactive.png'
import FooterNav from '@/components/Signup/FooterNav'


const Page = () => {
const [data, setData] = useState(null);
const [category, setCategory] = useState('race');
const [selected, setSelected] = useState(null);

// Runs once in the browser after the page loads
useEffect(() => {
    const data = localStorage.getItem("analysis")
    if (data) {
        const userData = JSON.parse(data)
        console.log(userData)
        // localStorage only exists in the browser, so it has to be read after the page loads
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData(userData.data)
    }
}, [])


const options = data ? data[category]: {};
const sortedOptions = data ? Object.entries(data[category]).sort((a, b) => b[1] - a[1]) : [] 
const shownLabel = selected ?? sortedOptions[0]?.[0];
// The shown race's confidence as a whole number, e.g. 95
const percent = data ? Math.round(data[category][shownLabel] * 100) : 0;
// Top option of any category, e.g. topOf('age') → "3-9" (same sort as above, first label)
const topOf = (key) => data ? Object.entries(data[key]).sort((a, b) => b[1] - a[1])[0][0] : '';

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
                    <div className={`${styles['demo__results']} ${category === 'race' ? styles['demo__results--active'] : ''}`} onClick={() => {setCategory('race'); setSelected(null)}}>
                    <div className={styles['result']}>{topOf('race')}</div>
                    <h4 className={styles['label']}>RACE</h4>
                </div>
                <div className={`${styles['demo__results']} ${category === 'age' ? styles['demo__results--active'] : ''}`} onClick={() => {setCategory('age'); setSelected(null)}}>
                    <div className={styles['result']}>{topOf('age')}</div>
                    <h4 className={styles['label']}>AGE</h4>
                </div>
                <div className={`${styles['demo__results']} ${category === 'gender' ? styles['demo__results--active'] : ''}`} onClick={() => {setCategory('gender'); setSelected(null)}}>
                    <div className={styles['result']}>{topOf('gender')}</div>
                    <h4 className={styles['label']}>GENDER</h4>
                </div>
            </div>
            <div className={styles['demo__results--middle']}>
                <div className={styles['highlight']}> 
                {shownLabel}
                </div>   
                <div className={styles['percentage__circle--wrapper']}>
                    {/* The ring: grey track + dark fill drawn `percent` of the way around */}
                    <svg className={styles['percentage__ring']} viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" pathLength="100" className={styles['ring__track']} />
                        <circle cx="50" cy="50" r="48" pathLength="100" className={styles['ring__fill']}
                          strokeDasharray={`${percent} 100`} />
                    </svg>
                    {/* The number in the middle */}
                    <div className={styles['percentage__circle--value']}>
                        {percent}%
                    </div>
                </div>
            </div>
            <div className={styles['demo__results--right']}>
                <div className={styles['demo__right--upper']}>
                    <div className={styles['demo__right--label']}>{category}</div>
                    <div className={styles['demo__right--confidence']}>A.I. CONFIDENCE</div>
                </div>
                <div className={styles['demo__right--lower']}>
                    {sortedOptions.map(([label, value]) => (
                <div className={`${styles['demo__item']} ${label === shownLabel ? styles['demo__item--active'] : ''}`} key={label} onClick={() => setSelected(label)}>
                    <div className={styles['demo__item--left']}>
                        <Image src={label === shownLabel ? ActiveIcon : Icon} alt="" />
                        <div className={styles['demo__item--text']}>{label}</div>
                    </div>
                    <div className={styles['demo__item--right']}>{Math.round(value * 100)}%</div>
                  </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    </div>
    <FooterNav showMessage/>
    </>
  )
}

export default Page