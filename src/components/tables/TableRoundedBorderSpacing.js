import './TableRoundedBorderSpacing.css';

function TableRoundedBorderSpacing(props){
    return(
        <table class="w-full  rounded-lg table-fixed border-solid border-separate border-spacing-y-4">
            {props.children}
        </table>
    )
}

export default TableRoundedBorderSpacing;