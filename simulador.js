/*
 * Lógica del simulador PAES Matemática 1 para CLQ.
 * Este script gestiona la generación de preguntas, el temporizador
 * de 40 minutos, la corrección automática y la visualización de
 * resultados con explicaciones. Las preguntas están organizadas
 * en un array fácilmente editable para ampliar o modificar el banco.
 */

// Banco de preguntas. Cada objeto contiene la pregunta, las opciones,
// el índice de la respuesta correcta, el tema y una explicación.
const QUESTIONS = [
  {
    text: '¿Cuál es el valor de x en la ecuación 2x + 5 = 15?',
    options: ['3', '4', '5', '6'],
    answerIndex: 2,
    topic: 'álgebra',
    explanation: 'Restamos 5 a ambos lados: 2x = 10. Luego dividimos por 2: x = 5.'
  },
  {
    text: '¿Cuál es el área de un círculo de radio 3?',
    options: ['9π', '6π', '3π', '12π'],
    answerIndex: 0,
    topic: 'geometría',
    explanation: 'El área de un círculo es πr². Con r = 3, se obtiene 3² * π = 9π.'
  },
  {
    text: 'Si f(x) = 3x - 2, ¿cuál es f(4)?',
    options: ['10', '8', '5', '14'],
    answerIndex: 0,
    topic: 'funciones',
    explanation: 'Sustituimos x por 4: f(4) = 3·4 - 2 = 12 - 2 = 10.'
  },
  {
    text: 'En un dado justo, ¿cuál es la probabilidad de obtener un número par?',
    options: ['1/2', '1/3', '2/3', '1/6'],
    answerIndex: 0,
    topic: 'probabilidad',
    explanation: 'Hay tres números pares (2, 4 y 6) de seis posibles, así que la probabilidad es 3/6 = 1/2.'
  },
  {
    text: 'La suma de los ángulos interiores de un triángulo es:',
    options: ['180°', '90°', '270°', '360°'],
    answerIndex: 0,
    topic: 'geometría',
    explanation: 'En cualquier triángulo la suma de los ángulos internos siempre es 180°.'
  },
  {
    text: 'Factoriza la expresión x² - 9.',
    options: ['(x - 3)(x + 3)', '(x - 9)(x + 1)', '(x - 3)²', 'x(x - 9)'],
    answerIndex: 0,
    topic: 'álgebra',
    explanation: 'Se trata de una diferencia de cuadrados: x² - 9 = (x - 3)(x + 3).' 
  },
  {
    text: '¿Cuánto es 4! (factorial de 4)?',
    options: ['24', '12', '6', '48'],
    answerIndex: 0,
    topic: 'álgebra',
    explanation: '4! = 4 × 3 × 2 × 1 = 24.'
  },
  {
    text: '¿Cuál es el perímetro de un cuadrado de lado 5 cm?',
    options: ['25 cm', '20 cm', '10 cm', '15 cm'],
    answerIndex: 1,
    topic: 'geometría',
    explanation: 'El perímetro se calcula sumando sus cuatro lados: 4 × 5 = 20 cm.'
  },
  {
    text: 'Si g(x) = x², ¿cuál es g(-3)?',
    options: ['-9', '9', '3', '-3'],
    answerIndex: 1,
    topic: 'funciones',
    explanation: '(-3)² = (-3) × (-3) = 9.'
  },
  {
    text: '¿Cuál es la mediana del conjunto {3, 7, 9, 11, 15}?',
    options: ['9', '7', '11', '10'],
    answerIndex: 0,
    topic: 'datos y azar',
    explanation: 'Ordenamos de menor a mayor y seleccionamos el valor central: 9.'
  },
  {
    text: '¿Cuánto vale x en la ecuación 5x = 20?',
    options: ['2', '4', '5', '10'],
    answerIndex: 1,
    topic: 'álgebra',
    explanation: 'Dividimos ambos lados por 5: x = 20 / 5 = 4.'
  },
  {
    text: '¿Cuál es el volumen de un cubo de arista 3?',
    options: ['27', '9', '18', '6'],
    answerIndex: 0,
    topic: 'geometría',
    explanation: 'El volumen del cubo es arista³: 3³ = 27.'
  },
  {
    text: 'Resuelve: 3x + 12 = 0',
    options: ['x = -4', 'x = 4', 'x = -3', 'x = 3'],
    answerIndex: 0,
    topic: 'álgebra',
    explanation: 'Restamos 12: 3x = -12 y dividimos por 3: x = -4.'
  },
  {
    text: '¿Cuál es la pendiente de la recta que pasa por los puntos (1, 2) y (3, 6)?',
    options: ['2', '4', '3', '1'],
    answerIndex: 0,
    topic: 'funciones',
    explanation: 'La pendiente m = (6 - 2) / (3 - 1) = 4 / 2 = 2.'
  },
  {
    text: 'En una ruleta numerada del 1 al 8, ¿cuál es la probabilidad de obtener un número primo?',
    options: ['1/2', '1/4', '1/3', '3/8'],
    answerIndex: 0,
    topic: 'probabilidad',
    explanation: 'Los números primos entre 1 y 8 son 2, 3, 5 y 7 (4 en total). La probabilidad es 4/8 = 1/2.'
  },
  {
    text: 'Si el diámetro de un círculo es 10, su radio es:',
    options: ['5', '10', '20', '15'],
    answerIndex: 0,
    topic: 'geometría',
    explanation: 'El radio es la mitad del diámetro, por lo tanto 10 / 2 = 5.'
  },
  {
    text: '¿Cuál es la derivada de f(x) = x²?',
    options: ['2x', 'x', 'x³', '2'],
    answerIndex: 0,
    topic: 'álgebra',
    explanation: 'Aplicamos la regla de potencias: la derivada de xⁿ es n·xⁿ⁻¹. Con n = 2, obtenemos 2x¹ = 2x.'
  },
  {
    text: 'Sea A = {1,2,3} y B = {3,4,5}. La intersección A ∩ B es:',
    options: ['{3}', '{1,2,3,4,5}', '∅', '{1,5}'],
    answerIndex: 0,
    topic: 'conjuntos',
    explanation: 'La intersección incluye los elementos que pertenecen a ambos conjuntos: {3}.'
  },
  {
    text: '¿Cuál es el área de un triángulo con base 8 y altura 5?',
    options: ['40', '20', '13', '8'],
    answerIndex: 1,
    topic: 'geometría',
    explanation: 'El área del triángulo es (base × altura) / 2 = (8 × 5) / 2 = 20.'
  },
  {
    text: 'En una bolsa hay 5 bolitas rojas y 3 azules. ¿Cuál es la probabilidad de sacar una azul?',
    options: ['3/8', '5/8', '1/8', '2/5'],
    answerIndex: 0,
    topic: 'probabilidad',
    explanation: 'Hay 3 bolitas azules de un total de 8, por lo tanto la probabilidad es 3/8.'
  }
];

