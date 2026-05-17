
// ======================== ДАНІ ========================
const today = new Date(); 
document.getElementById('current-date').textContent = today.toLocaleDateString('uk-UA', {
    day: 'numeric', month: 'long', year: 'numeric'
});

const defaultSubjectsData = {
    mn: {
        key: 'mn', name: 'Машинне навчання', fullName: 'Машинне навчання', type: 'exam', semester: 2,
        tasks: [
            { id: 'mn1', title: 'Практична робота 1', deadline: '2026-03-26', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'mn2', title: 'Практична робота 2', deadline: '2026-04-08', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'mn3', title: 'Тест 1', deadline: '2026-03-12', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'mn4', title: 'Практична робота 3', deadline: '2026-04-24', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'mn5', title: 'Тест 2', deadline: '2026-04-08', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'mn6', title: 'Практична робота 4', deadline: '2026-05-15', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'mn7', title: 'Тест 3', deadline: '2026-04-23', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'mn8', title: 'Практична робота 5', deadline: '2026-06-04', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'mn9', title: 'Тест 4', deadline: '2026-04-29', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'mn10', title: 'Тест 5', deadline: '2026-05-20', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'mn11', title: 'ІСПИТ', deadline: '2026-06-20', maxPoints: 100, points: 0, status: 'todo' },
        ]
    },
    pis: {
        key: 'pis', name: 'Проектування ІС', fullName: 'Проектування інформаційних систем', type: 'exam', semester: 2,
        tasks: [
            { id: 'pis1', title: 'Практична робота 1', deadline: '2026-03-18', maxPoints: 20, points: 0, status: 'todo' },
            { id: 'pis2', title: 'Практична робота 2', deadline: '2026-04-02', maxPoints: 20, points: 0, status: 'todo' },
            { id: 'pis3', title: 'Практична робота 3', deadline: '2026-04-16', maxPoints: 15, points: 0, status: 'todo' },
            { id: 'pis4', title: 'Практична робота 4', deadline: '2026-05-14', maxPoints: 15, points: 0, status: 'todo' },
            { id: 'pis5', title: 'Практична робота 5', deadline: '2026-05-28', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'pis6', title: 'Практична робота 6', deadline: '2026-05-28', maxPoints: 20, points: 0, status: 'todo' },
            { id: 'pis7', title: 'ІСПИТ', deadline: '2026-06-25', maxPoints: 40, points: 0, status: 'todo' },
        ]
    },
    tpr: { 
        key: 'tpr', name: 'Теорія прийняття рішень', fullName: 'Теорія прийняття рішень', type: 'exam', semester: 2, tasks: [ 
            { id: 'tpr1', title: 'Практична робота 1', deadline: '2026-03-31', maxPoints: 10, points: 0, status: 'todo' }, 
            { id: 'tpr2', title: 'Практична робота 2', deadline: '2026-04-07', maxPoints: 10, points: 0, status: 'todo' }, 
            { id: 'tpr3', title: 'Практична робота 3', deadline: '2026-05-05', maxPoints: 12, points: 0, status: 'todo' }, 
            { id: 'tpr4', title: 'Практична робота 4', deadline: '2026-05-19', maxPoints: 18, points: 0, status: 'todo' }, 
            { id: 'tpr5', title: 'Практична робота 5', deadline: '2026-06-02', maxPoints: 10, points: 0, status: 'todo' }, 
            { id: 'tpr6', title: 'ІСПИТ', deadline: '2026-06-20', maxPoints: 40, points: 0, status: 'todo' } 
        ] 
    },
    vd: { 
        key: 'vd', name: 'Візуалізація даних', fullName: 'Візуалізація даних', type: 'pass', semester: 2, tasks: [ 
            { id: 'vd1', title: 'Практична робота 1', deadline: '2026-03-02', maxPoints: 15, points: 0, status: 'todo' }, 
            { id: 'vd2', title: 'Практична робота 2', deadline: '2026-03-02', maxPoints: 25, points: 0, status: 'todo' }, 
            { id: 'vd3', title: 'Практична робота 3', deadline: '2026-05-15', maxPoints: 25, points: 0, status: 'todo' }, 
            { id: 'vd4', title: 'Практична робота 4', deadline: '2026-05-26', maxPoints: 25, points: 0, status: 'todo' }, 
            { id: 'vd5', title: 'Практична робота 5', deadline: '2026-05-28', maxPoints: 9, points: 0, status: 'todo' } 
        ] 
    },
    devo: { 
        key: 'devo', name: 'DevOps та Cloud', fullName: 'DevOps та основи Cloud-застосунків', type: 'pass', semester: 2, tasks: [ 
            { id: 'devo1', title: 'Практична робота 1', deadline: '2026-04-13', maxPoints: 20, points: 0, status: 'todo' }, 
            { id: 'devo2', title: 'Практична робота 2', deadline: '2026-05-20', maxPoints: 25, points: 0, status: 'todo' }, 
            { id: 'devo3', title: 'Практична робота 3', deadline: '2026-06-05', maxPoints: 25, points: 0, status: 'todo' } 
        ] 
    },
    uzhcp: { 
        key: 'uzhcp', name: 'Управління ЖЦП', fullName: 'Управління життєвим циклом програмного продукту', type: 'pass', semester: 2, tasks: [ 
            { id: 'uzhcp1', title: 'Практична робота 1', deadline: '2026-04-20', maxPoints: 20, points: 0, status: 'todo' }, 
            { id: 'uzhcp2', title: 'Практична робота 2', deadline: '2026-05-15', maxPoints: 25, points: 0, status: 'todo' }, 
            { id: 'uzhcp3', title: 'Практична робота 3', deadline: '2026-06-01', maxPoints: 25, points: 0, status: 'todo' } 
        ] 
    },
    fv: { 
        key: 'fv', name: 'Фізичне виховання', fullName: 'Фізичне виховання', type: 'pass', semester: 2, tasks: [ 
            { id: 'fv1', title: 'Тест 1', deadline: '2026-03-15', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv2', title: 'Тест 2', deadline: '2026-03-20', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv3', title: 'Тест 3', deadline: '2026-04-10', maxPoints: 10, points: 0, status: 'todo' }, 
            { id: 'fv4', title: 'Тест 4', deadline: '2026-04-15', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv5', title: 'Тест 5', deadline: '2026-04-20', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv6', title: 'Тест 6', deadline: '2026-04-25', maxPoints: 4, points: 0, status: 'todo' }, 
            { id: 'fv7', title: 'Тест 7', deadline: '2026-05-05', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv8', title: 'Тест 8', deadline: '2026-05-10', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv9', title: 'Тест 9', deadline: '2026-05-15', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv10', title: 'Тест 10', deadline: '2026-05-20', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv11', title: 'Тест 11', deadline: '2026-05-25', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv12', title: 'Тест 12', deadline: '2026-05-30', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv13', title: 'Тест 13', deadline: '2026-06-05', maxPoints: 3, points: 0, status: 'todo' },
            { id: 'fv14', title: 'Тест 14', deadline: '2026-06-05', maxPoints: 3, points: 0, status: 'todo' },
            { id: 'fv15', title: 'Тест 15', deadline: '2026-05-30', maxPoints: 3, points: 0, status: 'todo' }, 
            { id: 'fv16', title: 'Анкета студента', deadline: '2026-06-05', maxPoints: 10, points: 0, status: 'todo' },
            { id: 'fv17', title: 'Анкета курса', deadline: '2026-06-05', maxPoints: 5, points: 0, status: 'todo' },
            { id: 'fv18', title: 'Контрольне тестування', deadline: '2026-05-30', maxPoints: 20, points: 0, status: 'todo' }, 
            { id: 'fv19', title: 'Контрольне тестування 1-3 курси', deadline: '2026-06-05', maxPoints: 20, points: 0, status: 'todo' },
            { id: 'fv20', title: 'Відеоролик про свою регулярну спортивну активність', deadline: '2026-06-05', maxPoints: 15, points: 0, status: 'todo' }
        ] 
    }
};

