import Image from "next/image";

import Logo from "../../assets/img/logo.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className="container">
      <div className={styles.footer}>
        <div className={styles.FooterLogo}>
          <Image src={Logo} alt="Image" /> <span>LOGO HERE</span>
        </div>
        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
      </div>
    </div>
  );
};

export default Footer;
