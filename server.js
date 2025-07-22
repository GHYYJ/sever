const express = require('express');
const cors = require('cors');
const { RtcTokenBuilder, RtcRole } = require('agora-token');
require('dotenv').config();

const app = express();
app.use(cors());

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
const PORT = process.env.PORT || 3000;

app.get('/rtc/:channel/:uid', (req, res) => {
    const channelName = req.params.channel;
    const uid = req.params.uid;
    const role = RtcRole.PUBLISHER;
    const expireTime = 3600;

    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        channelName,
        parseInt(uid),
        role,
        privilegeExpireTime
    );

    return res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});