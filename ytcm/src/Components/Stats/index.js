import "./index.css"
import { useState, useEffect, forwardRef } from "react"
import Footer from '../YTCMFooter'
import Cookies from 'js-cookie'
import { Link } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"

  const Stats = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false); 
    const [userDetails, setUserDetails] = useState([]);
    const email = Cookies.get("useremail");
    const [statsdetails, setStatsDetails] = useState([]);
    const [endDate,setEndDate] = useState((new Date()).toISOString().split('T')[0]);
    const [startDate,setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date.toISOString().split('T')[0];
    });
    const [overalluserDetails, setOverAllUserDetails] = useState([]);
    const [activeTab, setActiveTab] = useState('Today');

    // useEffect(() => {
    //     const getVideos = async () => {
    //       setIsLoading(true)
    //       try{
    //         const options = {
    //             method :"POST",
    //             headers : {
    //                 "Content-Type" : "application/json"
    //             },
    //             body : JSON.stringify({email,campCluster,date:(new Date()).toLocaleDateString('en-GB')})
    //         }
    //         const response = await fetch(`https://js-member-backend.vercel.app/gettodaystats`,options);
    //         const data = await response.json()
    //         setStatsDetails(data.detailedstats)
    //         setIsLoading(false)
    //             // console.log(data);
    //       }
    //       catch(Err){
    //         console.log(`Error Occurred : ${Err}`);
    //       }
    //     };
    
    //     // Call getVideos only once on mount
    //     getVideos();
    //   }, []); 


    //   useEffect(() => {
    //     const getVideos = async () => {
    //       setIsLoading(true)
    //       try{
    //         const options = {
    //             method :"POST",
    //             headers : {
    //                 "Content-Type" : "application/json"
    //             },
    //             body : JSON.stringify({email,campCluster,startDate,endDate})
    //         }
    //         const response = await fetch(`https://js-member-backend.vercel.app/getoverallstats`,options);
    //         const data = await response.json()
    //         console.log(data)
    //         setOverAllUserDetails(data.detailedstats)
    //         setIsLoading(false)
    //             // console.log(data);
    //       }
    //       catch(Err){
    //         console.log(`Error Occurred : ${Err}`);
    //       }
    //     };
    
    //     // Call getVideos only once on mount
    //     getVideos();
    //   }, [startDate,endDate]); 

      const handleTabClick = (value) => {
        setActiveTab(value);
      }


    return (
        <>
        <div style={{backgroundColor:'black'}}>
        <header className="task-main-header-container">
    <h1 className="task-main-heading">Stats</h1>
    </header>
                <nav className="task-tabs-container">
        <div
          className={`task-tab ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => handleTabClick('today')}
        >
          Today
        </div>
        <div
          className={`task-tab ${activeTab === 'overall' ? 'active' : ''}`}
          onClick={() => handleTabClick('overall')}
        >
          Overall
        </div>
        <div className="task-tab-slider" style={{ left: activeTab === 'overall' ? '50%' : '0' }} />
      </nav>
      <main style={{marginTop:'70px'}}>
        {activeTab === 'today' && (
          <section>
            {isLoading===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading===false && (
          <div style={{marginTop:'10px'}} className="ytmchome-content-container">
            <h1>Facebook Page</h1>
            {/* {(videosList===undefined || videosList.length === 0) ? (
              <p>Please add Videos</p>
            ) : (
              <ul className="ytmchome-channel-container">
                {videosList.map((ele) => (
                  <ContentItem key={ele.id} itemDetails={ele} />
                ))}
              </ul>
            )} */}
            {/* Youtube
            Total Channel 
            Total Videos 
            Total Views  
            Facebook Page 
            Total Page
            Total Post 
            Total Views  
            Instagram
            Total Page 
            Total Post
            Total Reels 
            Total Views 
            X(Twitter)
            Total Account 
            Total Tweets 
            WhatsApp 
            Total Channel 
            Total Followers 
            Telegram
            Total Channel 
            Total Users */}
          </div>
          )}
          </section>
        )}
        {activeTab === 'overall' && (
          <section>
            {isLoading2===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading2===false && (
          <div style={{marginTop:'10px'}} className="ytmchome-content-container">
            <h1>Facebook overall</h1>
            {/* {(videosList2===undefined || videosList2.length === 0) ? (
              <p>Please add Videos</p>
            ) : (
              <ul className="ytmchome-channel-container">
                {videosList2.map((ele) => (
                  <overallItem key={ele.id} itemDetails={ele} />
                ))}
              </ul>
            )} */}
          </div>
          )}
          </section>
        )}
      </main>
        </div>
        <Footer/>
    </>
    )
}

export default Stats