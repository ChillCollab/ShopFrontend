import './profile.scss';

function Profile() {
  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="userInfo">
        <img src={'https://i.pinimg.com/originals/78/73/70/787370e61c34dfbfb798ce08ac75a610.png'} className="avatar" />
        <div className="info">
          <div className="fioContainer">
            <div className="fio">Daniil Petrov</div>
          </div>
          <div className="loginCase">
            <div className="log">dpetrov</div>
            <img src="/edit.svg" className="edit-btn" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
