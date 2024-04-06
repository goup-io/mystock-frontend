import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from '../App.js'
import Login from '../components/pages/Login.js'
import Estoque from '../components/pages/Estoque.js'
import Venda from '../components/pages/Venda.js'
import Historico from '../components/pages/Estoque.js'
import Transacoes from '../components/pages/Transacoes.js'
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