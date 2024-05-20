import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from '../App.js'

//Login
import Login from '../components/pages/login/Login.js'
import Forgot from '../components/pages/login/Forgot.js'
import Reset from '../components/pages/login/Reset.js'

//Estoque
import Estoque from '../components/pages/estoque/Estoque.js'
import EstoqueGerente from '../components/pages/estoque/EstoqueGerente.js'

//Historico
import Historico from '../components/pages/historico/Historico.js'
import HistoricoVendasGerente from '../components/pages/historico/HistoricoVendasGerente.js'

//Transacoes
import Transacoes from '../components/pages/transacoes/Transacoes.js'
import TransacoesGerente from '../components/pages/transacoes/TransacoesGerente.js'
import Usuario from '../components/pages/usuario/Usuario.js'

//Pagamentos
import Caixa from '../components/pages/venda/Caixa.js'
import Pagamento from '../components/pages/venda/Pagamento.js'
import Venda from '../components/pages/venda/Venda.js'

//Dashboards
import DashboardGeral from '../components/pages/dashboards/DashboardGeral.js';
import DashboardLoja from '../components/pages/dashboards/DashboardLoja.js';
import DashboardFuncionario from '../components/pages/dashboards/DashboardFuncionario.js';

//Avisos
import Aviso from '../components/pages/aviso/Aviso.js';

//Relatorio
import Relatorio from '../components/pages/relatorio/Relatorio.js';

//Menu
import Menu from '../components/pages/Menu.js'
import MenuCaixa from '../components/pages/MenuCaixa.js';
import AbrirModalCadastreLogin from '../components/modals/modals-user/modalCadastreLogin.js';
import AbrirModalAddDiscount from '../components/modals/modalAddDiscount.js';
import AbrirModalComission from '../components/modals/modalComission.js';
import AbrirModalSalesHistory from '../components/modals/modalSalesHistory.js';
import AbrirModalCadastreUser from '../components/modals/modals-user/modalCadastreUser.js';
import AbrirModalEditProd from '../components/modals/modals-produto/modalEditProd.js';
import AbrirModalEditModel from '../components/modals/modals-model/modalEditModel.js';
import AbrirModalEditUser from '../components/modals/modals-user/modalEditUser.js';
import AbrirModalEditKit from '../components/modals/modals-kit/modalEditKit.js';
import AbrirModalCadastreProdPreConfig from '../components/modals/modals-produto/modalCadastreProdPreConfig.js';
import AbrirModalCadastreKit from '../components/modals/modals-kit/modalCadastreKit.js';
import AbrirModalCadastreModel from '../components/modals/modals-model/modalCadastreModel.js';
import AbrirModalCadastreProd from '../components/modals/modals-produto/modalCadastreProd.js';
import AbrirModalAddKitCart from '../components/modals/modals-kit/modalAddKitCart.js';
import AbrirModalAddProdCart from '../components/modals/modals-produto/modalAddProdCart.js';
import InputFilter from '../components/inputs/inputFilter.js';
import Filter from '../components/inputs/filter.js';
import AbrirModalRequestProd from '../components/modals/modalRequestProd.js';
import AbrirModalPaymentCash from '../components/modals/modals-pagamento/modalPaymentCash.js';
import AbrirModalPaymentCard from '../components/modals/modals-pagamento/modalPaymentCard.js';
import AbrirModalPaymentPix from '../components/modals/modals-pagamento/modalPaymentPix.js';
import AbrirModalNotification from '../components/modals/modalNotification.js';
import AbrirModalPaymentHistory from '../components/modals/modals-pagamento/modalPaymentHistory.js';
import AbrirModalPaymentWait from '../components/modals/modals-pagamento/modalPaymentWait.js';

const Rotas = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/menu" element={<Menu />} />
                </Route>
                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/menuCaixa" element={<MenuCaixa />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/usuarios" element={<Usuario />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/estoque" element={<Estoque />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/venda" element={<Venda />} />
                    <Route path="/venda/caixa" element={<Caixa />} />
                    <Route path="/venda/pagamento" element={<Pagamento />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/historico" element={<Historico />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/transacao" element={<Transacoes />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/adicionar-produto-carrinho" element={<AbrirModalAddProdCart />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/dashboard-geral" element={<DashboardGeral />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/dashboard-loja" element={<DashboardLoja />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/dashboard-funcionario" element={<DashboardFuncionario />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/adicionar-kit-carrinho" element={<AbrirModalAddKitCart />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-produto" element={<AbrirModalCadastreProd />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-modelo" element={<AbrirModalCadastreModel />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-usuario" element={<AbrirModalCadastreUser />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-kit" element={<AbrirModalCadastreKit />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-produto-pre-configurado" element={<AbrirModalCadastreProdPreConfig />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/solicitar-produto" element={<AbrirModalRequestProd />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/pagamento-dinheiro" element={<AbrirModalPaymentCash />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/pagamento-cartao" element={<AbrirModalPaymentCard />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/pagamento-pix" element={<AbrirModalPaymentPix />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/aguardar-pagamento" element={<AbrirModalPaymentWait />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/modal-notificacao" element={<AbrirModalNotification />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-login" element={<AbrirModalCadastreLogin />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/calcular-comissao" element={<AbrirModalComission />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/adicionar-desconto" element={<AbrirModalAddDiscount />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/historico-vendas" element={<AbrirModalSalesHistory />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/historico-pagamento" element={<AbrirModalPaymentHistory />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/editar-produto" element={<AbrirModalEditProd />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/editar-modelo" element={<AbrirModalEditModel />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/editar-usuario" element={<AbrirModalEditUser />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/editar-kit" element={<AbrirModalEditKit />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/forgot" element={<Forgot />} />
                </Route>
                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/Reset" element={<Reset />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/filtro" element={<Filter />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/relatorios" element={<Relatorio />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/avisos" element={<Aviso />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/estoque-gerente" element={<EstoqueGerente />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/historico-vendas-gerente" element={<HistoricoVendasGerente />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/transacao-gerente" element={<TransacoesGerente />} />
                </Route>

            </Routes>
        </Router>
    )
}

export default Rotas