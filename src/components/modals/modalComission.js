import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "../modals/headerModal";
import LargeComboBoxModal from "./largeComboBoxModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useState, useEffect } from 'react';
import ApiRequest from "../../connections/ApiRequest";

function ModalComission() {
    const [dadosFunc, setDadosFunc] = useState([]);
    const [funcionario, setFunc] = useState("");
    const [comissao, setComissao] = useState(10);
    const [meta, setMeta] = useState(1000);
    const [faturamentoFunc, setFaturamentoFunc] = useState(0);
    const [infoComissao, setInfoComissao] = useState("");
    const [resultado, setResultado] = useState("R$ 100,00");
    const valorMinimo = 100;

    const handleChangeFunc = (event) => {
        setFunc(event.target.value);
        fetchFaturamentoFuncionario(event.target.value);
    };

    const handleChangeComission = (event) => {
        setComissao(event.target.value);
    };

    const handleChangeMeta = (event) => {
        setMeta(event.target.value);
    };

    async function fetchDadosFunc() {
        try {
            const response = await ApiRequest.userGetAll();
            if (response.status === 200) {
                setDadosFunc(response.data);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchFaturamentoFuncionario(funcionario) {
        try {
            console.log(funcionario)
            const response = await ApiRequest.faturamentoMesVigenteFuncionario(funcionario);
            if (response.status === 200) {
                const valorFaturamentoFuncionario = response.data.reduce((acc, num) => acc + num, 0)
                setFaturamentoFunc(valorFaturamentoFuncionario);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    useEffect(() => {
        fetchDadosFunc();
    }, []);

    function calcularComissao() {
        if (funcionario === "") {
            setInfoComissao("*Campo obrigatório vazio! Selecione um funcionário.");
            setResultado("R$ 0,00");

        } else if (meta < valorMinimo) {
            setInfoComissao(`*O valor da meta é menor que o valor mínimo permitido. (R$ ${valorMinimo.toFixed(2)})`);
            setResultado("R$ 0,00");

        } else if (comissao <= 0) {
            setInfoComissao("*O valor da comissão é inválido. Verifique o valor informado.");
            setResultado("R$ 0,00");

        } else if (faturamentoFunc < meta) {
            setInfoComissao("*O funcionário não alcançou a meta.");
            setResultado("R$ 0,00");

        } else {
            const comissaoCalculada = (faturamentoFunc * comissao) / 100;
            setResultado(`R$ ${comissaoCalculada.toFixed(2)}`);
            setInfoComissao("");

            if (comissao > 100) {
                setInfoComissao("*A comissão é maior que 100%! Verifique o valor informado.");
            }
        }
    }

    function clearFields() {
        setFunc("");
        setComissao(10);
        setMeta(1000);
        setFaturamentoFunc(0);
        setInfoComissao("");
        setResultado("R$ 100,00");
    }

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] flex flex-col items-center justify-around bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal props="Calculadora de Comissão"></HeaderModal>
                </div>
                <div className="w-[40rem] h-[16rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                    <div className="flex w-full justify-start mb-4">
                        <LargeComboBoxModal
                            dadosBanco={dadosFunc}
                            value={funcionario}
                            handleChange={handleChangeFunc}
                        >Funcionário</LargeComboBoxModal>
                    </div>
                    <div className="flex justify-between mb-4">
                        <InputAndLabelModal
                            type="Number"
                            placeholder="Digite o valor da meta..."
                            value={meta}
                            handleInput={handleChangeMeta}
                        >Meta (R$):</InputAndLabelModal>

                        <InputAndLabelModal
                            type="Number"
                            placeholder="Digite a % da comissão..."
                            value={comissao}
                            handleInput={handleChangeComission}
                        >Comissão (%):</InputAndLabelModal>
                    </div>
                    <div className="w-full h-[0.1rem] bg-[#355070] mb-4"></div>
                    <div className="w-full h-[2rem] bg-[#DFDFDF] border-[1px] border-[#355070] flex items-center justify-end rounded">
                        <p id="p_resultado" className="mr-4 font-bold">{resultado}</p>
                    </div>
                    <p id="p_info_comissao" className={`w-full text-sm text-right text-red-500`}>{infoComissao}</p>
                </div>
                <div className="w-[40rem] flex justify-end h-6 gap-2">
                    <ButtonModal cor="#919191" funcao={clearFields}>Limpar</ButtonModal>
                    <ButtonModal funcao={calcularComissao}>Calcular</ButtonModal>
                </div>
            </div>
        </>
    );
}

function AbrirModalComission() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalComission />,
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalComission;
