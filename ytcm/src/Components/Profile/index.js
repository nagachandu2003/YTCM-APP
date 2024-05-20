import { useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import { Popup } from 'reactjs-popup';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { useNavigate,Link } from 'react-router-dom';
import YTCMVideoItem from '../YTCMVideoItem';
import { ThreeDots } from 'react-loader-spinner';
import YTCMFooter from '../YTCMFooter'
import { IoMdPerson } from 'react-icons/io';
import { BiIdCard } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaEnvelope, FaIdCard, FaLock, FaInfoCircle, FaUserFriends,FaNetworkWired,FaComment,FaQuestionCircle,FaMapMarkerAlt, FaUsers,FaBuilding,FaMapMarkedAlt  } from 'react-icons/fa';

import "./index.css"

const Profile = () => {
  const [userDetails,setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      const email = Cookies.get("useremail");
      try {
        const response = await fetch(`https://js-member-backend.vercel.app/users`);
        const data = await response.json();
        const newUser = data.filter((ele) => ele.email===email)[0]
        setUserDetails(newUser)
        setIsLoading(false)
        // Update videosList state with the fetched data
        // setVideosList(data.videos); // Assuming the response structure has a 'videos' property
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    // Call getVideos only once on mount
    getVideos();
  }, []); // Empty dependency array means it runs only once on mount



  const onClickLogout = () => {
    googleLogout();
    console.log('Logged out successfully');
    navigate("/",{replace:true})
  };

  return (
    <>
      <div className="ytmchome-main-container">
        <div className="ytmchome-top-container">
          <div className="ytmchome-top-flex-container">
            <h2>Profile</h2>
          </div>
        </div>
          {isLoading===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading===false && (
          <div className="ytmchome-content-container">
            <div className='profile-top-container'>
        <img src="https://res.cloudinary.com/dvwnbhpcy/image/upload/v1715776970/istockphoto-1495088043-612x612-removebg-preview_hdifqs.png" alt="profile" className='profile-logo' />
        <p className='profile-name'>{userDetails.name}</p>
        <p className='profile-number'>{userDetails.whatsappNumber}</p>
      </div>
      <div className='profile-bottom-container'>
      <div className='profile-bottom-email'>
          <FaEnvelope className='profile-bottom-logo'/> {userDetails.email}
        </div>
        <Link to="/kyc" className="link-item">
        <div className='profile-bottom-camp-id'>
          <BiIdCard className='profile-bottom-logo'/> KYC
        </div>
        </Link>
        <div className='profile-bottom-name'>
          <FaMapMarkedAlt className='profile-bottom-logo'/> District : {userDetails.district}
        </div>
        <div className='profile-bottom-number'>
          <FaUsers className='profile-bottom-logo'/> Constituency : {userDetails.constituency}
        </div>
        <div className='profile-bottom-camp-id'>
          <FaBuilding className='profile-bottom-logo'/> Block : {userDetails.block}
        </div>
        <div className='profile-bottom-camp-id'>
          <FaComment className='profile-bottom-logo'/> FAQs
        </div>
        <div className='profile-bottom-help'>
          <FaQuestionCircle className='profile-bottom-logo'/> Help
        </div>
        <div style={{margin:'auto'}}>
          <Popup
              trigger={<button className="logoutBtn" >Log Out</button>}
                        modal
                        nested
                    >
                        {close => (
                    <div className="modal modal1 ytmchome-custom-popup1">
                    <div className="content ytmchome-popup-cont2">
                        <form>
                          <h4>Are you sure want to log out?</h4>
                            <div className="actions actions1">
                                <button
                                    className="button closeBtn1"
                                    onClick={() => {
                                        console.log('modal closed ');
                                        close();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button onClick={onClickLogout} style={{backgroundColor:'#2379F7'}} className="fetchBtn1" type="submit">Log Out</button>
                            </div>
                        </form>
                    </div>
                </div>
                        )}
                    </Popup>
          </div>
        {/* New element for address */}
        {/* <div className='profile-bottom-address'>
          <FaMapMarkerAlt className='profile-bottom-logo'/> Address
        </div> */}
      </div>
          </div>
          )}
        </div>
      <YTCMFooter/>
    </>
  );
};

export default Profile;

