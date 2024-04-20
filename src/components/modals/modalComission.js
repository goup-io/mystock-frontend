
import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "../modals/headerModal";
import LargeComboBoxModal from "./largeComboBoxModal";

function ModalComission() {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[20.5rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
          <div className="w-[32rem]">
          <HeaderModal
             props="Calculadora de Comissão"
             ></HeaderModal>
          </div>
                <div className="w-[32rem] h-[13.5rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
            
                    <div className="flex w-full justify-start mb-4">
                    <LargeComboBoxModal
                    >Funcionário</LargeComboBoxModal>
                    </div>
                    <div className="flex justify-between mb-4">
                    <InputAndLabelModal
                        type="Text"
                        placeholder="digite o funcionario..."
                        >Meta(R$):</InputAndLabelModal>
                           <InputAndLabelModal
                        type="Text"
                        placeholder="digite o funcionario..."
                        >Comissão(%):</InputAndLabelModal>
                    </div>
                    <div className="w-full h-[0.1rem] bg-[#355070] mb-4"></div>

                    <div className="w-full h-[2rem] bg-[#DFDFDF] flex items-center justify-end rounded ">
                 <p className="mr-4 font-medium">R$ 20,00</p>
                    </div>
                </div>
                <div className="w-[32rem] flex justify-end h-6 ">
                    <ButtonClear>Limpar</ButtonClear>
                   <ButtonModal>Calcular</ButtonModal>
                </div>
            </div>
        </>
    );
}

export default ModalComission;