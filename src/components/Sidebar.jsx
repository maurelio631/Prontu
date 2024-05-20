import Logo from "../assets/Logo.png";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-28 h-screen bg-[#efefef]">
      <h1>
        <a href="/" className="bg-transparent">
          Prontu
        </a>
        <img className="w-28" src={Logo} alt="Logo Prontu e Ponto" />
      </h1>
    </div>
  );
}
