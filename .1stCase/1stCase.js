document.addEventListener('DOMContentLoaded', function() {
  const image = document.getElementById('main-image');
  const overlay = document.getElementById('highlight-overlay');
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modal-text');
  const closeBtn = document.querySelector('.close');

  const welcomeModal = document.getElementById('welcome-modal');
  const welcomeOkBtn = document.getElementById('welcome-ok-btn');

  // Добавляем финальное модальное окно
  const finalModal = document.createElement('div');
  finalModal.id = 'final-modal';
  finalModal.className = 'modal';
  finalModal.innerHTML = `
    <div class="modal-content">
      <h2>Поздравляем!</h2>
      <p>Вы нашли все подсказки, дело раскрыто!</p>
      <button id="final-ok-btn">Вернуться на главную</button>
    </div>
  `;
  document.body.appendChild(finalModal);

  const areasConfig = [
    { 
      id: 'pc-area',
      type: 'rect',
      coords: [797, 434, 944, 562],
      text: 'Компьютер подозреваемого, очень много улик, но ищи дальше.',
      found: false
    },
    { 
      id: 'disks',
      type: 'rect',
      coords: [1110, 570, 1190, 610],
      text: 'Найдены холодные кошельки преступника, на них часть средств',
      found: false
    },
    { 
      id: 'laptop-area',
      type: 'poly',
      coords: [152, 640, 267, 610, 278, 744, 395, 750, 301, 810, 169, 801],
      text: 'Ноутбук преступника. Ничего важного',
      found: false
    },
    { 
      id: 'box-area',
      type: 'poly',
      coords: [1380, 500, 1497, 521, 1490, 710, 1375, 661],
      text: 'Коробка с документами жертвы.',
      found: false
    },
    { 
      id: 'listMain',
      type: 'poly',
      coords: [128, 940, 120, 980, 140, 980, 170, 940],
      text: 'БИНГО! seed фразы от остальных кошельков',
      found: false
    },
    { 
      id: 'notes-area',
      type: 'rect',
      coords: [336, 546, 468, 717],
      text: 'Записки преступника.',
      found: false
    },
    { 
      id: 'trash',
      type: 'rect',
      coords: [350, 470, 430, 540],
      text: 'Мусор.',
      found: false
    },
    { 
      id: 'floor',
      type: 'poly',
      coords: [1400, 1200, 1250, 1200, 1140, 965, 1340, 965, 1290, 1000, 1290, 1040],
      text: 'Следы на полу.',
      found: false
    },
    { 
      id: 'openBox',
      type: 'poly',
      coords: [1187, 800, 1187, 850, 1160, 820, 1160, 776, 1270, 776, 1300, 800],
      text: 'Открытая коробка с уликами.',
      found: false
    }
  ];

  const highlights = {};
  const links = [];
  
  areasConfig.forEach(area => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.id = `highlight-${area.id}`;
    path.setAttribute('class', 'highlight-path');
    overlay.appendChild(path);
    highlights[area.id] = path;

    const a = document.createElement('a');
    a.href = '#';
    a.className = 'invisible-area';
    a.dataset.highlight = area.id;
    a.dataset.text = area.text;
    document.body.appendChild(a);
    links.push(a);

    a.addEventListener('click', function(e) {
      e.preventDefault();
      modalText.textContent = this.dataset.text;
      modal.style.display = 'flex';

      const areaId = this.dataset.highlight;
      const area = areasConfig.find(a => a.id === areaId);
      if (area && !area.found) {
        area.found = true;
        path.style.fill = 'rgba(0, 255, 0, 0.3)'; 
        checkAllFound();
      }
    });

    a.addEventListener('mouseenter', () => {
      highlights[area.id].style.display = 'block';
    });
    a.addEventListener('mouseleave', () => {
      highlights[area.id].style.display = 'none';
    });
  });

  function checkAllFound() {
    const allFound = areasConfig.every(area => area.found);
    if (allFound) {
      setTimeout(() => {
        modal.style.display = 'none';
        finalModal.style.display = 'flex';
      }, 1000);
    }
  }

  function updatePositions() {
    const imgRect = image.getBoundingClientRect();
    const scaleX = imgRect.width / image.naturalWidth;
    const scaleY = imgRect.height / image.naturalHeight;

    areasConfig.forEach(area => {
      const path = highlights[area.id];
      const link = links.find(a => a.dataset.highlight === area.id);

      let d, left, top, width, height;

      if (area.type === 'rect') {
        const [x1, y1, x2, y2] = area.coords;
        left = x1 * scaleX;
        top = y1 * scaleY;
        width = (x2 - x1) * scaleX;
        height = (y2 - y1) * scaleY;
        d = `M${left},${top} L${left + width},${top} L${left + width},${top + height} L${left},${top + height} Z`;
      } else if (area.type === 'poly') {
        const coords = area.coords;
        left = Math.min(...coords.filter((_, i) => i % 2 === 0)) * scaleX;
        top = Math.min(...coords.filter((_, i) => i % 2 === 1)) * scaleY;
        width = (Math.max(...coords.filter((_, i) => i % 2 === 0)) - Math.min(...coords.filter((_, i) => i % 2 === 0))) * scaleX;
        height = (Math.max(...coords.filter((_, i) => i % 2 === 1)) - Math.min(...coords.filter((_, i) => i % 2 === 1))) * scaleY;

        d = 'M';
        for (let i = 0; i < coords.length; i += 2) {
          d += `${coords[i] * scaleX},${coords[i+1] * scaleY} `;
          if (i === 0) d += 'L';
        }
        d += 'Z';
      }

      path.setAttribute('d', d);

      if (link) {
        link.style.left = `${left}px`;
        link.style.top = `${top}px`;
        link.style.width = `${width}px`;
        link.style.height = `${height}px`;
      }
    });
  }

  function init() {
    if (image.complete) {
      updatePositions();
    } else {
      image.addEventListener('load', () => {
        updatePositions();
      });
    }
  }

  window.addEventListener('resize', updatePositions);

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  welcomeOkBtn.addEventListener('click', () => {
    welcomeModal.style.display = 'none';
  });

  document.getElementById('final-ok-btn').addEventListener('click', () => {
    window.location.href = '/main page/main.html';
  });

  init();
});