import {Link} from 'react-router-dom'
import { FaYoutube } from 'react-icons/fa'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaGoogleDrive } from "react-icons/fa";

const ContentItem = (props) => {
    const {itemDetails,onCheckReward} = props
    const {id,videoTitle,videoLink,source,videoType,status,date,videoId} = itemDetails
    let imageUrl;
    if(source==="Youtube")
        imageUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    if(source==="Telegram")
        imageUrl = "https://img.freepik.com/premium-vector/vinnytsia-ukraine-april-27-2023-popular-social-media-icon-telegram-vector-design_545793-1692.jpg?w=740"
    if(source==="Google Drive")
        imageUrl = "https://img.freepik.com/premium-vector/color-green-blue-yellow-shape-diagram-colorful-modern-triangle-logo-icon-sign-file-send-document_981536-460.jpg?w=740"
    return (
        <li className="ytmcchannel-list-item">
            <div className="list-item-cont2">
            <img className="user-img" src={imageUrl} alt="thumbnail"/>
            <div style={{width:'80%',display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
            <p style={{margin:'0',fontSize:'13px'}}>{date}</p>
            <br/>
            <div style={{display:'flex',alignItems:'center',marginBottom:'5px'}}>
            {source==="Youtube"  && (<FaYoutube size={30} style={{backgroundColor:'red',color:'white',borderRadius:'8px',padding:'5px'}}/>)}
            {source==="Telegram" && (<FaTelegramPlane size={30} style={{backgroundColor:'#06AFE2',color:'white',borderRadius:'8px',padding:'5px'}}/>)}
            {source==="Google Drive"  && (<FaGoogleDrive size={30} style={{backgroundColor:'black',color:'white',borderRadius:'8px',padding:'5px'}}/>)}
            </div>
            <a href={videoLink} target="_blank" rel="noreferrer">
            <button type="button" className="view-Btn">
                Download
                </button>
            </a>
            {/* </div> */}
            </div>
            </div>
            <a style={{color:'black', textAlign:'left',textDecoration:'none'}} href={videoLink} target="_blank" rel="noreferrer"><h4>{videoTitle}</h4></a>
        </li>
    )
}

export default ContentItem