import switchUserIcon from '../../assets/icons/switchUserIcon.svg'
import { useNavigate } from 'react-router-dom';


function ButtonSwitchUser(){

    const navigate = useNavigate();

    return(
        <a onClick={() => navigate("/")} class="cursor-pointer">
            <img className='w-[3rem]' src={switchUserIcon}></img>
        </a>
    )
}


export default ButtonSwitchUser;