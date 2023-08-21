import classNames from "classnames";

const Divider = ({ text, className, ...props }) => {
  return (
    <div className={classNames("flex justify-stretch items-center", {["gap-2"]: text}, className)} {...props}>
      <div className="h-px bg-slate-600 w-full"></div>
      {text && (
         <p className="text-slate-600 font-normal">{text}</p>
      )}
    <div className="h-px bg-slate-600 w-full"></div>
    </div>
  );
};

export default Divider;
