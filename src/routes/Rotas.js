import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from '../App.js'

//Login
import Login from '../components/pages/login/Login.js'

//Estoque
import Estoque from '../components/pages/estoque/Estoque.js'

//Historico
import Historico from '../components/pages/historico/Historico.js'

//Transacoes
import Transacoes from '../components/pages/transacoes/Transacoes.js'

//Pagamentos
import Caixa from '../components/pages/venda/Caixa.js'
import Pagamento from '../components/pages/venda/Pagamento.js'
import Venda from '../components/pages/venda/Venda.js'

//Menu
import Menu from '../components/pages/Menu.js'

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

                
                
            </Routes>
        </Router>
    )
}

export default Rotas