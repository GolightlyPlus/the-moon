import '@fontsource/inter';
import {
  CssBaseline,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress
} from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';

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
            <CardContent>
              <Typography level="h3">
                Moon phase: {(moonData.Illumination * 100).toFixed(0)}%
              </Typography>
              <Typography level="body-lg" textAlign={'center'}>
                {moonData.Phase}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </CssVarsProvider>
  );
};

export default App;
