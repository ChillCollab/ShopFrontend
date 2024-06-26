import BarChartBox from '../../../components/barChartBox/BarChartBox.tsx';
import BigChartBox from '../../../components/bigChartBox/BigChartBox.tsx';
import ChartBox from '../../../components/chartBox/ChartBox.tsx';
import PieChartBox from '../../../components/pieCartBox/PieChartBox.tsx';
import TopBox from '../../../components/topBox/TopBox.tsx';
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from '../../../staticDatas.ts';
import './home.scss';
import { useEffect, useState } from 'react';
import { MainSpinner } from '../../../components/spinners/MainSpinner.tsx';

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
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
