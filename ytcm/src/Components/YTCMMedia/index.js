import "./index.css"
import {Component} from 'react'
import { googleLogout } from '@react-oauth/google';
import {Navigate} from 'react-router-dom'
import DistrictItem from '../DistrictItem'
import {ThreeDots} from 'react-loader-spinner'
import {Popup} from 'reactjs-popup'
import {v4 as uuidv4} from 'uuid'
import YTMCChannelItem from "../YTCMChannelItem";
import Cookies from 'js-cookie'
import Footer from '../YTCMFooter'
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaUpload } from "react-icons/fa";

class YTCMMedia extends Component{
    state = {channelsList:[],channelUrl:'',socialmedialist:[],isLoading:false,youtube:false,facebook:false,twitter:false,instagram:false,telegram:false,whatsapp:false}
    
    componentDidMount = () => {
      this.getChannelData()
    }

    getChannelData = async () =>{
      this.setState({isLoading:true})
      const email = Cookies.get("useremail")
      const response = await fetch(`https://js-member-backend.vercel.app/users`);
      const data = await response.json();
      const newUser = data.filter((ele) => ele.email===email)[0]
      const obj = {
        youtube:false,facebook:false,twitter:false,instagram:false,telegram:false,whatsapp:false       
      }
      newUser.socialmedia.forEach((ele) => {
        if(ele==="Youtube")
            obj.youtube = true
        if(ele==="Facebook")
            obj.facebook = true
        if(ele==="Telegram")
            obj.telegram = true
        if(ele==="X (Twitter)")
            obj.twitter = true
        if(ele==="Whatsapp")
            obj.whatsapp = true
        if(ele==="Instagram")
            obj.instagram = true
      })
      this.setState({isLoading:false,socialmedialist:newUser.socialmedia,...obj})
      }

    render(){
      const {socialmedialist,isLoading,youtube,facebook,instagram,twitter,whatsapp,telegram} = this.state
        return (
            <>
            <div className="ytmchome-main-container">
                    <div className="ytmchome-main-inner-container">
                <div className="ytmchome-top-container">
                    <div className="ytmchome-top-flex-container">
                    <h2>Social Media</h2>
                    {/* <button onClick={this.onClickLogout} type="button" className="logoutBtn">Log Out</button> */}
                    </div>
                </div>
                {isLoading===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
                {isLoading===false && (
                <div className="ytmchome-content-container">
                          <div  className='grid-container'>
        <div className='grid-row'>
        <Link to='/uploadvideo' className='grid-card grid-card-6'>
            <FaUpload className='icon' />
            <h2 className='heading-grid'>Upload Video</h2>
          </Link>
        {youtube && (
            <Link to='/report' className='grid-card youtube'>
            <FaYoutube className='icon' />
            <h2 className='heading-grid'>Youtube</h2>
          </Link>
    )}
    {facebook && (
        <Link to='/facebook' className='grid-card facebook'>
            <FaFacebook className='icon' />
            <h2 className='heading-grid'>Facebook</h2>
          </Link>
    )}
    {instagram && (
          <Link to='/instagram' className='grid-card instagram'>
            <FaInstagram className='icon' />
            <h2 className='heading-grid'>Instagram</h2>
          </Link>
        )}
        {twitter && (
          <Link to='/twitter' className='grid-card grid-card-5'>
            <FaTwitter className='icon' />
            <h2 className='heading-grid'>X (Twitter)</h2>
          </Link>
        )}
          {/* <Link to='/yc' className='grid-card grid-card-2'>
            <FaUserFriends className='icon' />
            <h2 className='heading-grid'>
              Youth
              <br />
              Club
            </h2>
          </Link> */}
        {whatsapp && (
          <Link to={'/whatsapp'} className='whatsapp grid-card'>
            <IoLogoWhatsapp className='icon' />
            <h2 className='heading-grid'>WhatsApp</h2>
          </Link>
        )}
        {telegram && (
          <Link to='/telegram' className='grid-card grid-card-4'>
            <FaTelegramPlane className='icon' />
            <h2 className='heading-grid'>Telegram</h2>
          </Link>
        )}
          {/* <Link to='/maps' className='grid-card maps'>
            <FaMapLocationDot className='icon' />
            <h2 className='heading-grid'>Maps</h2>
          </Link> */}
  
      </div>
      </div>
                </div>)}
                </div>
                </div>
            <Footer/>
            </>
        )
    }
}

export default YTCMMedia;