
function DivisorTracejado() {

    return <div class="border-[1px] border-dashed border-[#355070] rounded"></div>
}

function ItemSeparadoPorLinhaTracejada(props) {
    return (
        <>
            <li class="flex flex-row justify-between">
                <p class="text-[1.3rem]">{props.infoEsquerda}</p>
                <p class="text-[1.3rem]">{props.infoDireita}</p>
            </li>
            <DivisorTracejado />
        </>
    )
}

export default ItemSeparadoPorLinhaTracejada