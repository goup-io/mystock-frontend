
import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal"
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "./headerModal";

function ModalCadastreUser() {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[20.5rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
             <HeaderModal
             props="Cadastrar Novo Usuário"
             ></HeaderModal>
                <div className="w-[32rem] h-[14rem] flex flex-col rounded justify-around p-3 bg-slate-200 border-solid shadow-[0_10px_10px_2px_rgba(0,0.3,0.3,0.3)] border-gray-700">
                    <div className="flex justify-around">
                       <InputAndLabelModal
                       placeholder="digite o nome..."
                       >Nome</InputAndLabelModal>
                        <InputAndLabelModal
                        placeholder="digite o email..."
                        >Email</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                        <InputAndLabelModal
                        placeholder="digite o usuário..."
                        >Usuário</InputAndLabelModal>
                        <InputAndLabelModal
                        placeholder="digite o celular..."
                        >Celular</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                        <InputAndLabelModal
                        placeholder="digite o cargo..."
                        >Cargo</InputAndLabelModal>
                        <InputAndLabelModal
                        placeholder="digite a loja que ele trabalha..."
                        >Loja</InputAndLabelModal>
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

export default ModalCadastreUser;