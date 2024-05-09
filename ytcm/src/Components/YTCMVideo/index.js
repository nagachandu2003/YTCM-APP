import { useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import { Popup } from 'reactjs-popup';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import YTCMVideoItem from '../YTCMVideoItem';
import { ThreeDots } from 'react-loader-spinner';
import Footer from '../YTCMFooter'
import "./index.css"

const YTCMVideo = () => {
  const { channelName } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [videosList, setVideosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cname = channelName;
  console.log(cname)

  // useEffect(() => {
  //   const getVideos = async () => {
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ email: Cookies.get("useremail"), channelName: cname })
  //     };

  //     try {
  //       const response = await fetch(`https://js-member-backend.vercel.app/users/videosdetails`, options);
  //       const data = await response.json();
  //       console.log(data);
  //       // Update videosList state with the fetched data
  //       // setVideosList(data.videos); // Assuming the response structure has a 'videos' property
  //     } catch (error) {
  //       console.error("Error fetching videos:", error);
  //     }
  //   };

  //   // Call getVideos only once on mount
  //   getVideos();
  // }, [videosList]); // Empty dependency array means it runs only once on mount


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
          body : JSON.stringify({email:Cookies.get("useremail"),channelName:cname})
        }
        const response = await fetch(`https://js-member-backend.vercel.app/users/videosdetails`,options);
        if(response.ok===true){
        const data = await response.json()
        // console.log(data)
        if(data.Videos!==undefined){
        // const li = data.Videos.map((ele) => JSON.parse(ele))
        setVideosList(data.Videos)
        setIsLoading(false)
        }
        }
      }
      catch(Err){
        console.log(`Error Occurred : ${Err}`)
      }
    }
    // Example: getVideos();
    getVideos()
  }, []); // Empty dependency array means it runs only once on mount

  const getVideoId = (url) => {
    const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(pattern);
    return match ? match[1] : null;
  };

  const addVideo = async (value) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    };
    const response = await fetch(`https://js-member-backend.vercel.app/users/addvideo/${channelName}`, options);
    const data = await response.json();
    console.log(data);
  };

  const onClickAddChannel = async (event) => {
    event.preventDefault();
    const videoid = getVideoId(videoUrl);
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.REACT_APP_API_KEY}&id=${videoid}&part=snippet,contentDetails,statistics`);
    const data = await response.json();
    console.log(data)
    // console.log("API KEY"+process.env.REACT_APP_API_KEY)
    const { title } = data.items[0].snippet;
    const { viewCount } = data.items[0].statistics;
    const { channelTitle } = data.items[0].snippet;
    const currentDate = new Date();
    let dateArray = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(currentDate); // Create a new Date object for each day
      nextDate.setDate(nextDate.getDate() + i); // Add the day offset
      dateArray.push(nextDate.toLocaleDateString()); // Push the formatted date into the array
    }
    const obj = { videoUrl, id: uuidv4(),videoId:videoid,videoDate:currentDate.toLocaleDateString(),videoName: title, views: viewCount, channelTitle:channelName, email: Cookies.get('useremail'), days: [viewCount,0,0,0,0,0,0],dateArray };
    const newObj = [...videosList, obj];
    addVideo(obj);
    // console.log(obj)
    setVideosList(newObj);
  };

  const onClickLogout = () => {
    googleLogout();
    console.log('Logged out successfully');
    window.location.href = '/ytmclogin';
  };

  // console.log("Videos : " + videosList)

  return (
    <>
      <div className="ytmchome-main-container">
        <div>
          <Popup
            trigger={<button className="ytmcreportBtn">+</button>}
            modal
            nested
          >
            {(close) => (
              <div className="modal ytmchome-custom-popup">
                <div className="content ytmchome-popup">
                  <form onSubmit={onClickAddChannel}>
                    <div>
                      <label htmlFor="videoUrl">Video URL</label>
                      <br />
                      <input
                        placeholder="Enter the Video Url"
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="ytmchome-user-input"
                        type="url"
                        id="videoUrl"
                        required
                      />
                    </div>
                    <div className="actions">
                      <button
                        className="button closeBtn"
                        onClick={() => {
                          console.log('modal closed');
                          close();
                        }}
                      >
                        Cancel
                      </button>
                      <button className="fetchBtn" type="submit">
                        Add Video
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </Popup>
        </div>
        <div className="ytmchome-top-container">
          <div className="ytmchome-top-flex-container">
            <h1>YTMC</h1>
            {/* <button onClick={onClickLogout} type="button" className="logoutBtn">
              Log Out
            </button> */}
          </div>
        </div>
          {isLoading===true && (
                    <div className="ytmchome-content-container">
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading===false && (
          <div className="ytmchome-content-container">
            <h1>Your Videos</h1>
            {(videosList===undefined || videosList.length === 0) ? (
              <p>Please add Videos</p>
            ) : (
              <ul className="ytmchome-channel-container">
                {videosList.map((ele) => (
                  <YTCMVideoItem key={ele.id} itemDetails={ele} />
                ))}
              </ul>
            )}
          </div>
          )}
        </div>
      <Footer/>
    </>
  );
};

export default YTCMVideo;
