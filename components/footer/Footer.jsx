import Image from "next/image";
import Logo from "../../assets/img/dorac.png";
import styles from "./Footer.module.css";


const Footer = () => {
  return (
    <div className="container">
      <div className={styles.footer}>
        <div className={styles.FooterLogo}>
          <Image src={Logo} alt="Image" /> 
        </div>
        <span>DoRac is a metaverse space crypto Play-to-Earn game that will offer <br /> a few ways on how you as a player or just a visitor can participate in it. </span>
      </div>
    </div>
  );
};

export default Footer;
