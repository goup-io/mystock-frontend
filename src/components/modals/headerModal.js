import ButtonCloseModal from "../buttons/buttonCloseModal";

function HeaderModal({ props }) {
    return (
        <div className="flex justify-between w-full items-center bg-white shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] h-8">
            <p className="text-md font-medium ml-4">{props}</p>
            <ButtonCloseModal></ButtonCloseModal>
        </div>
    );
}

export default HeaderModal;