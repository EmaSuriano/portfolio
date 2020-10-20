import axios from 'axios';
import env from 'dotenv';

env.config();

axios({
  method: 'POST',
  url: 'https://api.github.com/repos/EmaSuriano/EmaSuriano/dispatches',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${process.env.GH_TOKEN}`,
    'Content-Type': 'application/json',
  },
  data: { event_type: 'my-event' },
})
  .then(() => console.log('Github hooked called!'))
  .catch(console.error);
