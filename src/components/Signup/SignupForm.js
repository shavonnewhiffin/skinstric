import Image from "next/image";
import ToStartAnalysis from "@/assets/signup/tostartanalysis.png";
import Large from "@/assets/signup/large.png";
import Medium from "@/assets/signup/medium.png";
import Small from "@/assets/signup/small.png";
import Cta from "@/assets/signup/clicktotype.png";
import Underline from "@/assets/signup/underline.png";
import styles from '@/app/styles/signup.module.css'

const SignupForm = () => {
  return (
    <>
      <div className={styles['test__wrapper']}>
        <Image src={ToStartAnalysis} alt="To start analysis" />
      </div>
      <div className={styles['form__wrapper']}>
        <div className={styles['rectangle__wrapper']}>
        <Image src={Large} alt="" className={styles['rectangle--large']} />
        <Image src={Medium} alt="" className={styles['rectangle--medium']} />
        <Image src={Small} alt="" className={styles['rectangle--small']} />
        </div>
        <div className={styles['cta__wrapper']}>
          <Image src={Cta} alt="Click to type" />
        </div>
        <div className={styles['input__wrapper']}>
          <input type="text"  className={styles['input__field']} placeholder="Introduce Yourself"/>
          <Image src={Underline} alt="" className={styles['input__underline']} />
        </div>
      </div>
    </>
  );
};

export default SignupForm;
