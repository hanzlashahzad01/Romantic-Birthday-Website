// =========================
// Personalization SETTINGS
// =========================

const SETTINGS = {
  herName: "Umama Maryam", // e.g., "liza"
  yourName: "Moaz Jatala", // e.g., "tony"
  birthday: "2026-1-015T00:00:00", // YYYY-MM-DDTHH:mm:ss
  password: "Happybirthday", // change this and share secretly
  wishesAdminCode: "approve123", // to mark wishes as approved (local only)
};

// =========================
// Helper Functions
// =========================

function $(selector) {
  return document.querySelector(selector);
}

function createElement(tag, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}

// =========================
// Password Gate
// =========================

const passwordOverlay = $("#password-overlay");
const passwordInput = $("#password-input");
const passwordSubmit = $("#password-submit");
const passwordError = $("#password-error");
const mainContent = $("#main-content");

function unlockIfValid() {
  const value = passwordInput.value.trim();
  if (!value) return;
  if (value === SETTINGS.password) {
    passwordError.textContent = "";
    passwordOverlay.classList.remove("visible");
    document.body.classList.remove("no-scroll");
    mainContent.classList.remove("hidden");
  } else {
    passwordError.textContent = "Galat secret. Sirf hamara secret chalega. 💌";
  }
}

passwordSubmit?.addEventListener("click", unlockIfValid);
passwordInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockIfValid();
});

// Disable right click (optional)
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// =========================
// Personalization Rendering
// =========================

function applyPersonalization() {
  const herNames = document.querySelectorAll("#her-name, #her-name-2");
  const myNames = document.querySelectorAll("#my-name, #my-name-2");
  herNames.forEach((el) => (el.textContent = SETTINGS.herName));
  myNames.forEach((el) => (el.textContent = SETTINGS.yourName));
}

// =========================
// Background Music
// =========================

const bgMusic = $("#bg-music");
const musicBtn = $("#music-btn");
let musicPlaying = false;

musicBtn?.addEventListener("click", () => {
  if (!bgMusic) return;
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.textContent = "Play Music ♫";
  } else {
    bgMusic
      .play()
      .then(() => {
        musicPlaying = true;
        musicBtn.textContent = "Pause Music ♫";
      })
      .catch(() => {
        musicBtn.textContent = "Tap Again to Play ♫";
      });
  }
});

// =========================
// Reveal Section Confetti
// =========================

const revealBtn = $("#reveal-btn");
const confettiLayer = document.querySelector(".confetti-layer");

