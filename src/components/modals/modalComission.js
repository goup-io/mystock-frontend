
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
    const [comissao, setComissao] = useState(50); 
    const valorMinimo = 100;

    const handleChangeFunc = (event) => {
        setFunc(event.target.value);
    };

    const handleChangeComission = (event) => {
        setComissao(event.target.value);
    };

    async function fetchDadosFunc() {
        await ApiRequest.userGetAll().then((response) => {
            if (response.status === 200) {
                setDadosFunc(response.data);
                console.log(dadosFunc);
            }
        }).catch((error) => {
            console.log("Erro ao buscar os dados", error)
        })
    }

    useEffect(() => {
        fetchDadosFunc();
    }, [])

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
          <div className="w-[40rem]">
          <HeaderModal
             props="Calculadora de thiago"
             ></HeaderModal>
          </div>
                <div className="w-[40rem] h-[16rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
            
                    <div className="flex w-full justify-start mb-4">
                    <LargeComboBoxModal
                     dadosBanco={dadosFunc.map(value => value.nome)}
                     value={funcionario}
                     handleChange={handleChangeFunc}
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
                        value={comissao}
                        handleChange={handleChangeComission}
                        >Comissão(%):</InputAndLabelModal>
                    </div>
                    <div className="w-full h-[0.1rem] bg-[#355070] mb-4"></div>

                    <div className="w-full h-[2rem] bg-[#DFDFDF] border-[1px] border-[#355070] flex items-center justify-end rounded ">
                 <p className="mr-4 font-bold">R$ 20,00</p>
                    </div>
                    <p className={` text-sm ml-[22rem] ${comissao < valorMinimo ? 'text-red-500' : ''}`}>o funcionario não alcançou a comissão</p>
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