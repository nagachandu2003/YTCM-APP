import {Link} from 'react-router-dom'

const TrendingItem = (props) => {
    const {itemDetails,onCheckReward} = props
    const {id,videoUrl,videoId,videoName,views,videoDate,channelTitle,videoTime,days,claim} = itemDetails
    const time = videoTime?videoTime:(new Date().toLocaleTimeString())
    // const url = `https://www.youtube.com/watch?v=${videoId}`
    const dateObj = new Date(videoDate)
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-indexed, so we add 1
    const year = dateObj.getFullYear().toString() // Extract the last two digits of the year


    const getRewards = (arr) => {
        const sumo = arr.reduce((acc,item) => acc + (parseInt(item)/100),0)
        return sumo;
    }


const formattedDate = `${day}/${month}/${year}`;

    return (
        <li className="ytmcchannel-list-item">
            
            <div className="list-item-cont2">
            <img className="user-img" src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="thumbnail"/>
            <div style={{width:'80%',display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
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

export default TrendingItem