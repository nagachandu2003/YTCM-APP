import "./index.css"
import {Link} from 'react-router-dom'

const YTCMVideoItem = (props) => {
    const {itemDetails} = props
    const {videoUrl,videoId,videoName,views,videoDate,channelTitle,videoTime} = itemDetails
    const time = videoTime?videoTime:(new Date().toLocaleTimeString())
    // const url = `https://www.youtube.com/watch?v=${videoId}`
    return (
        <li className="ytmcchannel-list-item">
            <div className="list-item-cont2">
            <img className="user-img" src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="thumbnail"/>
            <div style={{width:'80%',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
            <p style={{margin:'0',fontSize:'12px'}}>Date : {videoDate}</p>
            <p style={{margin:'0',fontSize:'12px'}}>Time : {time}</p>
            {/* <div className="ytmcchannel-link-btn" style={{display:'flex',alignItems:'center'}}> */}
            <Link to={`/video/videoinfo/${channelTitle}/${videoId}`}>
            <button type="button" className="view-Btn">Views</button>
            </Link>
            {/* </div> */}
            </div>
            </div>
            <a style={{color:'black', textAlign:'left',textDecoration:'none'}} href={videoUrl} target="_blank" rel="noreferrer"><h5>{videoName}</h5></a>
        </li>
    )
}

export default YTCMVideoItem