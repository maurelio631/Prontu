import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 768);

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
      <div className="flex flex-col w-28 min-h-screen bg-[#efefef]">
        <img className="w-28 py-10 px-4" src={Logo} alt="Logo Prontu e Ponto" />
      </div>
    )
  );
}
