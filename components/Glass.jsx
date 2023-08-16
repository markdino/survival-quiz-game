import styles from "@styles/Glass.module.css";
import classNames from "classnames";
const Glass = ({
  children,
  className,
  opacity = 0.8,
  blur = 10,
  shadow = 0.5,
  shadowX = "8px",
  shadowY = "32px",
}) => {
  return (
    <section
      className={classNames(styles.glass, className)}
      style={{
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: ` blur(${blur}px)`,
        boxShadow: `0 ${shadowX} ${shadowY} 0 rgba(31, 38, 135, ${shadow})`,
      }}
    >
      {children}
    </section>
  );
};

export default Glass;
