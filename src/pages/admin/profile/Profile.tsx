import './profile.scss';
import InputLabelEmailChange from '../../../components/inputs/InputLabelEmailChange.tsx';
import { InputLabelPasswordClean } from '../../../components/inputs/InputLabelPasswordClean.tsx';
import { InputPhoneNumberDisabled } from '../../../components/inputs/InputPhoneNumberDisabled.tsx';

function Profile() {
  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="userInfo">
        <img
          src={'https://i.pinimg.com/originals/78/73/70/787370e61c34dfbfb798ce08ac75a610.png'}
          className="avatar"
          alt="avatar"
        />
        <div className="infoContainer">
          <div className="fioContainer">
            <div className="fio">Daniil Petrov</div>
          </div>
          <div className="loginCase">
            <div className="log">dpetrov</div>
            <img src="/edit.svg" className="edit-btn" alt="edit-button" />
          </div>
        </div>
      </div>
      <div className="info-change">
        <div className="inputs">
          <InputLabelEmailChange
            disabled={true}
            error={false}
            label={'Email'}
            size={'medium'}
            value={'daniilpietrov00@gmail.com'}
            style={{ width: '100%', maxWidth: '510px', minWidth: '320px', maxHeight: '56px' }}
            onChange={(e) => console.log(e)}
            onKeyDown={(e) => console.log(e)}
            onFocus={(e) => console.log(e)}
            onClick={(e) => console.log(e)}
          />
          <div className="pass-cnt">
            <InputLabelPasswordClean
              disabled={true}
              label={'Password'}
              value={'password'}
              style={{ width: '100%', maxWidth: '510px', minWidth: '320px', maxHeight: '56px' }}
              size={'medium'}
              onChange={(e) => console.log(e)}
              onKeyDown={(e) => console.log(e)}
              onFocus={(e) => console.log(e)}
              onClick={(e) => console.log(e)}
            />
            <div className="change-password">Change password</div>
          </div>
          <InputPhoneNumberDisabled
            disabled={true}
            label={'Phone number'}
            value={'79135954112'}
            style={{ width: '100%', maxWidth: '510px', minWidth: '320px', maxHeight: '56px' }}
            size={'medium'}
            onChange={(e) => console.log(e)}
            onKeyDown={(e) => console.log(e)}
            onFocus={(e) => console.log(e)}
            onClick={(e) => console.log(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
