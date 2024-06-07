import InputSearcModal from '../../inputs/inputSearchModal';
import HeaderModal from '../headerModal';
import ButtonClear from '../../buttons/buttonClear';
import ButtonModal from '../../buttons/buttonsModal';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from "../../../connections/ApiRequest";
import TabelaModal from '../../tables/tableModal';

function ModalCadastreProdPreConfig() {
  const [colunasETP, setColunasETP] = useState([]);
  const [dadosDoBancoETP, setDadosDoBancoETP] = useState([]);
  const [dadosFiltradosETP, setDadosFiltradosETP] = useState([]);
  const [totalItens, setTotalItens] = useState(0);

  const handleQuantityChange = (newTotal) => {
    setTotalItens(newTotal);
  };

  async function fetchData() {
    const colunasDoBancoETP = ['Código', 'Nome', 'Modelo', 'Tamanho', 'Cor', 'Preço', 'Loja', 'N.Itens'];

    try {
      const response = await ApiRequest.etpsGetAll();

      if (response.status === 200) {
        const dados = response.data;
        setDadosDoBancoETP(dados);

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

  const handleCadastrar = () => {
    console.log("Total de itens:", totalItens);
    if (!modelo || !cor || !tamanho || !nome || !precoCusto || !precoRevenda) {
      Alert.alert(ErrorImage, "Preencha todos os campos!")
      return;
  }

  var precoC = parseFloat(precoCusto)
  var precoR = parseFloat(precoRevenda)

  // usando a function find do javascript para percorrer uma lista de objetos baseado na verificação de uma key
  const modeloObj = dadosModelo.find(objModelo => objModelo.nome === modelo);
  const idModelo = modeloObj ? modeloObj.id : null;

  const corObj = dadosCor.find(objCor => objCor.nome === cor);
  const idCor = corObj ? corObj.id : null;

  const tamanhoObj = dadosTamanho.find(objTamanho => objTamanho.numero.toString() === tamanho.toString());
  const idTamanho = tamanhoObj ? tamanhoObj.id : null;

  const objetoAdicionado = {
      nome,
      precoC,
      precoR,
      idModelo,
      idCor,
      idTamanho
  };

  ApiRequest.produtoCreate(objetoAdicionado).then((response) => {
      if (response.status === 201) {
          Alert.alert(SucessImage, "Produto cadastrado no sistema!")
      }
      if (response.status === 409) {
          Alert.alert(ErrorImage, "Produto já está cadastrado no sistema!")
      }
  }).catch((error) => {
      console.log("Erro ao cadastrar um produto: ", error)
      //todo: mostrar modal de erro ao cadastrar
  });
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
        />
      </div>
      <div className="w-[43rem] flex justify-end items-end mt-1 h-7">
        <ButtonClear>Limpar</ButtonClear>
        <ButtonModal onClick={handleCadastrar}>Cadastrar</ButtonModal>
      </div>
    </div>
  );
}

function AbrirModalCadastreProdPreConfig() {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    html: <ModalCadastreProdPreConfig />,
    showConfirmButton: false,
    heightAuto: true,
  });
}

export default AbrirModalCadastreProdPreConfig;
