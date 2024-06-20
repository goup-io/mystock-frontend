import React, { useState } from 'react';
import faqIcon02 from '../../assets/icons/faqIcon.svg';

function ButtonFaq(props) {
    const [modalFaqAberto, setModalFaqAberto] = useState(false);
    const [descricaoAberta, setDescricaoAberta] = useState({}); // Estado para controlar quais descrições estão abertas

    const toggleModal = () => {
        setModalFaqAberto(!modalFaqAberto);
    };

    const toggleDescricao = (index) => {
        setDescricaoAberta({
            ...descricaoAberta,
            [index]: !descricaoAberta[index]
        });
    };

    const infosFaq = [
        {
            topico: 'Como entrar em contato com o MyStock?',
            descricao: 'Você pode entrar em contato conosco através do nosso email (goup.contactus@gmail.com) ou telefone (11 96300-6941).'
        },
        {
            topico: 'Como faço para cadastrar um novo usuário (gerente ou vendedor) no sistema?',
            descricao: 'Logue no sistema como gerente, acesse a página de "Usuários" no menu lateral da página, clique em "NOVO USUÁRIO" no canto superior direito da tela e pronto, só cadastrar o novo usuário do sistema.'
        },
        {
            topico: 'Está buscando compreender a utilidade de um gráfico específico?',
            descricao: 'No canto inferior direito abaixo dos gráficos, existe um ícone de informação "i" que, ao ser clicado, exibe uma breve descrição do que aquele gráfico representa.'
        },
        {
            topico: 'Como faço para navegar pelo sistema?',
            descricao: 'Caso esteja acessando como gerente ou administrador, você poderá navegar pelo menu lateral esquerdo mostrado na tela. Caso contrário, você poderá acessar o menu clicando no ícone no canto superior esquerdo da tela (localizado ao lado do nome da página em que está) onde será redirecionado ao menu principal.'
        },
        {
            topico: 'Como adiciono um novo produto ao estoque?',
            descricao: 'Acesse a página "Estoque" no menu, clique em "NOVO PRODUTO" no canto superior direito da tela e preencha as informações necessárias do produto.'
        },
        {
            topico: 'Como faço para atualizar a quantidade de um produto no estoque?',
            descricao: 'Na página "Estoque", localize o produto que deseja atualizar, clique no ícone de edição ao lado do produto, ajuste a quantidade conforme necessário e salve as alterações.'
        },
        {
            topico: 'Como posso visualizar o histórico de movimentações de estoque entre as lojas?',
            descricao: 'Acesse a página "Área de Transferências" no menu. Lá você encontrará um registro detalhado de todas as movimentações de estoque entre as lojas, incluindo as quantidades solicitadas e liberadas.'
        },
        {
            topico: 'Como gerar relatórios?',
            descricao: 'Logado como gerente ou admin vá até a página "Relatórios" no menu lateral, selecione o tipo de relatório que deseja gerar e clique em "GERAR RELATÓRIO".'
        },
        {
            topico: 'O que fazer se eu esquecer minha senha?',
            descricao: 'Na tela de login, clique em "Esqueci a senha" e siga as instruções para redefinir sua senha através do email.'
        }
    ];


    return (
        <>
            <a onClick={toggleModal} className="cursor-pointer">
                <img className='w-[2.3rem] duration-150 ease-in-out hover:scale-[1.03]' src={faqIcon02} alt="FAQ"></img>
            </a>
            {modalFaqAberto && (
                <div onClose={toggleModal} className={`w-72 absolute  ${props.position === "right" ? " bottom-[2.7rem] right-[-140px]" : "bottom-[3.5rem] left-[178px]"} transform -translate-x-1/2 bg-[#355070] shadow-md p-4 rounded z-10`}>
                    <h2 className='text-medium text-white mb-3 text-lg text-left'>
                        FAQ - Perguntas Frequêntes
                        <hr className='border-[1.5px]' />
                    </h2>
                    <div className='w-full h-80 overflow-y-auto'>
                        <ul className='text-white text-sm mr-1'>
                            {infosFaq.map((infoFaq, index) => (
                                <li key={index} className="bg-[#456182] flex flex-col items-left rounded shadow-md mb-1">
                                    <div className=' flex items-center py-2 px-1'>
                                        <button onClick={() => toggleDescricao(index)}>
                                            <svg className="w-4 h-4 fill-current transform transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                {descricaoAberta[index] ?
                                                    (<path d="M10 5l5 5H5l5-5z" />) :
                                                    (<path d="M10 12l-5-5v10l5-5z" />)}
                                            </svg>
                                        </button>
                                        <span className="ml-2 text-left">{infoFaq.topico}</span>
                                    </div>
                                    {descricaoAberta[index] && (
                                        <div className="text-black p-2 text-left bg-[#D0D4F0] rounded-b">
                                            {infoFaq.descricao}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                </div>
            )}
        </>
    );
}

export default ButtonFaq;
