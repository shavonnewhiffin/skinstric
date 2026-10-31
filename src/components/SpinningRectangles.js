import Image from "next/image";
import Large from "@/assets/signup/large.png";
import Medium from "@/assets/signup/medium.png";
import Small from "@/assets/signup/small.png";
import styles from "@/app/styles/spinningRectangles.module.css";

// size = width/height of the whole set in px (764 is the full Figma size)
const SpinningRectangles = ({ size = 764 }) => {
  return (
    <div className={styles['rectangles__wrapper']} style={{ width: size, height: size }}>
      <Image src={Large} alt="" className={`${styles.rectangle} ${styles['rectangle--large']}`} />
      <Image src={Medium} alt="" className={`${styles.rectangle} ${styles['rectangle--medium']}`} />
      <Image src={Small} alt="" className={`${styles.rectangle} ${styles['rectangle--small']}`} />
    </div>
  );
};

export default SpinningRectangles;