// Variables de control del simulador
let currentQuestions = [];
let timerInterval;
let timeRemaining;
let selectedTopic = 'todos';
let selectedMode = 'exam';

// Elementos del DOM
const examContainer   = document.getElementById('exam-container');
const timerDisplay    = document.getElementById('timer');
const finishBtn       = document.getElementById('finish-btn');
const newBtn          = document.getElementById('new-btn');
const resultsSection  = document.getElementById('results-section');
const scoreDisplay    = document.getElementById('score');
const resultsTable    = document.getElementById('results-table').querySelector('tbody');
const progressText    = document.getElementById('progress-text');
const progressInner   = document.getElementById('progress-inner');
const topicSelect     = document.getElementById('topic-select');
const modeSelect      = document.getElementById('mode-select');
const resetTimerBtn   = document.getElementById('reset-timer');

/**
 * Baraja un array utilizando el algoritmo de Fisher–Yates.
 * @param {Array} array
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Llena el selector de temas con las categorías encontradas en el banco de preguntas.
 */
function populateTopics() {
  if (!topicSelect) return;
  // Obtener temas únicos
  const topics = Array.from(new Set(QUESTIONS.map(q => q.topic)));
  // Insertar opción de todos
  topicSelect.innerHTML = '';
  const allOption = document.createElement('option');
  allOption.value = 'todos';
  allOption.textContent = 'Todos';
  topicSelect.appendChild(allOption);
  topics.forEach(topic => {
    const opt = document.createElement('option');
    opt.value = topic;
    opt.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);
    topicSelect.appendChild(opt);
  });
  // Actualizar variable global cuando cambie selección
  topicSelect.addEventListener('change', () => {
    selectedTopic = topicSelect.value;
  });

  // Si existe el selector de modo, establecer valor inicial y escuchar cambios
  if (modeSelect) {
    selectedMode = modeSelect.value;
    modeSelect.addEventListener('change', () => {
      selectedMode = modeSelect.value;
      // Al cambiar de modo, actualizar el temporizador visible u ocultarlo
      if (selectedMode === 'practice') {
        timerDisplay.style.display = 'none';
      } else {
        timerDisplay.style.display = 'block';
      }
    });
  }
}

