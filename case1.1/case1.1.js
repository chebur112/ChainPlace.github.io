document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const messageOptions = document.getElementById("message-options");
  const actionButtonContainer = document.getElementById("action-button-container");
  const userName = localStorage.getItem("playerName") || "Детектив";

  function getCurrentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  }

  function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "message user-message";
    msg.innerHTML = `<div>${text}</div><div class="message-time">${getCurrentTime()}</div>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addBotMessage(text) {
    const msg = document.createElement("div");
    msg.className = "message bot-message";
    msg.innerHTML = `<div>${text.replace(/ИМЯ ПОЛЬЗОВАТЕЛЯ/g, userName)}</div><div class="message-time">${getCurrentTime()}</div>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showOptions(options) {
    messageOptions.innerHTML = "";
    options.forEach((option) => {
      const btn = document.createElement("button");
      btn.className = "option-button";
      btn.textContent = option;
      btn.onclick = () => {
        addUserMessage(option);
        messageOptions.innerHTML = "";
        processUserInput(option);
      };
      messageOptions.appendChild(btn);
    });
  }
  
function showActionButton() {
  actionButtonContainer.innerHTML = `
    <button class="action-button" onclick="location.href='/case1.3/case1.3.html'">
      Приступить к делу
    </button>`;
  actionButtonContainer.style.display = "block";
}

  function processUserInput(msg) {
    setTimeout(() => {
      if (msg.includes("Ты же знаешь, я завязал")) {
        addBotMessage(`${userName}, ты не понимаешь, это величайшее дело кибер-преступлений`);
        showOptions(["А ты умеешь заинтриговать, мне нужно подумать", "Ладно, я согласен", "Я же уже сказал тебе свой ответ"]);
      } else if (msg.includes("Не думал, что ты напишешь")) {
        addBotMessage(`${userName}, я просто так писать не буду`);
        showOptions(["А ты умеешь заинтриговать, мне нужно подумать", "Ладно, я согласен", "Я же уже сказал тебе свой ответ"]);
      } else if (msg.includes("А ты умеешь заинтриговать")) {
        addBotMessage("Время на раздумия нет!");
        showOptions(["Тебе говорили, что ты зануда?", "Ладно, это последняя помощь тебе", "Я уже не тот человек, который тебе нужен"]);
      } else if (msg.includes("Ладно, я согласен")) {
        addBotMessage("Отлично, жду тебя завтра в 9. Адрес скину позже");
        showActionButton();
      } else if (msg.includes("Я же уже сказал тебе свой ответ")) {
        addBotMessage(`Я прошу тебя. Мне нужен именно ты, ${userName}`);
        showOptions(["Ладно, я помогу тебе. Но это последняя моя помощь тебе"]);
      } else if (msg.includes("Тебе говорили, что ты зануда")) {
        addBotMessage(`${userName}, сейчас не время для шуток`);
        showOptions(["Ладно, я помогу тебе. Но это последняя моя помощь тебе"]);
      } else if (msg.includes("Ладно, это последняя помощь тебе") || msg.includes("Ладно, я помогу")) {
        addBotMessage("Отлично, жду тебя завтра в 9. Адрес скину позже");
        showActionButton();
      } else if (msg.includes("Я уже не тот человек")) {
        addBotMessage("Нет, ты именно тот");
        showOptions(["Ладно, я помогу тебе. Но это последняя моя помощь тебе"]);
      }
    }, 500);
  }

  setTimeout(() => {
    addBotMessage("Привет. Есть дело к которым сможешь справиться только ты.");
    showOptions(["Ты же знаешь, я завязал с этим", "Не думал, что ты напишешь после всего что произошло"]);
  }, 1000);
});
