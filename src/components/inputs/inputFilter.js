
function InputFilter(props) {

    return (
      
            <div className="w-full flex justify-evenly items-center text-center ">
                <p className="text-[1.2rem] text-black font-normal">{props.children}:</p>
                <input type={`${props.type}`} placeholder={`${props.placeholder}`} className="w-[8rem] h-6 rounded bg-[F5F3F4] flex text-center text-[1rem] font-[300] text-[#555] border border-gray-700"
                ></input>
            </div>
     
    );
}


export default InputFilter;