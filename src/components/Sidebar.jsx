import { useEffect, useState } from "react";

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
      <div className="flex flex-col min-w-28 min-h-[546px]  h-[calc(100vh - 80px)] bg-[#F6FAFD] border-2 border-cinza-escuro/20 rounded-full m-4">
      </div>
    )
  );
}
