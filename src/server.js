import app from './app';
import config from './config';

if (config.environment === 'development') { console.log(config); }

const { port } = config;

app.listen(port, () => {
  console.log(`Server is running in port:${port}`);
});
