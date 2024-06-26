import Button from '../buttons/buttonsModal.js'

function TitleBox(props) {
    
    return(
        <>
            <div className="flex items-center justify-between bg-[#FFFFFF] p-2 px-5 rounded-md drop-shadow-md">
                <h1 className="text-2xl font-medium">{props.title}</h1>
                {props.buttons && props.buttons.length > 0 && (
                    <div className="flex gap-2">
                        {props.buttons.map((button, index) => (
                            <Button key={index} funcao={button.event} className="ml-3">{button.label}</Button>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default TitleBox