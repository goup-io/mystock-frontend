
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TabelaPage from "../../tables/tablePage";
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada'

import React, { useState, useEffect } from 'react';
import TabelaModal from "../../tables/tableModal";
import ButtonModalFull from "../../buttons/buttonModalFull";

function ModalPaymentCash() {


    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[23rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal
                        props="PAGAMENTO EM DINHEIRO"
                    ></HeaderModal>
                </div>
                <div className="w-[40rem] h-[15rem] flex flex-col rounded justify-start items-center p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">

                    <div className=" w-[40rem] h-[5rem] flex justify-around">
                        <InputAndLabelModal
                            placeholder="Digite o valor aqui..."
                            text="text"
                        // value={nome}
                        // handleInput={handleInputChange}
                        // handlerAtributeChanger={setNome}
                        >Valor á Pagar:</InputAndLabelModal>
                        <InputAndLabelModal
                            placeholder="Digite o valor aqui..."
                            text="text"
                        // value={nome}
                        // handleInput={handleInputChange}
                        // handlerAtributeChanger={setNome}
                        >Valor Recebido:</InputAndLabelModal>
                    </div>



                    <div className=" w-[36rem] h-[6rem] ">

                        <div className="border-[2px] border-dashed mb-4 border-[#355070] rounded"></div>

                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Valor total da compra:"}
                            infoDireita={"R$ 10,00"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Valor pago (até agora):"}
                            infoDireita={"R$ 20,00"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Valor restante:"}
                            infoDireita={"R$ 250,00"}
                        />
                        <li className="flex flex-row justify-between">
                            <p className="text-sm">Troco em Dinheiro:</p>
                            <p className="text-sm">R$ 200,00</p>
                        </li>

                        <div className="w-full h-[0.1rem] bg-[#355070] mt-4"></div>


                    </div>

                </div>
                <div className="w-[40rem] flex justify-end h-6 ">
                    <ButtonModalFull>Finalizar</ButtonModalFull>
                </div>
            </div>
        </>
    );
}

function AbrirModalPaymentCash() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalPaymentCash />,
        // width: "auto",
        // heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalPaymentCash;