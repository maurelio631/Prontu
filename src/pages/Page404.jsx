import { Link } from "react-router-dom";

export function Page404() {
    return(
        <>
            <Link to={'/Aquiro'}>Form</Link><br/>
            <Link to={'/login'}>Login</Link><br />
            <Link to={'/login/pacientes'}>Pacientes</Link><br />
            <Link to={'/login/prontuario'}>Prontuario</Link>
        </>

    )
}