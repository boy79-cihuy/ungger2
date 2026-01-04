
//----> step coba //
function checkAnswer() {
  const correctAnswer = "oreo";
  const userAnswer = document
    .getElementById("answer")
    .value
    .trim()
    .toLowerCase();

  const resultText = document.getElementById("result");
  const nextBtn = document.getElementById("nextStepBtn");
   const imgCorrect = document.getElementById("img-correct");
  const imgWrong = document.getElementById("img-wrong");


  if (userAnswer === correctAnswer) {
    resultText.innerHTML = "INII BARUU UNGGER!!";
    resultText.style.color = "green";
    resultText.style.fontSize = "1.5em";
    resultText.style.fontFamily = "Comic Sans MS";

    imgCorrect.style.display = "block";
    imgWrong.style.display = "none";
    nextBtn.classList.remove("hidden"); // munculin tombol next
  } else {
    resultText.innerHTML = "AH BUKAN UGIK KALI NI YEE😏";
    resultText.style.color = "red";
    resultText.style.fontSize = "1.0em";

     imgWrong.style.display = "block";
     imgCorrect.style.display = "none";
    nextBtn.classList.add("hidden"); // pastikan ga bisa lanjut
  }
}
            

// --- STEP SWITCHING ---
function goToStep(step) {
  document.querySelectorAll(".container").forEach(c => c.classList.add("hidden"));
  document.getElementById("step" + step).classList.remove("hidden");

  if (step === 5) startGame();
}
 
// --- RUNAWAY NO BUTTON ---
const noBtn = document.getElementById("noBtn");

if (noBtn) {

  // Kabur saat mouse mendekat
  noBtn.addEventListener("mouseover", function () {
    const x = Math.random() * window.innerWidth * 0.7;
    const y = Math.random() * window.innerHeight * 0.7;
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });

  // Kabur saat diclick (tidak bisa dipencet)
  noBtn.addEventListener("click", function (e) {
    e.preventDefault(); // mencegah klik berfungsi

    const x = Math.random() * window.innerWidth * 0.7;
    const y = Math.random() * window.innerHeight * 0.7;
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });
}

// ================== AUDIO ==================
const bgmGame = document.getElementById("bgmGame");
const soundBomb = document.getElementById("soundBomb");
const soundWin = document.getElementById("soundWin");

// ================== MINI GAME ==================
let score = 0;
let gameOver = false;
let gameInterval = null;

function startGame() {
  const area = document.getElementById("gameArea");

  area.innerHTML = "";
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = "0 / 5";

  // play musik game
  bgmGame.currentTime = 0;
  bgmGame.play();

  gameInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(gameInterval);
      return;
    }

    const heart = document.createElement("div");
    heart.classList.add("poto");

    const isBomb = Math.random() < 0.7;

    if (isBomb) {
      heart.innerHTML = `<img src="bom.png" class="bomimg">`;
      heart.dataset.type = "bom";
    } else {
      heart.innerHTML = `<img src="boy.jpg" class="potoimg">`;
      heart.dataset.type = "kepala";
    }

    const x = Math.random() * (area.clientWidth - 40);
    const y = Math.random() * (area.clientHeight - 40);

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    heart.onclick = () => {
      // KENA BOM
      if (heart.dataset.type === "bom") {
        gameOver = true;
        clearInterval(gameInterval);

        soundBomb.currentTime = 0;
        soundBomb.play();

        stopGameMusic();
        showGameOver();
        return;
      }

      // KLIK KEPALA
      heart.remove();
      score++;
      document.getElementById("score").innerText = score + " / 5";

      // MENANG
      if (score >= 5) {
        gameOver = true;
        clearInterval(gameInterval);

        stopGameMusic();

        soundWin.currentTime = 0;
        soundWin.play();

        setTimeout(() => goToStep(6), 900);
      }
    };

    area.appendChild(heart);
    setTimeout(() => heart.remove(), 3000); resetStep6Animation();
  }, 900);
}

// ================== GAME OVER ==================
function showGameOver() {
  document.getElementById("gameOverScreen").style.display = "flex";
}

function restartGame() {
  stopGameMusic();
  document.getElementById("gameOverScreen").style.display = "none";
  startGame();
}

function stopGameMusic() {
  bgmGame.pause();
  bgmGame.currentTime = 0;
}

//
function resetStep6Animation() {
  const step6 = document.getElementById("step6");
  step6.querySelectorAll(".fade").forEach(el => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });
}


// --- FINAL ACCEPTED ---
function accepted() {
  goToStep(7);
}

function salah() {
    alert("ERROR");
     alert("ERROR");
    alert("Kamu masi ragu?");
    alert("tanya orangnya atuh unggerr 🤪")
  }





