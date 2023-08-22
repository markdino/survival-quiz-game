import styles from "@styles/Ripple.module.css";

const Ripple = ({ className }) => {
  return (
    <section className={className}>
    <div className={styles["lds-ripple"]}>
      <div></div>
      <div></div>
    </div>
    </section>
  );
};

export default Ripple;
