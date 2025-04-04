import React from 'react';

function Header() {
  return (
    <div className="header-container d-flex justify-content-between align-items-center">
      <h2>Profile</h2>
      <div className="d-flex align-items-center">
        <div className="mr-2">
          <p style={{ margin: 0 }}>Jordan Walter</p>
          <small>Manager</small>
        </div>
        <img 
          src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" 
          alt="Manager"
          style={{ borderRadius: '50%', width: '40px', height: '40px' }} 
        />
      </div>
    </div>
  );
}

export default Header;