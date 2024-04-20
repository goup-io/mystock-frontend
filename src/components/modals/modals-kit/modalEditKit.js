
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal"
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";

export default function ModalEditKit() {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[20.5rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
            <div className="w-[32rem]">
            <HeaderModal
             props="Editar informações do Kit"
             ></HeaderModal>
            </div>
                <div className="w-[32rem] h-[14rem] flex flex-col rounded justify-around p-3 bg-slate-200 border-solid  shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
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
                        placeholder="pré Cadastrado"
                        >Tamanho</InputAndLabelModal>
                        <InputAndLabelModal
                        placeholder="digite a Cor..."
                        >Cor</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                        <InputAndLabelModal
                        placeholder="digite a Loja..."
                        >Loja</InputAndLabelModal>
                        <InputAndLabelModal
                        placeholder="pré cadastrado"
                        >N.Itens</InputAndLabelModal>
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
