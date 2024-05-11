import {  useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import { ThreeDots } from "react-loader-spinner"
import { googleLogout } from "@react-oauth/google"
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Footer from '../YTCMFooter'
import { FaArrowLeft } from "react-icons/fa";
import "./index.css"

const YTCMVideoDetailItem = () => {
    const {videoid,channelName} = useParams()
    console.log(videoid)
    console.log(channelName)
    const [videoName,setVideoName] = useState('');
    const [videoDate, setVideoDate] = useState('');
    const [videoTime, setVideoTime] = useState('');
    const [isLoading,setIsLoading] = useState(false)
    const [days, setDays] = useState([]);
    const [dateArray,setDateArray] = useState([]);
    useEffect(() => {
        // Code that would run on component mount
        const getVideos = async () => {
          setIsLoading(true);
          try{
            const email = Cookies.get("useremail")
            const options  = {
              method : "POST",
              headers : {
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({email,channelName,videoid})
            }
            const response = await fetch(`https://js-member-backend.vercel.app/ytmcvideo/channel/videostats`,options);
            if(response.ok===true){
            const data = await response.json()
            console.log(data)
            // console.log(data)
            const {days,videoDate,dateArray,VideoName} = data.videoItem
            setDays(days)
            setDateArray(dateArray)
            setVideoName(data.videoItem.videoName)
            setVideoDate(data.videoItem.videoDate)
            setVideoTime(data.videoItem.videoTime)
            // setVideoTime(data.VideoItem.videoTime)
            setIsLoading(false)
            }
            }
          catch(Err){
            console.log(`Error Occurred : ${Err}`)
          }
        }
        // Example: getVideos();
        getVideos()
      }, []); // Empty dependency array means it runs only once on mount  }

      const dateObj = new Date(videoDate)

      const day = dateObj.getDate().toString().padStart(2, '0');
const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-indexed, so we add 1
const year = dateObj.getFullYear().toString().slice(-2); // Extract the last two digits of the year

// Format the date as dd/mm/yy
const formattedDate = `${day}/${month}/${year}`;


    
    const onClickLogout = () => {
        googleLogout();
        console.log('Logged out successfully');
        window.location.href = '/login';
      };

      let totviews = 0,totrewardpoints = 0;
      for(let values of days)
      {
        if(values)
        {
          totviews += parseInt(values)
          totrewardpoints += values/100
        }
      }
      // console.log(videoName)

    return (
        <>
        <div className="ytmchome-main-container">
        <div className="ytmchome-top-container">
          <div className="ytmchome-top-flex-container">
          <div style={{display:'flex',alignItems:'center'}}>
                <Link to={`/video/${channelName}`} style={{textDecoration:'none'}}>
                <FaArrowLeft className="back-icon"/>
                </Link>
            <h2>Views</h2>
            </div>
            {/* <button onClick={onClickLogout} type="button" className="logoutBtn">
              Log Out
            </button> */}
          </div>
        </div>
          {isLoading===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading===false && (
          <div className="ytmchome-content-container">
            <h2 style={{textAlign:'left'}}>Channel: {channelName}</h2>
            <h2 style={{textAlign:'left'}}>Video: {videoName}</h2>
            <h2 style={{textAlign:'left'}}>Upload Date & Time : {formattedDate} , {videoTime}</h2>
            {/* <h3 style={{textAlign:'left'}}>Views & Reward</h3> */}
            <hr style={{border:"1px solid white",margin:'10px 0 10px 0'}}/>
            <table>
                <thead >
                    <tr>
                    <th>Days</th>
                    <th>Date</th>
                    <th>Views</th>
                    <th>Reward</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Day1</td>
                        <td>{dateArray[0]}</td>
                        <td>{days[0]}</td>
                        <td>{days[0]/100}</td>
                    </tr>
                    <tr>
                        <td>Day2</td>
                        <td>{dateArray[1]}</td>
                        <td>{days[1]}</td>
                        <td>{days[1]/100}</td>
                    </tr>
                    <tr>
                        <td>Day3</td>
                        <td>{dateArray[2]}</td>
                        <td>{days[2]}</td>
                        <td>{days[2]/100}</td>
                    </tr>
                    <tr>
                        <td>Day4</td>
                        <td>{dateArray[3]}</td>
                        <td>{days[3]}</td>
                        <td>{days[3]/100}</td>
                    </tr>
                    <tr>
                        <td>Day5</td>
                        <td>{dateArray[4]}</td>
                        <td>{days[4]}</td>
                        <td>{days[4]/100}</td>
                    </tr>
                    <tr>
                        <td>Day6</td>
                        <td>{dateArray[5]}</td>
                        <td>{days[5]}</td>
                        <td>{days[5]/100}</td>
                    </tr>
                    <tr>
                        <td>Day7</td>
                        <td>{dateArray[6]}</td>
                        <td>{days[6]}</td>
                        <td>{days[6]/100}</td>
                    </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={2}>Total</th>
                    <th>{totviews}</th>
                    <th>{totrewardpoints}</th>
                  </tr>
                </tfoot>
            </table>
            </div>
          )}
        </div>
        <Footer/>
    </>
    )
}
export default YTCMVideoDetailItem