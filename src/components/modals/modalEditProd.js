
import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "./headerModal";

function ModalEditProd() {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[20.5rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
             <HeaderModal
             props="Cadastrar Novo Produto"
             ></HeaderModal>
                <div className="w-[32rem] h-[14rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                    <div className="flex justify-around">
                       <InputAndLabelModal
                       placeholder="digite o modelo..."
                       >Modelo</InputAndLabelModal>
                        <InputAndLabelModal
                        placeholder="digite o nome..."
                        >Nome</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                        <InputAndLabelModal
                        placeholder="digite o tamanho..."
                        >Tamanho</InputAndLabelModal>
                        <InputAndLabelModal
                        placeholder="digite a cor..."
                        >Cor</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                        <InputAndLabelModal
                        placeholder="digite o preço..."
                        >Preço</InputAndLabelModal>
                        <InputAndLabelModal
                        placeholder="digite a quantidade de itens..."
                        >N. Itens</InputAndLabelModal>
                    </div>
                </div>
                <div className="w-[32rem] flex justify-end  h-7 ">
                    <ButtonClear>Limpar</ButtonClear>
                   <ButtonModal>Cadastrar</ButtonModal>
                </div>
            </div>
        </>
    );
}

export default ModalEditProd;