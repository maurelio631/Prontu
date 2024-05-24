import { Link } from "react-router-dom";

export function Page404() {
    return(
        <>
            <Link to={'/Aquiro'}>Form</Link><br/>
            <Link to={'/login'}>Login</Link><br />
            <Link to={'/home/pacientes'}>Pacientes</Link><br />
            <Link to={'/home/prontuario'}>Prontuario</Link><br/>
            <Link to={'/home/agenda'}>Agenda</Link>

        </>

    )
}