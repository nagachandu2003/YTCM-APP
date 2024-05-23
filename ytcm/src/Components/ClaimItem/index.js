import "./index.css"
import Popup from 'reactjs-popup'

const ClaimItem = (props) => {
    const {itemDetails} = props;
    console.log(itemDetails)
    const {rewardId,claimDate,claimTime,cartList,status} = itemDetails;
    return (
        <li style={{width:'90%'}} className="ytmcchannel-list-item">
        <div style={{textAlign:'justify'}}>
        <h4>Reward ID : {rewardId}</h4>
        <h4>Claimed Date : {claimDate}</h4>
        <h4>Claimed Time : {claimTime}</h4>
        <h4>Status : {status}</h4>
        <div style={{textAlign:'right'}}>
        {/* <button onClick={onDeleteItem} type="button" className="closeBtn1">Delete</button> */}
        <Popup
              trigger={<button className="view-Btn" >View Videos</button>}
                        modal
                        nested
                    >
                        {close => (
                    <div style={{width:'90%'}} className="modal modal1 ytmchome-custom-popup1">
                    <div  className="content ytmchome-popup-cont2">
                        <form>
                          <h4>Videos that are listed for claim</h4>
                          <ul>
                            {cartList.map((ele,index) => (<li key={index}><a style={{color:'black',textDecoration:'none'}} href={ele.videoUrl} target="_blank" rel="noreferrer" >{ele.videoName}</a></li>))}
                          </ul>
                            <div className="actions actions1">
                                <button
                                    className="button closeBtn1"
                                    onClick={() => {
                                        console.log('modal closed ');
                                        close();
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                        )}
                    </Popup>
        </div>
        </div>
    </li>
    )
}

export default ClaimItem