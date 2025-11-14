let lastAIContent = "";

// Chat form submit handler
document.getElementById('chatForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputElem = document.getElementById('userInput');
  const userMsg = inputElem.value.trim();
  if (!userMsg) return;
  appendMessage('user', userMsg);
  inputElem.value = '';

  appendMessage('ai', 'Thinking...', true);
  scrollToBottom();

  // Simulate thinking delay
  await new Promise((r) => setTimeout(r, 900));

  // Simple AI response demo - replace with API call
  const aiResponse = await fetchAI(userMsg);
  lastAIContent = aiResponse;

  document.querySelector('.message.ai.typing').remove();
  appendMessage('ai', aiResponse);
  document.getElementById('optionBar').style.display = 'flex';
  document.getElementById('mcqSection').innerHTML = '';
  scrollToBottom();
});

// Append chat message
function appendMessage(sender, text, typing = false) {
  const chatArea = document.getElementById('chatArea');
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}${typing ? ' typing' : ''}`;
  msgDiv.innerHTML = `<div class="bubble">${typing ? '...' : text}</div>`;
  chatArea.appendChild(msgDiv);
}

// Scroll chat to bottom
function scrollToBottom() {
  const chatArea = document.getElementById('chatArea');
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Fake AI response simulating fetching from API
async function fetchAI(query) {
  if (query.toLowerCase().includes('water cycle')) {
    return 'The water cycle is the process by which water circulates between the earth’s oceans, atmosphere, and land, involving precipitation, drainage, evaporation, and transpiration.';
  }
  return `Here is info about "<b>${query}</b>":<br><ul><li><b>Definition</b>: AI provides instant answers.</li><li><b>Features</b>: Save PDF, voice, MCQs, notes & more.</li></ul>`;
}

// PDF generation
function makePDF() {
  if (!lastAIContent) {
    alert('Ask something first!');
    return;
  }
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.setFontSize(13);
  pdf.text(stripHtml(lastAIContent), 10, 15);
  pdf.save('AI_Content.pdf');
}

// Text to speech
function textToSpeech() {
  if (!lastAIContent) {
    alert('Ask a question first!');
    return;
  }
  const speech = new SpeechSynthesisUtterance(stripHtml(lastAIContent));
  window.speechSynthesis.speak(speech);
}

// MCQ generator simulation
async function generateMCQs() {
  if (!lastAIContent) {
    alert('Ask a question first!');
    return;
  }
  const mcqs = await mockMCQ();
  let html = '<h3>Practice MCQs</h3>';
  mcqs.forEach((q, i) => {
    html += `<div><b>Q${i + 1}:</b> ${q.question}<ul>`;
    q.options.forEach(opt => {
      html += `<li>${opt}</li>`;
    });
    html += '</ul></div>';
  });
  document.getElementById('mcqSection').innerHTML = html;
}

async function mockMCQ() {
  return [
    { question: 'What topic was discussed?', options: ['AI Help', 'Sports', 'Music', 'Travel'] },
    { question: 'What cannot be done on platform?', options: ['Save PDF', 'Make Notes', 'Cooking', 'Use Voice'] }
  ];
}

// Notes modal window
function openNotes() {
  if (document.getElementById('notesModal')) return; // already open
  const modalHTML = `
    <div id="notesModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeNotes()">&times;</span>
        <h3>Your Study Notes</h3>
        <textarea id="notesArea" style="width:100%; height:100px; margin-top:10px; padding:10px; font-size:16px;"></textarea>
        <button style="margin-top: 15px;" onclick="saveNote()">Save Note</button>
        <div id="allNotes" style="margin-top:18px; max-height: 110px; overflow-y:auto;"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  loadNotes();
}

function closeNotes() {
  const modal = document.getElementById('notesModal');
  if (modal) modal.remove();
}

function saveNote() {
  const notesArea = document.getElementById('notesArea');
  const note = notesArea.value.trim();
  if (!note) return alert('Please enter a note');
  const savedNotes = JSON.parse(localStorage.getItem('studyNotes') || '[]');
  savedNotes.push(note);
  localStorage.setItem('studyNotes', JSON.stringify(savedNotes));
  notesArea.value = '';
  loadNotes();
}

function loadNotes() {
  const allNotesEl = document.getElementById('allNotes');
  const savedNotes = JSON.parse(localStorage.getItem('studyNotes') || '[]');
  let html = '';
  savedNotes.forEach((note, idx) => {
    html += `<p>${idx+1}. ${note} <span style="color:red; cursor:pointer;" onclick="deleteNote(${idx})">[x]</span></p>`;
  });
  allNotesEl.innerHTML = html;
}

function deleteNote(idx) {
  let savedNotes = JSON.parse(localStorage.getItem('studyNotes') || '[]');
  savedNotes.splice(idx, 1);
  localStorage.setItem('studyNotes', JSON.stringify(savedNotes));
  loadNotes();
}

// Online Compiler modal window (JDoodle)
function openCompiler() {
  if (document.getElementById('compilerLangModal')) return;
  // List of popular languages and their compiler URLs
  const compilers = {
    Python: "https://www.programiz.com/python-programming/online-compiler/",
    Java: "https://onecompiler.com/java",
    C: "https://onecompiler.com/c",
    Cpp: "https://onecompiler.com/cpp",
    JavaScript: "https://onecompiler.com/javascript",
    HTML_CSS_JS: "https://onecompiler.com/html",
    CSharp: "https://onecompiler.com/csharp",
    PHP: "https://onecompiler.com/php"
  };
  // Build modal HTML
  let html = `
    <div id="compilerLangModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeCompilerModal()">&times;</span>
        <h3>Select Language</h3>
        <select id="langSelector" style="width:96%;padding:10px;margin:13px 0;font-size:1.08em;border-radius:8px;">
          ${Object.keys(compilers).map(lang=>`<option value="${lang}">${lang.replace('_',' + ')}</option>`).join('')}
        </select>
        <button style="margin-top:16px; padding:10px 19px; font-size:1em; border-radius:18px; background:#4637a1; color:#fff; border:none; font-weight:700; cursor:pointer;" onclick="launchCompiler()">Open Compiler</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  // Save URLs to global for use on launch
  window._compilerUrls = compilers;
}

function closeCompilerModal() {
  document.getElementById('compilerLangModal').remove();
}

function launchCompiler() {
  const lang = document.getElementById('langSelector').value;
  const url = window._compilerUrls[lang];
  closeCompilerModal();
  window.open(url, "_blank");
}

function closeCompiler() {
  const modal = document.getElementById('compilerModal');
  if (modal) modal.remove();
}

// YouTube link popup search
function findYouTube() {
  let topic = prompt('Enter topic to search on YouTube:', lastAIContent ? stripHtml(lastAIContent).slice(0, 40) : '');
  if (!topic) return;
  window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`, '_blank');
}

// Strip HTML helper
function stripHtml(html) {
  let div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

// Load jsPDF
window.onload = () => {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  document.head.appendChild(script);
};