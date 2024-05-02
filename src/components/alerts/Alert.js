import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// function Alert(props) {

//     return (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-60 flex flex-col items-center justify-around bg-white p-4 rounded-lg border border-black text-lg font-semibold">
//             <img className="w-24 h-24"  src={props.imagem}></img>
//             {props.mensagem}
//             <button className="w-28 h-8 bg-slate-500 rounded-lg text-white"> OK </button>
//         </div>

//     );
// }

export class Alert{


    static alert(icone, mensagem){
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            imageUrl: icone,
            timerProgressBar: true,
            title: mensagem,
            confirmButtonColor: "#355070"
            // heightAuto: true,
        });
    }

    static alertTimer(icone, mensagem){
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            imageUrl: icone,
            timerProgressBar: true,
            timerProgressBarColor: "#355070",
            timer: 1000,
            title: mensagem,
            confirmButtonColor: "#355070"
            // heightAuto: true,
        });
    }
}




export default Alert;