const subjectTemplates = {
    1: [ { value: 'math', label: '📐 Вища математика' }, { value: 'english', label: '🌍 Англійська мова' }, { value: 'physics', label: '⚛️ Фізика' }, { value: 'programming', label: '💻 Основи програмування' } ],
    2: [ { value: 'db', label: '🗄️ Бази даних' }, { value: 'web', label: '🌐 Веб-технології' }, { value: 'security', label: '🔐 Кібербезпека' }, { value: 'mnc', label: '🤖 Машинне навчання: Міждисциплінарна курсова робота' } ]
};

// ======================== СТАН ДАНИХ (LOCALSTORAGE) ========================

const currentFileName = window.location.pathname.split('/').pop() || 'default_studytrack';

const KEY_SUBJECTS = 'studyTrack_subjects_v3_' + currentFileName;
const KEY_CUSTOM = 'studyTrack_custom_v3_' + currentFileName;
const KEY_FILTER = 'studyTrack_filter_v3_' + currentFileName; 

let subjectsData;
let addedCustomSubjects;

try {
    const savedSubjects = localStorage.getItem(KEY_SUBJECTS);
    const savedCustom = localStorage.getItem(KEY_CUSTOM);
    
    subjectsData = savedSubjects ? JSON.parse(savedSubjects) : defaultSubjectsData;
    addedCustomSubjects = savedCustom ? JSON.parse(savedCustom) : {};
} catch (e) {
    console.error("Помилка завантаження з LocalStorage, використовуються дані за замовчуванням.", e);
    subjectsData = defaultSubjectsData;
    addedCustomSubjects = {};
}

function saveData() {
    localStorage.setItem(KEY_SUBJECTS, JSON.stringify(subjectsData));
    localStorage.setItem(KEY_CUSTOM, JSON.stringify(addedCustomSubjects));
}

function resetAllData() {
    if(confirm("Ви впевнені, що хочете скинути всі дані до початкових? (Усі бали та додані предмети зникнуть)")) {
        localStorage.removeItem(KEY_SUBJECTS);
        localStorage.removeItem(KEY_CUSTOM);
        localStorage.removeItem(KEY_FILTER); 
        location.reload();
    }
}

let currentKanbanSubject = 'all';
let pendingPointsCallback = null; 
let pendingDeleteSubject = null; 

// Змінні для редагування завдань
let pendingEditSubjectKey = null;
let tempEditTasks = [];
let draggedRow = null;

function getAllSubjects() { return { ...subjectsData, ...addedCustomSubjects }; }
function getSubjectIcon(key) { const icons = { mn:'🤖', pis:'📐', tpr:'🧠', vd:'📈', devo:'☁️', uzhcp:'🔄', fv:'🏃', custom_mnc:'🤖' }; return icons[key] || '📝'; }

