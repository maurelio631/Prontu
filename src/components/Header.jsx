export function Header({ subtitle }) {
    return (
        <header className="px-4">
            <nav className="min-h-24 w-full flex justify-between border-b-2 border-cinza-escuro ">

                <div className="flex items-center">
                    <div className="w-16 h-16 bg-slate-600 rounded-full"></div> {/*img*/}
                    <span className="text-2xl font-semibold pl-4">Clínica Nome</span>
                    
                    
                </div>

                <div className="flex items-center flex-row-reverse">
                    <div className="w-16 h-16 bg-slate-600 rounded-full"></div>
                    <span className="text-base font-medium pr-4">Nome funcionário</span>
                </div>
            </nav>

            {
                subtitle ?
                    <div className="subtitle border-b-2 border-cinza-escuro py-2 text-center">
                        <h3 className="text-xl font-medium">{subtitle}</h3>
                    </div>
                    : null
            }
        </header>
    )
}