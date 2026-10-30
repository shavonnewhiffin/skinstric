"use client"

import { useState } from "react";
import FooterNav from '../../components/Signup/FooterNav'
import Image from "next/image";
import ToStartAnalysis from "@/assets/signup/tostartanalysis.png";
import Large from "@/assets/signup/large.png";
import Medium from "@/assets/signup/medium.png";
import Small from "@/assets/signup/small.png";
import Cta from "@/assets/signup/clicktotype.png";
import Underline from "@/assets/signup/underline.png";
import styles from '@/app/styles/signup.module.css'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Letters (including accents), spaces, apostrophes and hyphens only
const isValid = (value) => /^[\p{L}\s'-]+$/u.test(value.trim());

const SignupForm = () => {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        setError("")

        if (step === 1){
            if (!isValid(name)){
                setError("Please enter a valid name (letters only)");
                return;
            }
            setStep(2);
            return;
        }
        if (step === 2){
            if(!isValid(location)) {
                setError("Please enter a valid location (letters only)");
                return;
            }
            setLoading(true)
            try {
                const res = await fetch (
                     "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
                     {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: name.trim(), location: location.trim() }),
                     }
                )
                if(!res.ok) throw new Error("Request failed");
                localStorage.setItem("user", JSON.stringify({ name, location }))
                setStep(3)
            } catch {
                setError("Something went wrong, please try again")
            } finally {
                setLoading(false)
            }
        }
    }

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

        {step === 3 ? (
          <div className={styles['success__wrapper']}>
            <p className={styles['success__title']}>Thank you!</p>
            <p className={styles['success__text']}>Proceed for the next step</p>
          </div>
        ) : (
          <>
            <div className={styles['cta__wrapper']}>
              {loading ? (
                <div className={styles['loading__wrapper']}>
                  <div className={styles['loading__text']}>
                    Processing your submission
                  </div>
                  <div className={styles['loading__spinner']}>
                    <AiOutlineLoading3Quarters />
                  </div>
                </div>
              ) : (
                <Image src={Cta} alt="Click to type" />
              )}
            </div>
            <form className={styles['input__wrapper']} onSubmit={handleSubmit}>
              {step === 1 && (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles['input__field']}
                  placeholder="Introduce Yourself"
                />
              )}
              {step === 2 && (
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={styles['input__field']}
                  placeholder="Where are you from"
                />
              )}
              <Image src={Underline} alt="" className={styles['input__underline']} />
              {error && <p className={styles['error']}>{error}</p>}
            </form>
          </>
        )}
      </div>
    <FooterNav showProceed={step === 3} />
    </>
  );
};

export default SignupForm;
