// ======================== ПІДКЛЮЧЕННЯ SUPABASE ТА АВТОРИЗАЦІЯ ========================
const supabaseUrl = 'https://gdqxxqunaxnkbbislvhg.supabase.co';
const supabaseKey = 'sb_publishable_lEn0DNIANgsndpfehGnCog_pTWy0y9i';

// 💡 ВИПРАВЛЕННЯ: Змінили назву на supabaseClient, щоб не конфліктувало з бібліотекою
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

const KEY_FILTER = 'dashboard_semester_filter';

let currentUser = null;
let subjectsData = {}; 
let addedCustomSubjects = {};

const subjectTemplates = {
    1: [ { value: 'OK1', label: '📝 Українське фахове мовлення' }, { value: 'OK2-1', label: '🌍 Іноземна мова (Ч. 1)' }, { value: 'OK5', label: '📐 Лінійна алгебра і аналітична геометрія' }, { value: 'OK8', label: '💻 Алгоритмізація та програмування' }, { value: 'OK9', label: '📖 Теорія алгоритмів' } ],
    2: [ { value: 'OK4', label: '⚖️ Основи права' }, { value: 'OK2-2', label: '🌍 Іноземна мова (Ч. 2)' }, { value: 'OK6', label: '📈 Математичний аналіз' }, { value: 'OK7', label: '⚛️ Фізика' }, { value: 'OK10', label: '🧮 Дискретна математика для КН' }, { value: 'OK11', label: '📊 Алгоритми та структури даних' }, { value: 'OK12', label: '🔢 Чисельні методи у КН' }, { value: 'OK13', label: '☕ Об\'єктно-орієнтоване програмування' } ],
    3: [ { value: 'OK2-3', label: '🌍 Іноземна мова (Ч. 3)' }, { value: 'OK14', label: '🗄️ Організація баз даних та знань' }, { value: 'OK15', label: '🖥️ Інженерія комп\'ютерних систем та мереж' }, { value: 'OK16', label: '🎲 Ймовірність, статистика та випадкові процеси' }, { value: 'OK17', label: '🌐 Вебтехнології та вебдизайн' }, { value: 'OK24', label: '🔷 Програмування на C#' }, { value: 'OK25', label: 'λ Функціональне програмування' } ],
    4: [ { value: 'OK2-4', label: '🌍 Іноземна мова (Ч. 4 - Іспит)' }, { value: 'OK3', label: '🧠 Філософія' }, { value: 'OK18', label: '📱 Крос-платформне програмування' }, { value: 'OK19', label: '📈 Дослідження операцій' }, { value: 'OK26', label: '🐍 Програмування на Python' }, { value: 'OK27', label: '📊 Статистичні методи аналізу даних' }, { value: 'OK28', label: '🤖 Введення до штучного інтелекту' } ],
    5: [ { value: 'OK20', label: '📉 Системний аналіз' }, { value: 'OK21', label: '⛏️ Інтелектуальний аналіз даних' }, { value: 'OK29', label: '🧬 Формальні системи і мат. основи' } ],
    6: [ { value: 'OK22', label: '🧠 Теорія прийняття рішень' }, { value: 'OK30', label: '🤖 Машинне навчання' }, { value: 'OK31', label: '📑 Міждисциплінарна курсова робота' }, { value: 'OK32', label: '📐 Проектування інформаційних систем' }, { value: 'VB6', label: '☁️ DevOps та основи Cloud-застосунків' }, { value: 'VB8', label: '📈 Візуалізація та аналіз даних' }, { value: 'VB23', label: '🔄 Управління життєвим циклом програмного продукту' } ],
    7: [ { value: 'OK23', label: '💼 Економіка та бізнес' }, { value: 'OK33', label: '🧠 Штучні нейронні мережі' } ],
    8: [ { value: 'OK34', label: '🏢 Передатестаційна практика' }, { value: 'OK35', label: '🎓 Кваліфікаційна робота' } ]
};

// Перевіряємо, чи студент вже залогінений (при оновленні сторінки)
window.addEventListener('load', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        currentUser = session.user;
        document.getElementById('login-modal').classList.remove('show');
        console.log("Увійшли як:", currentUser.email);
        loadDataFromSupabase(); // 📍 ДОДАЄМО СЮДИ (щоб предмети не зникали при Ctrl+F5)
    }
});

