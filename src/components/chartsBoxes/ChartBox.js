

function ChartBox(props) {
    const styleContainerClass = `flex flex-col  bg-[#FFFFFF] p-2 rounded-md drop-shadow-md ${props.size === "long" ? "w-full h-1/2" : props.size === "medium" ? "w-3/5 h-full" : props.size === "small" ? "w-2/5 h-full" : "w-full h-full"}`;

    return(
        <>
            <div class={styleContainerClass}>
                <div class="flex">
                    <h3 class="font-semibold">{props.title}</h3>
                </div>
                <div>{props.children}</div>
            </div>
        </>
    )
}

export default ChartBox