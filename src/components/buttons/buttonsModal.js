function ButtonModal(props) {
    const cor = props.cor || 'bg-[#355070]';

    return (
        <button onClick={props.funcao} className={`px-4 font-medium ${cor} rounded text-white`}>
            <span className="text-white text-base">{props.children}</span>
        </button>
    );
}

export default ButtonModal;
