import styles from "@styles/FacebookLoading.module.css";

const FacebookLoading = ({ className }) => {
  return (
    <section className={className}>
      <div className={styles["lds-facebook"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default FacebookLoading;
