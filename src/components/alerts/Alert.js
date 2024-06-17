import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactDOM from 'react-dom';
import ButtonModal from '../buttons/buttonsModal';
import './btnEspacamento.css';

// function Alert(props) {

//     return (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-60 flex flex-col items-center justify-around bg-white p-4 rounded-lg border border-black text-lg font-semibold">
//             <img className="w-24 h-24"  src={props.imagem}></img>
//             {props.mensagem}
//             <button className="w-28 h-8 bg-slate-500 rounded-lg text-white"> OK </button>
//         </div>

//     );
// }

export class Alert {


    static alert(icone, mensagem) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            imageUrl: icone,
            timerProgressBar: true,
            title: mensagem,
            confirmButtonColor: "#355070"
            // heightAuto: true,
        });
    }

    static alertTimer(icone, mensagem) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            imageUrl: icone,
            timerProgressBar: true,
            timerProgressBarColor: "#355070",
            timer: 1500,
            title: mensagem,
            confirmButtonColor: "#355070"
            // heightAuto: true,
        });
    }

    static alertQuestion(mensagem, opcaoPositiva, opcaoNegativa, funcao, callBack) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Você tem certeza?',
            text: `${mensagem}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: ' ', // Placeholder vazio
            cancelButtonText: ' ', // Placeholder vazio
            buttonsStyling: false,
            didOpen: () => {
                // Renderize os componentes personalizados depois que o modal estiver aberto
                ReactDOM.render(
                    <ButtonModal cor="#D93D3D" className="my-confirm-button" funcao={() => MySwal.clickConfirm()}>
                        {opcaoPositiva}
                    </ButtonModal>,
                    document.querySelector('.swal2-confirm')
                );

                ReactDOM.render(
                    <ButtonModal className="my-cancel-button" funcao={() => MySwal.clickCancel()}>
                        {opcaoNegativa}
                    </ButtonModal>,
                    document.querySelector('.swal2-cancel')
                );
            }
        }).then((result) => {
            if (result.isConfirmed) {
                async function confirmar() {
                    await funcao();
                    MySwal.fire('Excluído!', 'Excluído com sucesso.', 'success');
                    if (callBack) {
                        await callBack();
                    }
                }
                confirmar();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    }

    static alertQuestionCancelar(mensagem, opcaoPositiva, opcaoNegativa, funcao, callBack) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Você tem certeza?',
            text: `${mensagem}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: ' ', // Placeholder vazio
            cancelButtonText: ' ', // Placeholder vazio
            buttonsStyling: false,
            didOpen: () => {
                // Renderize os componentes personalizados depois que o modal estiver aberto
                ReactDOM.render(
                    <ButtonModal cor="#D93D3D" className="my-confirm-button" funcao={() => MySwal.clickConfirm()}>
                        {opcaoPositiva}
                    </ButtonModal>,
                    document.querySelector('.swal2-confirm')
                );

                ReactDOM.render(
                    <ButtonModal className="my-cancel-button" funcao={() => MySwal.clickCancel()}>
                        {opcaoNegativa}
                    </ButtonModal>,
                    document.querySelector('.swal2-cancel')
                );
            }
        }).then((result) => {
            if (result.isConfirmed) {
                async function confirmar() {
                    await funcao();
                    MySwal.fire('Cancelada!', 'Cancelada com sucesso.', 'success');
                    if (callBack) {
                        await callBack();
                    }
                }
                confirmar();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    }

    static alertTop(iconeErro, mensagem){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: !iconeErro ? "success" : "error",
            title: mensagem
          });
    }


}

export default Alert;