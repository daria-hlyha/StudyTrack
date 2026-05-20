const assert = require('assert');
const {
    calcPassProgress,
    calcExamProgress,
    normalizeTaskStatus,
    getDeadlineColor,
    getProgressClass
} = require('../JavaScript/logic');

function testCalcPassProgress() {
    const tasks = [
        { title: 'Практична №1', points: 8, maxPoints: 10, status: 'done' },
        { title: 'Практична №2', points: 5, maxPoints: 10, status: 'progress' },
        { title: 'Практична №3', points: 0, maxPoints: 5, status: 'todo' }
    ];

    assert.deepStrictEqual(calcPassProgress(tasks), {
        earned: 13,
        total: 25,
        percent: 52,
        doneCount: 1,
        progressCount: 1,
        todoCount: 1,
        isExam: false
    });

    assert.deepStrictEqual(calcPassProgress([]), {
        earned: 0,
        total: 0,
        percent: 0,
        doneCount: 0,
        progressCount: 0,
        todoCount: 0,
        isExam: false
    });
}

function testCalcExamProgress() {
    const tasks = [
        { title: 'Лабораторна №1', points: 20, maxPoints: 30, status: 'done' },
        { title: 'Практична №1', points: 10, maxPoints: 20, status: 'progress' },
        { title: 'Іспит', points: 20, maxPoints: 50, status: 'done' }
    ];

    const result = calcExamProgress(tasks);

    assert.strictEqual(result.earned, 52);
    assert.strictEqual(result.total, 100);
    assert.strictEqual(result.percent, 52);
    assert.strictEqual(result.doneCount, 2);
    assert.strictEqual(result.progressCount, 1);
    assert.strictEqual(result.todoCount, 0);
    assert.strictEqual(result.isExam, true);
    assert.strictEqual(result.semPoints, 30);
    assert.strictEqual(result.semMax, 50);
    assert.strictEqual(result.examPoints, 20);
    assert.strictEqual(result.examMax, 50);
}

function testNormalizeTaskStatus() {
    assert.strictEqual(normalizeTaskStatus('todo'), 'todo');
    assert.strictEqual(normalizeTaskStatus('progress'), 'progress');
    assert.strictEqual(normalizeTaskStatus('done'), 'done');
    assert.strictEqual(normalizeTaskStatus('in_progress'), 'todo');
    assert.strictEqual(normalizeTaskStatus(undefined), 'todo');
}

function testGetDeadlineColor() {
    const today = new Date('2026-05-20T12:00:00');

    assert.strictEqual(getDeadlineColor({ deadline: '2026-05-19', status: 'todo' }, today), 'danger');
    assert.strictEqual(getDeadlineColor({ deadline: '2026-05-20', status: 'todo' }, today), 'warning');
    assert.strictEqual(getDeadlineColor({ deadline: '2026-05-22', status: 'progress' }, today), 'warning');
    assert.strictEqual(getDeadlineColor({ deadline: '2026-05-23', status: 'todo' }, today), 'info');
    assert.strictEqual(getDeadlineColor({ deadline: '2026-05-19', status: 'done' }, today), 'success');
}

function testGetProgressClass() {
    assert.strictEqual(getProgressClass(0), 'danger');
    assert.strictEqual(getProgressClass(39), 'danger');
    assert.strictEqual(getProgressClass(40), 'warning');
    assert.strictEqual(getProgressClass(69), 'warning');
    assert.strictEqual(getProgressClass(70), '');
    assert.strictEqual(getProgressClass(100), '');
}

const tests = [
    testCalcPassProgress,
    testCalcExamProgress,
    testNormalizeTaskStatus,
    testGetDeadlineColor,
    testGetProgressClass
];

for (const testFn of tests) {
    testFn();
    console.log(`✅ ${testFn.name}`);
}

console.log('\nУсі юніт-тести успішно пройдено.');
