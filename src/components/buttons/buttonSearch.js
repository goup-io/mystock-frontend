import imgSearchModal from '../../assets/SearchModal.png'

function ButtonSearch() {

    return (

        <button className="w-8 h-8 bg-slate-600 font-semibold rounded-r-lg text-white flex justify-center items-center"> 
            <img className="w-4/5 h-3/5"  src={`${imgSearchModal}`}></img>
        </button>

    );

}

export default ButtonSearch;