/**
 * Actualiza la barra de progreso según el número de respuestas seleccionadas.
 */
function updateProgress() {
  let answered = 0;
  currentQuestions.forEach((q, idx) => {
    const radios = document.querySelectorAll(`input[name="q${idx}"]`);
    if (Array.from(radios).some(r => r.checked)) {
      answered++;
    }
  });
  const total = currentQuestions.length;
  if (progressText) {
    progressText.textContent = `${answered}/${total} respondidas`;
  }
  if (progressInner) {
    const percent = total > 0 ? (answered / total) * 100 : 0;
    progressInner.style.width = `${percent}%`;
  }
}

/**
 * Guarda el resultado de un ensayo en localStorage.
 * @param {Object} result - Objeto con atributos correct, total, topic y date
 */
function saveResult(result) {
  try {
    const data = JSON.parse(localStorage.getItem('clqResults') || '[]');
    data.push(result);
    localStorage.setItem('clqResults', JSON.stringify(data));
  } catch (e) {
    // localStorage podría no estar disponible
    console.warn('No fue posible guardar el resultado:', e);
  }
}

/**
 * Muestra el historial de los últimos ensayos guardados en localStorage.
 */
function displayHistory() {
  const historyContainer = document.getElementById('history');
  if (!historyContainer) return;
  historyContainer.innerHTML = '';
  let records;
  try {
    records = JSON.parse(localStorage.getItem('clqResults') || '[]');
  } catch (e) {
    records = [];
  }
  const recent = records.slice(-5).reverse();
  const title = document.createElement('h3');
  title.textContent = 'Historial de ensayos';
  historyContainer.appendChild(title);
  if (recent.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No hay ensayos anteriores.';
    historyContainer.appendChild(p);
    return;
  }
  const list = document.createElement('ul');
  recent.forEach(item => {
    const li = document.createElement('li');
    const date = new Date(item.date);
    const formatted = date.toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    let descriptor = `${formatted}: ${item.correct}/${item.total} correctas`;
    // Añade información de modo si no es ensayo
    if (item.mode && item.mode !== 'exam') {
      descriptor += ` (${item.mode})`;
    }
    if (item.topic && item.topic !== 'todos') {
      descriptor += ' | ' + item.topic;
    }
    li.textContent = descriptor;
    list.appendChild(li);
  });
  historyContainer.appendChild(list);
}

/**
 * Inicia un nuevo ensayo: selecciona preguntas, reinicia el cronómetro y muestra las preguntas.
 */
