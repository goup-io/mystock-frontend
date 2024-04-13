import imgSearchModal from '../../assets/SearchModal.png'

function ButtonSearchModal() {

    return (

        <button className="w-6 h-6 bg-[gray-700] font-semibold rounded-r-lg text-white flex justify-center items-center"> 
            <img className="w-3/5 h-3/5"  src={`${imgSearchModal}`}></img>
        </button>

    );

}

export default ButtonSearchModal;