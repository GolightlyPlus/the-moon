import '@fontsource/inter';
import {
  CssBaseline,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Divider
} from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import dayjs from 'dayjs';

import background from './images/space.jpeg';
import { useEffect, useState } from 'react';

const App = () => {
  const [moonData, setMoonData] = useState();

  useEffect(() => {
    const fetchMoonPhase = async () => {
      const res = await fetch(
        `https://api.farmsense.net/v1/moonphases/?d=${Math.floor(
          Date.now() / 1000
        )}`
      );
      const data = await res.json();
      setMoonData(data[0]);
    };

    fetchMoonPhase();
  }, []);

  if (!moonData) {
    return <LinearProgress />;
  }

  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <Grid
        container
        sx={{
          backgroundImage: `url(${background})`,
          height: '100vh',
          backgroundSize: 'cover'
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <Card color="primary" variant="soft">
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography level="h3">{moonData.Moon[0]}</Typography>
              <Typography level="h4">
                {(moonData.Illumination * 100).toFixed(0)}% illuminated
              </Typography>
              <Typography level="body-lg">{moonData.Phase}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography level="body-xs">
                next full moon
                <br />
                {dayjs(moonData.TargetDate * 1000)
                  .add(30 - moonData.Age, 'days')
                  .format('MMMM D YYYY, h:mm:ss a')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </CssVarsProvider>
  );
};

export default App;
