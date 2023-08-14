import styles from "@styles/Glass.module.css";
import classNames from "classnames";
const Glass = ({ children, className }) => {
  return (
    <section className={classNames(styles.glass, className)}>
      {children}
    </section>
  );
};

export default Glass;
