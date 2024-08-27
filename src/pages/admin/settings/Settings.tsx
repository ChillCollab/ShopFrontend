import React, { useEffect, useState } from 'react';
import './settings.scss';
import { InputLabelMain } from '../../../components/inputs/Inputs.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import { settingsReqs } from '../../../requests/settings/settingsReqs.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { MainSpinner } from '../../../components/spinners/MainSpinner.tsx';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../store/systemAlertSlices.ts';

interface Config {
  smtp_host: string;
  smtp_port: string;
  smtp_email: string;
  smtp_password: string;
}

interface Loaders {
  smtpLoader: boolean;
}

export const Settings: React.FC = () => {
  const [isLoad, setLoad] = useState<boolean>(true);
  const [isLoaders, setLoaders] = useState<Loaders>({
    smtpLoader: false,
  });
  const [isState, setState] = useState<Config>({
    smtp_host: '',
    smtp_port: '',
    smtp_email: '',
    smtp_password: '',
  });

  const dispatch = useDispatch();

  const smtpHostHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...isState, smtp_host: event.target.value });
  };
  const smtpPortHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...isState, smtp_port: event.target.value });
  };
  const smtpEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...isState, smtp_email: event.target.value });
  };
  const smtpPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...isState, smtp_password: event.target.value });
  };

  const updateSMTP = async () => {
    setLoaders({ ...isLoaders, smtpLoader: true });
    await settingsReqs
      .updateSMTP(isState.smtp_host, isState.smtp_port, isState.smtp_email, isState.smtp_password)
      .then((res: AxiosResponse) => {
        if (!res.data.error) {
          dispatch(addAlert({ message: 'SMTP settings updated successful', type: 'success' }));
        }
      })
      .catch((e: AxiosError<{ message: string }>) => {
        console.error(e);
        if (e.response?.data) {
          dispatch(addAlert({ message: `${e.response.data.message}`, type: 'error' }));
        }
      })
      .finally(() => {
        setLoaders({ ...isLoaders, smtpLoader: false });
      });
  };

  useEffect(() => {
    settingsReqs
      .getConfig()
      .then((response: AxiosResponse) => {
        if (!response.data.error) {
          setState(response.data);
        }
      })
      .catch((e: AxiosError) => {
        console.error(e);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  const smtp = [
    {
      id: 'host',
      name: 'Host',
      type: 'text',
      value: isState.smtp_host,
      onChange: smtpHostHandler,
    },
    {
      id: 'port',
      name: 'Port',
      type: 'text',
      value: isState.smtp_port,
      onChange: smtpPortHandler,
    },
    {
      id: 'email',
      name: 'Email',
      type: 'text',
      value: isState.smtp_email,
      onChange: smtpEmailHandler,
    },
    {
      id: 'password',
      name: 'Password',
      type: 'current-password',
      value: isState.smtp_password,
      onChange: smtpPasswordHandler,
    },
  ];
  return isLoad ? (
    <MainSpinner isLoading={isLoad} />
  ) : (
    <div className="settings-container">
      <div className={'settings-title-container'}>
        <h1>Settings</h1>
      </div>
      <div className={'settings-content-container'}>
        <div className={'settings-smtp-container'}>
          <p>SMTP</p>
          <form className={'settings-inputs-container'}>
            {smtp.map((input) => {
              return (
                <InputLabelMain
                  key={input.id}
                  id={input.id}
                  type={input.type}
                  label={input.name}
                  value={input.value}
                  onChange={input.onChange}
                  size={'medium'}
                />
              );
            })}
          </form>
          <div className={'settings-button-container'}>
            <LoadingBtnModal title={'Save'} className={'settings-btn'} loading={false} onClick={() => updateSMTP()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
