
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import ComboBoxModal from "../smallComboBoxModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ModalEditModel() {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[18.5rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
           <div className="w-[32rem]">
           <HeaderModal
             props="Editar informações do Modelo"
             ></HeaderModal>
           </div>
                <div className="w-[32rem] h-[12rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
            
                    <div className="flex justify-around mb-4">
                    <InputAndLabelModal
                        type="Text"
                        placeholder="digite o código..."
                        >Código</InputAndLabelModal>
                        <InputAndLabelModal
                        type="Text"
                        placeholder="digite o nome..."
                        >Nome</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                    <ComboBoxModal
                    dadosBanco="teste"
                    >Categoria</ComboBoxModal>
                      <ComboBoxModal
                    dadosBanco="teste"
                    >Tipo</ComboBoxModal>
                    </div>
                </div>
                <div className="w-[32rem] flex justify-end  h-6 ">
                    <ButtonClear>Limpar</ButtonClear>
                   <ButtonModal>Cadastrar</ButtonModal>
                </div>
            </div>
        </>
    );
}

function AbrirModalEditModel() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalEditModel />,
        width: "auto",
        heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalEditModel;