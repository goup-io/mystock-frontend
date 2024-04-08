import ButtonCloseModal from "../buttons/buttonCloseModal";

function HeaderModal({ props }) {
    return (
        <div className="flex justify-between w-[32rem] items-center bg-white shadow-lg h-8">
            <p className="text-md font-medium ml-4">{props}</p>
            <ButtonCloseModal></ButtonCloseModal>
        </div>
    );
}

export default HeaderModal;