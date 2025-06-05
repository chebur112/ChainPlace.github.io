const apiKey = "9X112PNV2KAEZF4F36PQHTTQHFZZ1NQTUP";

document.addEventListener('DOMContentLoaded', () => {
  const clueButtons = document.querySelectorAll('#clues button');
  const clueTextDiv = document.getElementById('clueText');
  const miniGameContainer = document.getElementById('miniGameContainer');

  const viewedClues = new Set();

  clueButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const clue = btn.getAttribute('data-clue');
      viewedClues.add(clue);

      if (clue === 'transactions') {
        clueTextDiv.style.display = 'none';
        showMiniGame();
      } else {
        miniGameContainer.style.display = 'none';
        clearMiniGame();
        clueTextDiv.style.display = 'block';
        clueTextDiv.textContent = clueDescription(clue);
      }

      // Показываем кнопку выезда на обыск только после просмотра третьей зацепки (devices)
      if (clue === 'devices' && !document.getElementById('proceedButton')) {
        showProceedButton();
      }
    });
  });
});

function clueDescription(clue) {
  switch(clue) {
    case 'spyware':
      return "Антивирус показал чисто, никаких шпионских программ нет.";
    case 'devices':
      return `Игрок (мысленно):\n*Нужно понять, как преступник получил доступ к аккаунту — возможно, через украденную seed-фразу.*\n\nЭксперт:\n— Если seed-фраза попала в руки злоумышленника, он может полностью контролировать кошелёк. Никогда не раскрывайте её никому, не храните в открытом виде на компьютере или в интернете.\n\nИгрок:\n— Значит, если кто-то узнал seed-фразу, пароль не спасёт?\n\nЭксперт:\n— Да. Seed-фраза — это ключ к вашему кошельку. Её защита — главный приоритет.`;
    case 'phishing':
      return "Фишинговых писем я не помню, ничего подозрительного не получал.";
    default:
      return "";
  }
}

