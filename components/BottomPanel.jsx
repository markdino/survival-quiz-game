import Glass from "./Glass";

const BottomPanel = ({ children}) => {
  return (
    <>
      <Glass
      opacity={0.3}
        className="w-2/5 h-1/5 mb-8 absolute bottom-0"
      >
        <div className="w-full h-full px-16 flex justify-between items-center">
          {children}
        </div>
      </Glass>
    </>
  );
};

export default BottomPanel;
