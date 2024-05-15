import imgSearchModal from '../../assets/SearchModal.png'

function ButtonSearchModal() {

    return (

        <button className="w-6 h-6 bg-slate-600 font-semibold rounded-r-md text-white flex justify-center items-center"> 
            <img className="w-4/5 h-3/5"  src={`${imgSearchModal}`}></img>
        </button>

    );

}

export default ButtonSearchModal;