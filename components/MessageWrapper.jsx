import classNames from "classnames";

const MessageWrapper = ({ children, className }) => (
  <section className={classNames("min_h_occupied flex items-center", className)}>{children}</section>
);

export default MessageWrapper;