// 1. ФУНКЦІЯ ВХОДУ (Для існуючих користувачів)
async function handleLogin() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const errorEl = document.getElementById('auth-error');
    
    if (!email || password.length < 6) {
        errorEl.style.color = 'var(--danger)';
        errorEl.textContent = 'Введіть email та пароль (від 6 символів)'; return;
    }

    errorEl.style.color = 'var(--primary)';
    errorEl.textContent = 'Вхід у систему...';

const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        errorEl.style.color = 'var(--danger)';
        errorEl.textContent = 'Помилка входу: ' + error.message;
    } else {
        // САМОЛІКУВАННЯ: Якщо профілю в Users немає, створюємо його!
        const { data: checkUser } = await supabaseClient.from('Users').select('users_id').eq('email', email).single();
        if (!checkUser) {
            await supabaseClient.from('Users').insert([{ email: email, full_name: 'Студент ХНУРЕ', role: 'student' }]);
        }
        completeLogin(data.user);
    }
}

// 2. ФУНКЦІЯ РЕЄСТРАЦІЇ (Для нових користувачів)
async function handleSignUp() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const errorEl = document.getElementById('auth-error');
    
    if (!email || password.length < 6) {
        errorEl.style.color = 'var(--danger)';
        errorEl.textContent = 'Введіть email та пароль (від 6 символів)'; return;
    }
    if (!email.endsWith('@nure.ua')) {
        errorEl.style.color = 'var(--danger)';
        errorEl.textContent = 'Помилка: Дозволено лише для пошт @nure.ua!'; return;
    }

    errorEl.style.color = 'var(--primary)';
    errorEl.textContent = 'Створення акаунту...';

    const { data, error } = await supabaseClient.auth.signUp({ email, password });

    if (error) {
        errorEl.style.color = 'var(--danger)';
        errorEl.textContent = 'Помилка реєстрації: ' + error.message;
    } else {
        // Додаємо запис у таблицю Users для збереження профілю
        await supabaseClient.from('Users').insert([{ email: email, full_name: 'Студент ХНУРЕ', role: 'student' }]);
        
        if (data.session) {
            // Якщо у налаштуваннях Supabase підтвердження пошти ВИМКНЕНО — впускаємо одразу
            completeLogin(data.user);
        } else {
            // Якщо підтвердження УВІМКНЕНО — просимо перейти на пошту
            errorEl.style.color = 'var(--success)';
            errorEl.textContent = '📩 Акаунт створено! Перевірте пошту, клікніть на посилання у листі, після чого поверніться сюди та натисніть кнопку "Увійти".';
        }
    }
}

// Функція закриття вікна і старту сайту
function completeLogin(user) {
    currentUser = user;
    loadDataFromSupabase();
    document.getElementById('login-modal').classList.remove('show');
    console.log("Успішний вхід:", currentUser.email);
    renderAll();
}

// Функція виходу з акаунту
async function handleLogout() {
    await supabaseClient.auth.signOut();
    window.location.reload(); // Перезавантажуємо сторінку, знову з'явиться вікно входу
}

