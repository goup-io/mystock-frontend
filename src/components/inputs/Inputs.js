// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

function Input(props) {
    return (
        <div className="relative">
            {props.icon && (
                <div className="absolute top-1 left-3">
                    <img src={props.icon} className="h-[2rem]" alt="Ícone" />
                </div>
            )}
            <input 
                value={props.value}
                onChange={(e) => {props.handleInput(e, props.handlerAtributeChanger)}}
                id={props.id} 
                type={`${props.type}`} 
                placeholder={props.placeholder == undefined ? "" : props.placeholder} 
                className="w-[29vw] h-[2.5rem] rounded-[3.125rem] bg-[F5F3F4] pl-14 text-[1.2rem] font-[400] text-[#555] form-control border border-slate-600"
            ></input>
        </div>
    )
}

export default Input