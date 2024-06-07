import { useDarkMode } from "../utils/DarkModeContext";


export default function Wrapper({ children }) {

  const {darkMode} = useDarkMode();

  return <div className={`flex flex-row h-screen ${darkMode && 'dark'}`}>{children}</div>;
}
