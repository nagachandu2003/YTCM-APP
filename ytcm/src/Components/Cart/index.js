import { useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner';
import Footer from '../YTCMFooter'
import { FaArrowLeft } from 'react-icons/fa';
import { useContext } from 'react';
import "./index.css"
import { dataContext } from '../Context/context';
import CartItem from '../CartItem'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [videosList, setVideosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {cartList,addItem,removeItem} = useContext(dataContext); 
  const navigate = useNavigate();

  let totrewards = 0;
  let totviews = 0;
  for(let values of cartList)
    {
        totrewards += (values.days).reduce((ele,acc) => ele + (parseInt(acc)/100),0);
        totviews += (values.days).reduce((ele,acc) => ele+parseInt(acc),0);
    }

    const onClaimVideos = async () => {
        const email = Cookies.get("useremail");
        const currDate = (new Date()).toLocaleDateString('en-GB')
        const currTime = (new Date()).toLocaleTimeString()
        const options = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({email,claimeddetails : {rewardId:uuidv4(),cartList,totrewards,totviews,totvideos:cartList.length,claimDate:currDate,claimTime:currTime,status:'pending'}})
        }
        const response = await fetch("https://js-member-backend.vercel.app/addclaimeditems",options);
        try{
            const data = await response.json();
            navigate("/reward",{replace:true})
        }
        catch(Err){
            console.log(Err);
        }
    }

  return (
    <>
      <div className="ytmchome-main-container">
        <div className="ytmchome-top-container">
          <div className="ytmchome-top-flex-container">
            <div style={{display:'flex',alignItems:'center'}}>
                <Link to="/reward" style={{textDecoration:'none'}}>
                <FaArrowLeft className="back-icon"/>
                </Link>
            <h2>Cart</h2>
            </div>
            <p>Total Videos : {cartList.length}</p>
          </div>
        </div>
        <div className='ytmchome-content-container'>
        {cartList.length !== 0 && (
        <>
          <h2>Selected Videos for Claim</h2>
          <ul style={{listStyleType:'none',paddingLeft:'0',display:'flex',flexDirection:'column',alignItems:'center'}}>
            {cartList.map((ele, index) => (
              <CartItem key={index + 1} itemDetails={ele} removeItem={removeItem} />
            ))}
          </ul>
          <div style={{textAlign:'left'}}>
            <h2>Total Rewards : {totrewards}</h2>
          </div>
          <div>
            <button onClick={onClaimVideos} className='claimBtn' type="button">Claim</button>
          </div>
        </>
      )}
        </div>

        </div>
      <Footer/>
    </>
  );
};

export default Cart;

