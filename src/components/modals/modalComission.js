
import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "../modals/headerModal";
import LargeComboBoxModal from "./largeComboBoxModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ModalComission() {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
          <div className="w-[40rem]">
          <HeaderModal
             props="Calculadora de Comissão"
             ></HeaderModal>
          </div>
                <div className="w-[40rem] h-[16rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
            
                    <div className="flex w-full justify-start mb-4">
                    <LargeComboBoxModal
                    >Funcionário</LargeComboBoxModal>
                    </div>
                    <div className="flex justify-between mb-4">
                    <InputAndLabelModal
                        type="Text"
                        placeholder="Digite o valor da meta..."
                        >Meta(R$):</InputAndLabelModal>
                           <InputAndLabelModal
                        type="Text"
                        placeholder="Digite a % da comissão..."
                        >Comissão(%):</InputAndLabelModal>
                    </div>
                    <div className="w-full h-[0.1rem] bg-[#355070] mb-4"></div>

                    <div className="w-full h-[2rem] bg-[#DFDFDF] flex items-center justify-end rounded ">
                 <p className="mr-4 font-bold">R$ 20,00</p>
                    </div>
                    <p className=" text-sm ml-[22rem]">o funcionario não alcançou a comissão</p>
                </div>
                <div className="w-[40rem] flex justify-end h-6 ">
                    <ButtonClear>Limpar</ButtonClear>
                   <ButtonModal>Calcular</ButtonModal>
                </div>
            </div>
        </>
    );
}

function AbrirModalComission() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalComission />,
        // width: "auto",
        // heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalComission;