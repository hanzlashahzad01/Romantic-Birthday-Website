## Romantic Birthday Website 💖

This is a fully client-side, password-protected romantic birthday surprise website created just for your special person.

It includes:

- Personalized landing page with her name, your name, and soft animations
- Surprise reveal with a long love letter and confetti
- Live countdown timer to her birthday
- Photo love gallery with slideshow
- Background music + separate romantic voice message section
- Cute love-question interaction
- Auto-rotating floating romantic messages
- Simple local guestbook / wishes wall (no server)
- Final emotional page with hug / heart animation

### 1. How to Run

- Just open `index.html` in your browser (Chrome / Edge / Firefox / Safari).
- For best results on mobile + desktop, host it on any static host (GitHub Pages, Netlify, Vercel, or any shared hosting).

### 2. Basic Personalization

Open `script.js` and edit the `SETTINGS` object at the very top:

```js
const SETTINGS = {
  herName: "Jaan",           // her name
  yourName: "Tumhara Deewana",  // your name
  birthday: "2025-12-10T00:00:00", // her birthday (date and time)
  password: "iloveyou",      // secret password for unlocking
  wishesAdminCode: "approve123", // code to auto-approve wishes
};
```

Then:

- Put your own photos into a `media` folder: `photo1.jpg`, `photo2.jpg`, `photo3.jpg` (or change their names in `script.js` inside `galleryItems`).
- Add your background music file as `media/background-music.mp3`.
- Add your recorded romantic voice note as `media/voice-message.mp3`.

All love letter text and captions are directly editable inside `index.html` and `script.js`.

### 3. Password & Privacy

- The whole site is hidden behind a password overlay (`password` in `SETTINGS`).
- Right-click is disabled to reduce easy downloading / inspection.
- No data is sent to any server; it’s a static front-end experience.

### 4. Guestbook / Wishes

- Wishes are kept only in memory (browser tab) — once the page refreshes, they reset.
- If someone types the correct `wishesAdminCode` while submitting a wish, it appears immediately on the wall as “approved”.

### 5. Reusing For Future Events

- Change the texts, photos, and `birthday` date in `SETTINGS`.
- Adjust colors / fonts from `styles.css`.
- You can copy the project folder and create versions for anniversary, proposal, etc.


