import React from "react";
import styles from '@/app/styles/start.module.css'
import SpinningRectangles from "@/components/SpinningRectangles";
import Image from "next/image";
import CameraLeft from '@/assets/start/cameraleft.png'
import TitleLeft from '@/assets/start/titleleft.png'
import CameraRight from '@/assets/start/cameraright.png'
import TitleRight from '@/assets/start/titleright.png'

export default function page() {
  return (
    <>
      <div className={styles['camera__wrappers']}>
        <div className={styles['camera__wrapper--left']}>
          <SpinningRectangles size={480} />
          <div className={styles['camera__group']}>
            <Image src={CameraLeft} alt="Scan your face here" className={`${styles['camera__icon']} ${styles['camera__icon--left']}`} />
            <Image src={TitleLeft} alt="Allow A.I. to scan your face" className={`${styles['camera__title']} ${styles['camera__title--left']}`} />
          </div>
        </div>
        <div className={styles['camera__wrapper--right']}>
          <SpinningRectangles size={480} />
          <div className={styles['camera__group']}>
            <Image src={CameraRight} alt="Upload an image of yourself here" className={`${styles['camera__icon--right']} ${styles['camera__icon']}`} />
            <Image src={TitleRight} alt="Allow A.I. to access gallery" className={`${styles['camera__title']} ${styles['camera__title--right']}`} />
          </div>
        </div>
      </div>
    </>
  );
}
