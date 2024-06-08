
import InputSearcModal from '../../inputs/inputSearchModal';
import HeaderModal from '../headerModal';
import ButtonClear from '../../buttons/buttonClear';
import ButtonModal from '../../buttons/buttonsModal';
import React, { useState, useEffect } from 'react';
import TabelaModal from '../../tables/tableModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from "../../../connections/ApiRequest";
import Alert from '../../alerts/Alert.js'
import errorImage from "../../../assets/error.png"

function ModalCadastreKit() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDadosDoBanco] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);

    async function fetchData() {
        const colunasDoBanco = ['Cod.', 'Modelo', 'N.Itens', 'Cor' ];

        try {
            // const response = await ApiRequest.???();

            // if (response.status === 200) {
            //     const dados = response.data;
            //     setDadosDoBanco(dados);

            //     const filtrarDados = dados
            //         .map(obj => (
            //             {
            //                 codigo: obj.codigo, modelo: obj.modelo,  itens: obj.itens, cor: obj.cor
            //             }
            //         ));

            //     setDadosFiltrados(filtrarDados);
            // }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
       
       
        setColunas(colunas);
    }

    async function excluir(kitId) {
        const idKit = kitId.idKit
        try {
            // const response = await ApiRequest.???(idKit);
            // if (response.status === 200) {
            //     console.log("Kit deletado");
            // } else if (response.status === 409) {
            //     Alert.alert(errorImage, "Este Kit já foi excluido!");
            // }
        } catch (error) {
            console.log("Erro ao excluir um Kit: ", error);
        }
    }

    const handleDeleteKit = (kitId) => {
        Alert.alertQuestion("Deseja excluir esse kit? Essa ação é irreversível.", "Excluir", "Cancelar", () => excluir(etpId), () => updateTable())
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = () => {

    //   fazer logica

    }

    return (

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
           <div className='w-[40rem]'>
           <HeaderModal
                props="Adicionar no Estoque Kit Pré-Cadastrado"
            >
            </HeaderModal>
           </div>
            <div className="w-[40rem] h-[2rem] flex justify-end ">
                <InputSearcModal
                    props="text"
                >Pesquisar</InputSearcModal>
            </div>
            <div className='w-[40rem] h-[16rem]  border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto'>
                <TabelaModal colunas={colunas} dados={dadosFiltrados.map(({ ...dados }) => dados)} remove={handleDeleteKit} id={dados.map(({ ...dados }) => dados)} remove iptQuantidade></TabelaModal>
            </div>
            <div className="w-[40rem] flex justify-end items-end mt-1 h-7">
                <ButtonClear 
                    // setters={setters}
                >Limpar</ButtonClear>
                   <ButtonModal funcao={handleSave}>Cadastrar</ButtonModal>
            </div>

        </div>

    );
}

function AbrirModalCadastreKit() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalCadastreKit />,
        width: "auto",
        heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalCadastreKit;