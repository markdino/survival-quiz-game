import Glass from "./Glass";

const RightPanel = ({ children }) => {
  return (
    <Glass
    opacity={0.3}
      className="flex flex-col items-center justify-end
            w-1/4 mt-16 mx-8 mb-8 absolute top-5 right-0 bottom-0"
    >
      <div className="h-full m-24 flex flex-col justify-between items-center">
        {children}
      </div>
    </Glass>
  );
};

export default RightPanel;
