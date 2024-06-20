import imgCloseModal from '../../assets/closeModal.png'
import Swal from 'sweetalert2';

function ButtonCloseModal() {

    const handleClick = () => {
        Swal.close();
    }

    return (
        <button onClick={handleClick} className="w-6 h-6 mr-4 bg-red-600 font-semibold rounded text-white flex justify-center items-center" id='btnCloseModal'>
            <img className="w-3/5 h-3/5" src={`${imgCloseModal}`}></img>
        </button>
    );
}

export default ButtonCloseModal;