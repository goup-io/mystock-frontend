import './TableRoundedBorderSpacing.module.css';


function TableRoundedBorderSpacing(props){

    var style = {
        tableLayout: props.layout,
    }

    return(
        <table  className="w-full rounded-lg table-fixed border-solid border-separate border-spacing-y-4" style={props != undefined ? style : ""}>
            {props.children}
        </table>
    )
}

export default TableRoundedBorderSpacing;