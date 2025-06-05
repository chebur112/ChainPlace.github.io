document.addEventListener('DOMContentLoaded', function() {
  const caseDescriptions = {
    1: "Пропажа криптовалюты: расследуйте таинственное исчезновение 250 ETH с кошелька известного инвестора. Начните с анализа последних транзакций.",
    2: "Темная сеть: проследите путь биткоинов через несколько миксеров до конечного пункта назначения.",
    3: "Фишинговая афера: найдите организаторов масштабной фишинг-кампании, похитившей данные тысяч пользователей."
  };

  const caseButtons = document.querySelectorAll('.case-btn:not(:disabled)');
  const casePreview = document.querySelector('.case-preview');
  
  caseButtons.forEach(button => {
    const caseId = button.dataset.case;

    button.addEventListener('mouseenter', () => {
      casePreview.innerHTML = `<h3>Дело #${caseId}</h3><p>${caseDescriptions[caseId]}</p>`;
    });

    button.addEventListener('click', () => {
      window.location.href = "/case1.1/case1.1.html";
    });
  });

  document.querySelectorAll('.case-card').forEach(card => {
    card.addEventListener('mouseleave', () => {
      casePreview.innerHTML = '<p>Наведите на доступное дело, чтобы увидеть описание</p>';
    });
  });
});