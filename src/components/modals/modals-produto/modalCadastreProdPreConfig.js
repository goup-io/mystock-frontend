import InputSearcModal from '../../inputs/inputSearchModal';
import HeaderModal from '../headerModal';
import ButtonClear from '../../buttons/buttonClear';
import ButtonModal from '../../buttons/buttonsModal';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from "../../../connections/ApiRequest";
import TabelaModal from '../../tables/tableModal';
import Alert from '../../alerts/Alert.js';
import ErrorImage from '../../../assets/icons/error.svg';
import SucessImage from '../../../assets/icons/sucess.svg';

function ModalCadastreProdPreConfig({ onUpdate }) {
  const [colunasETP, setColunasETP] = useState([]);
  const [idEtps, setIdEtps] = useState([]);
  const [dadosFiltradosETP, setDadosFiltradosETP] = useState([]);
  const [totalItens, setTotalItens] = useState(0);
  const [quantidades, setQuantidades] = useState({});

  const handleQuantityChange = (newQuantities) => {
    setQuantidades(newQuantities);
    const newTotal = Object.values(newQuantities).reduce((acc, cur) => acc + cur, 0);
    setTotalItens(newTotal);
  };

  async function fetchData() {
    const colunasDoBancoETP = ['Código', 'Nome', 'Modelo', 'Tamanho', 'Cor', 'Preço', 'Loja', 'N.Itens'];

    try {
      const response = await ApiRequest.etpsGetAll();

      if (response.status === 200) {
        const dados = response.data;

        const filtrarDadosETP = dados.map(obj => ({
          codigo: obj.codigo,
          nome: obj.nome,
          modelo: obj.modelo,
          tamanho: obj.tamanho,
          cor: obj.cor,
          preco: obj.preco,
          loja: obj.loja,
          quantidade: obj.quantidade
        }));

        const ids = dados.map(obj => ({
          id: obj.id
        }))

        setIdEtps(ids);

        setDadosFiltradosETP(filtrarDadosETP);
      }
    } catch (error) {
      console.log("Erro ao buscar os dados", error);
    }

    setColunasETP(colunasDoBancoETP);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleCadastrar = async () => {
    console.log(quantidades);
    const produtosParaCadastrar = idEtps.filter(idEtp => quantidades[idEtp.id] > 0);

    if (produtosParaCadastrar.length === 0) {
      Alert.alert(ErrorImage, "Adicione a quantidade de pelo menos um produto!");
      return;
    }

    var etpsEQuantidade = [];

    for (const [key, value] of Object.entries(quantidades)) {
      console.log(`${key}: ${value}`);

      etpsEQuantidade.push({
        "idEtp": key,
        "quantidade": value
      })
    }

    const idLoja = localStorage.getItem("loja_id")

    try {
      const response = await ApiRequest.adicionarNoEstoque(true, idLoja, etpsEQuantidade);
      if (response.status === 200) {
        (() => {
          onUpdate()
        })();
        Alert.alert(SucessImage, "Produtos adicionados no sistema!");
      }
    } catch (error) {
      console.log("Erro ao cadastrar um produto: ", error);
      Alert.alert(ErrorImage, "Erro ao cadastrar um produto!");
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[26rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
      <div className='w-[43rem]'>
        <HeaderModal props="Adicionar no Estoque Produto Pré-Cadastrado" />
      </div>
      <div className="w-[43rem] h-[2rem] flex justify-end ">
        <InputSearcModal props="text">Pesquisar</InputSearcModal>
      </div>
      <div className='w-[43rem] h-[18rem] border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto'>
        <TabelaModal
          colunas={colunasETP}
          dados={dadosFiltradosETP}
          iptQuantidade
          onQuantityChange={handleQuantityChange}
          id={idEtps.map(({ ...id }) => id)}
        />
      </div>
      <div className="w-[43rem] flex justify-end items-end mt-1 h-7">
        <ButtonClear >Limpar</ButtonClear>
        <ButtonModal funcao={handleCadastrar}>Cadastrar</ButtonModal>
      </div>
    </div>
  );
}

function AbrirModalCadastreProdPreConfig(onUpdate) {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    html: <ModalCadastreProdPreConfig onUpdate={onUpdate} />,
    showConfirmButton: false,
    heightAuto: true,
  });
}

export default AbrirModalCadastreProdPreConfig;
