import InputSearcModal from '../../inputs/inputSearchModal.js'
import AbrirModalCadastreUser from '../../modals/modals-user/modalCadastreUser.js'
import TabelaPage from '../../tables/tablePage.js'
import ApiRequest from '../../../connections/ApiRequest.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import Alert from '../../alerts/Alert.js'
import React, { useState, useEffect } from 'react';
import PageLayoutAreaRestrita from '../PageLayoutAreaRestrita.js'
import AbrirModalComission from '../../modals/modalComission.js'
import ButtonDownLoad from '../../buttons/buttonDownLoad.js'
import AbrirModalEditUser from '../../modals/modals-user/modalEditUser.js'

import errorImage from "../../../assets/icons/error.svg"
import SucessImage from '../../../assets/icons/sucess.svg'

async function csvTodosUsuarios() {
    try {
        let response;
        if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
            response = await ApiRequest.getCsvUsuario();
        } else {
            response = await ApiRequest.getCsvUsuarioByLoja(localStorage.getItem('visao_loja'));
        }

        if (response.status === 200) {
            const csvData = new TextDecoder('utf-8').decode(new Uint8Array(response.data));
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            // Get current date and format it as YY_mm_dd
            const date = new Date();
            const formattedDate = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;

            link.setAttribute('download', `Funcionarios_${formattedDate}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }
    } catch (error) {
        console.log("Erro ao buscar os dados", error);
    }
}

function Usuario() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);
    const [dadosDoBancoUser, setDadosDoBancoUser] = useState([]);


    async function fetchData() {
        const colunasDoBanco = ['Código', 'Nome', 'Email', 'Celular', 'Loja', 'Cargo', 'Usuario'];

        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.userGetAll();

                const dados = response.data;
                setDadosDoBancoUser(dados);
            } else {
                response = await ApiRequest.userGetAllByLoja(localStorage.getItem('visao_loja'));

                const dados = response.data;
                setDadosDoBancoUser(dados);

            }

            if (response.status === 200) {
                const dados = response.data;
                setDados(dados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

        setColunas(colunasDoBanco);
    }

    async function fetchDataFilterSearch(filterData) {
        if (filterData === "") {
            fetchData();
        } else {
            const searchData = dados.filter((item) => {
                const lowerCaseFilter = filterData.toLowerCase();
                return (
                    // item.codigo.includes(lowerCaseFilter) ||
                    item.nome.toLowerCase().includes(lowerCaseFilter) ||
                    item.email.toLowerCase().includes(lowerCaseFilter) ||
                    item.cargo.toLowerCase().includes(lowerCaseFilter) ||
                    // item.loja.toLowerCase().includes(lowerCaseFilter) ||
                    item.usuario.toLowerCase().includes(lowerCaseFilter)
                );
            });
            setDados(searchData);
        }
    }

    const handleEditarUser = (userId) => {
        AbrirModalEditUser(userId.id, updateTable);
    };

    async function excluirUser(userId) {
        if (!userId || !userId.id) {
            console.log("ID do usuário não está definido");
            return;
        }

        const idUser = userId.id;

        try {
            const response = await ApiRequest.userDelete(idUser);
            if (response.status === 200) {
                console.log("Usuário deletado");
            } else if (response.status === 409) {
                Alert.alert(errorImage, "Este usuário já foi excluído!");
            }
        } catch (error) {
            console.log("Erro ao excluir um usuário: ", error);
        }
    }

    const handleDeleteUser = (userId) => {
        Alert.alertQuestion("Deseja excluir esse usuário? Essa ação é irreversível.", "Excluir", "Cancelar", () => excluirUser(userId), () => updateTable())
    }

    const updateTable = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);


    function handleAbirCriarUser(fetchDataCallback) {
        AbrirModalCadastreUser(fetchDataCallback);
    }

    const buttons = [
        { label: "Calculadora de comissão", event: AbrirModalComission },
        { label: "Novo Usuário", event: () => handleAbirCriarUser(fetchData) },
    ]

    return (
        <>
            <PageLayoutAreaRestrita>
                <TitleBox title="Usuários" buttons={buttons}></TitleBox>
                <ChartBox >

                    <div className='w-full px-4 flex justify-start flex-col items-center'>

                        <div className='w-full mt-2 flex justify-between'>

                            <p className='font-medium text-lg'>USUÁRIOS CADASTRADOS:</p>

                            <div className='flex gap-4 items-center'>
                                <InputSearcModal props="text" funcao={fetchDataFilterSearch}>Pesquisar</InputSearcModal>
                                <ButtonDownLoad func={csvTodosUsuarios} ></ButtonDownLoad>
                            </div>

                        </div>

                        <div className='w-full h-[60vh] mt-2 bg-slate-700 border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded'>
                            <TabelaPage colunas={colunas} dados={dados.map(({ id, ...dados }) => dados)} edit={handleEditarUser} remove={handleDeleteUser} id={dadosDoBancoUser.map(({ ...dadosDoBancoUser }) => dadosDoBancoUser)} />
                        </div>
                    </div>

                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )
}

export default Usuario