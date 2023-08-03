import classNames from "classnames";

const Divider = ({ text, className, ...props }) => {
  return (
    <div className={classNames("relative", className)} {...props}>
      {text && (
        <div className="absolute inset-x-0 inset-y-0 flex justify-center items-center">
          <p className="px-5 bg-white text-slate-400 font-normal">{text}</p>
        </div>
      )}
      <hr className="my-8" />
    </div>
  );
};

export default Divider;
