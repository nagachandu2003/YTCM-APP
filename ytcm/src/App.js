import YTCMLogin from './Components/YTCMLogin';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import YTCMReport from './Components/YTCMReport'
// import YTMCHome from './Components/YTMCHome'
// import YTMCRegister from './Components/YTMCRegister'
// import YTMCVideo from './Components/YTMCVideo'
// import YTMCVideoDetailItem from './Components/YTMCVideoDetailItem'
// import RegistrationSuccess from './Components/RegistrationSuccess';
import "./App.css"
import RegistrationPending from './Components/RegistrationPending';
import YTCMRegister from './Components/YTCMRegister'
import YTCMVideo from './Components/YTCMVideo'
import YTMCVideoDetailItem from './Components/YTCMVideoDetailItem'
import Profile from './Components/Profile'
import Account from './Components/Account'
import Reward from './Components/Reward'
import Content from './Components/Content'

const App = () => {
    return (
      <BrowserRouter>
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
      </Routes>
      </BrowserRouter>
    )
  }

export default App;
