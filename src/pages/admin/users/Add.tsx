import { GridColDef } from '@mui/x-data-grid';
import './add.scss';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import MainSwitch from '../../../components/switch/Switch.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import React, { useEffect } from 'react';
import adminReqs from '../../../requests/admin/admin.ts';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { usersListTrigger } from '../../../store/usersListTriggersSlice.ts';

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: (arg: boolean) => void;
  open: boolean;
};

const Add = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSwitchChecked, setIsSwitchChecked] = React.useState<boolean>(false);
  const [isName, setIsName] = React.useState<string>('');
  const [isSurname, setIsSurname] = React.useState<string>('');
  const [isLogin, setIsLogin] = React.useState<string>('');
  const [isEmail, setIsEmail] = React.useState<string>('');
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);

  const handleName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsName(e.target.value);
  };
  const handleSurname = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsSurname(e.target.value);
  };
  const handleLogin = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsLogin(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsEmail(e.target.value);
  };

  const dispatch = useDispatch();

  const addUser = () => {
    setIsLoading(true);
    adminReqs
      .addUser(isName, isSurname, isLogin, isEmail, isSwitchChecked)
      .then((addResponse: AxiosResponse) => {
        if (addResponse?.data) {
          props.setOpen(false);
          dispatch(usersListTrigger({ usersListTrigger: [isName, isSurname, isLogin, isEmail] }));
          props.columns.unshift({
            field: 'id',
            headerName: 'ID',
            width: 70,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const inputs = [
    {
      id: 'name',
      name: 'Name',
      type: 'text',
      handler: handleName,
    },
    {
      id: 'surname',
      name: 'Surname',
      type: 'text',
      handler: handleSurname,
    },
    {
      id: 'login',
      name: 'Login',
      type: 'text',
      handler: handleLogin,
    },
    {
      id: 'email',
      name: 'Email',
      type: 'text',
      handler: handleEmail,
    },
  ];

  useEffect(() => {
    if (isName && isSurname && isLogin && isEmail) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isName, isSurname, isLogin, isEmail]);

  return (
    <ModalContainer active={props.open} setIsActive={props.setOpen}>
      <div className={'add-user-modal'}>
        <div className={'add-user-container'}>
          <div className={'add-text-container'}>
            <div className={'add-title'}>Add new user</div>
          </div>
          <form className={'add-user-inputs-container'}>
            {inputs.map((input) => (
              <InputLabelText
                key={input.id}
                id={input.id}
                label={input.name}
                type={input.type}
                error={false}
                onChange={(e) => input.handler(e)}
                size={'medium'}
              />
            ))}
          </form>
          <div className={'switch-container'}>
            <MainSwitch
              checked={isSwitchChecked}
              onChange={() => setIsSwitchChecked(!isSwitchChecked)}
              label={'Send email'}
            />
          </div>
          <div className={'btn-container'}>
            <LoadingBtnModal onClick={() => addUser()} loading={isLoading} title={'Add user'} disabled={isDisabled} />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Add;
