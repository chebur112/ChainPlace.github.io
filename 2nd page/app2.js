document.addEventListener("DOMContentLoaded", function () {
  const chatMessages = document.getElementById("chat-messages");
  const messageOptions = document.getElementById("message-options");

  // Начальное сообщение бота
  setTimeout(() => {
    addBotMessage("Привет. Есть дело к которым сможешь справиться только ты.");
    showOptions([
      "Ты же знаешь, я завязал с этим",
      "Не думал, что ты напишешь после всего что произошло",
    ]);
  }, 1000);

  function addUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message user-message";

    const messageText = document.createElement("div");
    messageText.textContent = text;

    const messageTime = document.createElement("div");
    messageTime.className = "message-time";
    messageTime.textContent = Date.now;

    messageDiv.appendChild(messageText);
    messageDiv.appendChild(messageTime);
    chatMessages.appendChild(messageDiv);
  }

  function addBotMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot-message";

    const messageText = document.createElement("div");
    messageText.textContent = text;

    const messageTime = document.createElement("div");
    messageTime.className = "message-time";
    messageTime.textContent = Date.now;

    messageDiv.appendChild(messageText);
    messageDiv.appendChild(messageTime);
    chatMessages.appendChild(messageDiv);
  }

  function showOptions(options) {
    messageOptions.innerHTML = "";

    options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "option-button";
      button.textContent = option;

      button.addEventListener("click", function () {
        addUserMessage(option);
        messageOptions.innerHTML = "";
        processUserInput(option);
      });

      messageOptions.appendChild(button);
    });
  }

  function processUserInput(userMessage) {
    setTimeout(() => {
      if (userMessage.includes("Ты же знаешь, я завязал с этим")) {
        addBotMessage(
          "ИМЯ ПОЛЬЗОВАТЕЛЯ, ты не пониманшь, это дело можно назвать вельчайшим в истории кибер-преступлений"
        );
        showOptions([
          "А ты умеешь заинтриговать, мне нужно подумать",
          "Ладно, я согласен",
          "Я же уже сказал тебе свой ответ",
        ]);
      } else if (
        userMessage.includes(
          "Не думал, что ты напишешь после всего что произошло"
        )
      ) {
        addBotMessage(
          "ИМЯ ПОЛЬЗОВАТЕЛЯ, я помню ситуацию которая произошла. Но ты же понимаешь, я просто так писать не буду"
        );
        showOptions([
          "А ты умеешь заинтриговать, мне нужно подумать",
          "Ладно, я согласен",
          "Я же уже сказал тебе свой ответ",
        ]);
      } else if (
        userMessage.includes("А ты умеешь заинтриговать, мне нужно подумать")
      ) {
        addBotMessage("Время на раздумие нет!");
        showOptions([
          "Тебе говорили, что ты зануда?",
          "Ладно, это последняя помощь тебе",
          "Я уже не тот человек, который тебе нужен",
        ]);
      } else if (userMessage.includes("Ладно, я согласен")) {
        addBotMessage("Отлично, жду тебя завтра в 9. Адресс скину позже");
      } else if (userMessage.includes("Я же уже сказал тебе свой ответ")) {
        addBotMessage(
          "Я прошу тебя. Эта молодежь ничего не может, мне нужен именно ты"
        );
        showOptions(["Ладно, я помогу тебе. Но это последняя моя помощь тебе"]);
      } else if (
        userMessage.includes(
          "Ладно, я помогу тебе. Но это последняя моя помощь тебе"
        )
      ) {
        addBotMessage("Отлично, жду тебя завтра в 9. Адресс скину позже");
      } else if (userMessage.includes("Тебе говорили, что ты зануда?")) {
        addBotMessage("ИМЯ ПОЛЬЗОВАТЕЛЯ, сейчас не время для твоих шуток");
        showOptions(["Ладно, я помогу тебе. Но это последняя моя помощь тебе"]);
      } else if (userMessage.includes("Ладно, это последняя помощь тебе")) {
        addBotMessage("Отлично, жду тебя завтра в 9. Адресс скину позже");
      } else if (
        userMessage.includes("Я уже не тот человек, который тебе нужен")
      ) {
        addBotMessage("Нет, ты именно тот");
        showOptions(["Ладно, я помогу тебе. Но это последняя моя помощь тебе"]);
      } else if (
        userMessage.includes("Я уже не тот человек, который тебе нужен")
      ) {
        addBotMessage("Отлично, жду тебя завтра в 9. Адресс скину позже");
      }
    }, 500);
  }
});
