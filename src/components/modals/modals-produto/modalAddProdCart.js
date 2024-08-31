import React, { useState, useEffect, useContext } from 'react';
import InputSearcModal from '../../inputs/inputSearchModal';
import HeaderModal from '../headerModal';
import ButtonClear from '../../buttons/buttonClear';
import ButtonModal from '../../buttons/buttonsModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from "../../../connections/ApiRequest";
import TabelaModal from '../../tables/tableModal';
import Alert from '../../alerts/Alert.js';
import { SelectedItemsContext } from '../../pages/venda/Venda.js'; // Importando o contexto

function ModalAddProdCart(props) {
  const [colunasETP, setColunasETP] = useState([]);
  const [idEtps, setIdEtps] = useState([]);
  const [dadosFiltradosETP, setDadosFiltradosETP] = useState([]);
  const [totalItens, setTotalItens] = useState(0);
  const [quantidades, setQuantidades] = useState({});

  // Usando o contexto
  const [itemsCarrinhoContext, setItemsCarrinhoContext] = useContext(SelectedItemsContext);
  const [detalhesProdutos, setDetalhesProdutos] = useState([]);

  const setters = [setQuantidades];

  const handleQuantityChange = (newQuantities) => {
    setQuantidades(newQuantities);
    const newTotal = Object.values(newQuantities).reduce((acc, cur) => acc + cur, 0);
    setTotalItens(newTotal);
  };

  async function fetchData() {
    const colunasDoBancoETP = ['Código', 'Nome', 'Modelo', 'Tamanho', 'Cor', 'Preço', 'Loja', 'N.Itens'];
    setColunasETP(colunasDoBancoETP);

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

        const ids = dados.map(obj => ({ id: obj.id }));

        setIdEtps(ids);
        setDadosFiltradosETP(filtrarDadosETP);
      }
    } catch (error) {
      console.log("Erro ao buscar os dados", error);
    }
  }

  useEffect(() => {
    console.log("AAAAAAAAAA", itemsCarrinhoContext)
    fetchData();
  }, []);

  const handleCadastrar = async () => {
    try {
      const produtosSelecionados = idEtps.filter(idEtp => quantidades[idEtp.id] > 0);

      const produtosParaCadastrar = produtosSelecionados.map(({ id }) => ({
        idEtp: id,
        quantidade: quantidades[id]
      }));

      const detalhesProdutos = [];
      for (const produto of produtosParaCadastrar) {
        const response = await ApiRequest.etpsGetById(produto.idEtp);
        if (response.status === 200) {
          const dados = response.data;
          detalhesProdutos.push({
            codigoProduto: dados.codigo,
            descricaoProduto: dados.nome,
            precoUnitario: dados.preco,
            quantidade: produto.quantidade
          });
        } else {
          console.error('Falha ao obter dados do produto:', produto.idEtp);
        }
      }
      setDetalhesProdutos(detalhesProdutos);
    setItemsCarrinhoContext(detalhesProdutos);
    detalhesProdutos.forEach(element => {
      props.onUpdate(element);
    });
      console.log("dados", detalhesProdutos)
      // Atualiza o contexto do carrinho com os novos produtos
      // setItemsCarrinhoContext(prevItems => [
      //   ...prevItems,
      //   ...detalhesProdutos
      // ]);
      // console.log("Itens CONTEXTO", itemsCarrinhoContext)
    } catch (error) {
      console.log("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    // if (detalhesProdutos.length > 0) {
    // Atualizar o contexto do carrinho com os novos detalhes do produto
    // setItemsCarrinhoContext(prevItems => [
    //   ...prevItems,
    //   ...detalhesProdutos
    // ]);
    // }
    // setItemsCarrinhoContext(detalhesProdutos);
    console.log("ITEMS", itemsCarrinhoContext);
    console.log("DETALHES", detalhesProdutos)
    
  }, [detalhesProdutos, setItemsCarrinhoContext]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[26rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
      <div className='w-[43rem]'>
        <HeaderModal props="Adicionar Produto no Carrinho" />
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
        <ButtonClear setters = {setters}>Limpar</ButtonClear>
        <ButtonModal funcao={handleCadastrar}>Adicionar</ButtonModal>
      </div>
    </div>
  );
}

function AbrirModalAddProdCart(onUpdate) {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    html: <ModalAddProdCart onUpdate={onUpdate} />,
    width: "auto",
    heigth: "60rem",
    showConfirmButton: false,
    heightAuto: true,
  });
}

export default AbrirModalAddProdCart;
