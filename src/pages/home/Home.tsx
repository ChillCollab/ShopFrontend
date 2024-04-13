import BarChartBox from '../../components/barChartBox/BarChartBox';
import BigChartBox from '../../components/bigChartBox/BigChartBox';
import ChartBox from '../../components/chartBox/ChartBox';
import PieChartBox from '../../components/pieCartBox/PieChartBox';
import TopBox from '../../components/topBox/TopBox';
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from '../../data';
import './home.scss';
import { useNavigate } from 'react-router-dom';
import authRequests from '../auth/requests/auth.ts';
import { useEffect, useState } from 'react';
import { MainSpinner } from '../../components/spinners/MainSpinner.tsx';

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  async function getAuth() {
    try {
      const userResponse = await authRequests.userInfo();
      if (userResponse.data.role <= 0) {
        navigate('/', { replace: true });
      }
      if (userResponse?.status !== 200) {
        const refreshResponse = await authRequests.refreshToken();
        if (refreshResponse?.status === 200) {
          localStorage.setItem('access_token', refreshResponse?.data.access_token);
          localStorage.setItem('refresh_token', refreshResponse?.data.refresh_token);
          authRequests.userInfo().then((infoResponse) => {
            if (infoResponse.data.role <= 0) {
              navigate('/', { replace: true });
            }
          });
          return true;
        } else return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      return false;
    }
  }

  useEffect(() => {
    getAuth().then((res) => {
      if (!res) {
        navigate('/auth', { replace: false });
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <MainSpinner isLoading={true} />
      ) : (
        <div className="home">
          <div className="box box1">
            <TopBox />
          </div>
          <div className="box box2">
            <ChartBox {...chartBoxUser} />
          </div>
          <div className="box box3">
            <ChartBox {...chartBoxProduct} />
          </div>
          <div className="box box4">
            <PieChartBox />
          </div>
          <div className="box box5">
            <ChartBox {...chartBoxConversion} />
          </div>
          <div className="box box6">
            <ChartBox {...chartBoxRevenue} />
          </div>
          <div className="box box7">
            <BigChartBox />
          </div>
          <div className="box box8">
            <BarChartBox {...barChartBoxVisit} />
          </div>
          <div className="box box9">
            <BarChartBox {...barChartBoxRevenue} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