function showMiniGame() {
  const miniGameContainer = document.getElementById('miniGameContainer');
  miniGameContainer.style.display = 'block';
  miniGameContainer.innerHTML = `
    <h3>Мини-игра: Отслеживание транзакций</h3>
    <div id="searchArea">
      <div class="radio-group">
        <label><input type="radio" name="searchType" value="tx" checked> Хеш транзакции</label>
        <label><input type="radio" name="searchType" value="address"> Адрес кошелька</label>
      </div>
      <textarea id="searchInput" placeholder="Введите хеш транзакции или адрес кошелька" rows="3"></textarea>
      <div class="buttons">
        <button id="searchButton">Поиск</button>
        <button id="clearButton">Очистить</button>
        <button id="backToCluesButton" style="background:#333; color:#0f0; margin-left: 15px;">Вернуться к зацепкам</button>
      </div>
      <div id="result"></div>
      <div id="errorMessage"></div>
      
      <!-- Добавленный блок с примером транзакции для копирования -->
      <div style="margin-top: 20px; background: #222; padding: 10px; border-radius: 5px;">
        <p>Пример транзакции для проверки (Хэш транзакции с пострадавшего кошелька):</p>
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="text" id="sampleTx" value="0x71b08afff159d0d08015662bbf69d757e68668366281d0696a670695f1969eb9" 
                 readonly style="flex: 1; padding: 5px; background: #333; color: #fff; border: 1px solid #444;">
          <button onclick="copySampleTx()" style="padding: 5px 10px; background: #444; color: #fff; border: none; border-radius: 3px; cursor: pointer;">
            Копировать
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('searchButton').addEventListener('click', search);
  document.getElementById('clearButton').addEventListener('click', clearAll);
  document.getElementById('backToCluesButton').addEventListener('click', () => {
    document.getElementById('miniGameContainer').style.display = 'none';
    document.getElementById('clueText').style.display = 'none';
  });
}


function copySampleTx() {
  const sampleTxInput = document.getElementById('sampleTx');
  sampleTxInput.select();
  document.execCommand('copy');
};

  document.getElementById('searchButton').addEventListener('click', search);
  document.getElementById('clearButton').addEventListener('click', clearAll);
  document.getElementById('backToCluesButton').addEventListener('click', () => {
    document.getElementById('miniGameContainer').style.display = 'none';
    document.getElementById('clueText').style.display = 'none';
  });


function clearMiniGame() {
  const miniGameContainer = document.getElementById('miniGameContainer');
  miniGameContainer.innerHTML = '';
}

async function search() {
  clearError();
  clearResult();

  const input = document.getElementById('searchInput').value.trim();
  const type = document.querySelector('input[name="searchType"]:checked').value;

  if (!input) {
    showError('❌ Введите значение для поиска.');
    return;
  }

  if (type === 'tx') {
    if (!input.startsWith('0x') || input.length !== 66) {
      showError('❌ Введите корректный хеш транзакции (64 символа после 0x)');
      return;
    }
    await fetchTransaction(input);
  } else {
    if (!input.startsWith('0x') || input.length !== 42) {
      showError('❌ Введите корректный адрес кошелька (42 символа начиная с 0x)');
      return;
    }
    await fetchAddressTransactions(input);
  }
}

async function fetchTransaction(hash) {
  const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.result) {
      showError('❌ Транзакция не найдена.');
      return;
    }
    const tx = data.result;
    const ether = Number(BigInt(tx.value)) / 1e18;
    const blockNum = parseInt(tx.blockNumber, 16);

    document.getElementById("result").innerHTML = `
      <b>Hash:</b> <span class="link" onclick="fetchTransaction('${tx.hash}')">${tx.hash}</span><br>
      <b>От:</b> <span class="link" onclick="fetchAddressTransactions('${tx.from}')">${tx.from}</span><br>
      <b>Кому:</b> <span class="link" onclick="fetchAddressTransactions('${tx.to}')">${tx.to}</span><br>
      <b>Сумма:</b> ${ether} ETH<br>
      <b>Блок:</b> ${blockNum}
    `;
  } catch (error) {
    showError('❌ Ошибка запроса: ' + error.message);
  }
}

async function fetchAddressTransactions(address) {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "1" || !data.result.length) {
      showError('❌ Транзакции для этого адреса не найдены.');
      return;
    }

    let html = `<b>Последние 10 транзакций для адреса ${address}:</b><br><br>`;
    data.result.forEach(tx => {
      const ether = (tx.value / 1e18).toFixed(4);
      html += `
        <div style="margin-bottom:10px;">
          <b>Hash:</b> <span class="link" onclick="fetchTransaction('${tx.hash}')">${tx.hash}</span><br>
          <b>От:</b> <span class="link" onclick="fetchAddressTransactions('${tx.from}')">${tx.from}</span><br>
          <b>Кому:</b> <span class="link" onclick="fetchAddressTransactions('${tx.to}')">${tx.to}</span><br>
          <b>Сумма:</b> ${ether} ETH<br>
        </div>
      `;
    });
    document.getElementById("result").innerHTML = html;
  } catch (error) {
    showError('❌ Ошибка запроса: ' + error.message);
  }
}

function clearAll() {
  document.getElementById('searchInput').value = '';
  clearResult();
  clearError();
}

function clearResult() {
  const res = document.getElementById("result");
  if (res) res.innerHTML = "";
}

function showError(msg) {
  const errDiv = document.getElementById('errorMessage');
  if (errDiv) errDiv.textContent = msg;
}

function clearError() {
  const errDiv = document.getElementById('errorMessage');
  if (errDiv) errDiv.textContent = "";
}

function showProceedButton() {
  const container = document.getElementById('actionButtonContainer');

  const btn = document.createElement('button');
  btn.id = 'proceedButton';
  btn.textContent = '🚓 Выехать на обыск';
  btn.style.background = '#f00';
  btn.style.color = '#fff';
  btn.style.fontSize = '22px';
  btn.style.padding = '15px 30px';
  btn.style.border = 'none';
  btn.style.borderRadius = '12px';
  btn.style.cursor = 'pointer';

  btn.addEventListener('click', () => {
    window.location.href = '/1stCaseEnd/1stCase.html';
  });

  container.appendChild(btn);
}
