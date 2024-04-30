import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ModalCadastreLogin({ dadosAdicionais }) {


    const handleSave = () => {
        // Combine os dados do cadastro de usuário com os dados do cadastro de login
        const dadosCompletos = {
            ...dadosAdicionais,
            // Adicione aqui os campos específicos do cadastro de login, se houver
        };
        // api.post(``, dadosCompletos);
    }

    return (
        <>
            <div className="h-[12rem] flex flex-col justify-around">
                <div className="w-[32rem]">
                    <HeaderModal props="Cadastrar Login do Usuário" />
                </div>
                <div className="w-[32rem] h-[5.5rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                    <div className="flex justify-around">
                        <InputAndLabelModal
                            type="Text"
                            placeholder="digite o usuário..."
                        >Usuário:</InputAndLabelModal>
                        <InputAndLabelModal
                            type="Text"
                            placeholder="digite a senha..."
                        >Senha:</InputAndLabelModal>
                    </div>
                </div>
                <div className="w-[32rem] flex justify-end  h-6 ">
                    <ButtonClear>Limpar</ButtonClear>
                    <ButtonModal
                    onClick={handleSave}
                    >Cadastrar</ButtonModal>
                </div>
            </div>

        </>
    );
}

function AbrirModalCadastreLogin() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalCadastreLogin />,
        width: "auto",
        heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalCadastreLogin;
