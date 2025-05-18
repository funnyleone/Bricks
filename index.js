import express from 'express';

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'BRICKS_VERIFY';

/* 1️⃣ Verification handshake */
app.get('/waba', (req, res) => {
  const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);     // ✅ tell Meta “good token”
  }
  res.sendStatus(403);                          // ❌ wrong token
});

/* 2️⃣ Receive events (voice notes, texts, etc.) */
app.post('/waba', (req, res) => {
  res.sendStatus(200);                          // Acknowledge fast
  console.log(JSON.stringify(req.body, null, 2)); // View in Cloud-Run logs
  // ---- Add Whisper + Sheets logic here later ----
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Bricks webhook listening on', PORT));
