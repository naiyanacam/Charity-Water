// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#donate') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


// ===== DONATION SYSTEM =====
let amount = 12450;
let goal = 20000;

const counter = document.getElementById("donationAmount");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const donateTenBtn = document.querySelector(".donate-btn");
const customDonateBtn = document.getElementById("customDonateBtn");
const customInput = document.getElementById("customAmount");
const popup = document.getElementById("popup");

function updateDisplay() {
    counter.innerText = amount.toLocaleString();

    let percentage = (amount / goal) * 100;
    if (percentage > 100) percentage = 100;

    progressBar.style.width = percentage + "%";
    progressText.innerText = Math.floor(percentage) + "% 💧";
}

function showPopup(donatedAmount) {
    popup.innerText = `Thank you for donating $${donatedAmount}! 💧`;
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

function launchConfetti() {
    confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFC907', '#ffdb4d', '#ffe680'],
        shapes: ['circle'],
        scalar: 1.2
    });
}

donateTenBtn.addEventListener("click", function() {
    amount += 10;
    updateDisplay();
    showPopup(10);
    launchConfetti();
});

customDonateBtn.addEventListener("click", function() {
    let customValue = parseInt(customInput.value);

    if (!isNaN(customValue) && customValue > 0) {
        amount += customValue;
        updateDisplay();
        showPopup(customValue);
        customInput.value = "";
        launchConfetti();
    }
});

customInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        customDonateBtn.click();
    }
});

// ===== ANIMATE WHEN TRACK SECTION IS VISIBLE =====
const trackSection = document.getElementById("track");
let hasAnimated = false;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            updateDisplay(); // just call the real function
            hasAnimated = true;
        }
    });
}, { threshold: 0.6 });

if (trackSection) observer.observe(trackSection);
