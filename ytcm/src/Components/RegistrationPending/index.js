import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const RegistrationPending = () => {

    const navigate = useNavigate() 

    const onLogOut = () => {
        googleLogout();
        navigate("/")
    };

    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',padding:'20px'}}>
        <div style={{textAlign:'center'}} className="ytmcregister-form-container">
        <img style={{height:'50px',width:'50px'}} src="https://imgs.search.brave.com/pCrYBKil64ozCVM6c4QGMgFj6qCLcSGLMTSRHJOimbw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzgxLzM0Lzc4/LzM2MF9GXzU4MTM0/Nzg5N19zZ1lnVEVR/MFBCSEtONER3dXhX/UkFucGxOemtlNXNk/Ni5qcGc" alt="image"/>
        <h1>Your Registration is Pending...</h1>
        <p>We will get back to you soon.</p>
        <button onClick={onLogOut} type="button" className="last24HrsBtn">Log Out</button>
        </div>
    </div>
    )
}

export default RegistrationPending