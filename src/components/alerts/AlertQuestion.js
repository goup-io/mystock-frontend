function AlertQuestion({ mensagem, imagem, textButton}) {

    return (

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-60 flex flex-col items-center justify-around bg-white p-4 rounded-lg border border-black text-lg font-semibold">
          <img src= {imagem}></img>
            {mensagem}
            <div className="w-4/5 flex flex-row justify-around">
            <button className="w-28 h-8 rounded-lg text-white bg-slate-900"> {textButton} </button>
            <button className="w-28 h-8 bg-slate-500 rounded-lg text-white"> Cancelar </button>
            </div>
        </div>

    );
}

export default AlertQuestion;