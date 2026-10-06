/* =========================================================
   💜 OUR LAST CHAPTER
   ========================================================= */


/* =========================================================
   📸 PAGE 1 PUZZLE PHOTO
   ---------------------------------------------------------
   NO PHOTOS FOLDER.
   
   IMPORTANT:
   The real uploaded image is embedded here as a data URL.
   
   Replace the value below only if you want another image.
   ========================================================= */

const puzzleImage = "blackfil.jpeg";


/* =========================================================
   PAGE SYSTEM
   ========================================================= */

let currentPage = 1;


/* =========================================================
   FLOATING HEARTS
   ========================================================= */

const heartContainer =
    document.getElementById("heartContainer");

const heartEmojis = [
    "💜",
    "💗",
    "💕",
    "💖",
    "🤍",
    "❤️",
    "💓",
    "💞"
];

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    heart.textContent =
        heartEmojis[
            Math.floor(
                Math.random() *
                heartEmojis.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        10 + Math.random() * 17 + "px";

    const duration =
        8 + Math.random() * 9;

    heart.style.animationDuration =
        duration + "s";

    heart.style.opacity =
        0.25 + Math.random() * 0.55;

    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 550);

for (let i = 0; i < 30; i++) {
    setTimeout(createHeart, i * 160);
}


/* =========================================================
   ✨ SPARKLES
   ========================================================= */

const sparkleContainer =
    document.getElementById("sparkleContainer");

function createSparkle() {

    const sparkle =
        document.createElement("div");

    sparkle.className =
        "sparkle";

    sparkle.textContent =
        Math.random() > 0.5 ? "✦" : "·";

    sparkle.style.left =
        Math.random() * 100 + "%";

    sparkle.style.bottom =
        "-20px";

    sparkle.style.fontSize =
        5 + Math.random() * 8 + "px";

    const duration =
        7 + Math.random() * 8;

    sparkle.style.animationDuration =
        duration + "s";

    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, duration * 1000);
}

setInterval(createSparkle, 700);

for (let i = 0; i < 18; i++) {
    setTimeout(createSparkle, i * 230);
}


/* =========================================================
   🎮 PUZZLE
   ========================================================= */

const puzzle =
    document.getElementById("puzzle");

const puzzleProgress =
    document.getElementById("puzzleProgress");

const puzzleTotal =
    document.getElementById("puzzleTotal");

const gameStatus =
    document.getElementById("gameStatus");

const enterBtn =
    document.getElementById("enterBtn");

const puzzleComplete =
    document.getElementById("puzzleComplete");

const puzzleSize = 3;

let selectedPiece = null;


/* =========================================================
   CREATE PUZZLE
   ========================================================= */

function createPuzzle() {

    puzzle.innerHTML = "";

    selectedPiece = null;

    let pieces =
        Array.from(
            { length: puzzleSize * puzzleSize },
            (_, index) => index
        );

    let shuffled;

    do {

        shuffled =
            [...pieces].sort(
                () => Math.random() - 0.5
            );

    } while (
        shuffled.every(
            (value, index) =>
                value === index
        )
    );


    shuffled.forEach(
        (correctIndex, currentIndex) => {

            const piece =
                document.createElement("button");

            piece.className =
                "puzzle-piece";

            piece.dataset.correct =
                correctIndex;

            piece.dataset.position =
                currentIndex;

            updatePieceBackground(piece);

            piece.addEventListener(
                "click",
                () => selectPiece(piece)
            );

            puzzle.appendChild(piece);
        }
    );


    puzzleTotal.textContent =
        puzzleSize * puzzleSize;

    puzzleProgress.textContent =
        "0";
}


/* =========================================================
   SET IMAGE ON PUZZLE PIECE
   ========================================================= */

function updatePieceBackground(piece) {

    const correctIndex =
        Number(piece.dataset.correct);

    const row =
        Math.floor(
            correctIndex / puzzleSize
        );

    const column =
        correctIndex % puzzleSize;


    piece.style.backgroundImage =
        `url("${puzzleImage}")`;

    piece.style.backgroundSize =
        `${puzzleSize * 100}% ${puzzleSize * 100}%`;

    piece.style.backgroundPosition =
        `${(column / (puzzleSize - 1)) * 100}% ` +
        `${(row / (puzzleSize - 1)) * 100}%`;
}


/* =========================================================
   SELECT PIECE
   ========================================================= */

function selectPiece(piece) {

    if (
        piece.classList.contains("correct")
    ) {
        return;
    }

    if (selectedPiece === null) {

        selectedPiece = piece;

        piece.classList.add("selected");

        gameStatus.textContent =
            "Now choose the piece you want to swap with.";

        return;
    }

    if (selectedPiece === piece) {

        piece.classList.remove("selected");

        selectedPiece = null;

        return;
    }

    swapPieces(
        selectedPiece,
        piece
    );
}


/* =========================================================
   SWAP
   ========================================================= */

function swapPieces(first, second) {

    const firstValue =
        first.dataset.correct;

    first.dataset.correct =
        second.dataset.correct;

    second.dataset.correct =
        firstValue;

    updatePieceBackground(first);

    updatePieceBackground(second);

    first.classList.remove("selected");

    selectedPiece = null;

    checkPuzzle();
}


/* =========================================================
   CHECK
   ========================================================= */

function checkPuzzle() {

    const allPieces =
        document.querySelectorAll(
            ".puzzle-piece"
        );

    let solved = 0;

    allPieces.forEach(piece => {

        const position =
            Number(piece.dataset.position);

        const correct =
            Number(piece.dataset.correct);

        if (position === correct) {

            solved++;

            piece.classList.add("correct");

        } else {

            piece.classList.remove("correct");
        }
    });

    puzzleProgress.textContent =
        solved;

    if (
        solved ===
        puzzleSize * puzzleSize
    ) {

        completePuzzle();

    } else {

        gameStatus.textContent =
            "Slowly... piece by piece. 💜";
    }
}


