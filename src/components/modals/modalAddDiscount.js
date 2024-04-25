
import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "../modals/headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ModalDiscount() {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[18.5rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[32rem]">
                    <HeaderModal
                        props="Adicionar Desconto"
                    ></HeaderModal>
                </div>
                <div className="w-[32rem] h-[12rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">

                    <div className="flex justify-between mb-4">
                        <InputAndLabelModal
                            type="Text"
                            placeholder="digite o funcionario..."
                        >Porcentagem(%):</InputAndLabelModal>
                        <InputAndLabelModal
                            type="Text"
                            placeholder="digite o funcionario..."
                        >Valor Calculado(R$):</InputAndLabelModal>
                    </div>

                    <div className="w-full h-[0.1rem]  bg-slate-500 mt-2"></div>

                    <div className="w-full h-[1rem]  flex items-center justify-between rounded mt2">
                        <p className="mr-4 font-medium">Valor Atual:</p>
                        <p> R$ 230,00</p>
                    </div>

                    <div className="w-full h-[0.1rem]  bg-slate-500 mt-2"></div>

                    <div className="w-full h-[1rem]  flex items-center justify-between rounded mb-2">
                        <p className="mr-4 font-medium">Valor Após o Desconto: </p>
                        <p>R$ 200,00</p>
                    </div>
                </div>
                <div className="w-[32rem] flex justify-end h-6 ">
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