function getProgressClass(percent) { if (percent < 40) return 'danger'; if (percent < 70) return 'warning'; return ''; }
function getStatusBadge(status) { if (status === 'done') return '<span class="badge badge-success">✅ Здано</span>'; if (status === 'progress') return '<span class="badge badge-warning">⚡ В процесі</span>'; return '<span class="badge badge-neutral">📝 До виконання</span>'; }

function getDeadlineColor(task) { 
    if (task.status === 'done') return 'success'; 
    const d = new Date(task.deadline);
    d.setHours(0, 0, 0, 0);
    const todayDate = new Date(today);
    todayDate.setHours(0, 0, 0, 0);
    const diff = (d - todayDate) / (1000 * 60 * 60 * 24); 
    if (diff < 0) return 'danger'; 
    if (diff <= 2) return 'warning'; 
    return 'info'; 
}
function getDeadlineBadge(task) { const color = getDeadlineColor(task); if (color === 'danger') return '<span class="badge badge-danger">🔴 Прострочено</span>'; if (color === 'warning') return '<span class="badge badge-warning">🟡 Терміново</span>'; if (color === 'success') return '<span class="badge badge-success">🟢 Вчасно</span>'; return '<span class="badge badge-info">🔵 Заплановано</span>'; }

function calcPassProgress(tasks) {
    const earned = tasks.reduce((s, t) => s + (t.points || 0), 0);
    const total = tasks.reduce((s, t) => s + (t.maxPoints || 0), 0);
    const percent = total > 0 ? Math.round((earned / total) * 100) : 0;
    const doneCount = tasks.filter(t => t.status === 'done').length;
    const progressCount = tasks.filter(t => t.status === 'progress').length;
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    return { earned, total, percent, doneCount, progressCount, todoCount, isExam: false };
}

function calcExamProgress(tasks) {
    const examTasks = tasks.filter(t => t.title.toUpperCase().includes('ІСПИТ') || t.title.toUpperCase().includes('ЕКЗАМЕН'));
    const semTasks = tasks.filter(t => !t.title.toUpperCase().includes('ІСПИТ') && !t.title.toUpperCase().includes('ЕКЗАМЕН'));
    const semEarned = semTasks.reduce((s, t) => s + (t.points || 0), 0);
    const semTotal = semTasks.reduce((s, t) => s + (t.maxPoints || 0), 0);
    const semPercent = semTotal > 0 ? (semEarned / semTotal) * 100 : 0;
    const examEarned = examTasks.reduce((s, t) => s + (t.points || 0), 0);
    const examTotal = examTasks.reduce((s, t) => s + (t.maxPoints || 0), 0);
    const examPercent = examTotal > 0 ? (examEarned / examTotal) * 100 : 0;
    const finalPercent = (semPercent * 0.6) + (examPercent * 0.4);
    const doneCount = tasks.filter(t => t.status === 'done').length;
    const progressCount = tasks.filter(t => t.status === 'progress').length;
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    return { earned: Math.round(finalPercent * 10) / 10, total: 100, percent: Math.round(finalPercent), doneCount, progressCount, todoCount, isExam: true, semPoints: semEarned, semMax: semTotal, examPoints: examEarned, examMax: examTotal };
}

function calcSubjectProgress(subjectKey) {
    const subj = getAllSubjects()[subjectKey];
    if (!subj) return null;
    return subj.type === 'exam' ? calcExamProgress(subj.tasks) : calcPassProgress(subj.tasks);
}

// ======================== МОДАЛЬНЕ ВІКНО РЕДАГУВАННЯ СПИСКУ ЗАВДАНЬ ========================
function openEditTasksModal(subjectKey) {
    pendingEditSubjectKey = subjectKey;
    const allSubjects = getAllSubjects();
    const subj = allSubjects[subjectKey];
    if (!subj) return;
    
    // Робимо глибоку копію масиву завдань для редагування
    tempEditTasks = JSON.parse(JSON.stringify(subj.tasks));
    renderEditTasksList();
    
    document.getElementById('edit-tasks-modal').classList.add('show');
}

function closeEditTasksModal() {
    document.getElementById('edit-tasks-modal').classList.remove('show');
    pendingEditSubjectKey = null;
    tempEditTasks = [];
}

function renderEditTasksList() {
    const list = document.getElementById('edit-tasks-list');
    list.innerHTML = '';
    
    tempEditTasks.forEach(task => {
        const row = document.createElement('div');
        row.className = 'edit-task-row';
        row.draggable = true;
        row.dataset.id = task.id;
        
        row.innerHTML = `
            <span class="drag-handle" title="Перетягніть для зміни порядку">☰</span>
            <input type="text" class="edit-title date-input" value="${task.title.replace(/"/g, '&quot;')}" style="flex: 2; width: auto;" placeholder="Назва завдання">
            <input type="date" class="edit-deadline date-input" value="${task.deadline}" style="flex: 1; width: auto;">
            <input type="number" class="edit-max-points date-input" value="${task.maxPoints}" min="0.1" step="0.1" style="width: 70px;" title="Максимальний бал">
            <button class="btn btn-outline btn-sm delete-task-btn" onclick="removeTaskInEdit('${task.id}')" style="border-color: transparent; color: var(--danger); font-size: 1.2rem; padding: 4px; margin-bottom: 0;">❌</button>
        `;
        
        // Події Drag & Drop для конкретного рядка
        row.addEventListener('dragstart', function(e) {
            draggedRow = this;
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });
        
        row.addEventListener('dragend', function() {
            draggedRow = null;
            this.classList.remove('dragging');
        });
        
        list.appendChild(row);
    });
}

