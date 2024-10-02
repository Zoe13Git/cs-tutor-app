const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fetchRoutes = require('./routes/fetchRoutes');

const app = express();
const port = process.env.PORT || 3000;
const session_secret = process.env.SESSION_SECRET || "12320";

const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');


// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/content', fetchRoutes);


// app.post('/compile', async (req, res) => {
//   const { code } = req.body;
//   try {
//     const response = await axios.post('https://api.jdoodle.com/v1/execute', {
//       script: code,
//       language: 'c',
//       versionIndex: '3',
//       clientId: 'acec601d38ad636a6715438e24ae454c',
//       clientSecret: '176d23a7ec47245a1868dcaabc5ab16f80f7714262814582508d48435fa220b1',
//       compileOnly: false,
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send(error.toString());
//   }
// });




app.use(session({
  secret: session_secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));


cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});