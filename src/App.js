
import './App.css';
import ButtonEnter from './components/buttons/buttonEnter.js';
import ModalCadastreProd from './components/modals/modalCadastreProd.js';
import ModalCadastre from './components/modals/modalCadastreProd.js';
import ModalCadastreUser from './components/modals/modalCadastreUser.js';
import Login from './components/pages/Login.js';
import LoginPage from './components/pages/Login.js';
import TableInput from './components/inputs/inputAndLabelModal.js';
import InputSearcModal from './components/inputs/inputSearchModal.js';
import FilterSearch from './components/inputs/filterSearch.js';
import InputFilterDate from './components/inputs/inputFilterDate.js';
import Alert from './components/alerts/Alert.js';
import AlertQuestion from './components/alerts/AlertQuestion.js';
import HeaderModal from './components/modals/headerModal.js';
import TableTeste from './components/tables/tableList.js';
import ModalAddProdCart from './components/modals/modalAddProdCart.js';
import ModalAddKitCart from './components/modals/modalAddKitCart.js';

function App() {
  return (
    <div className="App">
    {/* <LoginPage></LoginPage> */}
 <ModalAddKitCart></ModalAddKitCart>
    </div>
  );
}

export default App;
