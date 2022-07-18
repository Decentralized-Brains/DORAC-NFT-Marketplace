import styles from "./Sidebar.module.css";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ title, btnTxt, data }) => {
  return (
    <div className={styles.sidebar}>
      <header className={styles.header}>
        <h5>{title}</h5>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-info dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {btnTxt}
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div className={styles.mainPart}>
        {data.map((val) => (
          <div key={val.id} className={styles.sidebarCard}>
            <div className={styles.cardImage}>
              <Image src={val.img} alt="Image" />
            </div>
            <div className={styles.cardText}>
              <h5>{val.title}</h5>
              <p>{val.text}</p>
              {title === "Notifications" && <p>{val.date}</p>}

              {title === "Notifications" ? (
                <button className="button">Checkout</button>
              ) : (
                <Link href={"/profile/" + val.id}>
                  <button className="button">Profile</button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
