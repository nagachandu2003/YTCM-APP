import {Link} from 'react-router-dom'

const TrendingItem = (props) => {
    const {itemDetails} = props
    const {id,videoTitle,videoLink,source,videoType,status,date,videoId} = itemDetails


    return (
        <li className="ytmcchannel-list-item">
            <div className="list-item-cont2">
            <img className="user-img" src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="thumbnail"/>
            <div style={{width:'80%',display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
            <p style={{margin:'0',fontSize:'13px'}}>Added Date : {date}</p>
            <br/>
            {/* <p style={{margin:'0',fontSize:'12px'}}>Time : {time}</p> */}
            {/* <div className="ytmcchannel-link-btn" style={{display:'flex',alignItems:'center'}}> */}
            <button type="button" className="view-Btn">Views</button>
            {/* </div> */}
            </div>
            </div>
            <a style={{color:'black', textAlign:'left',textDecoration:'none'}} href={videoLink} target="_blank" rel="noreferrer"><h4>{videoTitle}</h4></a>
        </li>
    )
}

export default TrendingItem