import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import "./index.css"
import Cookies from 'js-cookie'
import YTCMFooter from '../YTCMFooter';
import { ThreeDots } from 'react-loader-spinner';

const KYC = () => {
    const [name, setName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIFSCCode] = useState('');
    const [city, setCity] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [aadharPhoto, setAadharPhoto] = useState(null);
    const [aadharPhotoBase64, setAadhaarPhotoBase64] = useState('');
    const [isLoading, setIsLoading] = useState('false')
    const [userDetails,setUserDetails] = useState('')

    const navigate = useNavigate();

    const onChangeName = (event) => setName(event.target.value);
    const onChangeBankName = (event) => setBankName(event.target.value);
    const onChangeAccountNumber = (event) => setAccountNumber(event.target.value);
    const onChangeIFSCCode = (event) => setIFSCCode(event.target.value);
    const onChangeCity = (event) => setCity(event.target.value);
    const onChangeAadharNumber = (event) => setAadharNumber(event.target.value);
    const onChangeAadharPhoto = (event) => {
         const file = event.target.files[0]
         setAadharPhoto(file);
         const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1]; // Extract Base64 string
            setAadhaarPhotoBase64(
              base64String, // Store Base64 string in form data
            );
        };
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        const getVideos = async () => {
          setIsLoading(true)
          const email = Cookies.get("useremail");
          try {
            const response = await fetch(`https://js-member-backend.vercel.app/users`);
            const data = await response.json();
            const newUser = data.filter((ele) => ele.email===email && ["approved","pending","rejected"].includes(ele.kycstatus))[0]
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
      }, []);

      console.log(userDetails);


    const postKYC = async (obj) => {
        const email = Cookies.get("useremail");
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ obj, email })
            }
            const response = await fetch(`https://js-member-backend.vercel.app/addKYC`, options);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            }
        }
        catch (Err) {
            console.log(`Error Occurred : ${Err}`);
        }
        finally{
            window.location.href="/profile"
        }
    }

    const onSubmitRegisterYTMC = (event) => {
        event.preventDefault();
        console.log(aadharPhoto)
        const formData = {
            name,
            bankName,
            accountNumber,
            ifscCode,
            city,
            aadharNumber,
            aadharPhoto:'',
        };
        postKYC(formData)
        setName('');
        setBankName('');
        setAccountNumber('');
        setIFSCCode('');
        setCity('');
        setAadharNumber('');
    };

    return (
        <>
            <div className="ytmcregister-main-container">
                <div style={{ textAlign: 'left', backgroundColor: '#ffff00', position: 'fixed', width: '100%', top: '0', zIndex: '100' }} className="ytmcregister-top-container">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <FaArrowLeft className="back-icon" />
                        </Link>
                        <h2>KYC</h2>
                    </div>
                </div>
                {isLoading===true && (
                        <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <ThreeDots color="gray" height={50} width={50}/>
                        </div>
                )}
                {isLoading===false && (
                    <>
                    {Object.keys(userDetails)===0 && (                    
                        <div style={{ marginTop: '80px', overflowY: 'auto', paddingBottom: '100px' }} className="ytmcregister-form-container">
                    <form onSubmit={onSubmitRegisterYTMC}>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="username">Name</label>
                            <br />
                            <input placeholder="Enter the Name" onChange={onChangeName} className="ytmcregister-user-input" type="text" id="username" required value={name} />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="bankName">Bank Name</label>
                            <br />
                            <input placeholder="Enter Bank Name" onChange={onChangeBankName} className="ytmcregister-user-input" type="text" id="bankName" required value={bankName} />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="accountNumber">Account Number</label>
                            <br />
                            <input placeholder="Enter Account Number" onChange={onChangeAccountNumber} className="ytmcregister-user-input" type="text" id="accountNumber" value={accountNumber} required />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="ifscCode">IFSC Code</label>
                            <br />
                            <input placeholder="Enter IFSC Code" onChange={onChangeIFSCCode} className="ytmcregister-user-input" type="text" id="ifscCode" value={ifscCode} required />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="city">City</label>
                            <br />
                            <input placeholder="Enter City" onChange={onChangeCity} className="ytmcregister-user-input" type="text" id="city" value={city} required />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="aadharNumber">Aadhar Number</label>
                            <br />
                            <input placeholder="Enter Aadhar Number" onChange={onChangeAadharNumber} className="ytmcregister-user-input" type="text" id="aadharNumber" value={aadharNumber} required />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="aadharPhoto">Aadhar Photo</label>
                            <br />
                            <input className="ytmcregister-user-input" onChange={onChangeAadharPhoto} type="file" id="aadharPhoto" accept=".jpg,.jpeg,.png" required />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button className="fetchBtn" type="submit">Submit</button>
                        </div>
                    </form>
                    </div>
                    )}
                    {userDetails && Object.keys(userDetails)!==0 && (
                        <>
                        <div style={{ marginTop: '80px', overflowY: 'auto', paddingBottom: '100px' }} class="kyccontainer">
                        <ul>
                        <li><span>Name:</span> {(userDetails.kyc).name}</li>
                        <li><span>Email:</span> {userDetails.email}</li>
                        <li><span>Bank:</span> {(userDetails.kyc).bankName}</li>
                        <li><span>Account No:</span> {(userDetails.kyc).accountNumber}</li>
                        <li><span>IFSC Code:</span> {(userDetails.kyc).ifscCode}</li>
                        <li><span>City:</span> {(userDetails.kyc).city}</li>
                        <li><span>Aadhar No:</span> {(userDetails.kyc).aadharNumber}</li>
                        <li><span>Status:</span> {userDetails.kycstatus}</li>
                        </ul>
                    </div>
                        </>
                    )}
                    </>
                )}
                    {/* {aadharPhotoBase64!==null && (<img src={`data:image/jpeg;base64,${aadharPhotoBase64}`} height="200" width="200" alt="image"/>)} */}

            </div>
            <div style={{ position: 'fixed', bottom: '0', width: '100%', zIndex: '100' }}>
                <YTCMFooter />
            </div>
        </>
    )
}

export default KYC;
