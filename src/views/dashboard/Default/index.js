import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from '../../../components/cards/MainCard'
import { Typography } from '@mui/material'
// import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
      <MainCard 
      title={
        <div className={'wallets-header'}>
          <Typography variant='h3' className={'title-header'}>
            Bienvenido (　o=^•ェ•)o　┏━┓
          </Typography>
        </div>
      }></MainCard>
  );
};

export default Dashboard;
