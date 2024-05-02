import faqIcon02 from '../../assets/icons/faqIcon.svg'

function buttonFaq(props){
    return(
        <a onClick={direcionarFaq} class="cursor-pointer">
            <img className='w-[2.3rem]' src={faqIcon02}></img>
        </a>
    )
}

function direcionarFaq(){
    alert("Definir Faq")
}

export default buttonFaq