/* =========================================================
   PUZZLE COMPLETE
   ========================================================= */

function completePuzzle() {

    gameStatus.textContent =
        "You put it back together. 💜";

    puzzleComplete.classList.add("show");

    enterBtn.classList.remove("locked");

    puzzle.style.boxShadow =
        "0 0 60px rgba(210,170,255,.35)";

    for (let i = 0; i < 25; i++) {
        setTimeout(createHeart, i * 80);
    }

    startMusic();
}


/* =========================================================
   📖 PAGE NAVIGATION
   ========================================================= */

function showPage(pageNumber) {

    const oldPage =
        document.querySelector(
            ".page.active"
        );

    const newPage =
        document.getElementById(
            "page" + pageNumber
        );

    if (!newPage) {
        return;
    }

    if (oldPage) {
        oldPage.classList.remove("active");
    }

    setTimeout(() => {

        newPage.classList.add("active");

        newPage.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 150);

    currentPage = pageNumber;
}


function nextPage() {

    if (currentPage < 5) {

        showPage(
            currentPage + 1
        );

        startMusic();
    }
}


/* =========================================================
   🎵 MUSIC
   ---------------------------------------------------------
   The audio source itself is inside index.html.
   ========================================================= */

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");


function startMusic() {

    music.volume = 0.3;

    music.play().catch(() => {});
}


function toggleMusic() {

    if (music.paused) {

        music.play();

        musicBtn.textContent =
            "♫";

    } else {

        music.pause();

        musicBtn.textContent =
            "×";
    }
}


/* =========================================================
   🖼️ PHOTO LIGHTBOX
   ========================================================= */

function openPhoto(src) {

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const image =
        document.getElementById(
            "lightboxImage"
        );

    image.src = src;

    lightbox.classList.add("show");
}


function closePhoto() {

    document
        .getElementById("lightbox")
        .classList.remove("show");
}


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closePhoto();
        }
    }
);


/* =========================================================
   🔐 SECRET MESSAGE
   ========================================================= */

function revealSecret() {

    const message =
        document.getElementById(
            "secretMessage"
        );

    const button =
        document.getElementById(
            "secretBtn"
        );

    message.classList.add("show");

    button.textContent =
        "You found it. 💜";
}


/* =========================================================
   📝 HER FINAL MESSAGE
   ========================================================= */

function checkMessage() {

    const textarea =
        document.getElementById(
            "herMessage"
        );

    const finishBtn =
        document.getElementById(
            "finishBtn"
        );

    const charCount =
        document.getElementById(
            "charCount"
        );

    const text =
        textarea.value.trim();

    charCount.textContent =
        textarea.value.length;

    if (text.length >= 10) {

        finishBtn.disabled = false;

        finishBtn.classList.add("ready");

        finishBtn.textContent =
            "Finish our story";

    } else {

        finishBtn.disabled = true;

        finishBtn.classList.remove("ready");

        finishBtn.textContent =
            "Write something first";
    }
}


/* =========================================================
   💜 FINISH
   ========================================================= */

function finishStory() {

    const textarea =
        document.getElementById(
            "herMessage"
        );

    if (
        textarea.value.trim().length < 10
    ) {
        return;
    }

    document.querySelector(
        ".her-message"
    ).style.display = "none";

    const result =
        document.getElementById(
            "finalResult"
        );

    result.classList.add("show");

    for (let i = 0; i < 30; i++) {

        setTimeout(
            createHeart,
            i * 100
        );
    }

    setTimeout(() => {

        result.scrollIntoView({
            behavior: "smooth"
        });

    }, 300);
}


/* =========================================================
   🔄 RESTART
   ========================================================= */

function restart() {

    currentPage = 1;

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

    setTimeout(() => {

        const first =
            document.getElementById("page1");

        first.classList.add("active");

        first.scrollTo(0, 0);

    }, 100);


    const textarea =
        document.getElementById(
            "herMessage"
        );

    if (textarea) {
        textarea.value = "";
    }


    document
        .getElementById("finalResult")
        .classList.remove("show");


    const message =
        document.querySelector(
            ".her-message"
        );

    if (message) {
        message.style.display = "block";
    }


    puzzleComplete.classList.remove(
        "show"
    );

    enterBtn.classList.add(
        "locked"
    );

    puzzle.style.boxShadow =
        "none";

    createPuzzle();

    checkMessage();
}


/* =========================================================
   ⌨️ KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            document.activeElement.tagName ===
            "TEXTAREA"
        ) {
            return;
        }

        if (
            event.key === "ArrowRight" &&
            currentPage < 5
        ) {
            nextPage();
        }

        if (
            event.key === "ArrowLeft" &&
            currentPage > 1
        ) {
            showPage(
                currentPage - 1
            );
        }
    }
);


/* =========================================================
   📱 MOBILE SWIPE
   ========================================================= */

let touchStartX = 0;

document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;
    }
);

document.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event.changedTouches[0].screenX;

        const difference =
            touchStartX - touchEndX;

        if (Math.abs(difference) < 70) {
            return;
        }

        if (
            difference > 0 &&
            currentPage < 5
        ) {
            nextPage();
        }

        if (
            difference < 0 &&
            currentPage > 1
        ) {
            showPage(
                currentPage - 1
            );
        }
    }
);


/* =========================================================
   ▶️ START PUZZLE
   ========================================================= */

createPuzzle();