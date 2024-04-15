function Card(props) {
    
    return(
        <>
            <div className="bg-[#FFFFFF] flex flex-col items-start p-2 px-4 w-1/5 rounded-md drop-shadow-md">
                <h2 class="text-lg font-medium">{props.info}</h2>
                <span class="text-[#355070] font-light text-sm">{props.descricao}</span>
            </div>
          
        </>
    )
}

export default Card