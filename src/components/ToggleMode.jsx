import { useDarkMode } from "../utils/DarkModeContext"

export function ToggleMode (){

    const {darkMode , setDarkMode} = useDarkMode()

    const handleToggleMode = () =>{
        setDarkMode(!darkMode)
    }
    
    return(
        <label className="ui-switch" >
            <input type="checkbox" checked={darkMode} onChange={handleToggleMode} />
                <div className="slider">
                <div className="circle"></div>
                </div>
        </label>
    )
}