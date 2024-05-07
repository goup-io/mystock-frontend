import imgDownLoad from '../../assets/download.png'

function ButtonDownLoad(props){

    var style = {
        width: props.width+"px",
    }

    return(
      <button className="w-6 h-6 duration-150 ease-in-out hover:scale-[1.03]">
        <img  src={`${imgDownLoad}`}></img>
      </button>
    )
}

function cancela(){
    alert("Removendo o item na posição")
}

export default ButtonDownLoad;