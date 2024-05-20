import Logo from "../assets/logo.svg";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-28 h-screen bg-[#efefef]">
      <img className="w-28 py-10 px-4" src={Logo} alt="Logo Prontu e Ponto" />
    </div>
  );
}
