function Alert({ mensagem, imagem}) {

    return (

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-60 flex flex-col items-center justify-around bg-white p-4 rounded-lg border border-black text-lg font-semibold">

            <img className="w-24 h-24"  src={imagem}></img>
            {mensagem}
            <button className="w-28 h-8 bg-slate-500 rounded-lg text-white"> OK </button>

        </div>

    );
}

export default Alert;