import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./index.css";
import { MdFlag } from 'react-icons/md';
import { RiGiftFill } from 'react-icons/ri';
import { IoDocumentText } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

const YTCMFooter = () => {
  const [activeTab, setActiveTab] = useState('Report'); // Initially set to 'Media'

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='footer-container'>
      <nav className='bottom-tabs-container'>
        {/* <Link to="/ytcmmedia" className={`bottom-tab ${activeTab === 'Media' ? 'active' : ''}`} onClick={() => handleClick('Media')}>
          <MdFlag className={`tab-icon ${activeTab === 'Media' ? 'active-icon' : ''}`} /> Media
        </Link> */}
        <Link to="/ytcmmedia" className={`bottom-tab ${activeTab === 'Report' ? 'active' : ''}`} onClick={() => handleClick('Report')}>
          <MdFlag className={`tab-icon ${activeTab === 'Report' ? 'active-icon' : ''}`} /> Report
        </Link>
        <Link to="/reward" className={`bottom-tab ${activeTab === 'Reward' ? 'active' : ''}`} onClick={() => handleClick('Reward')}>
          <RiGiftFill className={`tab-icon ${activeTab === 'Reward' ? 'active-icon' : ''}`} /> Reward
        </Link>
        <Link to="/content" className={`bottom-tab ${activeTab === 'Content' ? 'active' : ''}`} onClick={() => handleClick('Content')}>
          <IoDocumentText className={`tab-icon ${activeTab === 'Content' ? 'active-icon' : ''}`} /> Content
        </Link>
        <Link to="/profile" className={`bottom-tab ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => handleClick('Profile')}>
          <FaUserCircle className={`tab-icon ${activeTab === 'Profile' ? 'active-icon' : ''}`} /> Profile
        </Link>
      </nav>
    </div>
  );
};

export default YTCMFooter;
