import imgDownLoad from '../../assets/download.png'

function ButtonDownLoad(props){

    var style = {
        width: props.width+"px",
    }

    return(
      <button onClick={props.func} className="w-6 h-6 ">
        <img src={`${imgDownLoad}`}></img>
      </button>
    )
}

function cancela(){
    alert("Removendo o item na posição")
}

export default ButtonDownLoad;