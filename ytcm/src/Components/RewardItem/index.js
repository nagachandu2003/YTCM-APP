import {Link} from 'react-router-dom'

const RewardItem = (props) => {
    const {itemDetails} = props
    const {videoUrl,videoId,videoName,views,videoDate,channelTitle,videoTime} = itemDetails
    const time = videoTime?videoTime:(new Date().toLocaleTimeString())
    // const url = `https://www.youtube.com/watch?v=${videoId}`
    const dateObj = new Date(videoDate)
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-indexed, so we add 1
    const year = dateObj.getFullYear().toString() // Extract the last two digits of the year

// Format the date as dd/mm/yy
const formattedDate = `${day}/${month}/${year}`;

    return (
        <li className="ytmcchannel-list-item">
            
            <div className="list-item-cont2">
            <img className="user-img" src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="thumbnail"/>
            <div style={{width:'80%',display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                <div style={{display:'flex'}}>
                <label id="claim">Claim</label>
                <input type="checkbox" htmlFor="claim"/>
                </div>
            <p style={{margin:'0',fontSize:'13px'}}>{time} , {formattedDate}</p>
            <br/>
            {/* <p style={{margin:'0',fontSize:'12px'}}>Time : {time}</p> */}
            {/* <div className="ytmcchannel-link-btn" style={{display:'flex',alignItems:'center'}}> */}
            <Link to={`/video/videoinfo/${channelTitle}/${videoId}`}>
            <button type="button" className="view-Btn">Views</button>
            </Link>
            {/* </div> */}
            </div>
            </div>
            <a style={{color:'black', textAlign:'left',textDecoration:'none'}} href={videoUrl} target="_blank" rel="noreferrer"><h4>{videoName}</h4></a>
            <a style={{color:'black',textAlign:'left',textDecoration:'none'}} href={`https://www.youtube.com/@${channelTitle}`}><h4>{channelTitle}</h4></a>
        </li>
    )
}

export default RewardItem