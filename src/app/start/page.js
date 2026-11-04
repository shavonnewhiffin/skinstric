"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StartLoading from "@/components/Start/StartLoading";
import AccessModal from "@/components/AccessModal/AccessModal";
import styles from "@/app/styles/start.module.css";
import SpinningRectangles from "@/components/SpinningRectangles";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import CameraLeft from "@/assets/start/cameraleft.png";
import TitleLeft from "@/assets/start/titleleft.png";
import CameraRight from "@/assets/start/cameraright.png";
import TitleRight from "@/assets/start/titleright.png";
import { SettingUpCamera } from "@/components/SettingUpCamera/SettingUpCamera";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cameraAllowed, setCameraAllowed] = useState(false);

  const handleUpload = async (image) => {
    setLoading(true);
    console.log("Image recieved", image);

    const response = await fetch(
      "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: image,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("API response", data);
    localStorage.setItem("analysis", JSON.stringify(data));

    // Redirect to analysis page
    router.push("/analysis");
  };

  return (
    <>
      {loading ? (
        <StartLoading />
      ) : cameraAllowed ? (<SettingUpCamera />) : (
        <div className={styles["camera__wrappers"]}>
          <div className={styles["camera__wrapper--left"]}>
            <SpinningRectangles size={480} />
            <div className={styles["camera__group"]}>
              <Image
                src={CameraLeft}
                alt="Scan your face here"
                className={`${styles["camera__icon"]} ${styles["camera__icon--left"]}`}
                onClick={() => setIsVisible(true)}
              />
              <Image
                src={TitleLeft}
                alt="Allow A.I. to scan your face"
                className={`${styles["camera__title"]} ${styles["camera__title--left"]}`}
              />
            </div>
            {isVisible && <AccessModal isVisible={isVisible} setIsVisible={setIsVisible} onAllow={() => {
                setCameraAllowed(true);
                setTimeout(() => router.push('/camera'), 2000);
            }}/>}
          </div>
          <div className={styles["camera__wrapper--right"]}>
            <SpinningRectangles size={480} />
            <div className={styles["camera__group"]}>
              <ImageUploader onUpload={handleUpload}>
                <Image
                  src={CameraRight}
                  alt="Upload an image of yourself here"
                  className={`${styles["camera__icon--right"]} ${styles["camera__icon"]}`}
                />
              </ImageUploader>
              <Image
                src={TitleRight}
                alt="Allow A.I. to access gallery"
                className={`${styles["camera__title"]} ${styles["camera__title--right"]}`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
