require('dotenv').config();
if (!process.env.JWT_SECRET) throw new Error('Set a stable JWT_SECRET before starting Corr.');
const { createApp } = require('./app');
const PORT = process.env.PORT || 3000;
createApp().listen(PORT, () => console.log('Corr API is listening on port ' + PORT));
