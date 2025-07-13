import { memo } from "react";
import TopNav from "../ui/Navbar";
import bgImage from '../assets/bg1.jpeg';


const HomeFullScreenLayout = ({ children }) => {

  return (
    <div className={`w-full h-full flex flex-col bg-amber-50`}
    style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <div>
            <TopNav />
        </div>
        <div className="overflow-y-auto overflow-x-hidden" style={{height : 'calc(100dvh - 75px)'}}>
          {children}
        </div>
    </div>
  );
};

export default memo(HomeFullScreenLayout);