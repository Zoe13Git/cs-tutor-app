const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fetchRoutes = require('./routes/fetchRoutes');

const app = express();
const port = process.env.PORT || 3000;
const session_secret = process.env.SESSION_SECRET || "12320";


// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/content', fetchRoutes);


app.post('/compile',   
 (req, res) => {
  const code = req.body.code;

  const childProcess = spawn('clang', ['-fsyntax-only', '-x', 'c', '-'], {
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  childProcess.stdin.write(code);
  childProcess.stdin.end();

  let output = '';
  childProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  childProcess.stderr.on('data', (data) => {
    output += data.toString();
  });

  childProcess.on('close',   
 (code) => {
    res.json({ success: code === 0, message: output });
  });
});



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