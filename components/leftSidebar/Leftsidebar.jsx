import styles from "./Leftsidebar.module.css";
import {
  HouseFill,
  Heart,
  Person,
  Chat,
  Gear,
  PlugFill,
} from "react-bootstrap-icons";

export const grabLeftSidebar = () => {
  document.getElementById("leftSidebarId").classList.add("showBar");
};
const hideLeftSidebar = () => {
  document.getElementById("leftSidebarId").classList.remove("showBar");
};

const Leftsidebar = () => {
  return (
    <div className={styles.leftSidebar} id="leftSidebarId">
      <h2 className={styles.logo}>Left Sidebar</h2>
      <ul className={styles.sidebarul}>
        <li>
          <a href="#">
            <HouseFill /> <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#">
            <Heart />
            <span>Followers</span>
          </a>
        </li>
        <li>
          <a href="#">
            <Person />
            <span>People</span>
          </a>
        </li>
        <li>
          <a href="#">
            <Chat />
            <span>Charts</span>
          </a>
        </li>
        <br />
        <br />
        <li>
          <a href="#">
            <Gear />
            <span>Settings</span>
          </a>
        </li>
        <li>
          <a href="#">
            <PlugFill />
            <span>Help</span>
          </a>
        </li>
      </ul>
      <span
        className={styles.hideSidebar}
        onClick={() => hideLeftSidebar()}
      ></span>
    </div>
  );
};

export default Leftsidebar;
