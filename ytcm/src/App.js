import YTCMLogin from './Components/YTCMLogin';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import YTCMReport from './Components/YTCMReport'
import {useState,useEffect} from 'react'
import "./App.css"
import RegistrationPending from './Components/RegistrationPending';
import YTCMRegister from './Components/YTCMRegister'
import YTCMVideo from './Components/YTCMVideo'
import YTMCVideoDetailItem from './Components/YTCMVideoDetailItem'
import Profile from './Components/Profile'
import Account from './Components/Account'
import Reward from './Components/Reward'
import Content from './Components/Content'
import KYC from './Components/KYC'
import Cart from './Components/Cart'
import {dataContext} from './Components/Context/context'

const App = () => {
  const [cartList,setCartList] = useState([]);
  const addItem = (value) => {
    const newObj = [...cartList,value];
    setCartList(newObj);
  }
  useEffect(() => {
    const getList = localStorage.getItem("videoCartList");
    if (getList) {
      setCartList(JSON.parse(getList));
    }
  }, []);

  const removeItem = (id) => {
    const filteredList = cartList.filter((ele) => ele.id!==id);
    localStorage.setItem("videoCartList",JSON.stringify(filteredList));
    setCartList(filteredList)
  }

  const replaceList = (arg) => {
    localStorage.setItem("videoCartList",JSON.stringify(arg))
    setCartList(arg);
  }

    return (
      <BrowserRouter>
      <dataContext.Provider value={{cartList,replaceList,addItem,removeItem}}>
      <Routes>
        <Route path="/" element={<YTCMLogin/>}/>
        <Route exact path="/report" element={<YTCMReport/>}/>
        <Route exact path="/pending" element={<RegistrationPending/>}/>
        <Route exact path="/register" element={<YTCMRegister/>}/>
        <Route exact path="/video/:channelName" element={<YTCMVideo/>}/>
        <Route exact path="/video/videoinfo/:channelName/:videoid" element={<YTMCVideoDetailItem/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/account" element={<Account/>}/>
        <Route exact path="/reward" element={<Reward/>}/>
        <Route exact path="/content" element={<Content/>}/>
        <Route exact path="/kyc" element={<KYC/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
      </Routes>
      </dataContext.Provider>
      </BrowserRouter>
    )
  }

export default App;
