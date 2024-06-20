import { useState } from "react";

function Clear(setters) {
  setters.forEach(setter => setter(""));
}

function ButtonClearFilter(props){
    const handleClick = () => {
        Clear(props.setters);
    };

    return(
         <button onClick={handleClick} className="w-[4rem] mr-3 bg-gray-500 font-medium rounded text-white">
             <span className="text-white text-base">{props.children}</span>
         </button>
    )
}

export default ButtonClearFilter;