// Логіка перетягування у контейнері
const editListContainer = document.getElementById('edit-tasks-list');
editListContainer.addEventListener('dragover', e => {
    e.preventDefault();
    if (!draggedRow) return;
    const afterElement = getDragAfterElement(editListContainer, e.clientY);
    if (afterElement == null) {
        editListContainer.appendChild(draggedRow);
    } else {
        editListContainer.insertBefore(draggedRow, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.edit-task-row:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function addNewTaskInEdit() {
    const todayISO = new Date().toISOString().split('T')[0];
    tempEditTasks.push({
        id: pendingEditSubjectKey + '_task_' + Date.now(),
        title: 'Нове завдання',
        deadline: todayISO,
        maxPoints: 10,
        points: 0,
        status: 'todo'
    });
    renderEditTasksList();
    
    // Прокручуємо список вниз
    const list = document.getElementById('edit-tasks-list');
    setTimeout(() => list.scrollTop = list.scrollHeight, 50);
}

function removeTaskInEdit(taskId) {
    if(confirm('Видалити це завдання зі списку?')) {
        const row = document.querySelector(`.edit-task-row[data-id="${taskId}"]`);
        if (row) row.remove();
    }
}

function saveEditedTasks() {
    if (!pendingEditSubjectKey) return;
    
    const targetSubj = subjectsData[pendingEditSubjectKey] || addedCustomSubjects[pendingEditSubjectKey];
    if (!targetSubj) return;

    const newTasks = [];
    const rows = document.querySelectorAll('#edit-tasks-list .edit-task-row');
    
    rows.forEach(row => {
        const id = row.dataset.id;
        const title = row.querySelector('.edit-title').value.trim() || 'Без назви';
        const deadline = row.querySelector('.edit-deadline').value || new Date().toISOString().split('T')[0];
        const maxPoints = parseFloat(row.querySelector('.edit-max-points').value) || 10;
        
        // Знаходимо існуюче завдання, щоб зберегти його оцінку і статус
        const existingTask = targetSubj.tasks.find(t => t.id === id) || tempEditTasks.find(t => t.id === id);
        
        newTasks.push({
            id: existingTask.id,
            title: title,
            deadline: deadline,
            maxPoints: maxPoints,
            points: existingTask.points || 0,
            status: existingTask.status || 'todo'
        });
    });

    targetSubj.tasks = newTasks;
    saveData();
    renderAll();
    closeEditTasksModal();
}

// ======================== МОДАЛЬНЕ ВІКНО ДЛЯ БАЛІВ ========================
function openPointsModal(task, callback) {
    pendingPointsCallback = callback;
    document.getElementById('points-modal-task-title').textContent = task.title;
    document.getElementById('points-input').value = task.points || '';
    document.getElementById('points-input').max = task.maxPoints;
    document.getElementById('points-modal-max').textContent = task.maxPoints;
    document.getElementById('points-modal').classList.add('show');
    document.getElementById('points-input').focus();
}

function closePointsModal(save) {
    document.getElementById('points-modal').classList.remove('show');
    if (!pendingPointsCallback) return;
    if (save) {
        const input = document.getElementById('points-input');
        const val = parseFloat(input.value.replace(',', '.'));
        if (!isNaN(val) && val >= 0) {
            pendingPointsCallback(val);
        } else {
            pendingPointsCallback(null);
        }
    } else {
        pendingPointsCallback(null);
    }
    pendingPointsCallback = null;
}

document.getElementById('points-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        closePointsModal(true);
    }
});

// ======================== МОДАЛЬНЕ ВІКНО ВИДАЛЕННЯ ========================
function openDeleteModal(key, e) {
    if(e) { e.stopPropagation(); e.preventDefault(); }
    pendingDeleteSubject = key;
    document.getElementById('delete-modal').classList.add('show');
}

function closeDeleteModal() {
    document.getElementById('delete-modal').classList.remove('show');
    pendingDeleteSubject = null;
}

function confirmDelete() {
    if (pendingDeleteSubject) {
        const key = pendingDeleteSubject;
        if(subjectsData[key]) delete subjectsData[key];
        if(addedCustomSubjects[key]) delete addedCustomSubjects[key];
        if(currentKanbanSubject === key) currentKanbanSubject = 'all';
        saveData();
        renderAll();
        navigateTo('dashboard');
        closeDeleteModal();
    }
}

// ======================== РЕНДЕРИНГ ========================
function renderNav() {
    const allSubjects = getAllSubjects();
    document.getElementById('sem-group-1').innerHTML = '';
    document.getElementById('sem-group-2').innerHTML = '';
    for (const [key, subj] of Object.entries(allSubjects)) {
        const group = subj.semester === 1 ? document.getElementById('sem-group-1') : document.getElementById('sem-group-2');
        const link = document.createElement('a');
        link.href = '#subject-' + key;
        link.dataset.page = 'subject-' + key;
        link.className = 'subj-link';
        if (window.location.hash === '#subject-' + key) link.classList.add('active');
        link.innerHTML = `<span style="flex:1;" onclick="navigateTo('subject-${key}', event)">${getSubjectIcon(key)} ${subj.name}</span>
            <span class="delete-btn" onclick="openDeleteModal('${key}', event)" title="Видалити предмет">❌</span>`;
        group.appendChild(link);
    }
}

function renderAll() {
    renderNav();
    renderDashboard();
    renderDeadlines();
    renderKanbanMenu();
    renderKanban();
    renderAchievements();
    renderAllSubjectPages();
}

function renderDashboard() {
    const filterEl = document.getElementById('dashboard-semester-filter');
    const filter = filterEl.value;
    
    localStorage.setItem(KEY_FILTER, filter);

    const all = getAllSubjects();
    const keys = filter === 'all' ? Object.keys(all) : Object.keys(all).filter(k => all[k].semester === parseInt(filter));
    let totalEarned = 0, totalMax = 0;
    keys.forEach(k => { const s = calcSubjectProgress(k); totalEarned += s.earned; totalMax += s.total; });
    const globalPercent = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
    document.getElementById('global-progress-percent').textContent = globalPercent + '%';
    document.getElementById('global-progress-bar').style.width = globalPercent + '%';
    document.getElementById('global-progress-bar').className = 'progress-fill ' + getProgressClass(globalPercent);
    document.getElementById('global-rating').textContent = totalMax > 0 ? (globalPercent * 0.9 + 5).toFixed(1) : '0.0';

    const container = document.getElementById('dashboard-subjects');
    if (keys.length === 0) {
        container.innerHTML = '<div class="card"><p style="text-align:center;color:var(--muted);">Немає предметів</p></div>';
        return;
    }
    container.innerHTML = keys.map(key => {
        const subj = all[key];
        const stats = calcSubjectProgress(key);
        const sem = subj.semester === 1 ? '<span class="semester-badge sem1">Семестр 1</span>' : '<span class="semester-badge sem2">Семестр 2</span>';
        return `<div class="card"><h4>${getSubjectIcon(key)} ${subj.name} ${sem}</h4>
        <p>Прогрес: <b>${stats.percent}%</b> (${stats.earned.toFixed(1)}/${stats.total} балів)</p>
        <div class="progress-bg"><div class="progress-fill ${getProgressClass(stats.percent)}" style="width:${stats.percent}%;"></div></div>
        <p style="margin-top:8px;">Здано: ${stats.doneCount} | В процесі: ${stats.progressCount} | До виконання: ${stats.todoCount}</p>
        <a href="#subject-${key}" class="btn btn-outline btn-sm" style="margin-top: 14px; display: inline-block;" onclick="navigateTo('subject-${key}', event)">Відкрити предмет →</a></div>`;
    }).join('');
}

function renderDeadlines() {
    const active = Array.from(document.querySelectorAll('.filter-btn.filter-btn-active')).map(b => b.dataset.filter);
    const showAll = active.includes('all') || active.length === 0;
    const colorMap = { danger: 'critical', warning: 'warning', success: 'success', info: 'info' };
    const allTasks = [];
    for (const [k, s] of Object.entries(getAllSubjects())) s.tasks.forEach(t => allTasks.push({ ...t, subjectKey: k, subjectName: s.name }));
    allTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    const tbody = document.querySelector('#deadlines-table tbody');
    tbody.innerHTML = '';
    allTasks.forEach(task => {
        const color = getDeadlineColor(task);
        if (!showAll && !active.includes(colorMap[color])) return;
        tbody.innerHTML += `<tr class="${color==='danger'?'row-danger':(color==='warning'?'row-warning':'')}">
        <td>${new Date(task.deadline).toLocaleDateString('uk-UA')}</td>
        <td><a href="#subject-${task.subjectKey}" onclick="navigateTo('subject-${task.subjectKey}', event)" class="deadline-link">${task.subjectName}</a></td>
        <td>${task.title}</td><td>${getDeadlineBadge(task)}</td></tr>`;
    });
}

function renderKanbanMenu() {
    const menu = document.getElementById('kanban-nav-menu');
    const all = getAllSubjects();
    let html = `<div class="kanban-menu"><div class="kanban-menu-item ${currentKanbanSubject==='all'?'active':''}" onclick="setKanbanSubject('all', event)">📚 Усі предмети</div>`;
    [1,2].forEach(sem => {
        const items = Object.entries(all).filter(([k,s]) => s.semester === sem);
        if (items.length) {
            html += `<div class="kanban-menu-item ${currentKanbanSubject==='sem_'+sem?'active':''}" onclick="setKanbanSubject('sem_${sem}', event)">Семестр ${sem} ▾<div class="kanban-dropdown">`;
            items.forEach(([k,s]) => html += `<div class="kanban-dropdown-item ${currentKanbanSubject===k?'active':''}" onclick="setKanbanSubject('${k}', event)">${getSubjectIcon(k)} ${s.name}</div>`);
            html += `</div></div>`;
        }
    });
    html += `</div>`;
    menu.innerHTML = html;
}

function setKanbanSubject(key, e) { 
    if(e){e.stopPropagation();e.preventDefault();} 
    currentKanbanSubject = key; 
    renderKanbanMenu(); 
    renderKanban(); 
}

function renderKanban() {
    const all = getAllSubjects();
    let tasks = [];
    
    if (currentKanbanSubject === 'all') {
        for (const [k, s] of Object.entries(all)) s.tasks.forEach(t => tasks.push({...t, subjectKey: k, subjectName: s.name}));
    } else if (currentKanbanSubject.startsWith('sem_')) {
        const sem = parseInt(currentKanbanSubject.split('_')[1]);
        for (const [k, s] of Object.entries(all)) {
            if (s.semester === sem) {
                s.tasks.forEach(t => tasks.push({...t, subjectKey: k, subjectName: s.name}));
            }
        }
    } else if (all[currentKanbanSubject]) {
        tasks = all[currentKanbanSubject].tasks.map(t => ({...t, subjectKey: currentKanbanSubject, subjectName: all[currentKanbanSubject].name}));
    }

    ['todo','progress','done'].forEach(status => {
        const col = document.getElementById('col-' + (status==='progress'?'progress':status));
        const label = status==='todo'?'📝 To Do':(status==='progress'?'⚡ In Progress':'✅ Done');
        const filtered = tasks.filter(t => t.status === status);
        
        col.innerHTML = `<h3>${label} <small>(${filtered.length})</small></h3>`;
        filtered.forEach(task => {
            col.innerHTML += `<div class="kanban-card" draggable="true" data-task-id="${task.id}" data-subject="${task.subjectKey}">
            <strong>${task.title}</strong><br><small>📅 ${new Date(task.deadline).toLocaleDateString('uk-UA')} • ${task.points}/${task.maxPoints} балів</small><br><small style="color:var(--muted);">${task.subjectName}</small></div>`;
        });
    });
    
    attachDragEvents();
    updateKanbanFilterButtons();
}

function updateKanbanFilterButtons() {
    const activeBtns = Array.from(document.querySelectorAll('.kanban-filter-btn.kanban-filter-active')).map(b => b.dataset.kanbanFilter);
    const showAll = activeBtns.includes('all') || activeBtns.length === 0;

    document.querySelectorAll('.kanban-card').forEach(card => {
        const status = card.closest('#col-todo') ? 'todo' : (card.closest('#col-progress') ? 'progress' : 'done');
        if (showAll || activeBtns.includes(status)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function attachDragEvents() {
    document.querySelectorAll('.kanban-card').forEach(card => {
        card.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', JSON.stringify({ id: card.dataset.taskId, subject: card.dataset.subject }));
            card.classList.add('dragging');
        });
        card.addEventListener('dragend', () => card.classList.remove('dragging'));
    });
    document.querySelectorAll('.kanban-column').forEach(col => {
        col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
        col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
        col.addEventListener('drop', e => {
            e.preventDefault();
            col.classList.remove('drag-over');
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            const newStatus = col.id === 'col-todo' ? 'todo' : (col.id === 'col-progress' ? 'progress' : 'done');
            const all = getAllSubjects();
            const task = all[data.subject]?.tasks.find(t => t.id === data.id);
            if (task) {
                const oldStatus = task.status;
                if (newStatus === 'done' && task.points === 0 && task.maxPoints > 0) {
                    openPointsModal(task, (val) => {
                        if (val !== null) {
                            task.points = Math.min(val, task.maxPoints);
                            task.status = 'done';
                        } else {
                            task.status = oldStatus; 
                        }
                        saveData();
                        renderAll();
                    });
                } else {
                    task.status = newStatus;
                    if (newStatus !== 'done') task.points = 0;
                    saveData();
                    renderAll();
                }
            }
        });
    });
}

function renderAchievements() {
    const all = getAllSubjects();
    let totalDone = 0, totalOverdue = 0, sumPercent = 0, cnt = 0;
    for (const [k, s] of Object.entries(all)) {
        const stats = calcSubjectProgress(k);
        totalDone += stats.doneCount; sumPercent += stats.percent; cnt++;
        s.tasks.forEach(t => { if (getDeadlineColor(t) === 'danger') totalOverdue++; });
    }
    const avg = cnt > 0 ? sumPercent / cnt : 0;
    const ach = [
        { icon:'🎯', title:'Перший дедлайн', desc:'Здайте одне завдання вчасно', unlocked: totalDone>=1 },
        { icon:'🔥', title:'Серія з 3', desc:'Здайте 3 завдання поспіль', unlocked: totalDone>=3 },
        { icon:'🏅', title:'Відмінник', desc:'Загальний прогрес > 90%', unlocked: avg>90 },
        { icon:'⚡', title:'Швидкий старт', desc:'Додайте предмет із шаблону', unlocked: Object.keys(addedCustomSubjects).length>0 },
        { icon:'🧠', title:'Магістр дедлайнів', desc:'Жодного простроченого', unlocked: totalOverdue===0 && totalDone>0 },
        { icon:'📚', title:'Повне завантаження', desc:'Маєте 5+ предметів', unlocked: cnt>=5 }
    ];
    document.getElementById('achievements-list').innerHTML = ach.map(a =>
        `<div class="achievement ${a.unlocked?'':'locked'}"><span class="achievement-icon">${a.icon}</span><div><strong>${a.title}</strong><br><small>${a.desc}</small></div><span style="margin-left:auto;">${a.unlocked?'✅':'🔒'}</span></div>`
    ).join('');
}

function renderAllSubjectPages() {
    const all = getAllSubjects();
    const container = document.getElementById('dynamic-subject-pages');
    const currentHash = window.location.hash.replace('#','');
    container.innerHTML = Object.keys(all).map(key => {
        const subj = all[key];
        const sem = subj.semester===1?'Семестр 1':'Семестр 2';
        
        // 💡 Додано кнопку "✏️ Редагувати завдання"
        return `<section id="page-subject-${key}" class="page ${currentHash==='subject-'+key?'active':''}">
        <h1>${getSubjectIcon(key)} ${subj.name}</h1>
        <p class="subtitle">${subj.fullName} • Тип: <b>${subj.type==='exam'?'Іспит':'Залік'}</b> • <span class="semester-badge ${subj.semester===1?'sem1':'sem2'}">${sem}</span></p>
        <div class="card" id="subject-${key}-header"></div>
        <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <h4 style="margin:0;">📋 Журнал завдань</h4>
                <button class="btn btn-outline btn-sm" onclick="openEditTasksModal('${key}')">✏️ Редагувати завдання</button>
            </div>
            <table id="subject-${key}-table"><thead><tr><th>Завдання</th><th>Дедлайн</th><th>Статус</th><th>Бали</th><th>Дія</th></tr></thead><tbody></tbody></table>
        </div>
        </section>`;
    }).join('');
    Object.keys(all).forEach(k => renderSubjectPage(k));
}

function renderSubjectPage(key) {
    const subj = getAllSubjects()[key];
    if (!subj) return;
    const stats = calcSubjectProgress(key);
    const header = document.getElementById(`subject-${key}-header`);
    if (header) {
        let scoreHtml = '';
        if (stats.isExam) {
            scoreHtml = `<div style="text-align:right;"><p style="font-size:0.85rem;">Завдання: <b>${stats.semPoints}/${stats.semMax}</b> | Іспит: <b>${stats.examPoints}/${stats.examMax}</b></p>
            <p>Підсумок: <b style="color:var(--primary);font-size:1.2rem;">${stats.earned} / 100</b> (${stats.percent}%)</p></div>`;
        } else {
            scoreHtml = `<div style="text-align:right;"><p>Бал: <b style="color:var(--primary);font-size:1.2rem;">${stats.earned.toFixed(1)} / ${stats.total}</b> (${stats.percent}%)</p></div>`;
        }
        
        header.innerHTML = `<div style="display:flex;justify-content:space-between;flex-wrap:wrap;align-items:center;">
        <div><p>📌 Здано: <b>${stats.doneCount}</b> | В процесі: <b>${stats.progressCount}</b> | До виконання: <b>${stats.todoCount}</b></p>
        </div>${scoreHtml}</div>
        <div class="progress-bg" style="margin-top: 16px;"><div class="progress-fill ${getProgressClass(stats.percent)}" style="width:${stats.percent}%;"></div></div>`;
    }
    const tbody = document.querySelector(`#subject-${key}-table tbody`);
    if (tbody) {
        tbody.innerHTML = subj.tasks.map(task => `<tr>
        <td>${task.title}</td>
        <td>
            <input type="date" value="${task.deadline}" class="date-input" onchange="updateDeadline('${key}','${task.id}',this.value)">
        </td>
        <td>${getStatusBadge(task.status)}</td>
        <td><input type="number" value="${task.points}" min="0" max="${task.maxPoints}" step="0.1" style="width:70px;padding:6px;text-align:center;" onchange="updatePoints('${key}','${task.id}',this.value)"> / ${task.maxPoints}</td>
        <td><select onchange="updateStatus('${key}','${task.id}',this.value)" style="padding:6px;border-radius:8px;">
        <option value="todo" ${task.status==='todo'?'selected':''}>До виконання</option>
        <option value="progress" ${task.status==='progress'?'selected':''}>В процесі</option>
        <option value="done" ${task.status==='done'?'selected':''}>Здано</option></select></td></tr>`).join('');
    }
}

function updatePoints(subjectKey, taskId, newVal) {
    const task = getAllSubjects()[subjectKey]?.tasks.find(t => t.id === taskId);
    if (task) {
        task.points = Math.min(Math.max(0, parseFloat(newVal.replace(',', '.')) || 0), task.maxPoints);
        if (task.points > 0 && task.status !== 'done') task.status = 'done';
        if (task.points === 0 && task.status === 'done') task.status = 'todo';
        saveData();
        renderAll();
    }
}

function updateStatus(subjectKey, taskId, newStatus) {
    const task = getAllSubjects()[subjectKey]?.tasks.find(t => t.id === taskId);
    if (!task) return;
    const oldStatus = task.status;

    if (newStatus === 'done' && task.points === 0 && task.maxPoints > 0) {
        openPointsModal(task, (val) => {
            if (val !== null) {
                task.points = Math.min(val, task.maxPoints);
                task.status = 'done';
            } else {
                task.status = oldStatus; 
            }
            saveData();
            renderAll();
        });
    } else {
        task.status = newStatus;
        if (newStatus !== 'done') task.points = 0;
        saveData();
        renderAll();
    }
}

function updateDeadline(subjectKey, taskId, newDate) {
    const task = getAllSubjects()[subjectKey]?.tasks.find(t => t.id === taskId);
    if (task && newDate) {
        task.deadline = newDate;
        saveData();
        renderAll();
    }
}

function navigateTo(pageName, event) {
    if(event) event.preventDefault();
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const pageEl = document.getElementById('page-' + pageName);
    if (pageEl) pageEl.classList.add('active');
    const navLink = document.querySelector(`nav a[data-page="${pageName}"]`);
    if (navLink) navLink.classList.add('active');
    window.location.hash = pageName;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.filter === 'all') {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn-active','btn-primary'));
            btn.classList.add('filter-btn-active','btn-primary');
        } else {
            document.querySelector('.filter-btn[data-filter="all"]').classList.remove('filter-btn-active','btn-primary');
            btn.classList.toggle('filter-btn-active');
            btn.classList.toggle('btn-primary');
            if (!document.querySelector('.filter-btn.filter-btn-active')) {
                document.querySelector('.filter-btn[data-filter="all"]').classList.add('filter-btn-active','btn-primary');
            }
        }
        renderDeadlines();
    });
});

