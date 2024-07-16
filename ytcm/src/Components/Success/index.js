import "./index.css"
import { useParams } from "react-router-dom"

const Success = () => {
    const {videoId} = useParams();
    return (
        <>
        <h1 style={{color:'white'}}>Video Uploaded Successfully</h1>
        <p style={{color:'white'}}>Here is your video link : {`https://www.youtube.com/watch?v=${videoId}`}</p>
        </>
    )
}

export default Success;