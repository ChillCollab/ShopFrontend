import { useParams } from 'react-router-dom';
import Single from '../../components/single/Single';
import { singleUser } from '../../staticDatas';
import './user.scss';

const User = () => {
  //Fetch data and send to Single Component
  // const params = useParams();

  return (
    <div className="user">
      <Single {...singleUser} />
    </div>
  );
};

export default User;
