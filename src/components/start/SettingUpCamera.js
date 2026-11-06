import Image from 'next/image'
import SpinningRectangles from '@/components/shared/SpinningRectangles'
import Camera from '@/assets/settingUpCamera/camera.png'
import Points from '@/assets/settingUpCamera/bulletpoints.png'
import SettingUp from '@/assets/settingUpCamera/settingupcamera.png'
import styles from '@/app/styles/settingupCamera.module.css'

export const SettingUpCamera = () => {
  return (
    <div className={styles['camera__loading--wrapper']}>
        <SpinningRectangles size={700}/>
        <div className={styles['loading__hero--wrapper']}>
            <Image src={Camera} alt="" className={styles['camera__img']}/>
            <Image src={SettingUp} alt="Setting up camera" className={styles['camera__loading--text']}/>
        </div>
        <div className={styles['bulletpoints__wrapper']}>
            <Image src={Points} alt="For best results make sure to have neutral expression, frontal pose, adequate lighting" />
        </div>
    </div>
  )
}
