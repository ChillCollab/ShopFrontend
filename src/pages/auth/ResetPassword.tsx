import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainSpinner } from '../../components/spinners/MainSpinner.tsx';
import { InputLabelPassword } from '../../components/inputs/Inputs.tsx';
import { LoadingButton } from '@mui/lab';

export default function ResetPassword() {
  const [isErr, setIsErr] = useState<boolean>(false);
  const [isMsg, setIsMsg] = useState<string>('');
  const [isEyeFirst, setIsEyeFirst] = useState<boolean>(false);
  const [isEyeSecond, setIsEyeSecond] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<string>('');
  const [isPasswordSubmit, setIsPasswordSubmit] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const code = id == undefined ? '' : id;

  const handlerPassword = (data: ChangeEvent<HTMLInputElement>) => {
    setIsPassword(data.target.value);
  };
  const handlerPasswordSubmit = (data: ChangeEvent<HTMLInputElement>) => {
    setIsPasswordSubmit(data.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setIsButtonLoading(true);
    }
  };

  useEffect(() => {
    if (code.length < 19) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/auth', { replace: true });
    }
  }, []);

  return (
    <div className="loginContainer">
      {isLoading ? (
        <MainSpinner isLoading={isLoading} />
      ) : (
        <div className="inputContainer">
          <div className="titleContainer">
            <h1>Create a new password</h1>
            <p>
              Enter a new secure password. Your password must include at least one capital letter and one lowercase
              letter, one special character and a minimum length of 8 characters.
            </p>
          </div>
          <InputLabelPassword
            error={isErr}
            isShow={isEyeFirst}
            setIsShow={setIsEyeFirst}
            label={'Password'}
            onFocus={() => setIsErr(false)}
            event={handlerPassword}
            onKeyDown={handleKeyDown}
            size={'medium'}
          />
          <InputLabelPassword
            error={isErr}
            isShow={isEyeSecond}
            setIsShow={setIsEyeSecond}
            label={'Password'}
            onFocus={() => setIsErr(false)}
            onKeyDown={handleKeyDown}
            event={handlerPasswordSubmit}
            size={'medium'}
          />
          {isErr ? <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{isMsg}</div> : <></>}
          <div className="buttonsContainer">
            <LoadingButton
              loading={isButtonLoading}
              className="loginButton"
              variant="contained"
              onClick={() => {
                setIsButtonLoading(true);
              }}
            >
              Confirm password
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
}
