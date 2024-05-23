import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { dataContext } from '../Context/context'


const CartItem = (props) => {
    const {itemDetails} = props
    const {id,videoName,channelTitle,days} = itemDetails
    const {removeItem} = useContext(dataContext)

    const onDeleteItem = () => {
        removeItem(id)
    }

    return (
        <li style={{width:'90%'}} className="ytmcchannel-list-item">
            <div style={{textAlign:'justify'}}>
            <h4>Video : {videoName}</h4>
            <h4>Channel : {channelTitle}</h4>
            <h4>Views : {days.reduce((ele,acc) => ele+parseInt(acc),0)}</h4>
            <h4>Reward : {days.reduce((ele,acc) => ele+(parseInt(acc)/100),0)}</h4>
            <div style={{textAlign:'right'}}>
            <button onClick={onDeleteItem} type="button" className="closeBtn1">Delete</button>
            </div>
            </div>
        </li>
    )
}

export default CartItem