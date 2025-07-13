import { memo } from "react";
import bgimage from '../assets/bg.jpg';

const FullScreenLayout = ({ children }) => {

  return (
    <div className={`w-screen h-screen`} style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
      {children}
    </div>
  );
};

export default memo(FullScreenLayout);
