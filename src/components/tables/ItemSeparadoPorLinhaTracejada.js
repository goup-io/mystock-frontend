
function DivisorTracejado() {

    return <div className="border-[1px] border-dashed border-[#355070] rounded"></div>
}

function ItemSeparadoPorLinhaTracejada(props) {
    return (
        <>
            <li className="flex flex-row justify-between">
                <p className="text-sm">{props.infoEsquerda}</p>
                {props.negativo !=undefined ? <p className="text-sm text-red-600">{props.infoDireita}</p> :<p className="text-sm">{props.infoDireita}</p>}
            </li>
            <DivisorTracejado />
        </>
    )
}

export default ItemSeparadoPorLinhaTracejada