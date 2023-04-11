const express = require("express");
const cors = require("cors");
const {default: axios} = require("axios");
const secret_key = require("./modules/keys.js");


const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try{
    const r = await axios.put(
        'https://api.chatengine.io/users/',
        { username: username, secret: username, first_name: username},
        { headers: {"private-key": secret_key } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e?.response?.status || 500).json(e?.response?.data || { error: 'Error desconocido' });
  }
});

app.listen(3001);