document.querySelectorAll('.kanban-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.kanbanFilter === 'all') {
            document.querySelectorAll('.kanban-filter-btn').forEach(b => b.classList.remove('kanban-filter-active','btn-primary'));
            btn.classList.add('kanban-filter-active','btn-primary');
        } else {
            document.querySelector('.kanban-filter-btn[data-kanban-filter="all"]').classList.remove('kanban-filter-active','btn-primary');
            btn.classList.toggle('kanban-filter-active');
            btn.classList.toggle('btn-primary');
            if (!document.querySelector('.kanban-filter-btn.kanban-filter-active')) {
                document.querySelector('.kanban-filter-btn[data-kanban-filter="all"]').classList.add('kanban-filter-active','btn-primary');
            }
        }
        updateKanbanFilterButtons();
    });
});

function toggleSemester(el) {
    const group = document.getElementById('sem-group-' + el.dataset.semester);
    el.classList.toggle('open');
    group.classList.toggle('open');
}

function openAddSubjectModal() {
    document.getElementById('add-subject-modal').classList.add('show');
    document.getElementById('semester-select').value = '';
    document.getElementById('template-select').innerHTML = '<option value="">-- Спочатку оберіть семестр --</option>';
    document.getElementById('template-select').disabled = true;
}
function closeAddSubjectModal() { document.getElementById('add-subject-modal').classList.remove('show'); }