// Функція видалення акаунту
async function handleDeleteAccount() {
    if (confirm('Ви впевнені, що хочете видалити всі свої дані? Цю дію неможливо скасувати!')) {
        // Спочатку видаляємо профіль користувача з нашої таблиці Users
        await supabaseClient.from('Users').delete().eq('email', currentUser.email);
        
        alert('Ваші особисті дані успішно видалено.');
        
        // Потім розлогінюємо його
        await supabaseClient.auth.signOut();
        window.location.reload();
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
    
    // 💡 ВИПРАВЛЕНО: тепер беремо поточну дату системи
    const todayDate = new Date(); 
    todayDate.setHours(0, 0, 0, 0);
    
    const diff = (d - todayDate) / (1000 * 60 * 60 * 24); 
    if (diff < 0) return 'danger'; 
    if (diff <= 2) return 'warning'; 
    return 'info'; 
}

function getDeadlineBadge(task) { const color = getDeadlineColor(task); if (color === 'danger') return '<span class="badge badge-danger">🔴 Прострочено</span>'; if (color === 'warning') return '<span class="badge badge-warning">🟡 Терміново</span>'; if (color === 'success') return '<span class="badge badge-success">🟢 Здано</span>'; return '<span class="badge badge-info">🔵 Заплановано</span>'; }

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

async function saveEditedTasks() {
    if (!pendingEditSubjectKey) return;
    const subj = getAllSubjects()[pendingEditSubjectKey];
    if (!subj || !subj.dbId) return;

    const rows = document.querySelectorAll('#edit-tasks-list .edit-task-row');
    const newTasks = [];

    rows.forEach(row => {
        const id = row.dataset.id;
        const title = row.querySelector('.edit-title').value.trim() || 'Без назви';
        const deadline = row.querySelector('.edit-deadline').value || new Date().toISOString().split('T')[0];
        const maxPoints = parseFloat(row.querySelector('.edit-max-points').value) || 10;
        const existingTask = subj.tasks.find(t => t.id === id) || tempEditTasks.find(t => t.id === id);

        newTasks.push({
            user_tasks_id: existingTask ? existingTask.id : undefined, // для існуючих
            title: title,
            deadline: deadline,
            max_points: maxPoints,
            points: existingTask ? (existingTask.points || 0) : 0,
            status: existingTask ? (existingTask.status || 'todo') : 'todo',
            sort_order: newTasks.length + 1,
            // user_subjects_id додамо пізніше
        });
    });

    try {
        // Видаляємо всі старі завдання цього предмета
        await supabaseClient
            .from('User_Tasks')
            .delete()
            .eq('user_subjects_id', subj.dbId);

        // Вставляємо новий список
        const tasksToInsert = newTasks.map(t => ({
            user_subjects_id: subj.dbId,
            title: t.title,
            deadline: t.deadline,
            max_points: t.max_points,
            points: t.points,
            status: t.status,
            sort_order: t.sort_order
        }));

        await supabaseClient.from('User_Tasks').insert(tasksToInsert);

        closeEditTasksModal();
        loadDataFromSupabase();
    } catch (err) {
        console.error('Помилка збереження редагованих завдань:', err);
        alert('Не вдалося зберегти зміни.');
    }
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
let pendingDeleteId = null; // Глобальна змінна

function openDeleteModal(key, dbId) {
    pendingDeleteSubject = key;
    pendingDeleteId = dbId; // Зберігаємо унікальний ID з бази
    document.getElementById('delete-modal').classList.add('show');
}

function closeDeleteModal() {
    document.getElementById('delete-modal').classList.remove('show');
    pendingDeleteSubject = null;
}

async function confirmDelete() {
    if (!pendingDeleteSubject) return;
    
    const key = pendingDeleteSubject;
    const subj = subjectsData[key];
    
    // Якщо предмета немає або він не має ID з бази даних, видаляємо лише локально
    if (!subj || !subj.dbId) {
        if(subjectsData[key]) delete subjectsData[key];
        if(addedCustomSubjects[key]) delete addedCustomSubjects[key];
        if(currentKanbanSubject === key) currentKanbanSubject = 'all';
        renderAll();
        navigateTo('dashboard');
        closeDeleteModal();
        return;
    }

    try {
        // 1. Спочатку видаляємо всі пов'язані завдання з хмари (User_Tasks)
        const { error: tasksErr } = await supabaseClient
            .from('User_Tasks')
            .delete()
            .eq('user_subjects_id', subj.dbId);
            
        if (tasksErr) throw new Error("Не вдалося видалити завдання з хмари: " + tasksErr.message);

        // 2. Тепер видаляємо сам предмет із хмари (User_Subjects)
        const { error: subjErr } = await supabaseClient
            .from('User_Subjects')
            .delete()
            .eq('user_subjects_id', subj.dbId);
            
        if (subjErr) throw new Error("Не вдалося видалити дисципліну з хмари: " + subjErr.message);

        // 3. Очищаємо локальні змінні системи
        if (subjectsData[key]) delete subjectsData[key];
        if (currentKanbanSubject === key) currentKanbanSubject = 'all';

        alert("🗑️ Дисципліну та її журнал завдань повністю видалено з бази даних!");
        closeDeleteModal();
        
        // 4. Перезавантажуємо чисті дані та переходимо на головну сторінку
        loadDataFromSupabase();
        navigateTo('dashboard');

    } catch (err) {
        console.error("Помилка видалення:", err);
        alert("Критична помилка: " + err.message);
    }
}

// ======================== РЕНДЕРИНГ ========================
function renderNav() {
    const allSubjects = getAllSubjects();
    
    // Очищаємо всі 8 груп перед малюванням
    for (let i = 1; i <= 8; i++) {
        let group = document.getElementById('sem-group-' + i);
        if (group) group.innerHTML = '';
    }

    // Розкидаємо предмети по відповідних групах
    for (const [key, subj] of Object.entries(allSubjects)) {
        const group = document.getElementById('sem-group-' + subj.semester);
        if (!group) continue;
        
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
            
            // 📍 Універсальний бейдж: створює класи sem1, sem2, sem3... sem8 залежно від бази даних
            const sem = subj.semester ? `<span class="semester-badge sem${subj.semester}">Семестр ${subj.semester}</span>` : '';
            
            return `<div class="card"><h4>${getSubjectIcon(key)} ${subj.name} ${sem}</h4>
            <p>Прогрес: <b>${stats.percent}%</b> (${stats.earned.toFixed(1)}/${stats.total} балів)</p>
            <div class="progress-bg"><div class="progress-fill ${getProgressClass(stats.percent)}" style="width:${stats.percent}%;"></div></div>
            <p style="margin-top:8px;">Здано: ${stats.doneCount} | В процесі: ${stats.progressCount} | До виконання: ${stats.todoCount}</p>
            <a href="#subject-${key}" class="btn btn-outline btn-sm" style="margin-top: 14px; display: inline-block;" onclick="navigateTo('subject-${key}', event)">Відкрити предмет →</a></div>`;
        }).join('');
}

function renderDeadlines() {
    const currentDateEl = document.getElementById('current-date');
    if (currentDateEl) {
        currentDateEl.textContent = new Date().toLocaleDateString('uk-UA');
    }

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
    [1,2,3,4,5,6,7,8].forEach(sem => {
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
            col.innerHTML += `<div class="kanban-card" draggable="true" data-task-id="${task.id}" data-subject="${task.subjectKey}" title="Перетягніть картку в іншу колонку, щоб змінити статус">
            <strong>${task.title}</strong><br>
            <small>📅 ${new Date(task.deadline).toLocaleDateString('uk-UA')} • ${task.points}/${task.maxPoints} балів</small><br>
            <small style="color:var(--muted);">${task.subjectName}</small>
            </div>`;
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

    // Використовуємо on... замість addEventListener, щоб після кожного renderAll()
    // не накопичувалися дублікати drop-обробників на тих самих колонках.
    document.querySelectorAll('.kanban-column').forEach(col => {
        col.ondragover = e => { e.preventDefault(); col.classList.add('drag-over'); };
        col.ondragleave = () => col.classList.remove('drag-over');
        col.ondrop = async e => {
            e.preventDefault();
            col.classList.remove('drag-over');

            let data = null;
            try {
                data = JSON.parse(e.dataTransfer.getData('text/plain'));
            } catch (err) {
                console.error('Некоректні дані drag&drop:', err);
                return;
            }

            const newStatus = col.id === 'col-todo' ? 'todo' : (col.id === 'col-progress' ? 'progress' : 'done');
            await updateStatus(data.subject, data.id, newStatus);
        };
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
        { icon:'🎯', title:'Перший дедлайн', desc:'Здайте одне завдання', unlocked: totalDone>=1 },
        { icon:'🔥', title:'Серія з 3', desc:'Здайте 3 завдання поспіль', unlocked: totalDone>=3 },
        { icon:'🏅', title:'Відмінник', desc:'Загальний прогрес > 90%', unlocked: avg>90 },
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
        const sem = 'Семестр ' + subj.semester;
        
        // 💡 Додано кнопку "✏️ Редагувати завдання"
        return `<section id="page-subject-${key}" class="page ${currentHash==='subject-'+key?'active':''}">
        <h1>${getSubjectIcon(key)} ${subj.name}</h1>
        <p class="subtitle">${subj.fullName} • Тип: <b>${subj.type==='exam'?'Іспит':'Залік'}</b> • <span class="semester-badge sem${subj.semester}">${sem}</span></p>
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

function normalizeTaskStatus(status) {
    return ['todo', 'progress', 'done'].includes(status) ? status : 'todo';
}

function findLocalTask(subjectKey, taskId) {
    const subj = getAllSubjects()[subjectKey];
    if (!subj) return null;
    const task = subj.tasks.find(t => String(t.id) === String(taskId));
    return task ? { subj, task } : null;
}

async function saveTaskPatch(subjectKey, taskId, patch) {
    const found = findLocalTask(subjectKey, taskId);
    if (!found) {
        console.error('Завдання не знайдено локально:', { subjectKey, taskId, patch });
        alert('Не вдалося знайти завдання на сторінці. Оновіть сторінку та спробуйте ще раз.');
        return false;
    }

    const dbPatch = {};
    if (patch.deadline !== undefined) dbPatch.deadline = patch.deadline;
    if (patch.points !== undefined) dbPatch.points = Number(patch.points) || 0;
    if (patch.status !== undefined) dbPatch.status = normalizeTaskStatus(patch.status);

    const { data, error } = await supabaseClient
        .from('User_Tasks')
        .update(dbPatch)
        .eq('user_tasks_id', taskId)
        .select('user_tasks_id, deadline, points, status, max_points')
        .maybeSingle();

    if (error) {
        console.error('Помилка оновлення завдання:', error, { subjectKey, taskId, dbPatch });
        alert('Не вдалося зберегти зміну в базі даних: ' + error.message);
        renderAll();
        return false;
    }

    if (!data) {
        console.error('Supabase не повернув оновлений рядок:', { subjectKey, taskId, dbPatch });
        alert('Зміна не застосувалася: рядок завдання не знайдено або немає прав на оновлення.');
        await loadDataFromSupabase();
        return false;
    }

    // Одразу оновлюємо локальні дані, щоб підсумок, бейдж і канбан мінялися без ручного перезавантаження.
    if (data.deadline !== undefined && data.deadline !== null) {
        found.task.deadline = String(data.deadline).split('T')[0];
    }
    if (data.points !== undefined && data.points !== null) {
        found.task.points = parseFloat(data.points) || 0;
    }
    if (data.status !== undefined && data.status !== null) {
        found.task.status = normalizeTaskStatus(data.status);
    }

    renderAll();
    return true;
}

async function updatePoints(subjectKey, taskId, newVal) {
    const found = findLocalTask(subjectKey, taskId);
    if (!found) return;

    const rawValue = String(newVal).replace(',', '.');
    const points = Math.min(Math.max(0, parseFloat(rawValue) || 0), found.task.maxPoints);
    const newStatus = points > 0 ? 'done' : (found.task.status === 'done' ? 'todo' : found.task.status);

    await saveTaskPatch(subjectKey, taskId, { points, status: newStatus });
}

async function updateStatus(subjectKey, taskId, newStatus) {
    const found = findLocalTask(subjectKey, taskId);
    if (!found) return;

    newStatus = normalizeTaskStatus(newStatus);

    if (newStatus === 'done' && found.task.points === 0 && found.task.maxPoints > 0) {
        // Якщо завдання позначили як здане, просимо одразу ввести бал.
        openPointsModal(found.task, async (val) => {
            if (val !== null) {
                const points = Math.min(Math.max(0, Number(val) || 0), found.task.maxPoints);
                await saveTaskPatch(subjectKey, taskId, { status: 'done', points });
            } else {
                renderAll();
            }
        });
        return;
    }

    // Якщо повертаємо завдання з "Здано" назад у роботу — бали очищаються.
    const points = (newStatus !== 'done') ? 0 : found.task.points;
    await saveTaskPatch(subjectKey, taskId, { status: newStatus, points });
}

async function updateDeadline(subjectKey, taskId, newDate) {
    if (!newDate) return;
    await saveTaskPatch(subjectKey, taskId, { deadline: newDate });
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
    document.getElementById('target-semester-select').value = ''; 
    document.getElementById('filter-semester-select').value = 'all';
    updateTemplateSelect(); 
}

function closeAddSubjectModal() { 
    document.getElementById('add-subject-modal').classList.remove('show'); 
}

// ==========================================
// ФІЛЬТРАЦІЯ ТА ВИБІР ПРЕДМЕТА
// ==========================================
function updateTemplateSelect() {
    const filterVal = document.getElementById('filter-semester-select').value; 
    const sel = document.getElementById('template-select');
    
    let templatesToShow = [];
    
    // Якщо обрано "0" (Загальний список) або "all"
    if (filterVal === '0' || filterVal === 'all') {
        for (let i = 1; i <= 8; i++) {
            if (subjectTemplates[i]) templatesToShow = templatesToShow.concat(subjectTemplates[i]);
        }
    } else {
        templatesToShow = subjectTemplates[filterVal] || [];
    }

    sel.disabled = false;
    sel.innerHTML = '<option value="">-- Оберіть дисципліну --</option>' + 
        templatesToShow.map(t => `<option value="${t.value}">${t.label}</option>`).join('');
}

// ==========================================
// ДОДАВАННЯ ПРЕДМЕТА ТА ЗАВДАНЬ (З ОБРОБКОЮ ПОМИЛОК)
// ==========================================
async function addSubjectFromTemplate() {
    if (!currentUser) return;

    const sem = document.getElementById('target-semester-select').value;
    const tpl = document.getElementById('template-select').value;

    if (!sem || !tpl) { alert('Оберіть семестр для додавання і предмет!'); return; }

    try {
        document.querySelector('#add-subject-modal .btn-primary').textContent = "Завантаження...";

        let selected = null;
        for (let i = 1; i <= 8; i++) {
            selected = (subjectTemplates[i] || []).find(t => t.value === tpl);
            if (selected) break;
        }
        if (!selected) throw new Error("Предмет не знайдено в JS шаблонах");

        const cleanName = selected.label.replace(/^[^\s]+\s/, '');

        const { data: userData } = await supabaseClient.from('Users').select('users_id').eq('email', currentUser.email).single();
        if (!userData) throw new Error("Профіль не знайдено в БД");

        const { data: existingSubj } = await supabaseClient.from('User_Subjects')
            .select('*').eq('user_id', userData.users_id).eq('semester', parseInt(sem)).eq('subjects_templates_id', tpl);
        if (existingSubj && existingSubj.length > 0) {
            alert(`⚠️ Предмет "${cleanName}" вже є у Семестрі ${sem}!`); return;
        }

        const { data: newSubj, error: subjErr } = await supabaseClient
            .from('User_Subjects')
            .insert([{ user_id: userData.users_id, subjects_templates_id: tpl, semester: parseInt(sem) }])
            .select().single();
        if (subjErr) throw subjErr;

        const { data: taskTemplates } = await supabaseClient.from('Task_Templates').select('*').eq('subjects_templates_id', tpl);
        if (taskTemplates && taskTemplates.length > 0) {
            const tasks = taskTemplates.map(t => ({
                user_subjects_id: newSubj.user_subjects_id,
                title: t.title,
                max_points: t.max_points,
                sort_order: t.sort_order,
                is_exam: t.is_exam,
                status: 'todo'
            }));
            await supabaseClient.from('User_Tasks').insert(tasks);
        }

        alert(`✅ Предмет успішно додано!`);
        closeAddSubjectModal();
        loadDataFromSupabase();
    } catch (err) {
        console.error(err);
        alert("Помилка: " + err.message);
    } finally {
        document.querySelector('#add-subject-modal .btn-primary').textContent = "Додати до трекера";
    }
}

// ==========================================
// НАВІГАЦІЯ (ХЕШ)
// ==========================================
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#','');
    if (hash && document.getElementById('page-'+hash)) navigateTo(hash);
});

// ==========================================
// ЗЧИТУВАННЯ ДАНИХ З ХМАРИ
// ==========================================
async function loadDataFromSupabase() {
    if (!currentUser) return;
    const { data: userData } = await supabaseClient.from('Users').select('users_id').eq('email', currentUser.email).single();
    if (!userData) return;

    const { data: userSubjects, error } = await supabaseClient
        .from('User_Subjects')
        .select(`
            user_subjects_id, subjects_templates_id, semester, 
            Subjects_Templates ( full_name, type ),
            User_Tasks ( user_tasks_id, title, deadline, points, max_points, status, sort_order, is_exam )
        `)
        .eq('user_id', userData.users_id);

    if (error) { console.error("Помилка завантаження:", error); return; }

    subjectsData = {}; 

    userSubjects.forEach(us => {
        const tplId = us.subjects_templates_id;
        
        let mappedTasks = (us.User_Tasks || []).sort((a,b) => a.sort_order - b.sort_order).map(t => ({
            id: t.user_tasks_id,
            title: t.title,
            deadline: t.deadline ? t.deadline.split('T')[0] : new Date().toISOString().split('T')[0],
            points: parseFloat(t.points) || 0,
            status: normalizeTaskStatus(t.status),
            maxPoints: parseFloat(t.max_points) || 10
        }));

        let label = us.Subjects_Templates.full_name;
        for (let i = 1; i <= 8; i++) {
            const found = (subjectTemplates[i] || []).find(s => s.value === tplId);
            if (found) { label = found.label.replace(/^[^\s]+\s/, ''); break; }
        }

        subjectsData[tplId] = {
            key: tplId,
            name: label,
            fullName: us.Subjects_Templates.full_name,
            type: us.Subjects_Templates.type,
            semester: us.semester, // Цільовий семестр!
            tasks: mappedTasks,
            dbId: us.user_subjects_id
        };
    });

    renderAll(); 
}

// Тимчасова функція-заглушка
function saveData() {
    console.log("Локальне збереження виконано.");
}