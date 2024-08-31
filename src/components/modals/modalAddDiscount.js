import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "../modals/headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ItemSeparadoPorLinhaTracejada from '../tables/ItemSeparadoPorLinhaTracejada';
import React, { useState } from 'react';
import Alert from "../alerts/Alert";

function ModalDiscount(props) {
    const [percentualDesconto, setPercentualDesconto] = useState('');
    const [valorDesconto, setValorDesconto] = useState('');
    const [valorAtual, setValorAtual] = useState(props.valorAtual); // Exemplo de valor atual
    const [valorAposDesconto, setValorAposDesconto] = useState(valorAtual);

    const handlePercentualChange = (e) => {

        const percentual = e.target.value;
        setPercentualDesconto(percentual);
        setValorDesconto('');
        if (percentual) {
            const valor = valorAtual - (valorAtual * (percentual / 100));
            setValorAposDesconto(valor);
        } else {
            setValorAposDesconto(valorAtual);
        }
    };

    const handleValorChange = (e) => {
        const valor = e.target.value;
        setValorDesconto(valor);
        setPercentualDesconto('');
        if (valor) {
            const valorFinal = valorAtual - valor;
            setValorAposDesconto(valorFinal);
        } else {
            setValorAposDesconto(valorAtual);
        }
    };

    function validarDesconto(){

        console.log(valorAposDesconto)
        console.log(valorDesconto)
        if(valorAposDesconto < 0){
            Alert.alertError("Desconto inválido", "O valor do desconto é maior do que o da compra")
            return
        }

        props.funcao(valorAtual - valorAposDesconto)
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[22rem] flex flex-col items-center justify-around bg-white p-2 rounded-lg border border-black">
            <div className="w-[40rem]">
                <HeaderModal props="Adicionar Desconto"></HeaderModal>
            </div>
            <div className="w-[40rem] h-[14rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                <div className="flex justify-between mb-4">
                    <InputAndLabelModal
                        type="number"
                        placeholder="00%"
                        value={percentualDesconto}
                        handleInput={handlePercentualChange}
                        disabled={valorDesconto !== ''}
                    >
                        Porcentagem(%):
                    </InputAndLabelModal>
                    <InputAndLabelModal
                        type="number"
                        placeholder="R$ 0,00"
                        value={valorDesconto}
                        handleInput={handleValorChange}
                        disabled={percentualDesconto !== ''}
                    >
                        Valor Calculado(R$):
                    </InputAndLabelModal>
                </div>
                <div className="border-[1px] border-dashed border-[#355070] rounded"></div>
                <ItemSeparadoPorLinhaTracejada
                    infoEsquerda={"Valor Atual:"}
                    infoDireita={`R$ ${valorAtual.toFixed(2)}`}
                />
                <div className="flex flex-row justify-between text-sm">
                    <p>Valor Após o Desconto</p>
                    { valorAposDesconto >= 0 ? <p>{`R$ ${valorAposDesconto.toFixed(2)}`}</p> : <p className="text-red-600">{`R$ ${valorAposDesconto.toFixed(2)}`}</p>}
                </div>
            </div>
            <div className="w-[40rem] flex justify-end h-6">
                <ButtonClear onClick={() => {
                    setPercentualDesconto('');
                    setValorDesconto('');
                    setValorAposDesconto(valorAtual);
                }}>Limpar</ButtonClear>
                <ButtonModal
                funcao={() => validarDesconto()}
                >Adicionar</ButtonModal>
            </div>
        </div>
    );
}

function AbrirModalAddDiscount(funcao, valorAtual) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalDiscount funcao={funcao} valorAtual={valorAtual}/>,
        width: "auto",
        heightAuto: true,
        showConfirmButton: false,
    });
}

export default AbrirModalAddDiscount;