function spawnConfetti() {
  if (!confettiLayer) return;
  confettiLayer.innerHTML = "";
  const total = 80;
  for (let i = 0; i < total; i++) {
    const piece = createElement("div", "confetti-piece");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 3}s`;
    piece.style.background =
      Math.random() > 0.5
        ? "linear-gradient(135deg,#ff9a9e,#fecfef)"
        : "linear-gradient(135deg,#fbc2eb,#a18cd1)";
    confettiLayer.appendChild(piece);
  }
}

revealBtn?.addEventListener("click", () => {
  document
    .getElementById("reveal")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
  spawnConfetti();
});

// =========================
// Countdown Timer
// =========================

const countdownEls = {
  days: $("#days"),
  hours: $("#hours"),
  minutes: $("#minutes"),
  seconds: $("#seconds"),
};
const countdownMessage = $("#countdown-message");

function startCountdown() {
  const target = new Date(SETTINGS.birthday).getTime();
  if (Number.isNaN(target)) return;

  function update() {
    const now = Date.now();
    let diff = target - now;

    if (diff <= 0) {
      Object.values(countdownEls).forEach((el) => {
        if (el) el.textContent = "00";
      });
      if (countdownMessage) {
        countdownMessage.textContent =
          "Happy Birthday, meri jaan! Aaj ka har second sirf tumhara hai. 🎂💖";
      }
      return;
    }

    const seconds = Math.floor(diff / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (countdownEls.days) countdownEls.days.textContent = String(days).padStart(2, "0");
    if (countdownEls.hours)
      countdownEls.hours.textContent = String(hours).padStart(2, "0");
    if (countdownEls.minutes)
      countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
    if (countdownEls.seconds)
      countdownEls.seconds.textContent = String(secs).padStart(2, "0");

    if (countdownMessage) {
      if (days > 0) {
        countdownMessage.textContent = `Bas ${days} din aur, phir tumhara special din sirf celebrations se bhara hoga. 🥰`;
      } else if (hours > 0 || minutes > 0) {
        countdownMessage.textContent =
          "Har guzarata second tumhari muskurahat ke kareeb le ja raha hai. ⏳💞";
      } else {
        countdownMessage.textContent =
          "Bas kuch hi pal… phir sirf tum, main, aur yeh raat. ✨";
      }
    }
    requestAnimationFrame(() => setTimeout(update, 1000));
  }

  update();
}

// =========================
// Gallery
// =========================

const galleryImage = $("#gallery-image");
const galleryCaption = $("#gallery-caption");
const prevPhoto = $("#prev-photo");
const nextPhoto = $("#next-photo");
const autoPlayBtn = $("#auto-play-gallery");

const galleryItems = [
  {
    src: "media/photo1.jpeg",
    alt: "Memory together 1",
    caption: "That first moment when I knew: this is my safe place. 🤍",
  },
  {
    src: "media/photo2.jpeg",
    alt: "Memory together 2",
    caption: "Your laugh here is my favorite sound in the entire universe. 💫",
  },
  {
    src: "media/photo3.jpeg",
    alt: "Memory together 3",
    caption: "Har tasveer mein hamara chhota sa khushiyon ka jahaan. 🌙",
  },
];

let currentPhoto = 0;
let galleryInterval = null;

function showPhoto(index) {
  if (!galleryImage || !galleryCaption) return;
  const item = galleryItems[index];
  galleryImage.src = item.src;
  galleryImage.alt = item.alt;
  galleryCaption.textContent = item.caption;
}

prevPhoto?.addEventListener("click", () => {
  currentPhoto = (currentPhoto - 1 + galleryItems.length) % galleryItems.length;
  showPhoto(currentPhoto);
});

nextPhoto?.addEventListener("click", () => {
  currentPhoto = (currentPhoto + 1) % galleryItems.length;
  showPhoto(currentPhoto);
});

autoPlayBtn?.addEventListener("click", () => {
  if (galleryInterval) {
    clearInterval(galleryInterval);
    galleryInterval = null;
    autoPlayBtn.textContent = "Start Slideshow ❤️";
  } else {
    galleryInterval = setInterval(() => {
      currentPhoto = (currentPhoto + 1) % galleryItems.length;
      showPhoto(currentPhoto);
    }, 3000);
    autoPlayBtn.textContent = "Stop Slideshow ⏸";
  }
});

galleryImage?.addEventListener("click", () => {
  if (!galleryImage) return;
  const w = window.open(galleryImage.src, "_blank");
  if (w) w.focus();
});

// =========================
// Love Question Interaction
// =========================

const answerYes = $("#answer-yes");
const answerYesSneaky = $("#answer-yes-sneaky");
const answerResponse = $("#answer-response");

function showAnswerResponse() {
  if (!answerResponse) return;
  answerResponse.textContent =
    "I knew it. Ab officially tum phas chuki ho mere saath hamesha ke liye. 😂💍❤️";
}

answerYes?.addEventListener("click", showAnswerResponse);
answerYesSneaky?.addEventListener("click", showAnswerResponse);

// =========================
// Floating Romantic Messages
// =========================

const floatingText = $("#floating-text");

const floatingMessages = [
  "Tumhari muskurahat meri rozana ki dua hai. 💫",
  "Tumhare bina har cheez aadhi lagti hai, sirf tum ho toh sab kuch complete lagta hai. 🤍",
  "Mera favorite notification ab bhi sirf tumhara naam hai. 📱❤️",
  "Tum aa jao toh har jagah ghar jaisi lagti hai. 🏡",
  "Aaj bhi jab tumhara naam screen par aata hai, dil halka sa skip kar jata hai. 💓",
  "Mujhe tumse sirf ek cheez chahiye… tumhara saath. Hamesha. 🌙",
  "Jab bhi dua maangta hoon, sabse pehle tumhara khayal aata hai. 🙏💘",
];

let floatingIndex = 0;

function rotateFloatingMessages() {
  if (!floatingText) return;
  floatingText.textContent = floatingMessages[floatingIndex];
  floatingIndex = (floatingIndex + 1) % floatingMessages.length;
}

// =========================
// Guestbook (Local Only)
// =========================

const wishForm = $("#wish-form");
const wishName = $("#wish-name");
const wishMessage = $("#wish-message");
const wishAdminCode = $("#wish-admin-code");
const wishesList = $("#wishes-list");

let wishes = [];

function renderWishes() {
  if (!wishesList) return;
  wishesList.innerHTML = "";
  wishes
    .filter((w) => w.approved)
    .forEach((w) => {
      const item = createElement("div", "wish-item");
      const strong = createElement("strong");
      strong.textContent = w.name || "Someone who loves you";
      const msg = createElement("p");
      msg.textContent = w.message;
      item.appendChild(strong);
      item.appendChild(msg);
      wishesList.appendChild(item);
    });
}

wishForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!wishName || !wishMessage || !wishAdminCode) return;

  const newWish = {
    name: wishName.value.trim(),
    message: wishMessage.value.trim(),
    approved: wishAdminCode.value.trim() === SETTINGS.wishesAdminCode,
  };

  if (!newWish.message) return;

  wishes.push(newWish);
  renderWishes();

  wishName.value = "";
  wishMessage.value = "";
  wishAdminCode.value = "";
});

// =========================
// Floating Hearts Background
// =========================

const heartsContainer = document.querySelector(".floating-hearts");

function spawnHeart() {
  if (!heartsContainer) return;
  const heart = createElement("div", "heart-shape");
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${8 + Math.random() * 6}s`;
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}

setInterval(spawnHeart, 800);

// =========================
// Init
// =========================

document.body.classList.add("no-scroll");

document.addEventListener("DOMContentLoaded", () => {
  applyPersonalization();
  startCountdown();
  showPhoto(currentPhoto);
  rotateFloatingMessages();
  setInterval(rotateFloatingMessages, 7000);
});


