import Button from '../buttons/buttonsModal.js'

function TitleBox(props) {
    
    return(
        <>
            <div class="flex items-center justify-between bg-[#FFFFFF] p-2 px-5 rounded-md drop-shadow-md">
                <h1 class="text-2xl font-medium">{props.title}</h1>
                {props.buttons && props.buttons.length > 0 && (
                    <div className="flex gap-2">
                        {props.buttons.map((button, index) => (
                            <Button key={index} onClick={button.onClick} className="ml-3">{button.label}</Button>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default TitleBox