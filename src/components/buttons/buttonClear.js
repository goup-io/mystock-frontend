function ButtonClear(props){
    return(
         <button className="w-[7.725rem] h-[1.5rem] mr-3 bg-teal-500 font-medium rounded text-white ">
             <span class="text-white text-base">{props.children}</span>
         </button>
    )
}

export default ButtonClear;