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

  const linkClasses = (path) => (
    `${pathname === path 
      ? 'bg-azul-900 border-azul-900 text-white' 
      : 'bg-white border-cinza-900/20 text-black/70 hover:border-azul-900/50'} 
      border-2 w-14 h-14 rounded-full flex items-center justify-center`
  );

  return (
    isVisible && (
      <div className="flex flex-col p-5 gap-10 items-center min-w-[70px] max-w-[102px] w-1/12 min-h-[546px] h-[calc(100vh - 80px)] bg-azul-800 border-2 border-cinza-900/20 rounded-full m-4">
        <Link to="/home/agenda" className={linkClasses('/home/agenda')}>
          <FaRegCalendarAlt className="size-6" />
        </Link>
        <Link to="/home/pacientes" className={linkClasses('/home/pacientes')}>
          <HiMiniUsers className="size-6" />
        </Link>
        <Link to="/home/ajustes" className={linkClasses('/home/ajustes')}>
          <GoGear className="size-6" />
        </Link>
      </div>
    )
  );
}
