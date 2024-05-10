import {  useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import { ThreeDots } from "react-loader-spinner"
import { googleLogout } from "@react-oauth/google"
import Cookies from 'js-cookie'
import Footer from '../YTCMFooter'
import "./index.css"

const YTCMVideoDetailItem = () => {
    const {videoid,channelName} = useParams()
    console.log(videoid)
    console.log(channelName)
    const [videoName,setVideoName] = useState('');
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
            // console.log(data)
            const {days,videoDate,dateArray,VideoName} = data.videoItem
            setDays(days)
            setDateArray(dateArray)
            setVideoName(data.videoItem.videoName)
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
      console.log(videoName)

    return (
        <>
        <div className="ytmchome-main-container">
        <div className="ytmchome-top-container">
          <div className="ytmchome-top-flex-container">
            <h1>Views</h1>
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
            <h3 style={{textAlign:'left'}}>Channel: {channelName}</h3>
            <h3 style={{textAlign:'left'}}>Video: {videoName}</h3>
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