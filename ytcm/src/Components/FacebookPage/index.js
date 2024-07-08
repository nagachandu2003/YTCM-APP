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


class FacebookPage extends Component{
    state = {facebookUrl:'',channelsList:[],isLoading:false}
    
    // componentDidMount = () => {
    //   this.getChannelData()
    // }

    // getChannelData = async () =>{
    //   this.setState({isLoading:true})
    //   const email = Cookies.get("useremail")
    //   const options = {
    //     method : "POST",
    //     headers : {
    //       "Content-Type" : "application/json"
    //     },
    //     body : JSON.stringify({email})
    //   }
    //   const response = await fetch(`https://js-member-backend.vercel.app/users/channelsdetails`,options)
    //   if(response.ok){
    //   const data = await response.json()
    //   const {channels} = data
    //   this.setState({channelsList:channels,isLoading:false})
    //   }
    // }

    onChangeFacebookUrl = (event) => {
        this.setState({facebookUrl:event.target.value})
    }


    onClickAddChannel = (event) => {
      event.preventDefault()
      const {facebookUrl,channelsList} = this.state
      const newList = [...channelsList,facebookUrl]
      this.setState({channelsList:newList,facebookUrl:''})
    }

    render(){
      const {channelsList,isLoading,facebookUrl} = this.state
        return (
            <>
            <div className="ytmchome-main-container">
                <div>
                <Popup
                        trigger={<button className="ytmcreportBtn">New +</button>}
                        modal
                        nested
                    >
                        {close => (
                    <div className="modal modal1 ytmchome-custom-popup1">
                    <div style={{width:'250px'}} className="content ytmchome-popup-cont2">
                        <form onSubmit={this.onSubmitUrl}>
                            <div>
                                <label htmlFor="fburl">Add Facebook Profile</label>
                                <br/>
                                <input
                                    placeholder="Enter the Facebook Url"
                                    onChange={this.onChangeFacebookUrl}
                                    className="ytmchome-user-input1"
                                    type="url"
                                    id="fburl"
                                    value = {facebookUrl}
                                    required
                                />
                            </div>
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
                                <button className="fetchBtn1" onClick={this.onClickAddChannel} type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
                        )}
                    </Popup>
                    </div>
                    <div className="ytmchome-main-inner-container">
                <div className="ytmchome-top-container">
                    <div className="ytmchome-top-flex-container">
                    <h2>Facebook</h2>
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
                    {/* <h1>Your Channels</h1> */}
                    {(channelsList.length===0)? (<p>Please add Facebook Profile</p>):
                    (<ul className="ytmchome-channel-container">
                        {channelsList.map((ele,index) => <p key={index}>{ele}</p>)}
                        
                      {/* {channelsList.map((ele) => <YTMCChannelItem key={ele.id} itemDetails={ele}/>)} */}
                    </ul>)
                    }
                </div>)}
                </div>
                </div>
            <Footer/>
            </>
        )
    }
}

export default FacebookPage;