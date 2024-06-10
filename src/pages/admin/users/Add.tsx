import { GridColDef } from '@mui/x-data-grid';
import './add.scss';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import MainSwitch from '../../../components/switch/Switch.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: (arg: boolean) => void;
  open: boolean;
};

const Add = (props: Props) => {
  const inputs = [
    {
      id: 'name',
      name: 'Name',
      type: 'text',
    },
    {
      id: 'surname',
      name: 'Surname',
      type: 'text',
    },
    {
      id: 'login',
      name: 'Login',
      type: 'text',
    },
    {
      id: 'email',
      name: 'Email',
      type: 'text',
    },
  ];

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
                onFocus={(e) => {
                  console.log(e);
                }}
                onChange={(e) => {
                  console.log(e);
                }}
                size={'medium'}
              />
            ))}
          </form>
          <div className={'switch-container'}>
            <MainSwitch label={'Activate'} />
            <MainSwitch label={'Send email'} />
          </div>
          <div className={'btn-container'}>
            <LoadingBtnModal loading={false} title={'Create'} />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Add;
