// ======================== ЧИСТА ЛОГІКА ДЛЯ ДОДАТКА І ЮНІТ-ТЕСТІВ ========================
// Тут немає DOM, Supabase, модалок і drag&drop — тільки функції, які легко тестувати.
(function (root, factory) {
    const logic = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = logic;
    }
    if (root) {
        root.StudyTrackLogic = logic;
    }
})(typeof self !== 'undefined' ? self : this, function () {
    function normalizeTaskStatus(status) {
        return ['todo', 'progress', 'done'].includes(status) ? status : 'todo';
    }

    function getProgressClass(percent) {
        if (percent < 40) return 'danger';
        if (percent < 70) return 'warning';
        return '';
    }

    function getDeadlineColor(task, today = new Date()) {
        if (task && normalizeTaskStatus(task.status) === 'done') return 'success';

        const d = new Date(task && task.deadline);
        d.setHours(0, 0, 0, 0);

        const todayDate = new Date(today);
        todayDate.setHours(0, 0, 0, 0);

        const diff = (d - todayDate) / (1000 * 60 * 60 * 24);
        if (diff < 0) return 'danger';
        if (diff <= 2) return 'warning';
        return 'info';
    }

    function calcPassProgress(tasks) {
        const list = Array.isArray(tasks) ? tasks : [];
        const earned = list.reduce((s, t) => s + (t.points || 0), 0);
        const total = list.reduce((s, t) => s + (t.maxPoints || 0), 0);
        const percent = total > 0 ? Math.round((earned / total) * 100) : 0;
        const doneCount = list.filter(t => t.status === 'done').length;
        const progressCount = list.filter(t => t.status === 'progress').length;
        const todoCount = list.filter(t => t.status === 'todo').length;

        return { earned, total, percent, doneCount, progressCount, todoCount, isExam: false };
    }

    function calcExamProgress(tasks) {
        const list = Array.isArray(tasks) ? tasks : [];
        const isExamTask = t => {
            const title = String(t.title || '').toUpperCase();
            return title.includes('ІСПИТ') || title.includes('ЕКЗАМЕН');
        };

        const examTasks = list.filter(isExamTask);
        const semTasks = list.filter(t => !isExamTask(t));

        const semEarned = semTasks.reduce((s, t) => s + (t.points || 0), 0);
        const semTotal = semTasks.reduce((s, t) => s + (t.maxPoints || 0), 0);
        const semPercent = semTotal > 0 ? (semEarned / semTotal) * 100 : 0;

        const examEarned = examTasks.reduce((s, t) => s + (t.points || 0), 0);
        const examTotal = examTasks.reduce((s, t) => s + (t.maxPoints || 0), 0);
        const examPercent = examTotal > 0 ? (examEarned / examTotal) * 100 : 0;

        const finalPercent = (semPercent * 0.6) + (examPercent * 0.4);
        const doneCount = list.filter(t => t.status === 'done').length;
        const progressCount = list.filter(t => t.status === 'progress').length;
        const todoCount = list.filter(t => t.status === 'todo').length;

        return {
            earned: Math.round(finalPercent * 10) / 10,
            total: 100,
            percent: Math.round(finalPercent),
            doneCount,
            progressCount,
            todoCount,
            isExam: true,
            semPoints: semEarned,
            semMax: semTotal,
            examPoints: examEarned,
            examMax: examTotal
        };
    }

    return {
        calcPassProgress,
        calcExamProgress,
        normalizeTaskStatus,
        getDeadlineColor,
        getProgressClass
    };
});
