import Image from "next/image";
// internal imports
import styles from "./Card1.module.css";

const Card1 = ({ data }) => {
  return (
    <div className={styles.card1}>
      <span className={styles.bgImg}>
        <Image src={data.bg} alt="Image" />
      </span>
      <span className={styles.personImg}>
        <Image src={data.person} alt="Image" />
      </span>
      <div className={styles.Cardfooter}>
        <h5>{data.title}</h5>
        <button className="button">{data.items} Items</button>
      </div>
    </div>
  );
};

export default Card1;
