
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal"
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ComboBoxModal from "../smallComboBoxModal";
function ModalEditKit() {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[43rem]">
                    <HeaderModal
                        props="Editar informações do Kit"
                    ></HeaderModal>
                </div>
                <div className="w-[43rem] h-[18rem] flex flex-col rounded justify-around p-3 bg-slate-200 border-solid  shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                    <div className="flex justify-around">
                        <InputAndLabelModal
                            placeholder="Digite o modelo..."
                        >Modelo</InputAndLabelModal>
                        <InputAndLabelModal
                            placeholder="Digite o nome..."
                        >Nome</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                    <InputAndLabelModal
                            placeholder="pré cadastrado"
                        >Tamanho</InputAndLabelModal>
                        <ComboBoxModal
                        >Cor</ComboBoxModal>
                    </div>
                    <div className="flex justify-around">
                        <ComboBoxModal
                        >Loja</ComboBoxModal>
                        <InputAndLabelModal
                            placeholder="pré cadastrado"
                        >N.Itens</InputAndLabelModal>
                    </div>
                </div>
                <div className="w-[43rem] flex justify-end  h-6 ">
                    <ButtonClear>Limpar</ButtonClear>
                    <ButtonModal>Cadastrar</ButtonModal>
                </div>
            </div>
        </>
    );
}

function AbrirModalEditKit() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalEditKit />,
        // width: "auto",
        // heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalEditKit;
