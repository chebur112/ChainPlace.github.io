const btnDoc = document.getElementById("doc");
const btnRules = document.getElementById("rules");
const btnStart = document.getElementById("start");
const playerNameInput = document.getElementById("playerName");
const clearInput = document.querySelector(".clear-input");

const modal1 = document.getElementById("text1");
const modal2 = document.getElementById("text2");
const confirmationModal = document.getElementById("confirmationModal");

window.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.container').style.opacity = '1';
    
    const savedName = localStorage.getItem("playerName");
    if (savedName) {
        playerNameInput.value = savedName;
        clearInput.style.display = "block";
    }
});

playerNameInput.addEventListener("input", function () {
    const name = playerNameInput.value.trim();
    clearInput.style.display = (name) ? "block" : "none";
    if (name) {
        localStorage.setItem("playerName", name);
    } else {
        localStorage.removeItem("playerName");
    }
});

clearInput.addEventListener("click", function (e) {
    e.preventDefault();
    playerNameInput.value = "";
    clearInput.style.display = "none";
    localStorage.removeItem("playerName");
    playerNameInput.focus();
});

btnDoc.onclick = function () {
    modal1.style.display = "block";
    setTimeout(() => {
        modal1.querySelector('.modal-content').style.transform = 'translateY(0)';
        modal1.querySelector('.modal-content').style.opacity = '1';
    }, 10);
};

btnRules.onclick = function () {
    modal2.style.display = "block";
    setTimeout(() => {
        modal2.querySelector('.modal-content').style.transform = 'translateY(0)';
        modal2.querySelector('.modal-content').style.opacity = '1';
    }, 10);
};

btnStart.onclick = function () {
    const playerName = localStorage.getItem("playerName");
    if (!playerName) {
        alert("Пожалуйста, сначала введите имя персонажа");
        playerNameInput.focus();
        return;
    }
    confirmationModal.style.display = "block";
    setTimeout(() => {
        confirmationModal.querySelector('.confirmation-content').style.transform = 'translateY(0)';
        confirmationModal.querySelector('.confirmation-content').style.opacity = '1';
    }, 10);
};

document.querySelectorAll(".close").forEach(function (btn) {
    btn.onclick = function () {
        const targetId = btn.getAttribute("data-target");
        const modal = document.getElementById(targetId);
        modal.querySelector('.modal-content').style.transform = 'translateY(-20px)';
        modal.querySelector('.modal-content').style.opacity = '0';
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    };
});

window.onclick = function (event) {
    [modal1, modal2, confirmationModal].forEach(function (modal) {
        if (event.target === modal) {
            modal.querySelector('.modal-content').style.transform = 'translateY(-20px)';
            modal.querySelector('.modal-content').style.opacity = '0';
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        }
    });
};

document.querySelector(".yes-btn").addEventListener("click", function () {
    document.querySelector('.container').style.opacity = '0';
    setTimeout(() => {
        window.location.href = "/levels/levels.html";
    }, 500);
});

document.querySelector(".no-btn").addEventListener("click", function () {
    confirmationModal.querySelector('.confirmation-content').style.transform = 'translateY(-20px)';
    confirmationModal.querySelector('.confirmation-content').style.opacity = '0';
    setTimeout(() => {
        confirmationModal.style.display = "none";
    }, 300);
});

document.querySelectorAll('.modal-content, .confirmation-content').forEach(el => {
    el.style.transition = 'all 0.3s ease';
    el.style.transform = 'translateY(-20px)';
    el.style.opacity = '0';
});

document.querySelector('.container').style.transition = 'opacity 0.5s ease';
document.querySelector('.container').style.opacity = '0';