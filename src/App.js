
import './App.css';
import ButtonEnter from './components/buttons/buttonEnter.js';
import ModalCadastreProd from './components/modals/modalCadastreProd.js';
import ModalCadastre from './components/modals/modalCadastreProd.js';
import ModalCadastreUser from './components/modals/modalCadastreUser.js';
import InputSearcModal from './components/inputs/inputSearchModal.js';
import InputFilterDate from './components/inputs/inputFilterDate.js';
import Alert from './components/alerts/Alert.js';
import AlertQuestion from './components/alerts/AlertQuestion.js';
import HeaderModal from './components/modals/headerModal.js';
import TableTeste from './components/tables/tableModal.js';
import ModalAddProdCart from './components/modals/modalAddProdCart.js';
import ModalAddKitCart from './components/modals/modalAddKitCart.js';
import Venda from './components/pages/venda/Venda.js';
import Estoque from './components/pages/estoque/Estoque.js';
import ButtonSearchModal from './components/buttons/buttonSearchModal.js';
import ModalEditProd from './components/modals/modalEditProd.js';

function App() {
  return (
    <div className="App">
 <Estoque></Estoque>
    </div>
  );
}

export default App;