function startExam() {
  // Resetea contenedores y estado
  examContainer.innerHTML = '';
  resultsSection.style.display = 'none';
  newBtn.style.display = 'none';
  finishBtn.style.display = 'inline-block';

  // Determina el tema seleccionado; si no existe topicSelect, usar "todos"
  selectedTopic = topicSelect ? topicSelect.value : 'todos';
  // Determina el modo seleccionado; si no existe modeSelect, usar "exam"
  selectedMode = modeSelect ? modeSelect.value : 'exam';
  // Filtra preguntas por tema si procede
  let pool = QUESTIONS.slice();
  if (selectedTopic && selectedTopic !== 'todos') {
    pool = pool.filter(q => q.topic === selectedTopic);
  }
  // Si hay menos de 20, usar todas; si hay más, selecciona 20 al azar
  shuffle(pool);
  currentQuestions = pool.slice(0, Math.min(20, pool.length));

  // Renderiza cada pregunta y añade eventos para seguimiento de progreso
  currentQuestions.forEach((q, index) => {
    const questionEl = document.createElement('div');
    questionEl.className = 'question';
    const optionsHtml = q.options.map((opt, i) => {
      return `
          <li>
            <label>
              <input type="radio" name="q${index}" value="${i}">
              <span>${opt}</span>
            </label>
          </li>
      `;
    }).join('');
    // Incluir contenedor de retroalimentación en modo práctica
    questionEl.innerHTML = `
      <h3>Pregunta ${index + 1}</h3>
      <p>${q.text}</p>
      <ul>
        ${optionsHtml}
      </ul>
      <div id="feedback-${index}" class="feedback"></div>
    `;
    examContainer.appendChild(questionEl);
  });

  // Añade manejador de cambio a todas las respuestas para actualizar progreso
  const allRadios = examContainer.querySelectorAll('input[type="radio"]');
  allRadios.forEach(r => {
    r.addEventListener('change', (e) => {
      updateProgress();
      if (selectedMode === 'practice') {
        handleImmediateFeedback(e);
      }
    });
  });
  // Inicializa progreso
  updateProgress();

  // Configura el temporizador según el modo
  clearInterval(timerInterval);
  if (selectedMode === 'practice') {
    // En modo práctica se oculta el temporizador y no se ejecuta
    timeRemaining = 0;
    timerDisplay.style.display = 'none';
  } else {
    // En modo ensayo se muestra el cronómetro y se inicia
    timerDisplay.style.display = 'block';
    startTimer();
  }
}

/**
 * Actualiza el contador de tiempo en formato mm:ss.
 */
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const paddedM = String(minutes).padStart(2, '0');
  const paddedS = String(seconds).padStart(2, '0');
  timerDisplay.textContent = `${paddedM}:${paddedS}`;
}

/**
 * Inicia el temporizador de 40 minutos. Limpia cualquier intervalo previo.
 */
