import React, { useState, useEffect } from 'react';
import './index.css';
import { FaRegFileAlt } from 'react-icons/fa';
import { PiPresentationChartBold } from 'react-icons/pi';
import { FcReadingEbook } from 'react-icons/fc';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import RewardItem from '../RewardItem'
import { ThreeDots } from 'react-loader-spinner';
import Footer from '../YTCMFooter';
import Cookies from 'js-cookie'

const Reward = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [popupVisible, setPopupVisible] = useState(false);
  const [videosList, setVideosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      const email = Cookies.get("useremail");
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/allvideos/${email}`);
        if(response.ok)
          {
            const data = await response.json()
            setVideosList(data.result)
            setIsLoading(false)
            console.log(data);
          }
      }
      catch(Err){
        console.log(`Error Occurred : ${Err}`);
      }
    };

    // Call getVideos only once on mount
    getVideos();
  }, []); // Empty dependency array means it runs only once on mount


  // const getVideos = async () => {
  //   const email = Cookies.get("useremail");
  //   try{
  //     const response = await fetch(`http://localhost:3001/allvideos/${email}`);
  //     if(response.ok)
  //       {
  //         const data = await response.json()
  //         console.log(data);
  //       }
  //   }
  //   catch(Err){
  //     console.log(`Error Occurred : ${Err}`);
  //   }
  // }

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleTaskClick = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <>
      <header className="task-main-header-container">
        <h1 className="task-main-heading">Reward</h1>
        <p>Total :</p>
      </header>
      <nav className="task-tabs-container">
        <div
          className={`task-tab ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => handleTabClick('current')}
        >
          Current
        </div>
        <div
          className={`task-tab ${activeTab === 'claimed' ? 'active' : ''}`}
          onClick={() => handleTabClick('claimed')}
        >
          Claimed
        </div>
        <div className="task-tab-slider" style={{ left: activeTab === 'claimed' ? '50%' : '0' }} />
      </nav>
      <main className="task-content-container">
        {activeTab === 'current' && (
          <section>
            {isLoading===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading===false && (
          <div style={{marginTop:'0'}} className="ytmchome-content-container">
            {(videosList===undefined || videosList.length === 0) ? (
              <p>Please add Videos</p>
            ) : (
              <ul className="ytmchome-channel-container">
                {videosList.map((ele) => (
                  <RewardItem key={ele.id} itemDetails={ele} />
                ))}
              </ul>
            )}
          </div>
          )}
          </section>
        )}
        {activeTab === 'claimed' && (
          <section>
            <h1>Claimed Rewards</h1>
            {/* Task items for claimed tab */}
            {/* Modify and structure claimed task items here */}
          </section>
        )}
      </main>
      {popupVisible && (
        <div className="task-popup">
          {/* Popup content */}
          {/* Modify and structure popup content here */}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Reward;
