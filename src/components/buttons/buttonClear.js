import { useState } from "react";

function Clear(setters) {
    console.log(setters);
  setters.forEach(setter => setter(""));
}

/*
function ClearObject(setters) {
    console.log(setters);
  setters.forEach(setter => setter({}));
}
*/
function ButtonClear(props){
    const handleClick = () => {

       
            Clear(props.setters);
        
    };

    return(
         <button onClick={handleClick} className="w-[7.725rem] h-[1.5rem] mr-3 bg-gray-500 font-medium rounded text-white">
             <span className="text-white text-base">{props.children}</span>
         </button>
    )
}

export default ButtonClear;
