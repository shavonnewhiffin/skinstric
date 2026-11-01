import React from "react";
import Image from "next/image";
import SpinningRectangles from "../SpinningRectangles";
import Preparing from "@/assets/start/preparing.png";
import styles from "@/app/styles/start.module.css";

const startLoading = () => {
  return (
    <div className={styles["start__loading"]}>
      <div className={styles["loading__rectangles"]}>
        <SpinningRectangles />
      </div>
      <figure className={styles["loading__wrapper"]}>
        <Image src={Preparing} alt="Preparing your analysis..." />
      </figure>
    </div>
  );
};

export default startLoading;
