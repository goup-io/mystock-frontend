import imgCloseModal from '../../assets/closeModal.png'

function ButtonClearFilter() {

    return (

    <button className="w-6 h-6 bg-red-600 font-semibold rounded text-white flex justify-center items-center"> 
    <img className="w-3/5 h-3/5"  src={`${imgCloseModal}`}></img>
     </button>

    );

}

export default ButtonClearFilter;