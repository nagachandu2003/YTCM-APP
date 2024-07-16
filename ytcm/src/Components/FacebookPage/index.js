import "./index.css"
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { Popup } from 'reactjs-popup'
import Cookies from 'js-cookie'
import Footer from '../YTCMFooter'

const FacebookPage = () => {
    const [facebookUrl, setFacebookUrl] = useState('');
    const [channelsList, setChannelsList] = useState([]);
    const [accountsList, setAccountsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [activeTab, setActiveTab] = useState('fbpage');


    // useEffect(() => {
    //     getChannelData();
    // }, []);

    // const getChannelData = async () => {
    //     setIsLoading(true);
    //     const email = Cookies.get("useremail");
    //     const options = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ email })
    //     };
    //     const response = await fetch(`https://js-member-backend.vercel.app/users/channelsdetails`, options);
    //     if (response.ok) {
    //         const data = await response.json();
    //         const { channels } = data;
    //         setChannelsList(channels);
    //         setIsLoading(false);
    //     }
    // };

    const handleTabClick = (value) => {
        setActiveTab(value)
    }

    const onChangeFacebookUrl = (event) => {
        setFacebookUrl(event.target.value);
    };

    const onClickAddChannel = (event) => {
        event.preventDefault();
        const newList = [...channelsList, facebookUrl];
        setChannelsList(newList);
        setFacebookUrl('');
    };

    const onClickAddAccount = (event) => {
      event.preventDefault();
      const newList = [...accountsList, facebookUrl];
      setAccountsList(newList);
      setFacebookUrl('');
  };

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
                                <div style={{ width: '250px' }} className="content ytmchome-popup-cont2">
                                    <form onSubmit={activeTab==="fbpage"?onClickAddChannel:onClickAddAccount}>
                                        <div>
                                            <label htmlFor="fburl">Add Facebook Page</label>
                                            <br />
                                            <input
                                                placeholder="Enter the Facebook Url"
                                                onChange={onChangeFacebookUrl}
                                                className="ytmchome-user-input1"
                                                type="url"
                                                id="fburl"
                                                value={facebookUrl}
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
                                            <button className="fetchBtn1" type="submit">Add</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            <header className="task-main-header-container">
    <h1 className="task-main-heading">Facebook</h1>
    </header>
                <nav className="task-tabs-container">
        <div
          className={`task-tab ${activeTab === 'fbpage' ? 'active' : ''}`}
          onClick={() => handleTabClick('fbpage')}
        >
          Page
        </div>
        <div
          className={`task-tab ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => handleTabClick('account')}
        >
          Account
        </div>
        <div className="task-tab-slider" style={{ left: activeTab === 'account' ? '50%' : '0' }} />
      </nav>
      <main style={{marginTop:'70px'}}>
        {activeTab === 'fbpage' && (
          <section>
            {isLoading===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading===false && (
          <div style={{minHeight:'80vh',marginTop:'20px'}} className="ytmchome-content-container">
            {/* <h1>Facebook Page</h1> */}
            {(channelsList===undefined || channelsList.length === 0) ? (
              <p>Please add Page</p>
            ) : (
              <ul className="ytmchome-channel-container">
                {channelsList.map((ele,index) => (
                  <li className="fbpage-card">
                    <h1>Hello</h1>
                  </li>
                ))}
              </ul>
            )}
          </div>
          )}
          </section>
        )}
        {activeTab === 'account' && (
          <section>
            {isLoading2===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading2===false && (
          <div style={{minHeight:'80vh',marginTop:'20px'}} className="ytmchome-content-container">
            {/* <h1>Facebook Account</h1> */}
            {(accountsList===undefined || accountsList.length === 0) ? (
              <p>Please add Account</p>
            ) : (
              <ul className="ytmchome-channel-container">
                {accountsList.map((ele,index) => (
                  <p key={index}>{ele}</p>
                  // <accountItem key={ele.id} itemDetails={ele} />
                ))}
              </ul>
            )}
          </div>
          )}
          </section>
        )}
      </main>
            </div>
            <Footer />
        </>
    );
};

export default FacebookPage;
