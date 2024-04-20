import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from '../App.js'
import Login from '../components/pages/login/Login.js'
import Estoque from '../components/pages/estoque/Estoque.js'
import Venda from '../components/pages/venda/Venda.js'
import Historico from '../components/pages/historico/Historico.js'
import Transacoes from '../components/pages/transacoes/Transacoes.js'
import Menu from '../components/pages/Menu.js'
import ModalAddProdCart from '../components/modals/modals-produto/modalAddProdCart.js';
import ModalAddKitCart from '../components/modals/modals-kit/modalAddKitCart.js';
import ModalCadastreProd from '../components/modals/modals-produto/modalCadastreProd.js';
import ModalCadastreModel from '../components/modals/modals-model/modalCadastreModel.js';
import ModalCadastreUser from '../components/modals/modals-user/modalCadastreUser.js';
import ModalEditProd from '../components/modals/modals-model/modalEditModel.js';
import ModalEditModel from '../components/modals/modals-model/modalEditModel.js';
import ModalEditUser from '../components/modals/modals-user/modalEditUser.js';
import ModalCadastreKit from '../components/modals/modals-kit/modalCadastreKit.js';
import ModalCadastreProdPreConfig from '../components/modals/modals-produto/modalCadastreProdPreConfig.js';
import ModalCadastreLogin from '../components/modals/modals-user/modalCadastreLogin.js';
import ModalComission from '../components/modals/modalComission.js';
import ModalDiscount from '../components/modals/modalAddDiscount.js';
import ModalEditKit from '../components/modals/modals-kit/modalEditKit.js';
import AbrirModalCadastreLogin from '../components/modals/modals-user/modalCadastreLogin.js';

const Rotas = () => {
    return(
        <Router>
            <Routes>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/menu" element={<Menu />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/estoque" element={<Estoque />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/venda" element={<Venda />} />
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
                    <Route path="/adicionar-produto-carrinho" element={<ModalAddProdCart />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/adicionar-kit-carrinho" element={<ModalAddKitCart />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-produto" element={<ModalCadastreProd />} />
                </Route>
                
                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-modelo" element={<ModalCadastreModel />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-usuario" element={<ModalCadastreUser />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-kit" element={<ModalCadastreKit />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-produto-pre-configurado" element={<ModalCadastreProdPreConfig />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/cadastro-login" element={<AbrirModalCadastreLogin />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/calcular-comissao" element={<ModalComission />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/adicionar-desconto" element={<ModalDiscount />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/editar-produto" element={<ModalEditProd />} />
                </Route>
                
                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/editar-modelo" element={<ModalEditModel />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/editar-usuario" element={<ModalEditUser />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="/editar-kit" element={<ModalEditKit />} />
                </Route>

            </Routes>
        </Router>
    )
}

export default Rotas