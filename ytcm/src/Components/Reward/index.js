import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { FaRegFileAlt } from 'react-icons/fa';
import { PiPresentationChartBold } from 'react-icons/pi';
import { FcReadingEbook } from 'react-icons/fc';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import RewardItem from '../RewardItem'
import { ThreeDots } from 'react-loader-spinner';
import Footer from '../YTCMFooter';
import Cookies from 'js-cookie'
import { dataContext } from '../Context/context';
import ClaimItem from '../ClaimItem'

const Reward = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [popupVisible, setPopupVisible] = useState(false);
  const [videosList, setVideosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {cartList,replaceList} = useContext(dataContext);
  const [isLoading2, setIsLoading2] = useState(false);
  const [claimedVideosList, setClaimedVideosList] = useState([]);
  const navigate = useNavigate()

  const onCheckReward = (value) => {
    let newList = videosList.map((ele) => {
      if(ele.id===value)
        {
          return {...ele,claim:!ele.claim}
        }
        return ele
    })
    setVideosList(newList)
  }

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      const email = Cookies.get("useremail");
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/allvideos/${email}`);
        if(response.ok)
          {
            const data = await response.json()
            const newVideosList = (data.result).map((ele) => ({...ele,claim:false}))
            setVideosList(newVideosList)
            setIsLoading(false)
            console.log(data);
          }
      }
      catch(Err){
        console.log(`Error Occurred : ${Err}`);
      }
    };

    getVideos();
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading2(true)
      const email = Cookies.get("useremail");
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/claimeddetails/${email}`);
        const data = await response.json();
        const {claimedDetails} = data;
        const newList = [...claimedVideosList,...claimedDetails];
        setClaimedVideosList(newList);
        setIsLoading2(false);
      }
      catch(Err){
        console.log(`Error Occurred : ${Err}`);
      }
    };

    getVideos();
  }, []);




  const claimList = videosList.filter((ele) => ele.claim===true)
  let sumo = 0;
  if(claimList.length!==0)
  sumo = claimList.reduce((acc,item) => acc + item.days.reduce((acc1,item1) => acc1 + (parseInt(item1)/100),0),0).toFixed(2)




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

  const onClickCart = () => {
    localStorage.setItem("videoCartList",JSON.stringify(claimList));
    replaceList(claimList);
    navigate("/cart");
  }



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
        <button style={{border:'none',backgroundColor:'#ffff00'}} type="button" onClick={onClickCart}>
        <p style={{fontSize:'16px',backgroundColor:'black',color:'white',padding:'5px',borderRadius:'5px'}}><FaShoppingCart style={{height:'20px',width:'20px',color:'#ffff00'}}/> {sumo}</p>
        </button>
      </header>
      <nav style={{marginTop:'5px'}} className="task-tabs-container">
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
              <ul style={{listStyleType:'none',paddingLeft:'0',display:'flex',flexDirection:'column',alignItems:'center'}}>
                {videosList.map((ele) => (
                  <RewardItem key={ele.id} itemDetails={ele} onCheckReward={onCheckReward} />
                ))}
              </ul>
            )}
          </div>
          )}
          </section>
        )}
        {activeTab === 'claimed' && (
          <section>
            {isLoading2===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading2===false && (
          <div style={{marginTop:'0'}} className="ytmchome-content-container">
            {(claimedVideosList===undefined || claimedVideosList.length === 0) ? (
              <p>No videos are added to claim</p>
            ) : (
              <ul className="ytmchome-channel-container">
                {claimedVideosList.map((ele,index) => (
                  <ClaimItem key={index} itemDetails={ele} />
                ))}
              </ul>
            )}
          </div>
          )}
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
