
import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "../modals/headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ItemSeparadoPorLinhaTracejada from '../tables/ItemSeparadoPorLinhaTracejada'

function ModalDiscount() {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[22rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal
                        props="Adicionar Desconto"
                    ></HeaderModal>
                </div>
                <div className="w-[40rem] h-[14rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">

                    <div className="flex justify-between mb-4">
                        <InputAndLabelModal
                            type="Text"
                            placeholder="Digite a porcentagem do desconto..."
                        >Porcentagem(%):</InputAndLabelModal>
                        <InputAndLabelModal
                            type="Text"
                            placeholder="0,00"
                        >Valor Calculado(R$):</InputAndLabelModal>
                    </div>

                    <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Valor Atual:"}
                            infoDireita={"R$ 300,00"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Valor pós Desconto:"}
                            infoDireita={"R$ 300,00"}
                        />
                </div>
                <div className="w-[40rem] flex justify-end h-6 ">
                    <ButtonClear>Limpar</ButtonClear>
                    <ButtonModal>Adicionar</ButtonModal>
                </div>
            </div>
        </>
    );
}

function AbrirModalAddDiscount() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalDiscount />,
        width: "auto",
        heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalAddDiscount;
