import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { HiMiniUsers } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 768);
  const pathname = location.pathname;
  
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    isVisible && (
      <div className="flex flex-col p-5 gap-10 items-center min-w-[70px] man-w-[108px] w-1/12 min-h-[546px]  h-[calc(100vh - 80px)] bg-[#F6FAFD] border-2 border-cinza-escuro/20 rounded-full m-4">

        <Link to={'/home/agenda'} 
          className={`${pathname == '/home/agenda' ? 'bg-azul-principal border-azul-principal text-white ' :'bg-white border-cinza-escuro/20 text-black/70 '}
            border-2 w-14 h-14 rounded-full flex items-center justify-center`}> 
          <FaRegCalendarAlt className="size-6" />
        </Link>

        <Link to={'/home/pacientes'}
          className={`${pathname == '/home/pacientes' ? 'bg-azul-principal border-azul-principal text-white ' : 'bg-white border-cinza-escuro/20 text-black/70 '}
            border-2 w-14 h-14 rounded-full flex items-center justify-center`}>
          <HiMiniUsers className="size-6" />
        </Link>

        <Link to={'/home/ajustes'}
          className={`${pathname == '/home/ajustes' ? 'bg-azul-principal border-azul-principal text-white ' : 'bg-white border-cinza-escuro/20 text-black/70 '}
            border-2 w-14 h-14 rounded-full flex items-center justify-center`}>
          <GoGear className="size-6" />
        </Link>

      </div>
    )
  );
}