function updateTemplateSelect() {
    const sem = document.getElementById('semester-select').value;
    const sel = document.getElementById('template-select');
    if (!sem) { sel.innerHTML = '<option value="">-- Спочатку оберіть семестр --</option>'; sel.disabled = true; return; }
    sel.disabled = false;
    const templates = subjectTemplates[sem] || [];
    sel.innerHTML = '<option value="">-- Оберіть предмет --</option>' + templates.map(t => `<option value="${t.value}">${t.label}</option>`).join('');
}

function addSubjectFromTemplate() {
    const sem = document.getElementById('semester-select').value;
    const tpl = document.getElementById('template-select').value;
    if (!sem || !tpl) { alert('Оберіть семестр і предмет'); return; }
    const selected = subjectTemplates[sem]?.find(t => t.value === tpl);
    if (!selected) return;
    const cleanName = selected.label.replace(/^[^\s]+\s/, '');
    const all = getAllSubjects();
    for (let k in all) {
        if (all[k].name === cleanName && all[k].semester === parseInt(sem)) {
            alert(`⚠️ Предмет "${cleanName}" вже додано до Семестру ${sem}!`);
            return;
        }
    }
    const newKey = 'custom_' + tpl + '_' + Date.now();
    let generatedTasks = [];
    
    if (tpl === 'mnc') {
        generatedTasks = [
            { id: newKey+'_1', title: 'Постановка задачі та вибір теми', deadline: '2026-03-20', maxPoints: 10, points: 0, status: 'todo' },
            { id: newKey+'_2', title: 'Розділ 1: Аналіз предметної області', deadline: '2026-04-10', maxPoints: 20, points: 0, status: 'todo' },
            { id: newKey+'_3', title: 'Розділ 2: Проектування моделі', deadline: '2026-05-01', maxPoints: 20, points: 0, status: 'todo' },
            { id: newKey+'_4', title: 'Розділ 3: Програмна реалізація', deadline: '2026-05-20', maxPoints: 20, points: 0, status: 'todo' },
            { id: newKey+'_5', title: 'Оформлення пояснювальної записки', deadline: '2026-06-01', maxPoints: 10, points: 0, status: 'todo' },
            { id: newKey+'_6', title: 'Захист курсової роботи', deadline: '2026-06-15', maxPoints: 20, points: 0, status: 'todo' }
        ];
    } else {
        generatedTasks = [
            { id: newKey+'_1', title: 'Практична робота 1', deadline: '2026-06-01', maxPoints: 20, points: 0, status: 'todo' },
            { id: newKey+'_2', title: 'Практична робота 2', deadline: '2026-06-10', maxPoints: 30, points: 0, status: 'todo' },
            { id: newKey+'_3', title: 'ІСПИТ', deadline: '2026-06-20', maxPoints: 50, points: 0, status: 'todo' }
        ];
    }
    
    addedCustomSubjects[newKey] = {
        key: newKey, name: cleanName, fullName: cleanName, type: 'exam', semester: parseInt(sem),
        tasks: generatedTasks
    };
    
    saveData();
    alert(`✅ Предмет "${cleanName}" додано до Семестру ${sem}!`);
    closeAddSubjectModal();
    renderAll();
}

window.addEventListener('load', () => {
    const savedFilter = localStorage.getItem(KEY_FILTER);
    if (savedFilter) {
        document.getElementById('dashboard-semester-filter').value = savedFilter;
    }

    const hash = window.location.hash.replace('#','');
    if (hash && document.getElementById('page-'+hash)) navigateTo(hash);
    else renderAll();
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#','');
    if (hash && document.getElementById('page-'+hash)) navigateTo(hash);
});

