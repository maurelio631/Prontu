export function Payment() {
    return (
        <section className="overflow-y-auto max-h-full px-1 pb-20">
            <h2 className="text-2xl font-semibold">Pagamento</h2>
            <p className="mb-5 max-w-2xl"> Registre seu cartão de crédito com segurança. E fique tranquilo, a cobrança é realizada mensalmente no dia de sua escolha e não afetará seu limite disponível.</p>

            <div className="flex flex-col gap-5 max-w-4xl">
                <div className="rounded-lg py-3 px-5 shadow-[0px_1px_6px_0px_#00000040]">
                    <h3 className="text-lg font-bold mb-3">Luna Eloá Santana </h3>

                    <div className="flex justify-between items-center">
                        <div className=" flex items-center gap-8">
                            <img className="w-12 h-12 bg-slate-400 rounded-full" />

                            <div>
                                <p><b>Final:</b>*****1130</p>
                                <p><b>Válido até:</b> 04/25</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="text-vermelho font-semibold p-2 ">Excluir</button>
                            <button className="text-white bg-azul-principal p-2 rounded-lg font-semibold">Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}