function startTimer() {
  clearInterval(timerInterval);
  timeRemaining = 40 * 60;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timeRemaining = 0;
      updateTimerDisplay();
      finishExam();
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

/**
 * Proporciona retroalimentación inmediata en modo práctica.
 * @param {Event} event - Evento change del input radio
 */
function handleImmediateFeedback(event) {
  const input = event.target;
  // Obtiene el índice de la pregunta a partir del nombre (ej. q3)
  const name = input.name || '';
  const idx = parseInt(name.replace(/^q/, ''), 10);
  if (isNaN(idx) || !currentQuestions[idx]) return;
  const question = currentQuestions[idx];
  const selected = parseInt(input.value, 10);
  const feedbackEl = document.getElementById(`feedback-${idx}`);
  if (!feedbackEl) return;
  if (selected === question.answerIndex) {
    feedbackEl.textContent = '¡Correcto!';
    feedbackEl.classList.add('correct');
    feedbackEl.classList.remove('incorrect');
  } else {
    feedbackEl.textContent = `Incorrecto. La respuesta correcta es: ${question.options[question.answerIndex]}.`;
    feedbackEl.classList.add('incorrect');
    feedbackEl.classList.remove('correct');
  }
}

/**
 * Genera un gráfico simple de barras comparando respuestas correctas e incorrectas.
 * @param {number} correct - Cantidad de respuestas correctas
 * @param {number} total - Número total de preguntas
 */
function renderChart(correct, total) {
  const container = document.getElementById('chart-container');
  if (!container) return;
  const incorrect = total - correct;
  const percentCorrect = total > 0 ? (correct / total) * 100 : 0;
  const percentIncorrect = 100 - percentCorrect;
  container.innerHTML = '';
  // Barras
  const barsDiv = document.createElement('div');
  barsDiv.className = 'chart-bars';
  const correctBar = document.createElement('div');
  correctBar.className = 'bar correct';
  correctBar.style.width = `${percentCorrect}%`;
  const incorrectBar = document.createElement('div');
  incorrectBar.className = 'bar incorrect';
  incorrectBar.style.width = `${percentIncorrect}%`;
  barsDiv.appendChild(correctBar);
  barsDiv.appendChild(incorrectBar);
  // Etiquetas
  const labelsDiv = document.createElement('div');
  labelsDiv.className = 'chart-labels';
  labelsDiv.innerHTML = `
    <span>Correctas: ${correct}</span>
    <span>Incorrectas: ${incorrect}</span>
  `;
  container.appendChild(barsDiv);
  container.appendChild(labelsDiv);
}

/**
 * Finaliza el ensayo: detiene el temporizador, calcula la puntuación y muestra el resumen.
 */
function finishExam() {
  clearInterval(timerInterval);
  finishBtn.style.display = 'none';
  newBtn.style.display = 'inline-block';

  // Recopila las respuestas del usuario
  const userAnswers = [];
  currentQuestions.forEach((q, index) => {
    const radios = document.querySelectorAll(`input[name="q${index}"]`);
    let selected = null;
    radios.forEach((radio) => {
      if (radio.checked) {
        selected = parseInt(radio.value, 10);
      }
    });
    userAnswers.push(selected);
  });

  // Calcula el número de respuestas correctas
  let correctCount = 0;
  resultsTable.innerHTML = '';

  userAnswers.forEach((answer, idx) => {
    const question = currentQuestions[idx];
    const correct = answer === question.answerIndex;
    if (correct) correctCount++;

    // Crea fila de resultados
    const row = document.createElement('tr');
    // Asigna una clase según si la respuesta es correcta o no para estilos dinámicos
    row.className = correct ? 'correct-row' : 'incorrect-row';
    row.innerHTML = `
      <td>${idx + 1}</td>
      <td>${question.text}</td>
      <td>${answer !== null ? question.options[answer] : 'Sin responder'}</td>
      <td>${question.options[question.answerIndex]}</td>
    `;
    resultsTable.appendChild(row);

    // Explicación desplegable
    const expRow = document.createElement('tr');
    expRow.className = 'explanation-row';
    expRow.innerHTML = `
      <td colspan="4">
        <details>
          <summary>Explicación</summary>
          <p>${question.explanation}</p>
        </details>
      </td>
    `;
    resultsTable.appendChild(expRow);
  });

  // Muestra la puntuación
  scoreDisplay.textContent = `Has contestado correctamente ${correctCount} de ${currentQuestions.length} preguntas.`;
  resultsSection.style.display = 'block';
  // Desplaza la página para ver resultados
  resultsSection.scrollIntoView({ behavior: 'smooth' });

  // Genera el gráfico de resultados
  renderChart(correctCount, currentQuestions.length);

  // Guarda el resultado en localStorage incluyendo el modo actual
  saveResult({ correct: correctCount, total: currentQuestions.length, topic: selectedTopic, mode: selectedMode, date: new Date().toISOString() });
  // Muestra historial actualizado
  displayHistory();
}

// Maneja eventos de botones
finishBtn.addEventListener('click', finishExam);
newBtn.addEventListener('click', startExam);

// Reinicia el cronómetro cuando se pulse el botón correspondiente y el modo sea ensayo
if (resetTimerBtn) {
  resetTimerBtn.addEventListener('click', () => {
    if (selectedMode === 'exam') {
      startTimer();
    }
  });
}

// Inicia el primer examen al cargar la página
window.addEventListener('load', () => {
  populateTopics();
  startExam();
  displayHistory();
});