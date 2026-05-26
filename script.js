// ===== НАВИГАЦИЯ ТОП-МЕНЮ =====
function smoothScrollToElement(element, offset = 120) {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - offset;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
}

const regBlock = document.getElementById('regBlock');
const aboutBlock = document.getElementById('aboutPlatform');

document.querySelector('.top-btn1')?.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScrollToElement(regBlock, 120);
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('reg-form');
    const formTitle = document.getElementById('form-title');
    if (loginForm && regForm && formTitle) {
        loginForm.style.display = 'none';
        regForm.style.display = 'block';
        formTitle.innerText = 'Регистрация';
    }
});

document.querySelector('.top-btn2')?.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScrollToElement(regBlock, 120);
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('reg-form');
    const formTitle = document.getElementById('form-title');
    if (loginForm && regForm && formTitle) {
        loginForm.style.display = 'block';
        regForm.style.display = 'none';
        formTitle.innerText = 'Вход';
    }
});

document.querySelector('.top-btn3')?.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScrollToElement(aboutBlock, 120);
});

document.querySelector('.kon-reg')?.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScrollToElement(regBlock, 120);
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('reg-form');
    const formTitle = document.getElementById('form-title');
    if (loginForm && regForm && formTitle) {
        loginForm.style.display = 'none';
        regForm.style.display = 'block';
        formTitle.innerText = 'Регистрация';
    }
});

document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        console.log('Выбрана роль:', this.getAttribute('data-role'));
    });
});

// ===== ВАЛИДАЦИЯ =====
function validateEmail(email) {
    return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);
}

function showError(input, message) {
    let errorDiv = input.parentElement.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #8C2119; font-size: 12px; margin-top: 5px; margin-left: 12px; font-family: Comfortaa, sans-serif;';
    input.style.borderColor = '#8C2119';
}

function clearError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) errorDiv.remove();
    input.style.borderColor = '#dcc9bc';
}

// ===== МОДАЛЬНОЕ ОКНО =====
const modal = document.getElementById('modal');
const modalAgree = document.getElementById('modalAgree');
let pendingRegistration = null;

function openModal(data) {
    pendingRegistration = data;
    modal.style.display = 'flex';
    document.getElementById('agreeCheckbox').checked = false;
    modalAgree.disabled = true;
}

function closeModal() {
    modal.style.display = 'none';
    pendingRegistration = null;
}

document.getElementById('agreeCheckbox')?.addEventListener('change', function(e) {
    modalAgree.disabled = !e.target.checked;
});

document.getElementById('submit-reg')?.addEventListener('click', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    let isValid = true;
    if (!name) { showError(document.getElementById('name'), 'Введите ФИ'); isValid = false; }
    else { clearError(document.getElementById('name')); }
    
    if (!email) { showError(document.getElementById('email'), 'Введите email'); isValid = false; }
    else if (!validateEmail(email)) { showError(document.getElementById('email'), 'Некорректный email'); isValid = false; }
    else { clearError(document.getElementById('email')); }
    
    if (!password) { showError(document.getElementById('password'), 'Введите пароль'); isValid = false; }
    else if (!validatePassword(password)) { showError(document.getElementById('password'), 'Пароль: min 6 символов, буква + цифра'); isValid = false; }
    else { clearError(document.getElementById('password')); }
    
    if (isValid) openModal({ name, email, password });
});

// ===== АВАТАР ПРОФИЛЯ =====
const avatarImg = document.getElementById('avatarImg');
const changeAvatarBtn = document.getElementById('changeAvatarBtn');
const avatarModal = document.getElementById('avatarModal');
const avatarUpload = document.getElementById('avatarUpload');
const saveAvatarBtn = document.getElementById('saveAvatarBtn');
const cancelAvatarBtn = document.getElementById('cancelAvatarBtn');

function loadAvatar() {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar && avatarImg) {
        avatarImg.src = savedAvatar;
    }
}

changeAvatarBtn?.addEventListener('click', function() {
    if (avatarModal) avatarModal.style.display = 'flex';
});

function closeAvatarModal() {
    if (avatarModal) avatarModal.style.display = 'none';
    if (avatarUpload) avatarUpload.value = '';
}

cancelAvatarBtn?.addEventListener('click', closeAvatarModal);

saveAvatarBtn?.addEventListener('click', function() {
    const file = avatarUpload?.files[0];
    if (!file) {
        alert('Выберите файл');
        return;
    }
    if (!file.type.match('image.*')) {
        alert('Можно загружать только изображения');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        avatarImg.src = imageData;
        localStorage.setItem('userAvatar', imageData);
        closeAvatarModal();
    };
    reader.readAsDataURL(file);
});

window.addEventListener('click', function(e) {
    if (e.target === avatarModal) {
        closeAvatarModal();
    }
});

// ===== ПОКАЗ СТРАНИЦ РЕПЕТИТОРА И УЧЕНИКА =====
function showTutorPage(name, email) {
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', 'tutor');
    
    document.querySelectorAll('.top, .layers-conteiner, .ris, .reg, .info, .ris2, .info-repet, .repet-blocks, .ris3, .info-podl3, .uch-blocks, .konn, .footer').forEach(el => {
        if (el) el.style.display = 'none';
    });
    
    const tutorPage = document.getElementById('tutor1');
    if (tutorPage) tutorPage.style.display = 'block';
}

function showStudentPage(name, email) {
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', 'student');
    
    document.querySelectorAll('.top, .layers-conteiner, .ris, .reg, .info, .ris2, .info-repet, .repet-blocks, .ris3, .info-podl3, .uch-blocks, .konn, .footer').forEach(el => {
        if (el) el.style.display = 'none';
    });
    
    const studentPage = document.getElementById('student1');
    if (studentPage) studentPage.style.display = 'block';
}

modalAgree?.addEventListener('click', async function() {
    if (!pendingRegistration) return;
    
    const role = document.querySelector('.role-btn.active')?.getAttribute('data-role') || 'student';
    const { name, email, password } = pendingRegistration;
    
    closeModal();
    
    try {
        const userId = 'user_' + Math.random().toString(36).substr(2, 8).toUpperCase();
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role);
        
        if (role === 'tutor') {
            showTutorPage(name, email);
        } else {
            showStudentPage(name, email);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка регистрации: ' + error.message);
    }
});

// ===== ОБРАБОТЧИКИ ДЛЯ СТРАНИЦЫ РЕПЕТИТОРА =====
document.getElementById('saveSubjectsBtn')?.addEventListener('click', async function() {
    const selected = [];
    document.querySelectorAll('#tutor1 .subject-checkbox input:checked').forEach(cb => {
        selected.push(cb.value);
    });
    
    localStorage.setItem('tutorSubjects', JSON.stringify(selected));
    showDashboard();
});

document.getElementById('skipSubjectsBtn')?.addEventListener('click', function() {
    localStorage.setItem('tutorSubjects', JSON.stringify([]));
    showDashboard();
});

// ===== ОБРАБОТЧИК ДЛЯ СТРАНИЦЫ УЧЕНИКА (с выбором предмета) =====
document.getElementById('saveCodeBtn')?.addEventListener('click', function() {
    const tutorCode = document.getElementById('tutor-code')?.value.trim();
    if (tutorCode) {
        // При привязке ученика нужно определить предмет
        // Предлагаем выбрать предмет из списка
        showSubjectSelectionForCode(tutorCode);
    } else {
        showDashboard();
    }
});

function showSubjectSelectionForCode(tutorCode) {
    // Парсим код: формат "TUTOR_ID_SUBJECT" или просто "TUTOR_ID"
    let tutorId = tutorCode;
    let presetSubject = null;
    
    if (tutorCode.includes('_')) {
        const parts = tutorCode.split('_');
        tutorId = parts[0];
        presetSubject = parts[1];
    }
    
    // Получаем предметы репетитора (имитация)
    const tutors = JSON.parse(localStorage.getItem('tutorsData') || '{}');
    const tutorSubjects = tutors[tutorId]?.subjects || ['Math', 'Russian', 'English'];
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    const modalHtml = `
        <div id="subjectSelectModal" class="modal" style="display: flex;">
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h2>Выберите предмет</h2>
                    <span class="modal-close" onclick="closeSubjectModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Выберите предмет, который будете изучать с этим репетитором:</p>
                    <select id="selectedSubject" class="task-select" style="width: 100%; padding: 12px;">
                        ${tutorSubjects.map(s => `<option value="${s}" ${presetSubject === s ? 'selected' : ''}>${subjectNames[s] || s}</option>`).join('')}
                    </select>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn modal-btn-cancel" onclick="closeSubjectModal()">Отмена</button>
                    <button class="modal-btn modal-btn-agree" onclick="confirmAddTutorWithSubject('${tutorId}', '${tutorCode}')">Подтвердить</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeSubjectModal() {
    const modal = document.getElementById('subjectSelectModal');
    if (modal) modal.remove();
}

function confirmAddTutorWithSubject(tutorId, originalCode) {
    const subject = document.getElementById('selectedSubject')?.value;
    if (!subject) {
        alert('Выберите предмет');
        return;
    }
    closeSubjectModal();
    addTutorWithSubject(tutorId, subject, originalCode);
}

function addTutorWithSubject(tutorId, subject, originalCode) {
    const tutors = JSON.parse(localStorage.getItem('myTutors') || '[]');
    if (tutors.some(t => t.tutorId === tutorId && t.subject === subject)) {
        alert('Этот репетитор по данному предмету уже привязан');
        showDashboard();
        return;
    }
    tutors.push({ 
        tutorId: tutorId, 
        subject: subject,
        code: originalCode, 
        date: new Date().toLocaleDateString('ru-RU') 
    });
    localStorage.setItem('myTutors', JSON.stringify(tutors));
    showDashboard();
}

// ===== ЛИЧНЫЙ КАБИНЕТ =====
function showDashboard() {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    
    document.querySelectorAll('.top, .layers-conteiner, .ris, .reg, .info, .ris2, .info-repet, .repet-blocks, .ris3, .info-podl3, .uch-blocks, .konn, .footer, #tutor1, #student1').forEach(el => {
        if (el) el.style.display = 'none';
    });
    
    loadAvatar();
    
    document.getElementById('dashboardUserName').textContent = name;
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileEmail').textContent = email;
    
    let roleText = (role === 'tutor') ? 'Репетитор' : 'Ученик';
    document.getElementById('profileRole').textContent = roleText;
    document.getElementById('dashboardUserRole').textContent = roleText;
    
    const roleBadge = document.getElementById('sidebarRoleBadge');
    if (roleBadge) {
        if (role === 'tutor') roleBadge.textContent = 'для репетитора';
        else if (role === 'student') roleBadge.textContent = 'для ученика';
    }
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.classList.contains('student-only') && role !== 'student') {
            btn.style.display = 'none';
        } else if (btn.classList.contains('tutor-only') && role !== 'tutor') {
            btn.style.display = 'none';
        } else {
            btn.style.display = 'flex';
        }
    });
    
    // Блок кодов репетитора по предметам
    const tutorCodeBlock = document.getElementById('tutorCodeBlock');
    if (role === 'tutor') {
        if (tutorCodeBlock) {
            tutorCodeBlock.style.display = 'block';
            generateTutorCodes();
        }
    } else {
        if (tutorCodeBlock) tutorCodeBlock.style.display = 'none';
    }
    
    const tutorSubjectsBlock = document.getElementById('tutorSubjectsBlock');
    if (role === 'tutor' && tutorSubjectsBlock) {
        tutorSubjectsBlock.style.display = 'block';
        loadSubjectsList();
    } else if (tutorSubjectsBlock) {
        tutorSubjectsBlock.style.display = 'none';
    }
    
    const studentCodeBlock = document.getElementById('studentCodeBlock');
    if (role === 'student' && studentCodeBlock) {
        studentCodeBlock.style.display = 'block';
    } else if (studentCodeBlock) {
        studentCodeBlock.style.display = 'none';
    }
    
    document.getElementById('dashboard').style.display = 'block';
    
    initCalendar();
    loadGroupsList();
    loadTutors();
    if (role === 'student') loadHomeworkForStudent();
    if (role === 'tutor') initStudentsTab();
}


function generateTutorCodes() {
    const userId = localStorage.getItem('userId');
    const subjects = JSON.parse(localStorage.getItem('tutorSubjects') || '[]');
    const container = document.getElementById('tutorCodeBlock');
    
    if (!container) return;
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    let html = `
        <div class="code-header">
            <h3>Коды для привязки учеников</h3>
        </div>
    `;
    
    if (subjects.length === 0) {
        html += `<p class="code-info">Сначала выберите предметы в разделе "Мои предметы"</p>`;
    } else {
        subjects.forEach(subject => {
            const code = `${userId}_${subject}`;
            html += `
                <div class="tutor-code-item" style="margin-bottom: 20px;">
                    <div class="code-header">
                        <span style="font-weight: bold;">${subjectNames[subject] || subject}</span>
                        <button class="copy-code-btn" onclick="copyTutorCode('${code}')">Копировать код</button>
                    </div>
                    <div class="tutor-code-display">${code}</div>
                </div>
            `;
        });
    }
    
    container.innerHTML = html;
}

function copyTutorCode(code) {
    navigator.clipboard.writeText(code);
    alert(`Код ${code} скопирован! Отправьте его ученикам для этого предмета.`);
}

function loadSubjectsList() {
    const subjects = JSON.parse(localStorage.getItem('tutorSubjects') || '[]');
    const container = document.getElementById('subjectsList');
    if (container) {
        const subjectNames = {
            'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
            'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
            'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
            'Literature': 'Литература', 'Geography': 'География'
        };
        if (subjects.length === 0) {
            container.innerHTML = '<p class="empty-tutors">Предметы не выбраны</p>';
        } else {
            container.innerHTML = subjects.map(s => `<span class="subject-tag">${subjectNames[s] || s}</span>`).join('');
        }
    }
    
    const editGrid = document.getElementById('editSubjectsGrid');
    if (editGrid) {
        const allSubjects = ['Math', 'Russian', 'English', 'Physics', 'Chemistry', 'History', 'Biology', 'Informatics', 'Social', 'Literature', 'Geography'];
        const subjectNames = {
            'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
            'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
            'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
            'Literature': 'Литература', 'Geography': 'География'
        };
        editGrid.innerHTML = allSubjects.map(subj => `
            <label class="subject-checkbox">
                <input type="checkbox" value="${subj}" ${subjects.includes(subj) ? 'checked' : ''}> 
                ${subjectNames[subj]}
            </label>
        `).join('');
    }
}

function getSubjectName(code) {
    const names = {
        'Math': 'Математика',
        'Russian': 'Русский язык',
        'English': 'Английский язык',
        'Physics': 'Физика',
        'Chemistry': 'Химия',
        'History': 'История',
        'Biology': 'Биология',
        'Informatics': 'Информатика',
        'Social': 'Обществознание',
        'Literature': 'Литература',
        'Geography': 'География'
    };
    return names[code] || code;
}

document.getElementById('editSubjectsBtn')?.addEventListener('click', function() {
    const panel = document.getElementById('editSubjectsPanel');
    if (panel) panel.style.display = 'block';
});

document.getElementById('saveEditedSubjectsBtn')?.addEventListener('click', function() {
    const selected = [];
    document.querySelectorAll('#editSubjectsGrid input:checked').forEach(cb => {
        selected.push(cb.value);
    });
    localStorage.setItem('tutorSubjects', JSON.stringify(selected));
    document.getElementById('editSubjectsPanel').style.display = 'none';
    loadSubjectsList();
    generateTutorCodes();
    alert('Предметы сохранены');
});

document.getElementById('cancelEditSubjectsBtn')?.addEventListener('click', function() {
    document.getElementById('editSubjectsPanel').style.display = 'none';
});

document.getElementById('dashboardLogoutBtn')?.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        const targetTab = document.getElementById(`tab-${tabId}`);
        if (targetTab) targetTab.classList.add('active');
        
        if (tabId === 'tasks') {
            loadGroupsList();
            loadExistingGroupsSelect();
        }
        if (tabId === 'schedule') {
            initCalendar();
        }
        if (tabId === 'homework') {
            loadHomeworkForStudent();
        }
        if (tabId === 'stats') {
            loadStats();
        }
        if (tabId === 'students') {
            initStudentsTab();
        }
    });
});

document.getElementById('submit-login')?.addEventListener('click', async function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Введите email и пароль');
        return;
    }
    
    try {
        const userData = { full_name: 'Тестовый пользователь', email: email, role: 'student' };
        localStorage.setItem('userName', userData.full_name);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userRole', userData.role);
        showDashboard();
    } catch (error) {
        console.error('Ошибка входа:', error);
        alert('Ошибка входа: ' + error.message);
    }
});

// ===== МОИ РЕПЕТИТОРЫ (с предметами) =====
function loadTutors() {
    const tutors = JSON.parse(localStorage.getItem('myTutors') || '[]');
    const container = document.getElementById('tutorsList');
    if (!container) return;
    
    if (tutors.length === 0) {
        container.innerHTML = '<p class="empty-tutors">У вас пока нет привязанных репетиторов</p>';
        return;
    }
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    container.innerHTML = tutors.map((tutor, index) => `
        <div class="tutor-card" data-index="${index}">
            <div class="tutor-info">
                <h4>Репетитор ${tutor.tutorId}</h4>
                <p>Предмет: ${subjectNames[tutor.subject] || tutor.subject || '—'}</p>
                <p>Код: ${tutor.code || tutor.tutorId}</p>
                <p>Привязан: ${tutor.date || '—'}</p>
            </div>
            <button class="remove-tutor-btn" onclick="removeTutor(${index})">Отвязать</button>
        </div>
    `).join('');
}

function addTutor(tutorCode) {
    // Разбираем код
    let tutorId = tutorCode;
    let subject = null;
    
    if (tutorCode.includes('_')) {
        const parts = tutorCode.split('_');
        tutorId = parts[0];
        subject = parts[1];
    }
    
    if (!subject) {
        alert('Неверный формат кода. Код должен быть в формате: ID_ПРЕДМЕТ');
        return false;
    }
    
    const tutors = JSON.parse(localStorage.getItem('myTutors') || '[]');
    if (tutors.some(t => t.tutorId === tutorId && t.subject === subject)) {
        alert('Этот репетитор по данному предмету уже привязан');
        return false;
    }
    
    tutors.push({ 
        tutorId: tutorId, 
        subject: subject,
        code: tutorCode, 
        date: new Date().toLocaleDateString('ru-RU') 
    });
    localStorage.setItem('myTutors', JSON.stringify(tutors));
    loadTutors();
    return true;
}

function removeTutor(index) {
    const tutors = JSON.parse(localStorage.getItem('myTutors') || '[]');
    tutors.splice(index, 1);
    localStorage.setItem('myTutors', JSON.stringify(tutors));
    loadTutors();
}

document.getElementById('saveCodeInCabinetBtn')?.addEventListener('click', async function() {
    const tutorCode = document.getElementById('tutor-code-cabinet').value.trim();
    if (tutorCode === '') {
        alert('Введите код репетитора');
        return;
    }
    addTutor(tutorCode);
    document.getElementById('tutor-code-cabinet').value = '';
    alert('Репетитор успешно привязан!');
});

document.getElementById('saveCodeInProfileBtn')?.addEventListener('click', function() {
    const tutorCode = document.getElementById('tutor-code-profile').value.trim();
    if (tutorCode === '') {
        alert('Введите код репетитора');
        return;
    }
    addTutor(tutorCode);
    document.getElementById('tutor-code-profile').value = '';
    alert('Репетитор успешно привязан!');
});

document.getElementById('skipCodeInProfileBtn')?.addEventListener('click', function() {
    const block = document.getElementById('studentCodeBlock');
    if (block) block.style.display = 'none';
});

document.querySelectorAll('.nav-btn[data-tab="tutors"]').forEach(btn => {
    btn.addEventListener('click', function() { setTimeout(loadTutors, 100); });
});

// ===== КАЛЕНДАРЬ (с учётом прав) =====
let currentView = 'week';
let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
const userRole = localStorage.getItem('userRole');

function initCalendar() {
    renderMiniCalendar();
    renderMainCalendar();
}

function renderEventCard(event, variant = 'full') {
    const statusColors = {
        'completed': '#4CAF50',
        'pending': '#FF9800',
        'cancelled': '#f44336',
        'scheduled': '#2196F3'
    };
    const userRole = localStorage.getItem('userRole');
    const canEdit = userRole === 'tutor';
    
    if (variant === 'compact') {
        return `<div class="compact-event" style="border-left-color: ${statusColors[event.status] || '#D68A68'}">
                    <span class="event-time">${event.timeStart}</span>
                    <span class="event-title">${event.title}</span>
                </div>`;
    }
    
    let buttons = '';
    if (canEdit) {
        buttons = `
            <div class="event-buttons">
                <button class="event-edit-btn" onclick="editEvent('${event.id}')">✎ Редактировать</button>
            </div>
        `;
    }
    
    return `
        <div class="event-card" data-id="${event.id}">
            <div class="event-header">
                <h4>${event.title}</h4>
                <span class="event-status" style="background: ${statusColors[event.status] || '#D68A68'}">${getStatusText(event.status)}</span>
            </div>
            <div class="event-time">🕐 ${event.timeStart} - ${event.timeEnd}</div>
            <div class="event-subject">📚 ${getSubjectName(event.subject)}</div>
            <div class="event-student">👤 ${event.studentName || event.groupName || '—'}</div>
            ${buttons}
        </div>
    `;
}

function renderMiniCalendar() {
    const container = document.getElementById('miniCalendar');
    if (!container) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    
    let html = `
        <div class="mini-calendar-header">
            <button class="mini-cal-prev" onclick="changeMonth(-1)">‹</button>
            <span>${monthNames[month]} ${year}</span>
            <button class="mini-cal-next" onclick="changeMonth(1)">›</button>
        </div>
        <div class="mini-calendar-weekdays">
            <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
        </div>
        <div class="mini-calendar-days">
    `;
    
    let adjustedStart = startDay === 0 ? 6 : startDay - 1;
    for (let i = 0; i < adjustedStart; i++) {
        html += '<span class="mini-cal-empty"></span>';
    }
    
    const today = new Date();
    for (let d = 1; d <= daysInMonth; d++) {
        const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
        const hasEvents = events.some(e => {
            const eDate = new Date(e.date);
            return eDate.getDate() === d && eDate.getMonth() === month && eDate.getFullYear() === year;
        });
        html += `<span class="mini-cal-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" onclick="selectDate(${year}, ${month}, ${d})">${d}</span>`;
    }
    html += '</div>';
    container.innerHTML = html;
}

function changeMonth(delta) {
    currentDate.setMonth(currentDate.getMonth() + delta);
    renderMiniCalendar();
    renderMainCalendar();
}

function selectDate(year, month, day) {
    currentDate = new Date(year, month, day);
    if (currentView !== 'day') {
        currentView = 'day';
        updateViewButtons();
    }
    renderMainCalendar();
}

function updateViewButtons() {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-view') === currentView) {
            btn.classList.add('active');
        }
    });
}

function setView(view) {
    currentView = view;
    updateViewButtons();
    renderMainCalendar();
}

function goToday() {
    currentDate = new Date();
    renderMiniCalendar();
    renderMainCalendar();
}

function renderMainCalendar() {
    const container = document.getElementById('mainCalendar');
    if (!container) return;
    
    if (currentView === 'day') {
        renderDayView(container);
    } else if (currentView === 'week') {
        renderWeekView(container);
    } else {
        renderMonthView(container);
    }
}

function renderDayView(container) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayEvents = events.filter(e => e.date === dateStr);
    const userRole = localStorage.getItem('userRole');
    const canEdit = userRole === 'tutor';
    
    const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    
    let html = `
        <div class="calendar-header">
            <h3>${weekdays[currentDate.getDay()]}, ${currentDate.toLocaleDateString('ru-RU')}</h3>
        </div>
        <div class="calendar-day-events">
    `;
    
    if (dayEvents.length === 0) {
        html += '<p class="empty-events">Нет занятий на этот день</p>';
    } else {
        dayEvents.forEach(event => {
            html += renderEventCard(event, 'full');
        });
    }
    
    html += `</div>`;
    if (canEdit) {
        html += `<button class="add-event-btn" onclick="openAddEventModal()">+ Добавить занятие</button>`;
    }
    container.innerHTML = html;
}
function renderWeekView(container) {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
    const userRole = localStorage.getItem('userRole');
    const canEdit = userRole === 'tutor';
    
    let html = `
        <div class="calendar-header">
            <h3>Неделя ${startOfWeek.toLocaleDateString('ru-RU')} - ${new Date(startOfWeek.getTime() + 6*24*60*60*1000).toLocaleDateString('ru-RU')}</h3>
        </div>
        <div class="calendar-week-grid">
    `;
    
    const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        const dateStr = day.toISOString().split('T')[0];
        const dayEvents = events.filter(e => e.date === dateStr);
        
        html += `
            <div class="calendar-week-day" onclick="selectDate(${day.getFullYear()}, ${day.getMonth()}, ${day.getDate()})">
                <div class="week-day-header">
                    <span class="week-day-name">${weekdays[i]}</span>
                    <span class="week-day-date">${day.getDate()}</span>
                </div>
                <div class="week-day-events">
        `;
        
        dayEvents.slice(0, 2).forEach(event => {
            html += renderEventCard(event, 'compact');
        });
        if (dayEvents.length > 2) {
            html += `<div class="more-events">+${dayEvents.length - 2} ещё</div>`;
        }
        
        html += `</div></div>`;
    }
    
    html += `</div>`;
    if (canEdit) {
        html += `<button class="add-event-btn" onclick="openAddEventModal()">+ Добавить занятие</button>`;
    }
    container.innerHTML = html;
}

function renderMonthView(container) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const userRole = localStorage.getItem('userRole');
    const canEdit = userRole === 'tutor';
    
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    
    let html = `
        <div class="calendar-header">
            <h3>${monthNames[month]} ${year}</h3>
        </div>
        <div class="calendar-month-grid">
            <div class="month-weekdays">
                <span>ПН</span><span>ВТ</span><span>СР</span><span>ЧТ</span><span>ПТ</span><span>СБ</span><span>ВС</span>
            </div>
            <div class="month-days">
    `;
    
    let adjustedStart = startDay === 0 ? 6 : startDay - 1;
    for (let i = 0; i < adjustedStart; i++) {
        html += '<div class="month-day empty"></div>';
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const dateStr = date.toISOString().split('T')[0];
        const dayEvents = events.filter(e => e.date === dateStr);
        
        html += `
            <div class="month-day" onclick="selectDate(${year}, ${month}, ${d})">
                <span class="month-day-number">${d}</span>
                <div class="month-day-events">
        `;
        
        dayEvents.slice(0, 2).forEach(event => {
            html += `<div class="month-event" style="background: ${getStatusColor(event.status)}">
                        <span>${event.timeStart} ${event.title}</span>
                    </div>`;
        });
        if (dayEvents.length > 2) {
            html += `<div class="more-events">+${dayEvents.length - 2}</div>`;
        }
        
        html += `</div></div>`;
    }
    
    html += `</div></div>`;
    if (canEdit) {
        html += `<button class="add-event-btn" onclick="openAddEventModal()">+ Добавить занятие</button>`;
    }
    container.innerHTML = html;
}

function getStatusColor(status) {
    const colors = {
        'completed': '#4CAF50',
        'pending': '#FF9800',
        'cancelled': '#f44336',
        'scheduled': '#2196F3'
    };
    return colors[status] || '#D68A68';
}

function getStatusText(status) {
    const texts = {
        'completed': 'Проведено',
        'pending': 'Ожидает',
        'cancelled': 'Отменено',
        'scheduled': 'Запланировано'
    };
    return texts[status] || 'Запланировано';
}

function openAddEventModal() {
    const modal = document.getElementById('eventModal');
    if (!modal) return;
    
    document.getElementById('eventDate').value = currentDate.toISOString().split('T')[0];
    document.getElementById('eventTimeStart').value = '10:00';
    document.getElementById('eventTimeEnd').value = '11:00';
    document.getElementById('eventStatus').value = 'scheduled';
    document.getElementById('eventId').value = '';
    
    // Загружаем учеников для выбора
    loadStudentsForEventSelect();
    
    modal.style.display = 'flex';
}

function loadStudentsForEventSelect() {
    const studentsSelect = document.getElementById('eventStudentId');
    if (!studentsSelect) return;
    
    const individualStudents = JSON.parse(localStorage.getItem('individualStudents') || '[]');
    const groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    let html = '<option value="">— Без ученика/группы —</option>';
    html += '<optgroup label="Индивидуальные ученики">';
    individualStudents.forEach(s => {
        if (s.subjects && s.subjects.length) {
            s.subjects.forEach(subj => {
                html += `<option value="student_${s.id}_${subj}">${s.name} — ${subjectNames[subj] || subj}</option>`;
            });
        } else {
            html += `<option value="student_${s.id}">${s.name}</option>`;
        }
    });
    html += '</optgroup><optgroup label="Группы">';
    groups.forEach(g => {
        html += `<option value="group_${g.id}">${g.name} — ${subjectNames[g.subject] || g.subject}</option>`;
    });
    html += '</optgroup>';
    
    studentsSelect.innerHTML = html;
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    if (modal) modal.style.display = 'none';
}

function saveEvent() {
    const eventId = document.getElementById('eventId').value;
    const studentValue = document.getElementById('eventStudentId').value;
    
    let studentName = '';
    let groupId = null;
    let studentId = null;
    let subject = document.getElementById('eventSubject').value;
    
    if (studentValue) {
        if (studentValue.startsWith('group_')) {
            groupId = studentValue.replace('group_', '');
            const groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
            const group = groups.find(g => g.id === groupId);
            studentName = group ? group.name : 'Группа';
            if (!subject && group) subject = group.subject;
        } else if (studentValue.startsWith('student_')) {
            const parts = studentValue.split('_');
            studentId = parts[1];
            const individualStudents = JSON.parse(localStorage.getItem('individualStudents') || '[]');
            const student = individualStudents.find(s => s.id === studentId);
            studentName = student ? student.name : 'Ученик';
            if (parts[2]) subject = parts[2];
        }
    }
    
    const event = {
        id: eventId || Date.now().toString(),
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        timeStart: document.getElementById('eventTimeStart').value,
        timeEnd: document.getElementById('eventTimeEnd').value,
        subject: subject,
        status: document.getElementById('eventStatus').value,
        studentId: studentId,
        groupId: groupId,
        studentName: studentName,
        createdAt: new Date().toISOString()
    };
    
    if (!event.title || !event.date) {
        alert('Заполните название и дату');
        return;
    }
    
    if (eventId) {
        const index = events.findIndex(e => e.id === eventId);
        if (index !== -1) events[index] = event;
    } else {
        events.push(event);
    }
    
    localStorage.setItem('calendarEvents', JSON.stringify(events));
    closeEventModal();
    renderMiniCalendar();
    renderMainCalendar();
}

function editEvent(id) {
    const event = events.find(e => e.id === id);
    if (!event) return;
    
    document.getElementById('eventId').value = event.id;
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventTimeStart').value = event.timeStart;
    document.getElementById('eventTimeEnd').value = event.timeEnd;
    document.getElementById('eventSubject').value = event.subject;
    document.getElementById('eventStatus').value = event.status;
    
    let studentValue = '';
    if (event.groupId) {
        studentValue = `group_${event.groupId}`;
    } else if (event.studentId) {
        studentValue = `student_${event.studentId}`;
        if (event.subject) studentValue += `_${event.subject}`;
    }
    document.getElementById('eventStudentId').value = studentValue;
    
    const modal = document.getElementById('eventModal');
    if (modal) modal.style.display = 'flex';
}

// ===== СТАТИСТИКА =====
function loadStats() {
    const role = localStorage.getItem('userRole');
    const container = document.getElementById('statsContent');
    
    if (!container) return;
    
    if (role === 'student') {
        loadStudentStats(container);
    } else if (role === 'tutor') {
        loadTutorStats(container);
    }
}

function loadStudentStats(container) {
    const tutors = JSON.parse(localStorage.getItem('myTutors') || '[]');
    const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
    const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    
    // Группируем по предметам
    const statsBySubject = {};
    
    tutors.forEach(tutor => {
        const subject = tutor.subject;
        if (!statsBySubject[subject]) {
            statsBySubject[subject] = {
                totalEvents: 0,
                attendedEvents: 0,
                totalTasks: 0,
                solvedTasks: 0,
                totalHomeworks: 0,
                submittedHomeworks: 0,
                maxScoreTasks: 0,
                maxScoreAchieved: 0
            };
        }
    });
    
    // Статистика по занятиям
    events.forEach(event => {
        const subject = event.subject;
        if (statsBySubject[subject]) {
            statsBySubject[subject].totalEvents++;
            if (event.status === 'completed') {
                statsBySubject[subject].attendedEvents++;
            }
        }
    });
    
    // Статистика по заданиям
    groups.forEach(group => {
        const subject = group.subject;
        if (statsBySubject[subject]) {
            const isCompleted = localStorage.getItem(`homework_${group.id}_completed`) === 'true';
            const answers = JSON.parse(localStorage.getItem(`homework_answers_${group.id}`) || '{}');
            
            statsBySubject[subject].totalTasks += group.tasks.length;
            statsBySubject[subject].totalHomeworks++;
            
            if (isCompleted) {
                statsBySubject[subject].submittedHomeworks++;
                // Подсчёт решённых задач
                Object.keys(answers).forEach(taskNum => {
                    if (answers[taskNum]) {
                        statsBySubject[subject].solvedTasks++;
                        // Проверка на максимальный балл (имитация)
                        const task = group.tasks[parseInt(taskNum) - 1];
                        if (task && answers[taskNum] === 'max') {
                            statsBySubject[subject].maxScoreAchieved++;
                        }
                    }
                });
            }
            
            statsBySubject[subject].maxScoreTasks += group.tasks.length;
        }
    });
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    if (Object.keys(statsBySubject).length === 0) {
        container.innerHTML = '<p class="empty-placeholder">Нет данных для статистики</p>';
        return;
    }
    
    let html = '<div class="stats-container">';
    for (const [subject, stats] of Object.entries(statsBySubject)) {
        const attendancePercent = stats.totalEvents > 0 ? Math.round((stats.attendedEvents / stats.totalEvents) * 100) : 0;
        const tasksPercent = stats.totalTasks > 0 ? Math.round((stats.solvedTasks / stats.totalTasks) * 100) : 0;
        const homeworkPercent = stats.totalHomeworks > 0 ? Math.round((stats.submittedHomeworks / stats.totalHomeworks) * 100) : 0;
        const maxScorePercent = stats.maxScoreTasks > 0 ? Math.round((stats.maxScoreAchieved / stats.maxScoreTasks) * 100) : 0;
        
        html += `
            <div class="stats-subject-card">
                <h3>${subjectNames[subject] || subject}</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value">${attendancePercent}%</span>
                        <span class="stat-label">Посещаемость</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${tasksPercent}%</span>
                        <span class="stat-label">Решено задач</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${homeworkPercent}%</span>
                        <span class="stat-label">Сдано ДЗ</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${maxScorePercent}%</span>
                        <span class="stat-label">Макс. балл</span>
                    </div>
                </div>
            </div>
        `;
    }
    html += '</div>';
    
    container.innerHTML = html;
}

function loadTutorStats(container) {
    const individualStudents = JSON.parse(localStorage.getItem('individualStudents') || '[]');
    const groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
    const studyGroups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    // Собираем всех учеников с их предметами
    const allStudents = [];
    
    individualStudents.forEach(s => {
        if (s.subjects && s.subjects.length) {
            s.subjects.forEach(subj => {
                allStudents.push({
                    id: s.id,
                    name: s.name,
                    subject: subj,
                    type: 'individual'
                });
            });
        } else {
            allStudents.push({
                id: s.id,
                name: s.name,
                subject: null,
                type: 'individual'
            });
        }
    });
    
    groups.forEach(g => {
        if (g.students) {
            g.students.forEach(studentId => {
                const student = individualStudents.find(s => s.id === studentId);
                if (student) {
                    allStudents.push({
                        id: student.id,
                        name: student.name,
                        subject: g.subject,
                        type: 'group',
                        groupName: g.name
                    });
                }
            });
        }
    });
    
    // Группируем статистику по ученику и предмету
    const statsMap = {};
    
    allStudents.forEach(student => {
        const key = `${student.id}_${student.subject || 'all'}`;
        if (!statsMap[key]) {
            statsMap[key] = {
                name: student.name,
                subject: student.subject,
                type: student.type,
                groupName: student.groupName,
                totalEvents: 0,
                attendedEvents: 0,
                totalTasks: 0,
                solvedTasks: 0,
                totalHomeworks: 0,
                submittedHomeworks: 0
            };
        }
    });
    
    // Статистика по занятиям
    events.forEach(event => {
        let studentId = null;
        let studentSubject = event.subject;
        
        if (event.studentId) {
            studentId = event.studentId;
        } else if (event.groupId) {
            const group = groups.find(g => g.id === event.groupId);
            if (group && group.students) {
                group.students.forEach(sId => {
                    const key = `${sId}_${event.subject}`;
                    if (statsMap[key]) {
                        statsMap[key].totalEvents++;
                        if (event.status === 'completed') {
                            statsMap[key].attendedEvents++;
                        }
                    }
                });
                return;
            }
        }
        
        if (studentId) {
            const keys = Object.keys(statsMap).filter(k => k.startsWith(studentId));
            keys.forEach(key => {
                if (!studentSubject || key.includes(studentSubject)) {
                    statsMap[key].totalEvents++;
                    if (event.status === 'completed') {
                        statsMap[key].attendedEvents++;
                    }
                }
            });
        }
    });
    
    // Статистика по домашним заданиям
    studyGroups.forEach(group => {
        const subject = group.subject;
        const submissions = JSON.parse(localStorage.getItem(`homework_submissions_${group.id}`) || '{}');
        
        Object.entries(submissions).forEach(([studentId, submission]) => {
            const key = `${studentId}_${subject}`;
            if (statsMap[key]) {
                statsMap[key].totalHomeworks++;
                if (submission.completed) {
                    statsMap[key].submittedHomeworks++;
                    statsMap[key].totalTasks += group.tasks.length;
                    if (submission.answers) {
                        Object.keys(submission.answers).forEach(taskNum => {
                            if (submission.answers[taskNum]) {
                                statsMap[key].solvedTasks++;
                            }
                        });
                    }
                }
            }
        });
    });
    
    if (Object.keys(statsMap).length === 0) {
        container.innerHTML = '<p class="empty-placeholder">Нет данных для статистики</p>';
        return;
    }
    
    let html = '<div class="stats-students-container">';
    for (const [key, stats] of Object.entries(statsMap)) {
        const attendancePercent = stats.totalEvents > 0 ? Math.round((stats.attendedEvents / stats.totalEvents) * 100) : 0;
        const tasksPercent = stats.totalTasks > 0 ? Math.round((stats.solvedTasks / stats.totalTasks) * 100) : 0;
        const homeworkPercent = stats.totalHomeworks > 0 ? Math.round((stats.submittedHomeworks / stats.totalHomeworks) * 100) : 0;
        
        html += `
            <div class="stats-student-card">
                <h3>${stats.name}</h3>
                <p class="stats-subject">${stats.subject ? subjectNames[stats.subject] || stats.subject : 'Все предметы'}</p>
                ${stats.groupName ? `<p class="stats-group">Группа: ${stats.groupName}</p>` : ''}
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value">${attendancePercent}%</span>
                        <span class="stat-label">Посещаемость</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${tasksPercent}%</span>
                        <span class="stat-label">Решено задач</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${homeworkPercent}%</span>
                        <span class="stat-label">Сдано ДЗ</span>
                    </div>
                </div>
            </div>
        `;
    }
    html += '</div>';
    
    container.innerHTML = html;
}

// Добавляем стили для статистики в CSS
const statsStyles = `
    .stats-container, .stats-students-container { display: flex; flex-direction: column; gap: 25px; }
    .stats-subject-card, .stats-student-card { background: white; border-radius: 30px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .stats-subject-card h3, .stats-student-card h3 { color: #8C2119; margin-bottom: 10px; }
    .stats-subject { color: #D68A68; font-weight: bold; margin-bottom: 5px; }
    .stats-group { color: #5e3a34; font-size: 14px; margin-bottom: 15px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px; margin-top: 15px; }
    .stat-item { text-align: center; }
    .stat-value { display: block; font-size: 32px; font-weight: bold; color: #8C2119; }
    .stat-label { display: block; font-size: 12px; color: #5e3a34; margin-top: 5px; }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = statsStyles;
document.head.appendChild(styleSheet);

document.querySelectorAll('.nav-btn[data-tab="stats"]').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(loadStats, 100));
});

// ===== ГРУППЫ ЗАДАНИЙ =====
let taskCounter = 1;

function addTaskItem() {
    const container = document.getElementById('group-tasks-container');
    const idx = taskCounter;
    const newItem = document.createElement('div');
    newItem.className = 'task-item';
    newItem.setAttribute('data-task-idx', idx);
    newItem.innerHTML = `
        <div class="task-header">
            <span class="task-num">Задание ${idx+1}</span>
            <button type="button" class="remove-task-btn">✖</button>
        </div>
        <div class="input-group">
            <label>Тип ответа</label>
            <select class="task-type-select">
                <option value="text">Текст (строка)</option>
                <option value="photo">Фото</option>
            </select>
        </div>
        <div class="input-group">
            <label>Текст задания</label>
            <textarea class="task-description" rows="2" placeholder="Опишите задание..."></textarea>
        </div>
        <div class="input-group">
            <label>Прикрепить фото к заданию (опционально)</label>
            <input type="file" class="task-attachment" accept="image/*">
        </div>
        <div class="input-group">
            <label>Максимальный балл</label>
            <input type="number" class="task-max-score" placeholder="10" value="10" min="1">
        </div>
        <div class="score-options-container" style="display: block;">
            <label>Варианты ответов для оценки (каждый балл → вариант ответа)</label>
            <div class="score-options-list">
                <div class="score-option-row" data-score="1">
                    <span class="score-value">1 балл:</span>
                    <div class="score-answers">
                        <input type="text" placeholder="Вариант ответа на 1 балл">
                        <button type="button" class="add-answer-for-score">+ ещё вариант</button>
                    </div>
                </div>
            </div>
            <button type="button" class="add-score-level">+ Добавить уровень (балл)</button>
        </div>
    `;
    
    newItem.querySelector('.remove-task-btn').onclick = () => removeTaskItem(idx);
    const typeSelect = newItem.querySelector('.task-type-select');
    typeSelect.onchange = function() {
        const optsDiv = newItem.querySelector('.score-options-container');
        optsDiv.style.display = this.value === 'text' ? 'block' : 'none';
    };
    newItem.querySelector('.add-score-level').onclick = () => addScoreLevel(newItem);
    newItem.querySelectorAll('.add-answer-for-score').forEach(btn => {
        btn.onclick = () => addAnswerForScore(btn);
    });
    
    container.appendChild(newItem);
    taskCounter++;
    renumberTasks();
}

function removeTaskItem(idx) {
    const container = document.getElementById('group-tasks-container');
    const target = container.querySelector(`.task-item[data-task-idx='${idx}']`);
    if (target && container.children.length > 1) {
        target.remove();
        renumberTasks();
    } else {
        alert('Должно быть хотя бы одно задание');
    }
}

function renumberTasks() {
    const container = document.getElementById('group-tasks-container');
    Array.from(container.children).forEach((el, i) => {
        el.querySelector('.task-num').innerText = `Задание ${i+1}`;
        el.setAttribute('data-task-idx', i);
    });
    taskCounter = container.children.length;
}

function addScoreLevel(taskItem) {
    const list = taskItem.querySelector('.score-options-list');
    const current = list.children.length;
    const newLevel = current + 1;
    const row = document.createElement('div');
    row.className = 'score-option-row';
    row.setAttribute('data-score', newLevel);
    row.innerHTML = `
        <span class="score-value">${newLevel} балл${newLevel>1?'а':''}:</span>
        <div class="score-answers">
            <input type="text" placeholder="Вариант ответа на ${newLevel} балл${newLevel>1?'а':''}">
            <button type="button" class="add-answer-for-score">+ ещё вариант</button>
        </div>
    `;
    row.querySelector('.add-answer-for-score').onclick = () => addAnswerForScore(row.querySelector('.add-answer-for-score'));
    list.appendChild(row);
}

function addAnswerForScore(btn) {
    const answersDiv = btn.parentElement;
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Альтернативный вариант ответа';
    answersDiv.insertBefore(newInput, btn);
}

function loadSubjectsForGroup() {
    const select = document.getElementById('group-subject');
    const subs = JSON.parse(localStorage.getItem('tutorSubjects') || '[]');
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    select.innerHTML = '<option value="">Выберите предмет</option>';
    subs.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = subjectNames[s] || s;
        select.appendChild(opt);
    });
    select.disabled = subs.length === 0;
}

function loadExistingGroupsSelect() {
    const select = document.getElementById('load-existing-group');
    const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    select.innerHTML = '<option value="">-- Создать новую группу --</option>';
    groups.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = `${g.title} (${g.deadline || 'без дедлайна'})`;
        select.appendChild(opt);
    });
}

function loadGroupToForm(groupId) {
    const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    const group = groups.find(g => g.id == groupId);
    if (!group) return;
    
    document.getElementById('group-title').value = group.title;
    document.getElementById('group-subject').value = group.subject;
    document.getElementById('group-deadline').value = group.deadline;
    
    const container = document.getElementById('group-tasks-container');
    container.innerHTML = '';
    taskCounter = 0;
    
    group.tasks.forEach((task, idx) => {
        const newItem = document.createElement('div');
        newItem.className = 'task-item';
        newItem.setAttribute('data-task-idx', idx);
        newItem.innerHTML = `
            <div class="task-header">
                <span class="task-num">Задание ${idx+1}</span>
                <button type="button" class="remove-task-btn">✖</button>
            </div>
            <div class="input-group">
                <label>Тип ответа</label>
                <select class="task-type-select">
                    <option value="text" ${task.type==='text'?'selected':''}>Текст (строка)</option>
                    <option value="photo" ${task.type==='photo'?'selected':''}>Фото</option>
                </select>
            </div>
            <div class="input-group">
                <label>Текст задания</label>
                <textarea class="task-description" rows="2">${task.description || ''}</textarea>
            </div>
            <div class="input-group">
                <label>Прикрепить фото к заданию (опционально)</label>
                <input type="file" class="task-attachment" accept="image/*">
            </div>
            <div class="input-group">
                <label>Максимальный балл</label>
                <input type="number" class="task-max-score" value="${task.maxScore || 10}">
            </div>
            <div class="score-options-container" style="display: ${task.type === 'text' ? 'block' : 'none'};">
                <label>Варианты ответов для оценки</label>
                <div class="score-options-list"></div>
                <button type="button" class="add-score-level">+ Добавить уровень (балл)</button>
            </div>
        `;
        
        const scoreList = newItem.querySelector('.score-options-list');
        if (task.scoreOptions) {
            Object.entries(task.scoreOptions).forEach(([score, answers]) => {
                const row = document.createElement('div');
                row.className = 'score-option-row';
                row.setAttribute('data-score', score);
                row.innerHTML = `
                    <span class="score-value">${score} балл${score>1?'а':''}:</span>
                    <div class="score-answers">
                        ${answers.map(a => `<input type="text" value="${a.replace(/"/g, '&quot;')}">`).join('')}
                        <button type="button" class="add-answer-for-score">+ ещё вариант</button>
                    </div>
                `;
                scoreList.appendChild(row);
            });
        } else {
            const row = document.createElement('div');
            row.className = 'score-option-row';
            row.setAttribute('data-score', '1');
            row.innerHTML = `
                <span class="score-value">1 балл:</span>
                <div class="score-answers">
                    <input type="text" placeholder="Вариант ответа на 1 балл">
                    <button type="button" class="add-answer-for-score">+ ещё вариант</button>
                </div>
            `;
            scoreList.appendChild(row);
        }
        
        newItem.querySelector('.remove-task-btn').onclick = () => removeTaskItem(idx);
        const typeSelect = newItem.querySelector('.task-type-select');
        typeSelect.onchange = function() {
            const optsDiv = newItem.querySelector('.score-options-container');
            optsDiv.style.display = this.value === 'text' ? 'block' : 'none';
        };
        newItem.querySelector('.add-score-level').onclick = () => addScoreLevel(newItem);
        newItem.querySelectorAll('.add-answer-for-score').forEach(btn => {
            btn.onclick = () => addAnswerForScore(btn);
        });
        
        container.appendChild(newItem);
    });
    taskCounter = group.tasks.length;
}

function saveGroup() {
    const title = document.getElementById('group-title').value.trim();
    const subject = document.getElementById('group-subject').value;
    const deadline = document.getElementById('group-deadline').value;
    
    if (!title || !subject) {
        alert('Заполните название занятия и предмет');
        return;
    }
    
    const tasks = [];
    const taskItems = document.querySelectorAll('#group-tasks-container .task-item');
    
    for (let i = 0; i < taskItems.length; i++) {
        const item = taskItems[i];
        const type = item.querySelector('.task-type-select').value;
        const description = item.querySelector('.task-description').value.trim();
        
        if (!description) {
            alert(`Задание ${i+1}: введите текст задания`);
            return;
        }
        
        const maxScore = parseInt(item.querySelector('.task-max-score').value) || 0;
        const scoreOptions = {};
        
        if (type === 'text') {
            const rows = item.querySelectorAll('.score-option-row');
            for (let r = 0; r < rows.length; r++) {
                const row = rows[r];
                const score = parseInt(row.getAttribute('data-score'));
                const inputs = row.querySelectorAll('.score-answers input[type="text"]');
                const answers = Array.from(inputs).map(inp => inp.value.trim()).filter(v => v);
                if (answers.length) scoreOptions[score] = answers;
            }
        }
        
        tasks.push({
            number: i+1,
            type: type,
            description: description,
            maxScore: maxScore,
            scoreOptions: scoreOptions
        });
    }
    
    const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    const newGroup = {
        id: Date.now(),
        title: title,
        subject: subject,
        deadline: deadline,
        tasks: tasks,
        createdAt: new Date().toISOString()
    };
    
    groups.push(newGroup);
    localStorage.setItem('studyGroups', JSON.stringify(groups));
    alert('Группа заданий сохранена!');
    clearGroupForm();
    loadGroupsList();
    loadExistingGroupsSelect();
}

function clearGroupForm() {
    document.getElementById('group-title').value = '';
    document.getElementById('group-subject').value = '';
    document.getElementById('group-deadline').value = '';
    const container = document.getElementById('group-tasks-container');
    container.innerHTML = '';
    taskCounter = 0;
    addTaskItem();
}

function loadGroupsList() {
    const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    const container = document.getElementById('groupsList');
    if (!container) return;
    
    if (groups.length === 0) {
        container.innerHTML = '<p class="empty-tasks">У вас пока нет групп заданий</p>';
        return;
    }
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    container.innerHTML = groups.map(group => {
        let status = 'unfinished';
        let statusText = 'Не выполнено';
        let statusColor = '#FF9800';
        
        if (group.deadline) {
            const deadlineDate = new Date(group.deadline);
            if (deadlineDate < new Date()) {
                status = 'overdue';
                statusText = 'Просрочено';
                statusColor = '#f44336';
            }
        }
        
        const isChecked = group.checked || false;
        
        return `
            <div class="task-card" data-id="${group.id}" data-status="${status}">
                <div class="task-card-header">
                    <h4>${escapeHtml(group.title)}</h4>
                    <div class="task-status-indicator" style="background: ${statusColor}" title="${statusText}"></div>
                    ${isChecked ? '<div class="check-indicator checked" title="Проверено репетитором">✓</div>' : '<div class="check-indicator unchecked" title="Ожидает проверки">⏳</div>'}
                </div>
                <div class="task-subject">${subjectNames[group.subject] || group.subject}</div>
                <div class="task-deadline">⏰ Дедлайн: ${group.deadline ? new Date(group.deadline).toLocaleString('ru-RU') : 'не указан'}</div>
                <div class="task-count">📋 Заданий: ${group.tasks.length}</div>
                <div class="task-card-buttons">
                    <button class="edit-group-btn" data-id="${group.id}">Редактировать</button>
                    <button class="delete-group-btn" data-id="${group.id}">Удалить</button>
                    <button class="assign-group-btn" data-id="${group.id}">✉ Привязать к занятию</button>
                </div>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.edit-group-btn').forEach(btn => {
        btn.addEventListener('click', () => loadGroupToForm(parseInt(btn.dataset.id)));
    });
    
    document.querySelectorAll('.delete-group-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            let groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
            groups = groups.filter(g => g.id != btn.dataset.id);
            localStorage.setItem('studyGroups', JSON.stringify(groups));
            loadGroupsList();
            loadExistingGroupsSelect();
        });
    });
    
    document.querySelectorAll('.assign-group-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const groupId = parseInt(btn.dataset.id);
            const group = groups.find(g => g.id === groupId);
            if (group) {
                openAddEventWithGroup(group);
            }
        });
    });
}

function openAddEventWithGroup(group) {
    openAddEventModal();
    document.getElementById('eventTitle').value = group.title;
    document.getElementById('eventSubject').value = group.subject;
    document.getElementById('eventHomework').checked = true;
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function initGroupsPage() {
    loadSubjectsForGroup();
    loadExistingGroupsSelect();
    loadGroupsList();
    
    const loadSelect = document.getElementById('load-existing-group');
    if (loadSelect) {
        loadSelect.onchange = (e) => {
            if (e.target.value) loadGroupToForm(parseInt(e.target.value));
        };
    }
    
    const saveBtn = document.getElementById('saveGroupBtn');
    if (saveBtn) saveBtn.onclick = saveGroup;
    
    const clearBtn = document.getElementById('clearGroupBtn');
    if (clearBtn) clearBtn.onclick = clearGroupForm;
    
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) addTaskBtn.onclick = addTaskItem;
    
    if (document.querySelectorAll('#group-tasks-container .task-item').length === 0) addTaskItem();
}

document.querySelectorAll('.nav-btn[data-tab="tasks"]').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(initGroupsPage, 100));
});
if (document.querySelector('.nav-btn[data-tab="tasks"].active')) setTimeout(initGroupsPage, 500);

// ===== ДОМАШНИЕ ЗАДАНИЯ ДЛЯ УЧЕНИКА =====

function loadHomeworkForStudent() {
    const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    const tutors = JSON.parse(localStorage.getItem('myTutors') || '[]');
    const container = document.getElementById('homeworkList');
    if (!container) return;
    
    // Фильтруем группы по предметам, которые есть у ученика
    const mySubjects = tutors.map(t => t.subject);
    const myGroups = groups.filter(g => mySubjects.includes(g.subject));
    
    if (myGroups.length === 0) {
        container.innerHTML = '<p class="empty-homework">У вас пока нет домашних заданий</p>';
        return;
    }
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    container.innerHTML = myGroups.map(group => {
        let status = 'pending';
        let statusText = 'Ожидает выполнения';
        let statusColor = '#FF9800';
        
        if (group.deadline) {
            const deadlineDate = new Date(group.deadline);
            if (deadlineDate < new Date()) {
                status = 'expired';
                statusText = 'Просрочено';
                statusColor = '#f44336';
            }
        }
        
        const isCompleted = localStorage.getItem(`homework_${group.id}_completed`) === 'true';
        if (isCompleted) {
            status = 'completed';
            statusText = 'Выполнено';
            statusColor = '#4CAF50';
        }
        
        const isChecked = group.checked || false;
        
        return `
            <div class="homework-card" data-id="${group.id}" data-status="${status}">
                <div class="homework-card-header">
                    <h4>${escapeHtml(group.title)}</h4>
                    <div class="homework-status" style="background: ${statusColor}">${statusText}</div>
                    ${isChecked ? '<div class="check-indicator checked" title="Проверено">✓</div>' : '<div class="check-indicator unchecked" title="Не проверено">⏳</div>'}
                </div>
                <div class="homework-subject">📚 ${subjectNames[group.subject] || group.subject}</div>
                <div class="homework-deadline">⏰ Дедлайн: ${group.deadline ? new Date(group.deadline).toLocaleString('ru-RU') : 'не указан'}</div>
                <div class="homework-tasks-count">📋 Заданий: ${group.tasks.length}</div>
                <div class="homework-buttons">
                    <button class="homework-start-btn" onclick="startHomework(${group.id})">Выполнить задание</button>
                </div>
            </div>
        `;
    }).join('');
}

function startHomework(groupId) {
    const group = JSON.parse(localStorage.getItem('studyGroups') || '[]').find(g => g.id === groupId);
    if (!group) return;
    
    let answers = JSON.parse(localStorage.getItem(`homework_answers_${groupId}`) || '{}');
    let html = `
        <div class="homework-modal-overlay" id="homeworkModal">
            <div class="homework-modal">
                <div class="homework-modal-header">
                    <h3>${escapeHtml(group.title)}</h3>
                    <button class="homework-close" onclick="closeHomeworkModal()">✖</button>
                </div>
                <div class="homework-modal-body">
    `;
    
    group.tasks.forEach((task, idx) => {
        const savedAnswer = answers[task.number] || '';
        html += `
            <div class="homework-task">
                <h4>Задание ${task.number}</h4>
                <p class="homework-task-desc">${escapeHtml(task.description)}</p>
                <p class="homework-task-maxscore">Максимальный балл: ${task.maxScore}</p>
                ${task.type === 'text' ? `
                    <div class="homework-answer">
                        <label>Ваш ответ:</label>
                        <input type="text" class="homework-answer-input" data-task="${task.number}" value="${escapeHtml(savedAnswer)}" placeholder="Введите ответ...">
                    </div>
                ` : `
                    <div class="homework-answer">
                        <label>Загрузить фото:</label>
                        <input type="file" class="homework-photo-input" data-task="${task.number}" accept="image/*">
                        ${savedAnswer ? `<div class="homework-photo-preview"><img src="${savedAnswer}" style="max-width: 200px;"><button onclick="removePhoto(${groupId}, ${task.number})">Удалить</button></div>` : ''}
                    </div>
                `}
            </div>
            <hr>
        `;
    });
    
    html += `
                </div>
                <div class="homework-modal-footer">
                    <button class="homework-save" onclick="saveHomeworkAnswers(${groupId})">Сохранить</button>
                    <button class="homework-submit" onclick="submitHomework(${groupId})">Отправить на проверку</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
    
    document.querySelectorAll('.homework-photo-input').forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = function(ev) {
                    const taskNum = input.getAttribute('data-task');
                    let answers = JSON.parse(localStorage.getItem(`homework_answers_${groupId}`) || '{}');
                    answers[taskNum] = ev.target.result;
                    localStorage.setItem(`homework_answers_${groupId}`, JSON.stringify(answers));
                    const previewDiv = input.parentElement.querySelector('.homework-photo-preview');
                    if (previewDiv) previewDiv.remove();
                    input.insertAdjacentHTML('afterend', `<div class="homework-photo-preview"><img src="${ev.target.result}" style="max-width: 200px;"><button onclick="removePhoto(${groupId}, ${taskNum})">Удалить</button></div>`);
                };
                reader.readAsDataURL(file);
            }
        });
    });
}

function closeHomeworkModal() {
    const modal = document.getElementById('homeworkModal');
    if (modal) modal.remove();
}

function saveHomeworkAnswers(groupId) {
    const answers = {};
    document.querySelectorAll('.homework-answer-input').forEach(input => {
        const taskNum = input.getAttribute('data-task');
        answers[taskNum] = input.value;
    });
    localStorage.setItem(`homework_answers_${groupId}`, JSON.stringify(answers));
    alert('Ответы сохранены');
}

function submitHomework(groupId) {
    saveHomeworkAnswers(groupId);
    localStorage.setItem(`homework_${groupId}_completed`, 'true');
    
    // Сохраняем данные для статистики репетитора
    const submissions = JSON.parse(localStorage.getItem(`homework_submissions_${groupId}`) || '{}');
    const studentId = localStorage.getItem('userId');
    const answers = JSON.parse(localStorage.getItem(`homework_answers_${groupId}`) || '{}');
    submissions[studentId] = {
        completed: true,
        answers: answers,
        submittedAt: new Date().toISOString()
    };
    localStorage.setItem(`homework_submissions_${groupId}`, JSON.stringify(submissions));
    
    alert('Домашнее задание отправлено на проверку!');
    closeHomeworkModal();
    loadHomeworkForStudent();
}

function removePhoto(groupId, taskNum) {
    let answers = JSON.parse(localStorage.getItem(`homework_answers_${groupId}`) || '{}');
    delete answers[taskNum];
    localStorage.setItem(`homework_answers_${groupId}`, JSON.stringify(answers));
    closeHomeworkModal();
    startHomework(groupId);
}

document.querySelectorAll('.nav-btn[data-tab="homework"]').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(loadHomeworkForStudent, 100));
});

// ===== МОИ УЧЕНИКИ (ДЛЯ РЕПЕТИТОРА) =====
function initStudentsTab() {
    if (!localStorage.getItem('groupsData')) {
        localStorage.setItem('groupsData', JSON.stringify([]));
    }
    if (!localStorage.getItem('individualStudents')) {
        localStorage.setItem('individualStudents', JSON.stringify([]));
    }
    
    const tutorId = localStorage.getItem('userId');
    const tutorCodeDisplay = document.getElementById('tutorPersonalCodeDisplay');
    if (tutorCodeDisplay) tutorCodeDisplay.textContent = tutorId;
    
    loadSubjectsForGroupSelect();
    loadStudentsData();
    
    document.getElementById('copyTutorCodeBtn')?.addEventListener('click', () => {
        const code = document.getElementById('tutorPersonalCodeDisplay')?.textContent;
        if (code) {
            navigator.clipboard.writeText(code);
            alert('Ваш ID скопирован! Ученики могут привязаться по коду: ' + code + '_ПРЕДМЕТ');
        }
    });
    
    document.getElementById('addStudentMainBtn')?.addEventListener('click', () => {
        const code = document.getElementById('tutorPersonalCodeDisplay')?.textContent;
        if (code) {
            navigator.clipboard.writeText(code);
            alert(`Ваш ID ${code} скопирован. Ученики должны использовать код в формате: ${code}_ПРЕДМЕТ (например, ${code}_Math для математики)`);
        }
    });
    
    document.getElementById('createGroupBtn')?.addEventListener('click', () => openCreateGroupModal());
    
    document.querySelectorAll('.students-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-student-tab');
            document.querySelectorAll('.students-tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.students-list-container').forEach(container => {
                container.classList.remove('active');
            });
            if (tab === 'groups') {
                document.getElementById('groupsListContainer').classList.add('active');
            } else {
                document.getElementById('individualListContainer').classList.add('active');
            }
        });
    });
}

function loadSubjectsForGroupSelect() {
    const subjects = JSON.parse(localStorage.getItem('tutorSubjects') || '[]');
    const select = document.getElementById('newGroupSubject');
    if (select) {
        const subjectNames = {
            'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
            'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
            'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
            'Literature': 'Литература', 'Geography': 'География'
        };
        select.innerHTML = '<option value="">Выберите предмет</option>';
        subjects.forEach(s => {
            const option = document.createElement('option');
            option.value = s;
            option.textContent = subjectNames[s] || s;
            select.appendChild(option);
        });
    }
}

function loadStudentsData() {
    loadGroups();
    loadIndividualStudents();
}

function loadGroups() {
    const groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    const container = document.getElementById('studentsGroupsList');
    if (!container) return;
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    if (groups.length === 0) {
        container.innerHTML = '<p class="empty-placeholder">У вас пока нет групп. Создайте первую группу!</p>';
        return;
    }
    
    container.innerHTML = groups.map(group => {
        const studentCount = group.students ? group.students.length : 0;
        return `
            <div class="group-card" data-group-id="${group.id}">
                <h3>${escapeHtml(group.name)}</h3>
                <div class="group-subject">${subjectNames[group.subject] || group.subject}</div>
                <div class="group-students-count">👥 Учеников: ${studentCount}</div>
                <div class="group-actions">
                    <button class="group-view-btn" onclick="openGroupModal('${group.id}')">Просмотр</button>
                    <button class="group-delete-btn" onclick="deleteGroup('${group.id}')">Удалить</button>
                </div>
            </div>
        `;
    }).join('');
}

function loadIndividualStudents() {
    const students = JSON.parse(localStorage.getItem('individualStudents') || '[]');
    const container = document.getElementById('individualStudentsList');
    if (!container) return;
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    if (students.length === 0) {
        container.innerHTML = '<p class="empty-placeholder">У вас пока нет индивидуальных учеников. Поделитесь своим кодом!</p>';
        return;
    }
    
    container.innerHTML = students.map(student => `
        <div class="student-card" data-student-id="${student.id}">
            <img class="student-avatar" src="${student.avatar || 'assets/default-avatar.png'}" alt="avatar">
            <div class="student-info">
                <h4>${escapeHtml(student.name)}</h4>
                <p>ID: ${student.id}</p>
                ${student.subjects ? `<p>Предметы: ${student.subjects.map(s => subjectNames[s] || s).join(', ')}</p>` : ''}
            </div>
            <button class="remove-student-btn" onclick="removeIndividualStudent('${student.id}')">Отчислить</button>
        </div>
    `).join('');
}

function addStudentToTutor(studentName, studentId, studentSubject, studentAvatar = null) {
    const currentTutorId = localStorage.getItem('userId');
    const students = JSON.parse(localStorage.getItem('individualStudents') || '[]');
    
    const existingStudent = students.find(s => s.id === studentId);
    if (existingStudent) {
        if (!existingStudent.subjects) existingStudent.subjects = [];
        if (!existingStudent.subjects.includes(studentSubject)) {
            existingStudent.subjects.push(studentSubject);
            localStorage.setItem('individualStudents', JSON.stringify(students));
        }
    } else {
        students.push({
            id: studentId,
            name: studentName,
            avatar: studentAvatar,
            tutorId: currentTutorId,
            subjects: [studentSubject],
            addedDate: new Date().toISOString()
        });
        localStorage.setItem('individualStudents', JSON.stringify(students));
    }
    loadIndividualStudents();
}

function removeIndividualStudent(studentId) {
    if (confirm('Вы уверены, что хотите отчислить этого ученика?')) {
        let students = JSON.parse(localStorage.getItem('individualStudents') || '[]');
        students = students.filter(s => s.id !== studentId);
        localStorage.setItem('individualStudents', JSON.stringify(students));
        
        let groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
        groups = groups.map(group => {
            if (group.students) {
                group.students = group.students.filter(id => id !== studentId);
            }
            return group;
        });
        localStorage.setItem('groupsData', JSON.stringify(groups));
        
        loadStudentsData();
        alert('Ученик отчислен');
    }
}

function openCreateGroupModal(editingGroup = null) {
    const modal = document.getElementById('createEditGroupModal');
    const title = document.getElementById('createGroupModalTitle');
    const nameInput = document.getElementById('newGroupName');
    const subjectSelect = document.getElementById('newGroupSubject');
    
    if (editingGroup) {
        title.textContent = 'Редактировать группу';
        nameInput.value = editingGroup.name;
        subjectSelect.value = editingGroup.subject;
        modal.setAttribute('data-editing-id', editingGroup.id);
    } else {
        title.textContent = 'Создать группу';
        nameInput.value = '';
        subjectSelect.value = '';
        modal.removeAttribute('data-editing-id');
    }
    
    modal.style.display = 'flex';
}

function closeCreateGroupModal() {
    document.getElementById('createEditGroupModal').style.display = 'none';
}

function saveNewGroup() {
    const name = document.getElementById('newGroupName').value.trim();
    const subject = document.getElementById('newGroupSubject').value;
    const editingId = document.getElementById('createEditGroupModal').getAttribute('data-editing-id');
    
    if (!name || !subject) {
        alert('Заполните название группы и предмет');
        return;
    }
    
    let groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    
    if (editingId) {
        const index = groups.findIndex(g => g.id === editingId);
        if (index !== -1) {
            groups[index].name = name;
            groups[index].subject = subject;
        }
    } else {
        const newGroup = {
            id: Date.now().toString(),
            name: name,
            subject: subject,
            students: []
        };
        groups.push(newGroup);
    }
    
    localStorage.setItem('groupsData', JSON.stringify(groups));
    closeCreateGroupModal();
    loadGroups();
}

function deleteGroup(groupId) {
    if (confirm('Удалить группу? Ученики не будут удалены.')) {
        let groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
        groups = groups.filter(g => g.id !== groupId);
        localStorage.setItem('groupsData', JSON.stringify(groups));
        loadGroups();
        closeGroupModal();
    }
}

function openGroupModal(groupId) {
    const groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    
    const individualStudents = JSON.parse(localStorage.getItem('individualStudents') || '[]');
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    document.getElementById('groupNameDisplay').textContent = group.name;
    document.getElementById('groupSubjectDisplay').textContent = subjectNames[group.subject] || group.subject;
    document.getElementById('groupStudentsCount').textContent = group.students ? group.students.length : 0;
    
    const studentsListDiv = document.getElementById('groupStudentsList');
    if (group.students && group.students.length > 0) {
        const groupStudents = individualStudents.filter(s => group.students.includes(s.id));
        studentsListDiv.innerHTML = groupStudents.map(student => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;">
                <div>
                    <strong>${escapeHtml(student.name)}</strong>
                    <br><small>${student.subjects ? student.subjects.map(s => subjectNames[s] || s).join(', ') : ''}</small>
                </div>
                <button onclick="removeStudentFromGroup('${groupId}', '${student.id}')" style="background: #8C2119; color: white; border: none; padding: 5px 10px; border-radius: 20px; cursor: pointer;">Удалить</button>
            </div>
        `).join('');
    } else {
        studentsListDiv.innerHTML = '<p>В группе пока нет учеников</p>';
    }
    
    const select = document.getElementById('addStudentToGroupSelect');
    const studentsNotInGroup = individualStudents.filter(s => !(group.students || []).includes(s.id));
    if (studentsNotInGroup.length > 0) {
        select.innerHTML = '<option value="">-- Выберите ученика --</option>' + 
            studentsNotInGroup.map(s => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('');
        select.disabled = false;
        document.getElementById('confirmAddStudentToGroupBtn').disabled = false;
    } else {
        select.innerHTML = '<option value="">Нет доступных учеников</option>';
        select.disabled = true;
        document.getElementById('confirmAddStudentToGroupBtn').disabled = true;
    }
    
    const modal = document.getElementById('groupModal');
    modal.setAttribute('data-current-group-id', groupId);
    modal.style.display = 'flex';
}

function closeGroupModal() {
    document.getElementById('groupModal').style.display = 'none';
}

function addStudentToGroup() {
    const groupId = document.getElementById('groupModal').getAttribute('data-current-group-id');
    const studentId = document.getElementById('addStudentToGroupSelect').value;
    
    if (!studentId) {
        alert('Выберите ученика');
        return;
    }
    
    let groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    const groupIndex = groups.findIndex(g => g.id === groupId);
    
    if (groupIndex !== -1) {
        if (!groups[groupIndex].students) groups[groupIndex].students = [];
        if (!groups[groupIndex].students.includes(studentId)) {
            groups[groupIndex].students.push(studentId);
            localStorage.setItem('groupsData', JSON.stringify(groups));
            openGroupModal(groupId);
            loadGroups();
        } else {
            alert('Ученик уже в этой группе');
        }
    }
}

function removeStudentFromGroup(groupId, studentId) {
    if (confirm('Убрать ученика из группы?')) {
        let groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
        const groupIndex = groups.findIndex(g => g.id === groupId);
        if (groupIndex !== -1) {
            groups[groupIndex].students = groups[groupIndex].students.filter(id => id !== studentId);
            localStorage.setItem('groupsData', JSON.stringify(groups));
            openGroupModal(groupId);
            loadGroups();
        }
    }
}

document.getElementById('saveNewGroupBtn')?.addEventListener('click', saveNewGroup);
document.getElementById('confirmAddStudentToGroupBtn')?.addEventListener('click', addStudentToGroup);
document.getElementById('deleteGroupBtn')?.addEventListener('click', () => {
    const groupId = document.getElementById('groupModal').getAttribute('data-current-group-id');
    if (groupId) deleteGroup(groupId);
});

document.querySelectorAll('.nav-btn[data-tab="students"]').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(initStudentsTab, 100));
});

if (document.querySelector('.nav-btn[data-tab="students"].active')) {
    setTimeout(initStudentsTab, 500);
}

// Инициализация
setTimeout(() => {
    if (localStorage.getItem('userRole')) {
        showDashboard();
    }
}, 100);

document.querySelectorAll('.nav-btn[data-tab="stats"]').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(loadStats, 100));
});

// В конец файла script.js добавьте:

// Загрузка статистики при открытии вкладки
document.querySelectorAll('.nav-btn[data-tab="stats"]').forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(loadStats, 100);
    });
});

// Основная функция загрузки статистики
function loadStats() {
    const role = localStorage.getItem('userRole');
    const container = document.getElementById('statsContent');
    
    if (!container) return;
    
    if (role === 'student') {
        loadStudentStats(container);
    } else if (role === 'tutor') {
        loadTutorStats(container);
    }
}

function loadTutorStats(container) {
    const individualStudents = JSON.parse(localStorage.getItem('individualStudents') || '[]');
    const groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
    const studyGroups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    // Собираем всех учеников с их предметами
    const allStudents = [];
    
    // Индивидуальные ученики
    individualStudents.forEach(s => {
        if (s.subjects && s.subjects.length) {
            s.subjects.forEach(subj => {
                allStudents.push({
                    id: s.id,
                    name: s.name,
                    subject: subj,
                    type: 'individual'
                });
            });
        }
    });
    
    // Ученики из групп
    groups.forEach(g => {
        if (g.students) {
            g.students.forEach(studentId => {
                const student = individualStudents.find(s => s.id === studentId);
                if (student) {
                    allStudents.push({
                        id: student.id,
                        name: student.name,
                        subject: g.subject,
                        type: 'group',
                        groupName: g.name
                    });
                }
            });
        }
    });
    
    // Группируем статистику по ученику и предмету
    const statsMap = {};
    
    allStudents.forEach(student => {
        const key = `${student.id}_${student.subject || 'all'}`;
        if (!statsMap[key]) {
            statsMap[key] = {
                name: student.name,
                subject: student.subject,
                type: student.type,
                groupName: student.groupName,
                totalEvents: 0,
                attendedEvents: 0,
                totalTasks: 0,
                solvedTasks: 0,
                totalHomeworks: 0,
                submittedHomeworks: 0
            };
        }
    });
    
    // Статистика по занятиям (посещаемость)
    events.forEach(event => {
        let studentId = null;
        
        if (event.studentId) {
            studentId = event.studentId;
        } else if (event.groupId) {
            const group = groups.find(g => g.id === event.groupId);
            if (group && group.students) {
                group.students.forEach(sId => {
                    const key = `${sId}_${event.subject}`;
                    if (statsMap[key]) {
                        statsMap[key].totalEvents++;
                        if (event.status === 'completed') {
                            statsMap[key].attendedEvents++;
                        }
                    }
                });
                return;
            }
        }
        
        if (studentId) {
            const keys = Object.keys(statsMap).filter(k => k.startsWith(studentId));
            keys.forEach(key => {
                if (statsMap[key]) {
                    statsMap[key].totalEvents++;
                    if (event.status === 'completed') {
                        statsMap[key].attendedEvents++;
                    }
                }
            });
        }
    });
    
    // Статистика по домашним заданиям
    studyGroups.forEach(group => {
        const subject = group.subject;
        const submissions = JSON.parse(localStorage.getItem(`homework_submissions_${group.id}`) || '{}');
        
        Object.entries(submissions).forEach(([studentId, submission]) => {
            const key = `${studentId}_${subject}`;
            if (statsMap[key]) {
                statsMap[key].totalHomeworks++;
                if (submission.completed) {
                    statsMap[key].submittedHomeworks++;
                    statsMap[key].totalTasks += group.tasks.length;
                    if (submission.answers) {
                        Object.keys(submission.answers).forEach(taskNum => {
                            if (submission.answers[taskNum]) {
                                statsMap[key].solvedTasks++;
                            }
                        });
                    }
                }
            }
        });
    });
    
    // Вывод статистики
    if (Object.keys(statsMap).length === 0) {
        container.innerHTML = '<p class="empty-placeholder">Нет данных для статистики. Добавьте учеников и проведите занятия.</p>';
        return;
    }
    
    let html = '<div class="stats-students-container">';
    for (const [key, stats] of Object.entries(statsMap)) {
        const attendancePercent = stats.totalEvents > 0 ? Math.round((stats.attendedEvents / stats.totalEvents) * 100) : 0;
        const tasksPercent = stats.totalTasks > 0 ? Math.round((stats.solvedTasks / stats.totalTasks) * 100) : 0;
        const homeworkPercent = stats.totalHomeworks > 0 ? Math.round((stats.submittedHomeworks / stats.totalHomeworks) * 100) : 0;
        
        html += `
            <div class="stats-student-card">
                <h3>${escapeHtml(stats.name)}</h3>
                <p class="stats-subject">${stats.subject ? subjectNames[stats.subject] || stats.subject : 'Все предметы'}</p>
                ${stats.groupName ? `<p class="stats-group">Группа: ${escapeHtml(stats.groupName)}</p>` : '<p class="stats-group">Индивидуально</p>'}
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value">${attendancePercent}%</span>
                        <span class="stat-label">Посещаемость</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${tasksPercent}%</span>
                        <span class="stat-label">Решено задач</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${homeworkPercent}%</span>
                        <span class="stat-label">Сдано ДЗ</span>
                    </div>
                </div>
            </div>
        `;
    }
    html += '</div>';
    
    container.innerHTML = html;
}

function loadStudentStats(container) {
    const tutors = JSON.parse(localStorage.getItem('myTutors') || '[]');
    const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
    const studyGroups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    const currentUserId = localStorage.getItem('userId');
    
    // Группируем по предметам
    const statsBySubject = {};
    
    tutors.forEach(tutor => {
        const subject = tutor.subject;
        if (!statsBySubject[subject]) {
            statsBySubject[subject] = {
                totalEvents: 0,
                attendedEvents: 0,
                totalTasks: 0,
                solvedTasks: 0,
                totalHomeworks: 0,
                submittedHomeworks: 0,
                maxScoreTasks: 0,
                maxScoreAchieved: 0
            };
        }
    });
    
    // Статистика по занятиям
    events.forEach(event => {
        const subject = event.subject;
        if (statsBySubject[subject]) {
            statsBySubject[subject].totalEvents++;
            if (event.status === 'completed') {
                statsBySubject[subject].attendedEvents++;
            }
        }
    });
    
    // Статистика по домашним заданиям
    studyGroups.forEach(group => {
        const subject = group.subject;
        if (statsBySubject[subject]) {
            const answers = JSON.parse(localStorage.getItem(`homework_answers_${group.id}`) || '{}');
            const isCompleted = localStorage.getItem(`homework_${group.id}_completed`) === 'true';
            
            statsBySubject[subject].totalHomeworks++;
            statsBySubject[subject].totalTasks += group.tasks.length;
            statsBySubject[subject].maxScoreTasks += group.tasks.length;
            
            if (isCompleted) {
                statsBySubject[subject].submittedHomeworks++;
                
                Object.keys(answers).forEach(taskNum => {
                    if (answers[taskNum]) {
                        statsBySubject[subject].solvedTasks++;
                    }
                });
            }
        }
    });
    
    const subjectNames = {
        'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
        'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
        'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
        'Literature': 'Литература', 'Geography': 'География'
    };
    
    if (Object.keys(statsBySubject).length === 0) {
        container.innerHTML = '<p class="empty-placeholder">Нет данных для статистики. Добавьте репетитора и начните обучение.</p>';
        return;
    }
    
    let html = '<div class="stats-container">';
    for (const [subject, stats] of Object.entries(statsBySubject)) {
        const attendancePercent = stats.totalEvents > 0 ? Math.round((stats.attendedEvents / stats.totalEvents) * 100) : 0;
        const tasksPercent = stats.totalTasks > 0 ? Math.round((stats.solvedTasks / stats.totalTasks) * 100) : 0;
        const homeworkPercent = stats.totalHomeworks > 0 ? Math.round((stats.submittedHomeworks / stats.totalHomeworks) * 100) : 0;
        
        html += `
            <div class="stats-subject-card">
                <h3>${subjectNames[subject] || subject}</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value">${attendancePercent}%</span>
                        <span class="stat-label">Посещаемость</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${tasksPercent}%</span>
                        <span class="stat-label">Решено задач</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${homeworkPercent}%</span>
                        <span class="stat-label">Сдано ДЗ</span>
                    </div>
                </div>
            </div>
        `;
    }
    html += '</div>';
    
    container.innerHTML = html;
}

// Сохранение новой группы
document.getElementById('saveNewGroupBtn')?.addEventListener('click', function() {
    const name = document.getElementById('newGroupName').value.trim();
    const subject = document.getElementById('newGroupSubject').value;
    
    if (!name) {
        alert('Введите название группы');
        return;
    }
    if (!subject) {
        alert('Выберите предмет');
        return;
    }
    
    let groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    
    const newGroup = {
        id: Date.now().toString(),
        name: name,
        subject: subject,
        students: [],
        createdAt: new Date().toISOString()
    };
    
    groups.push(newGroup);
    localStorage.setItem('groupsData', JSON.stringify(groups));
    
    // Закрыть модалку
    document.getElementById('createEditGroupModal').style.display = 'none';
    
    // Очистить поля
    document.getElementById('newGroupName').value = '';
    document.getElementById('newGroupSubject').value = '';
    
    // Обновить список групп
    loadGroups();
    
    alert(`Группа "${name}" создана!`);
});

// ====== ПОЛНОСТЬЮ РАБОЧАЯ СИСТЕМА ГРУПП С МОДАЛЬНЫМ ОКНОМ ======

// Создаём модальное окно для создания группы (если его нет)
function ensureCreateGroupModal() {
    let modal = document.getElementById('createEditGroupModal');
    if (modal) return modal;
    
    modal = document.createElement('div');
    modal.id = 'createEditGroupModal';
    modal.className = 'modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2 id="createGroupModalTitle">Создать группу</h2>
                <span class="modal-close" onclick="document.getElementById('createEditGroupModal').style.display='none'">&times;</span>
            </div>
            <div class="modal-body">
                <div class="input-group">
                    <label>Название группы</label>
                    <input type="text" id="newGroupName" placeholder="Например: 9А, Алгебра">
                </div>
                <div class="input-group">
                    <label>Предмет</label>
                    <select id="newGroupSubject" class="task-select">
                        <option value="">Выберите предмет</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-cancel" onclick="document.getElementById('createEditGroupModal').style.display='none'">Отмена</button>
                <button class="modal-btn modal-btn-agree" id="saveNewGroupBtnModal">Сохранить</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Функция открытия модалки создания группы
function openCreateGroupModalWindow() {
    const modal = ensureCreateGroupModal();
    
    // Загружаем предметы
    const subjects = JSON.parse(localStorage.getItem('tutorSubjects') || '[]');
    const select = document.getElementById('newGroupSubject');
    if (select) {
        const subjectNames = {
            'Math': 'Математика', 'Russian': 'Русский язык', 'English': 'Английский язык',
            'Physics': 'Физика', 'Chemistry': 'Химия', 'History': 'История',
            'Biology': 'Биология', 'Informatics': 'Информатика', 'Social': 'Обществознание',
            'Literature': 'Литература', 'Geography': 'География'
        };
        select.innerHTML = '<option value="">Выберите предмет</option>';
        subjects.forEach(s => {
            const option = document.createElement('option');
            option.value = s;
            option.textContent = subjectNames[s] || s;
            select.appendChild(option);
        });
    }
    
    // Очищаем поля
    document.getElementById('newGroupName').value = '';
    document.getElementById('newGroupSubject').value = '';
    
    // Показываем модалку
    modal.style.display = 'flex';
    
    // Убираем старый обработчик и добавляем новый
    const saveBtn = document.getElementById('saveNewGroupBtnModal');
    const newSaveBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
    
    newSaveBtn.onclick = function() {
        const name = document.getElementById('newGroupName').value.trim();
        const subject = document.getElementById('newGroupSubject').value;
        
        if (!name) {
            alert('Введите название группы');
            return;
        }
        if (!subject) {
            alert('Выберите предмет');
            return;
        }
        
        let groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
        groups.push({
            id: 'group_' + Date.now(),
            name: name,
            subject: subject,
            students: []
        });
        localStorage.setItem('groupsData', JSON.stringify(groups));
        
        modal.style.display = 'none';
        renderGroupsList();
        alert(`Группа "${name}" создана!`);
    };
}

// Отображение списка групп
function renderGroupsList() {
    const container = document.getElementById('studentsGroupsList');
    if (!container) return;
    
    const groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    
    if (groups.length === 0) {
        container.innerHTML = '<p class="empty-placeholder">У вас пока нет групп. Нажмите "Создать группу"</p>';
        return;
    }
    
    container.innerHTML = '';
    
    groups.forEach(group => {
        const card = document.createElement('div');
        card.className = 'group-card';
        card.style.cssText = 'background:white;border-radius:20px;padding:20px;margin-bottom:15px;border:1px solid #D68A68;';
        card.innerHTML = `
            <h3 style="color:#8C2119;margin:0 0 10px 0;">${escapeHtml(group.name)}</h3>
            <div style="color:#D68A68;margin-bottom:8px;">📚 Предмет: ${getSubjectName(group.subject)}</div>
            <div style="color:#5e3a34;margin-bottom:15px;">👥 Учеников: ${group.students?.length || 0}</div>
            <div style="display:flex;gap:10px;">
                <button class="view-group-btn" data-id="${group.id}" style="background:#D68A68;color:white;border:none;padding:8px 16px;border-radius:30px;cursor:pointer;">Просмотр</button>
                <button class="delete-group-btn" data-id="${group.id}" style="background:transparent;border:1px solid #8C2119;color:#8C2119;padding:8px 16px;border-radius:30px;cursor:pointer;">Удалить</button>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Обработчики для кнопок "Просмотр"
    document.querySelectorAll('.view-group-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const groupId = btn.getAttribute('data-id');
            openGroupViewModal(groupId);
        });
    });
    
    // Обработчики для кнопок "Удалить"
    document.querySelectorAll('.delete-group-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const groupId = btn.getAttribute('data-id');
            if (confirm('Удалить группу?')) {
                let groupsData = JSON.parse(localStorage.getItem('groupsData') || '[]');
                groupsData = groupsData.filter(g => g.id !== groupId);
                localStorage.setItem('groupsData', JSON.stringify(groupsData));
                renderGroupsList();
                alert('Группа удалена');
            }
        });
    });
}

// Открытие модального окна просмотра группы
function openGroupViewModal(groupId) {
    const groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    const group = groups.find(g => g.id === groupId);
    
    if (!group) {
        alert('Группа не найдена');
        return;
    }
    
    const students = JSON.parse(localStorage.getItem('individualStudents') || '[]');
    const studentsInGroup = students.filter(s => (group.students || []).includes(s.id));
    const studentsNotInGroup = students.filter(s => !(group.students || []).includes(s.id));
    
    // Удаляем старую модалку если есть
    const oldModal = document.getElementById('groupViewModal');
    if (oldModal) oldModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'groupViewModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:100000;display:flex;align-items:center;justify-content:center;';
    
    modal.innerHTML = `
        <div style="background:#E6DDD4;border-radius:40px;width:90%;max-width:500px;max-height:80vh;overflow-y:auto;">
            <div style="background:#8C2119;color:white;padding:20px;border-radius:40px 40px 0 0;display:flex;justify-content:space-between;align-items:center;">
                <h3 style="margin:0;">${escapeHtml(group.name)}</h3>
                <span style="cursor:pointer;font-size:30px;" onclick="this.closest('#groupViewModal').remove()">&times;</span>
            </div>
            <div style="padding:25px;">
                <p><strong>📚 Предмет:</strong> ${getSubjectName(group.subject)}</p>
                <p><strong>👥 Учеников в группе:</strong> ${studentsInGroup.length}</p>
                
                <hr style="margin:15px 0; border-color:#D68A68;">
                
                <h4>📋 Список учеников:</h4>
                <div id="groupStudentsListNew" style="margin-bottom:20px; max-height:200px; overflow-y:auto;">
                    ${studentsInGroup.length === 0 ? '<p style="color:#5e3a34;">Нет учеников</p>' : 
                        studentsInGroup.map(s => `
                            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #D68A68;">
                                <span>👤 ${escapeHtml(s.name)}</span>
                                <button onclick="window.removeStudentFromGroupFunc('${groupId}', '${s.id}')" style="background:#8C2119;color:white;border:none;padding:5px 12px;border-radius:20px;cursor:pointer;">Удалить</button>
                            </div>
                        `).join('')
                    }
                </div>
                
                <hr style="margin:15px 0; border-color:#D68A68;">
                
                <h4>➕ Добавить ученика:</h4>
                <select id="studentSelectNew" style="width:100%;padding:12px;border-radius:60px;margin-bottom:15px;font-family:Comfortaa;">
                    <option value="">-- Выберите ученика --</option>
                    ${studentsNotInGroup.map(s => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('')}
                </select>
                <button onclick="window.addStudentToGroupFunc('${groupId}')" style="background:#8C2119;color:white;border:none;padding:12px;border-radius:60px;width:100%;cursor:pointer;font-weight:bold;">+ Добавить в группу</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Добавление ученика в группу
window.addStudentToGroupFunc = function(groupId) {
    const select = document.getElementById('studentSelectNew');
    const studentId = select ? select.value : null;
    
    if (!studentId) {
        alert('Выберите ученика');
        return;
    }
    
    let groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    const group = groups.find(g => g.id === groupId);
    
    if (group) {
        if (!group.students) group.students = [];
        if (!group.students.includes(studentId)) {
            group.students.push(studentId);
            localStorage.setItem('groupsData', JSON.stringify(groups));
            alert('✅ Ученик добавлен в группу!');
            document.getElementById('groupViewModal')?.remove();
            openGroupViewModal(groupId);
            renderGroupsList();
        } else {
            alert('Ученик уже в этой группе');
        }
    }
};

// Удаление ученика из группы
window.removeStudentFromGroupFunc = function(groupId, studentId) {
    if (!confirm('Убрать ученика из группы?')) return;
    
    let groups = JSON.parse(localStorage.getItem('groupsData') || '[]');
    const group = groups.find(g => g.id === groupId);
    
    if (group) {
        group.students = (group.students || []).filter(id => id !== studentId);
        localStorage.setItem('groupsData', JSON.stringify(groups));
        alert('✅ Ученик удалён из группы');
        document.getElementById('groupViewModal')?.remove();
        openGroupViewModal(groupId);
        renderGroupsList();
    }
};

// Получение имени предмета
function getSubjectName(code) {
    const names = {
        'Math': 'Математика',
        'Russian': 'Русский язык',
        'English': 'Английский язык',
        'Physics': 'Физика',
        'Chemistry': 'Химия',
        'History': 'История',
        'Biology': 'Биология',
        'Informatics': 'Информатика',
        'Social': 'Обществознание',
        'Literature': 'Литература',
        'Geography': 'География'
    };
    return names[code] || code;
}

// Экранирование HTML
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Инициализация вкладки "Мои ученики"
function initStudentsTabFull() {
    // Инициализация данных
    if (!localStorage.getItem('groupsData')) {
        localStorage.setItem('groupsData', JSON.stringify([]));
    }
    if (!localStorage.getItem('individualStudents')) {
        localStorage.setItem('individualStudents', JSON.stringify([]));
    }
    
    // Показываем код репетитора
    const tutorId = localStorage.getItem('userId');
    const tutorCodeDisplay = document.getElementById('tutorPersonalCodeDisplay');
    if (tutorCodeDisplay && tutorId) {
        tutorCodeDisplay.textContent = tutorId;
    }
    
    // Отображаем группы
    renderGroupsList();
    
    // Настраиваем кнопку создания группы (теперь с модалкой)
    const createBtn = document.getElementById('createGroupBtn');
    if (createBtn) {
        const newBtn = createBtn.cloneNode(true);
        createBtn.parentNode.replaceChild(newBtn, createBtn);
        newBtn.addEventListener('click', openCreateGroupModalWindow);
    }
    
    // Настраиваем кнопку копирования кода
    const copyBtn = document.getElementById('copyTutorCodeBtn');
    if (copyBtn) {
        copyBtn.onclick = () => {
            const code = document.getElementById('tutorPersonalCodeDisplay')?.textContent;
            if (code) {
                navigator.clipboard.writeText(code);
                alert('ID скопирован! Формат для учеников: ' + code + '_ПРЕДМЕТ');
            }
        };
    }
}

// Подключаем инициализацию при открытии вкладки
document.querySelectorAll('.nav-btn[data-tab="students"]').forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(initStudentsTabFull, 100);
    });
});

// Если вкладка активна при загрузке - инициализируем
if (document.querySelector('.nav-btn[data-tab="students"].active')) {
    setTimeout(initStudentsTabFull, 500);
}

 function loadTutorHomework() {
            const container = document.getElementById('homeworkList'); // Используем существующий контейнер
            if (!container) return;
            
            // Получаем все группы заданий (studyGroups)
            const allGroups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
            // Получаем все отправленные ДЗ
            const submissions = getAllSubmissions();
            
            // Собираем список ДЗ для проверки
            let homeworkToReview = [];
            
            allGroups.forEach(group => {
                // Проверяем, привязана ли эта группа к какому-либо занятию у репетитора
                const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
                const isLinked = events.some(e => e.groupId == group.id || e.linkedGroupId == group.id);
                if (!isLinked) return;
                
                // Получаем отправки учеников для этой группы
                const groupSubmissions = submissions[group.id] || {};
                
                Object.keys(groupSubmissions).forEach(studentId => {
                    const sub = groupSubmissions[studentId];
                    if (sub && sub.completed && !sub.reviewed) { // Только не проверенные
                        const student = findStudentById(studentId);
                        homeworkToReview.push({
                            id: `${group.id}_${studentId}`,
                            groupId: group.id,
                            studentId: studentId,
                            studentName: student ? student.name : 'Неизвестный',
                            subject: group.subject,
                            deadline: group.deadline,
                            groupTitle: group.title,
                            submittedAt: sub.submittedAt,
                            answers: sub.answers,
                            tasks: group.tasks
                        });
                    }
                });
            });
            
            if (homeworkToReview.length === 0) {
                container.innerHTML = '<p class="empty-homework">Нет домашних заданий, ожидающих проверки</p>';
                return;
            }
            
            // Сортировка и фильтрация
            let filtered = [...homeworkToReview];
            const currentFilter = document.querySelector('.homework-filters .filter-btn.active')?.dataset.filter || 'all';
            if (currentFilter === 'completed') filtered = filtered.filter(h => h.reviewed);
            else if (currentFilter === 'pending') filtered = filtered.filter(h => !h.reviewed);
            else if (currentFilter === 'expired') filtered = filtered.filter(h => new Date(h.deadline) < new Date());
            
            const sortBy = document.getElementById('homeworkSort')?.value || 'student';
            if (sortBy === 'student') filtered.sort((a,b) => a.studentName.localeCompare(b.studentName));
            else if (sortBy === 'subject') filtered.sort((a,b) => a.subject.localeCompare(b.subject));
            
            container.innerHTML = filtered.map(hw => `
                <div class="homework-card">
                    <div class="homework-card-header">
                        <h4>${escapeHtml(hw.groupTitle)}</h4>
                        <span class="homework-status" style="background: #FF9800;">Ожидает проверки</span>
                    </div>
                    <div class="homework-subject">📚 Предмет: ${getSubjectName(hw.subject)}</div>
                    <div class="homework-student">👤 Ученик: ${escapeHtml(hw.studentName)}</div>
                    <div class="homework-deadline">⏰ Дедлайн: ${hw.deadline ? new Date(hw.deadline).toLocaleString() : 'не указан'}</div>
                    <button class="homework-start-btn" onclick="openTutorReview('${hw.groupId}', '${hw.studentId}')">Проверить</button>
                </div>
            `).join('');
        }
        
        function getAllSubmissions() {
            const submissions = {};
            const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
            groups.forEach(group => {
                const sub = localStorage.getItem(`homework_submissions_${group.id}`);
                if (sub) submissions[group.id] = JSON.parse(sub);
            });
            return submissions;
        }
        
        function findStudentById(id) {
            const students = JSON.parse(localStorage.getItem('individualStudents') || '[]');
            return students.find(s => s.id === id);
        }
        
        function openTutorReview(groupId, studentId) {
            const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
            const group = groups.find(g => g.id == groupId);
            const submissions = getAllSubmissions();
            const submission = submissions[groupId]?.[studentId];
            if (!group || !submission) return;
            
            const modal = document.getElementById('tutorReviewModal');
            const body = document.getElementById('tutorReviewModalBody');
            
            let tasksHtml = '';
            group.tasks.forEach((task, idx) => {
                const answer = submission.answers[task.number];
                tasksHtml += `
                    <div class="homework-task-preview">
                        <h4>Задание ${task.number}</h4>
                        <p><strong>Условие:</strong> ${escapeHtml(task.description)}</p>
                        <div class="student-answer">
                            <strong>Ответ ученика:</strong><br>
                            ${task.type === 'text' ? `<p>${escapeHtml(answer) || 'Не указан'}</p>` : 
                              (answer ? `<img src="${answer}" class="answer-image" alt="Фото ответа">` : '<p>Фото не загружено</p>')}
                        </div>
                        <div class="tutor-review-area" data-task-num="${task.number}">
                            <label>Комментарий к заданию ${task.number}:</label>
                            <textarea class="tutor-comment" placeholder="Напишите комментарий..."></textarea>
                            <label>Оценка (баллы от 0 до ${task.maxScore}):</label>
                            <input type="number" class="tutor-score" min="0" max="${task.maxScore}" step="1" value="${task.maxScore}">
                        </div>
                    </div>
                `;
            });
            
            body.innerHTML = `
                <h3>${escapeHtml(group.title)}</h3>
                <p><strong>Ученик:</strong> ${escapeHtml(findStudentById(studentId)?.name || studentId)}</p>
                <p><strong>Предмет:</strong> ${getSubjectName(group.subject)}</p>
                <p><strong>Дата отправки:</strong> ${new Date(submission.submittedAt).toLocaleString()}</p>
                <hr>
                ${tasksHtml}
                <div class="tutor-review-area" style="margin-top: 20px;">
                    <label>Общий комментарий ко всей работе:</label>
                    <textarea id="generalComment" class="tutor-comment" rows="2" placeholder="Общий отзыв..."></textarea>
                </div>
            `;
            
            modal.style.display = 'flex';
            modal.setAttribute('data-group-id', groupId);
            modal.setAttribute('data-student-id', studentId);
        }
        
        function closeTutorReviewModal() {
            document.getElementById('tutorReviewModal').style.display = 'none';
        }
        
        function submitReview() {
            const modal = document.getElementById('tutorReviewModal');
            const groupId = modal.getAttribute('data-group-id');
            const studentId = modal.getAttribute('data-student-id');
            
            const reviews = [];
            document.querySelectorAll('#tutorReviewModalBody .homework-task-preview').forEach((preview, idx) => {
                const comment = preview.querySelector('.tutor-comment').value;
                const score = parseInt(preview.querySelector('.tutor-score').value) || 0;
                reviews.push({ taskNumber: idx+1, comment, score });
            });
            const generalComment = document.getElementById('generalComment')?.value || '';
            
            // Сохраняем результат проверки
            const reviewData = {
                reviewed: true,
                reviewedAt: new Date().toISOString(),
                generalComment: generalComment,
                taskReviews: reviews
            };
            
            let submissions = getAllSubmissions();
            if (submissions[groupId] && submissions[groupId][studentId]) {
                submissions[groupId][studentId].reviewed = true;
                submissions[groupId][studentId].reviewData = reviewData;
                localStorage.setItem(`homework_submissions_${groupId}`, JSON.stringify(submissions[groupId]));
            }
            
            alert('Проверка сохранена!');
            closeTutorReviewModal();
            loadTutorHomework(); // Обновляем список
        }
        
        // Добавляем кнопку проверки в модалку
        document.addEventListener('click', function(e) {
            if (e.target && e.target.id === 'submitReviewBtn') submitReview();
        });
        
        // Модифицируем функцию showDashboard, чтобы добавить вкладку homework для репетитора
        const originalShowDashboard = window.showDashboard;
        window.showDashboard = function() {
            originalShowDashboard();
            // Добавляем кнопку "домашние задания" для репетитора в сайдбар
            const role = localStorage.getItem('userRole');
            if (role === 'tutor') {
                const nav = document.querySelector('.sidebar-nav');
                let tutorHomeworkBtn = document.querySelector('.nav-btn[data-tab="tutor-homework"]');
                if (!tutorHomeworkBtn && nav) {
                    tutorHomeworkBtn = document.createElement('button');
                    tutorHomeworkBtn.className = 'nav-btn';
                    tutorHomeworkBtn.setAttribute('data-tab', 'tutor-homework');
                    tutorHomeworkBtn.textContent = 'домашние задания';
                    tutorHomeworkBtn.style.display = 'flex';
                    // Вставляем перед статистикой
                    const statsBtn = document.querySelector('.nav-btn[data-tab="stats"]');
                    if (statsBtn) nav.insertBefore(tutorHomeworkBtn, statsBtn);
                    else nav.appendChild(tutorHomeworkBtn);
                    
                    tutorHomeworkBtn.addEventListener('click', () => {
                        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                        tutorHomeworkBtn.classList.add('active');
                        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
                        let targetTab = document.getElementById('tab-tutor-homework');
                        if (!targetTab) {
                            // Создаём вкладку
                            const main = document.querySelector('.dashboard-main');
                            targetTab = document.createElement('div');
                            targetTab.id = 'tab-tutor-homework';
                            targetTab.className = 'tab-content';
                            targetTab.innerHTML = `
                                <h2>Проверка домашних заданий</h2>
                                <div class="sort-controls">
                                    <label>Сортировать по: </label>
                                    <select id="homeworkSort">
                                        <option value="student">Ученику</option>
                                        <option value="subject">Предмету</option>
                                    </select>
                                </div>
                                <div class="homework-filters">
                                    <button class="filter-btn active" data-filter="all">Все</button>
                                    <button class="filter-btn" data-filter="pending">Ожидают проверки</button>
                                    <button class="filter-btn" data-filter="completed">Проверенные</button>
                                    <button class="filter-btn" data-filter="expired">Просроченные</button>
                                </div>
                                <div id="homeworkList" class="homework-list"></div>
                            `;
                            main.appendChild(targetTab);
                            
                            // Инициализация фильтров и сортировки
                            targetTab.querySelectorAll('.filter-btn').forEach(btn => {
                                btn.addEventListener('click', function() {
                                    targetTab.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                                    this.classList.add('active');
                                    loadTutorHomework();
                                });
                            });
                            targetTab.querySelector('#homeworkSort').addEventListener('change', () => loadTutorHomework());
                        }
                        targetTab.classList.add('active');
                        loadTutorHomework();
                    });
                }
            }
        };
        
        // Модифицируем функцию startHomework, чтобы сохранять ответы с возможностью фото
        // (уже есть, оставляем как есть, но убедимся, что фото сохраняются)
        
        // Функция для привязки группы заданий к занятию (в модалке события)
        const originalOpenAddEventModal = window.openAddEventModal;
        window.openAddEventModal = function() {
            originalOpenAddEventModal();
            // Загружаем группы заданий в селект eventGroupId
            const groupSelect = document.getElementById('eventGroupId');
            if (groupSelect) {
                const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
                groupSelect.innerHTML = '<option value="">— Без группы —</option>' + 
                    groups.map(g => `<option value="${g.id}">${g.title} (${getSubjectName(g.subject)})</option>`).join('');
            }
        };
        
        const originalSaveEvent = window.saveEvent;
        window.saveEvent = function() {
            originalSaveEvent();
            // Дополнительно сохраняем привязку группы
            const groupId = document.getElementById('eventGroupId').value;
            const homeworkCheck = document.getElementById('eventHomework').checked;
            if (homeworkCheck && groupId) {
                // Сохраняем связь занятия и группы
                const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
                const eventId = document.getElementById('eventId').value;
                const event = events.find(e => e.id == eventId);
                if (event) {
                    event.linkedGroupId = groupId;
                    localStorage.setItem('calendarEvents', JSON.stringify(events));
                }
            }
        };
        
        // Инициализация фильтров в личном кабинете ученика (уже есть, но убедимся)
        function initStudentHomeworkFilters() {
            const container = document.getElementById('tab-homework');
            if (!container) return;
            let filters = container.querySelector('.homework-filters');
            if (!filters) {
                filters = document.createElement('div');
                filters.className = 'homework-filters';
                filters.innerHTML = `
                    <button class="filter-btn active" data-filter="all">Все</button>
                    <button class="filter-btn" data-filter="pending">Ожидают выполнения</button>
                    <button class="filter-btn" data-filter="completed">Выполненные</button>
                    <button class="filter-btn" data-filter="expired">Просроченные</button>
                `;
                const h2 = container.querySelector('h2');
                if (h2) h2.insertAdjacentElement('afterend', filters);
                
                filters.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        this.classList.add('active');
                        loadHomeworkForStudent();
                    });
                });
            }
        }
        
        const originalLoadHomeworkForStudent = window.loadHomeworkForStudent;
        window.loadHomeworkForStudent = function() {
            const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
            const tutors = JSON.parse(localStorage.getItem('myTutors') || '[]');
            const container = document.getElementById('homeworkList');
            if (!container) return;
            
            initStudentHomeworkFilters();
            const currentFilter = document.querySelector('#tab-homework .homework-filters .filter-btn.active')?.dataset.filter || 'all';
            
            // Получаем группы, привязанные к занятиям репетиторов ученика
            const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
            const myEvents = events.filter(e => {
                // Проверяем, есть ли репетитор для предмета
                return tutors.some(t => t.subject === e.subject);
            });
            const linkedGroupIds = myEvents.map(e => e.linkedGroupId || e.groupId).filter(id => id);
            const myGroups = groups.filter(g => linkedGroupIds.includes(g.id.toString()));
            
            const processed = myGroups.map(group => {
                let status = 'pending';
                if (group.deadline && new Date(group.deadline) < new Date()) status = 'expired';
                const completed = localStorage.getItem(`homework_${group.id}_completed`) === 'true';
                if (completed) status = 'completed';
                return { ...group, status };
            }).filter(g => {
                if (currentFilter === 'all') return true;
                return g.status === currentFilter;
            });
            
            if (processed.length === 0) {
                container.innerHTML = '<p class="empty-homework">Нет домашних заданий</p>';
                return;
            }
            
            container.innerHTML = processed.map(group => `
                <div class="homework-card" data-status="${group.status}">
                    <div class="homework-card-header">
                        <h4>${escapeHtml(group.title)}</h4>
                        <span class="homework-status" style="background: ${group.status === 'completed' ? '#4CAF50' : (group.status === 'expired' ? '#f44336' : '#FF9800')}">
                            ${group.status === 'pending' ? 'Ожидает выполнения' : (group.status === 'completed' ? 'Выполнено' : 'Просрочено')}
                        </span>
                    </div>
                    <div class="homework-subject">📚 ${getSubjectName(group.subject)}</div>
                    <div class="homework-deadline">⏰ Дедлайн: ${group.deadline ? new Date(group.deadline).toLocaleString() : 'не указан'}</div>
                    <div class="homework-tasks-count">📋 Заданий: ${group.tasks.length}</div>
                    ${group.status !== 'completed' ? `<button class="homework-start-btn" onclick="startHomework(${group.id})">Выполнить задание</button>` : 
                      `<button class="homework-start-btn" onclick="viewHomeworkResult(${group.id})">Посмотреть результат</button>`}
                </div>
            `).join('');
        };
        
        // Функция просмотра результата (для ученика)
        function viewHomeworkResult(groupId) {
            const group = JSON.parse(localStorage.getItem('studyGroups') || '[]').find(g => g.id == groupId);
            const submissions = getAllSubmissions();
            const studentId = localStorage.getItem('userId');
            const submission = submissions[groupId]?.[studentId];
            if (!group || !submission) return;
            
            let html = `<div class="homework-modal-overlay" id="resultModal">
                <div class="homework-modal" style="max-width: 700px;">
                    <div class="homework-modal-header"><h3>Результат: ${group.title}</h3><button class="homework-close" onclick="this.closest('#resultModal').remove()">✖</button></div>
                    <div class="homework-modal-body">`;
            
            group.tasks.forEach((task, idx) => {
                const review = submission.reviewData?.taskReviews?.find(r => r.taskNumber === task.number);
                html += `<div class="homework-task-preview">
                            <h4>Задание ${task.number}</h4>
                            <p>${task.description}</p>
                            <div><strong>Ваш ответ:</strong> ${task.type === 'text' ? (submission.answers[task.number] || '—') : `<img src="${submission.answers[task.number]}" style="max-width:200px;">`}</div>
                            ${review ? `<div><strong>Оценка:</strong> ${review.score} / ${task.maxScore}</div>
                                        <div><strong>Комментарий:</strong> ${review.comment || '—'}</div>` : '<div>Ожидает проверки</div>'}
                        </div>`;
            });
            if (submission.reviewData?.generalComment) html += `<div><strong>Общий комментарий:</strong> ${submission.reviewData.generalComment}</div>`;
            html += `</div><div class="homework-modal-footer"><button class="homework-close-btn" onclick="this.closest('#resultModal').remove()">Закрыть</button></div></div></div>`;
            document.body.insertAdjacentHTML('beforeend', html);
        }
        
        // Переопределяем функцию submitHomework, чтобы отметить отправку
        const originalSubmitHomework = window.submitHomework;
        window.submitHomework = function(groupId) {
            saveHomeworkAnswers(groupId);
            localStorage.setItem(`homework_${groupId}_completed`, 'true');
            const submissions = JSON.parse(localStorage.getItem(`homework_submissions_${groupId}`) || '{}');
            const studentId = localStorage.getItem('userId');
            const answers = JSON.parse(localStorage.getItem(`homework_answers_${groupId}`) || '{}');
            submissions[studentId] = {
                completed: true,
                answers: answers,
                submittedAt: new Date().toISOString(),
                reviewed: false
            };
            localStorage.setItem(`homework_submissions_${groupId}`, JSON.stringify(submissions));
            alert('Домашнее задание отправлено на проверку!');
            closeHomeworkModal();
            loadHomeworkForStudent();
        };
        
        // Добавляем глобальные функции для модалки репетитора
        window.openTutorReview = openTutorReview;
        window.closeTutorReviewModal = closeTutorReviewModal;
        window.submitReview = submitReview;
        window.viewHomeworkResult = viewHomeworkResult;
        
        // Инициализация (не забываем вызвать showDashboard если пользователь уже вошёл)
        if (localStorage.getItem('userRole')) {
            setTimeout(() => showDashboard(), 100);
        }

        // ========== СИСТЕМА ДОМАШНИХ ЗАДАНИЙ ==========

// 1. Загрузка домашних заданий для ученика
function loadHomeworkForStudent() {
    const container = document.getElementById('homeworkList');
    if (!container) return;
    
    // Получаем все группы заданий
    const allGroups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    // Получаем предметы ученика
    const mySubjects = JSON.parse(localStorage.getItem('myTutors') || '[]').map(t => t.subject);
    
    // Фильтруем группы по предметам ученика
    const myGroups = allGroups.filter(g => mySubjects.includes(g.subject));
    
    if (myGroups.length === 0) {
        container.innerHTML = '<p class="empty-homework">📭 У вас пока нет домашних заданий</p>';
        return;
    }
    
    const subjectNames = {
        Math: '📐 Математика', Physics: '⚡ Физика', Informatics: '💻 Информатика',
        Russian: '📖 Русский язык', English: '🇬🇧 Английский язык',
        Chemistry: '🧪 Химия', History: '📜 История', Biology: '🔬 Биология'
    };
    
    container.innerHTML = myGroups.map(group => {
        const isCompleted = localStorage.getItem(`homework_${group.id}_completed`) === 'true';
        const status = isCompleted ? 'completed' : 'pending';
        const statusText = isCompleted ? '✅ Выполнено' : '⏳ Ожидает выполнения';
        const statusColor = isCompleted ? '#4CAF50' : '#FF9800';
        
        return `
            <div class="homework-card" style="background:white; border-radius:20px; padding:20px; margin-bottom:15px; border:1px solid #D68A68;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <h3 style="color:#8C2119; margin:0;">${escapeHtml(group.title)}</h3>
                    <span style="background:${statusColor}; color:white; padding:5px 12px; border-radius:20px; font-size:12px;">${statusText}</span>
                </div>
                <div style="color:#D68A68; margin-bottom:8px;">${subjectNames[group.subject] || group.subject}</div>
                <div style="color:#5e3a34; margin-bottom:8px;">⏰ Дедлайн: ${group.deadline ? new Date(group.deadline).toLocaleString() : 'не указан'}</div>
                <div style="color:#5e3a34; margin-bottom:15px;">📋 Заданий: ${group.tasks?.length || 0}</div>
                ${!isCompleted ? 
                    `<button onclick="startHomework(${group.id})" style="background:#8C2119; color:white; border:none; padding:10px 20px; border-radius:30px; cursor:pointer;">📝 Выполнить задание</button>` :
                    `<button onclick="viewHomeworkResult(${group.id})" style="background:#D68A68; color:white; border:none; padding:10px 20px; border-radius:30px; cursor:pointer;">👁️ Посмотреть результат</button>`
                }
            </div>
        `;
    }).join('');
}

// 2. Начало выполнения домашнего задания
function startHomework(groupId) {
    const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    const group = groups.find(g => g.id == groupId);
    if (!group) return;
    
    const savedAnswers = JSON.parse(localStorage.getItem(`homework_answers_${groupId}`) || '{}');
    
    let tasksHtml = '';
    group.tasks.forEach((task, idx) => {
        const savedAnswer = savedAnswers[task.number] || '';
        tasksHtml += `
            <div class="homework-task" style="margin-bottom:25px; padding-bottom:15px; border-bottom:1px solid #D68A68;">
                <h4 style="color:#8C2119;">Задание ${task.number}</h4>
                <p style="color:#5e3a34;">${escapeHtml(task.description)}</p>
                <p style="color:#D68A68; font-size:12px;">📊 Максимальный балл: ${task.maxScore}</p>
                ${task.type === 'text' ? `
                    <div>
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Ваш ответ:</label>
                        <input type="text" id="answer_${task.number}" data-task="${task.number}" value="${escapeHtml(savedAnswer)}" 
                               style="width:100%; padding:12px; border-radius:30px; border:2px solid #D68A68; font-family:Comfortaa;">
                    </div>
                ` : `
                    <div>
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Загрузить фото:</label>
                        <input type="file" id="photo_${task.number}" data-task="${task.number}" accept="image/*" style="margin-bottom:10px;">
                        ${savedAnswer ? `<div><img src="${savedAnswer}" style="max-width:200px; border-radius:15px;"><br><button onclick="removePhoto(${groupId}, ${task.number})">🗑️ Удалить фото</button></div>` : ''}
                    </div>
                `}
            </div>
        `;
    });
    
    const modalHtml = `
        <div id="homeworkModalOverlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000000; display:flex; justify-content:center; align-items:center; overflow-y:auto;">
            <div style="background:#E6DDD4; border-radius:30px; width:90%; max-width:700px; max-height:90vh; overflow-y:auto;">
                <div style="background:#8C2119; color:white; padding:20px; border-radius:30px 30px 0 0; display:flex; justify-content:space-between;">
                    <h3 style="margin:0;">${escapeHtml(group.title)}</h3>
                    <button onclick="closeHomeworkModal()" style="background:none; border:none; color:white; font-size:24px; cursor:pointer;">✖</button>
                </div>
                <div style="padding:25px;">
                    ${tasksHtml}
                </div>
                <div style="padding:20px; display:flex; gap:15px; justify-content:flex-end; border-top:1px solid rgba(140,33,25,0.2);">
                    <button onclick="saveHomeworkAnswers(${groupId})" style="background:#D68A68; color:white; border:none; padding:12px 25px; border-radius:30px; cursor:pointer;">💾 Сохранить</button>
                    <button onclick="submitHomework(${groupId})" style="background:#8C2119; color:white; border:none; padding:12px 25px; border-radius:30px; cursor:pointer;">📤 Отправить на проверку</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Обработчики для фото
    document.querySelectorAll('[id^="photo_"]').forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = function(ev) {
                    const taskNum = this.getAttribute('data-task');
                    let answers = JSON.parse(localStorage.getItem(`homework_answers_${groupId}`) || '{}');
                    answers[taskNum] = ev.target.result;
                    localStorage.setItem(`homework_answers_${groupId}`, JSON.stringify(answers));
                    alert('✅ Фото сохранено!');
                }.bind(this);
                reader.readAsDataURL(file);
            }
        });
    });
}

// 3. Сохранение ответов (без отправки)
function saveHomeworkAnswers(groupId) {
    const answers = {};
    document.querySelectorAll('#homeworkModalOverlay input[type="text"]').forEach(input => {
        const taskNum = input.getAttribute('data-task');
        if (taskNum) answers[taskNum] = input.value;
    });
    
    // Сохраняем ответы
    const existingAnswers = JSON.parse(localStorage.getItem(`homework_answers_${groupId}`) || '{}');
    Object.assign(existingAnswers, answers);
    localStorage.setItem(`homework_answers_${groupId}`, JSON.stringify(existingAnswers));
    
    alert('✅ Ответы сохранены!');
}

// 4. Отправка на проверку
function submitHomework(groupId) {
    // Сохраняем текущие ответы
    const answers = {};
    document.querySelectorAll('#homeworkModalOverlay input[type="text"]').forEach(input => {
        const taskNum = input.getAttribute('data-task');
        if (taskNum) answers[taskNum] = input.value;
    });
    localStorage.setItem(`homework_answers_${groupId}`, JSON.stringify(answers));
    
    // Отмечаем как выполненное
    localStorage.setItem(`homework_${groupId}_completed`, 'true');
    
    // Сохраняем для репетитора
    const submissions = JSON.parse(localStorage.getItem(`homework_submissions_${groupId}`) || '{}');
    const studentId = localStorage.getItem('userId');
    submissions[studentId] = {
        completed: true,
        answers: answers,
        submittedAt: new Date().toISOString(),
        reviewed: false
    };
    localStorage.setItem(`homework_submissions_${groupId}`, JSON.stringify(submissions));
    
    alert('✅ Домашнее задание отправлено на проверку!');
    closeHomeworkModal();
    loadHomeworkForStudent();
}

// 5. Закрытие модалки
function closeHomeworkModal() {
    const modal = document.getElementById('homeworkModalOverlay');
    if (modal) modal.remove();
}

// 6. Удаление фото
function removePhoto(groupId, taskNum) {
    let answers = JSON.parse(localStorage.getItem(`homework_answers_${groupId}`) || '{}');
    delete answers[taskNum];
    localStorage.setItem(`homework_answers_${groupId}`, JSON.stringify(answers));
    closeHomeworkModal();
    startHomework(groupId);
}

// 7. Просмотр результата (после проверки)
function viewHomeworkResult(groupId) {
    const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    const group = groups.find(g => g.id == groupId);
    const submissions = JSON.parse(localStorage.getItem(`homework_submissions_${groupId}`) || '{}');
    const studentId = localStorage.getItem('userId');
    const submission = submissions[studentId];
    
    if (!group || !submission) {
        alert('Нет данных о проверке');
        return;
    }
    
    let resultHtml = `
        <div id="resultModalOverlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000000; display:flex; justify-content:center; align-items:center;">
            <div style="background:#E6DDD4; border-radius:30px; width:90%; max-width:600px; max-height:80vh; overflow-y:auto;">
                <div style="background:#8C2119; color:white; padding:20px; border-radius:30px 30px 0 0; display:flex; justify-content:space-between;">
                    <h3 style="margin:0;">Результат: ${escapeHtml(group.title)}</h3>
                    <button onclick="this.closest('#resultModalOverlay').remove()" style="background:none; border:none; color:white; font-size:24px; cursor:pointer;">✖</button>
                </div>
                <div style="padding:25px;">
    `;
    
    group.tasks.forEach(task => {
        const answer = submission.answers[task.number];
        const review = submission.reviewData?.taskReviews?.find(r => r.taskNumber === task.number);
        
        resultHtml += `
            <div style="margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid #D68A68;">
                <h4 style="color:#8C2119;">Задание ${task.number}</h4>
                <p><strong>Условие:</strong> ${escapeHtml(task.description)}</p>
                <p><strong>Ваш ответ:</strong> ${task.type === 'text' ? (escapeHtml(answer) || '—') : (answer ? `<img src="${answer}" style="max-width:150px; border-radius:10px;">` : '—')}</p>
                ${review ? `
                    <p><strong>⭐ Оценка:</strong> ${review.score} / ${task.maxScore}</p>
                    <p><strong>💬 Комментарий:</strong> ${escapeHtml(review.comment) || '—'}</p>
                ` : '<p style="color:#FF9800;">⏳ Ожидает проверки</p>'}
            </div>
        `;
    });
    
    if (submission.reviewData?.generalComment) {
        resultHtml += `<div style="margin-top:15px; padding:15px; background:rgba(214,138,104,0.2); border-radius:15px;">
            <strong>📝 Общий комментарий:</strong><br>${escapeHtml(submission.reviewData.generalComment)}
        </div>`;
    }
    
    resultHtml += `
                </div>
                <div style="padding:20px; text-align:center;">
                    <button onclick="this.closest('#resultModalOverlay').remove()" style="background:#8C2119; color:white; border:none; padding:12px 30px; border-radius:30px; cursor:pointer;">Закрыть</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', resultHtml);
}

// 8. Загрузка домашних заданий для репетитора (проверка)
function loadTutorHomework() {
    const container = document.getElementById('homeworkList');
    if (!container) return;
    
    const allGroups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    const submissions = getAllSubmissions();
    const students = JSON.parse(localStorage.getItem('individualStudents') || '[]');
    const studentMap = {};
    students.forEach(s => studentMap[s.id] = s.name);
    
    let homeworkToReview = [];
    
    allGroups.forEach(group => {
        const groupSubmissions = submissions[group.id] || {};
        Object.entries(groupSubmissions).forEach(([studentId, sub]) => {
            if (sub.completed && !sub.reviewed) {
                homeworkToReview.push({
                    groupId: group.id,
                    studentId: studentId,
                    studentName: studentMap[studentId] || studentId,
                    subject: group.subject,
                    title: group.title,
                    deadline: group.deadline,
                    answers: sub.answers,
                    tasks: group.tasks
                });
            }
        });
    });
    
    if (homeworkToReview.length === 0) {
        container.innerHTML = '<p class="empty-homework">📭 Нет домашних заданий, ожидающих проверки</p>';
        return;
    }
    
    container.innerHTML = homeworkToReview.map(hw => `
        <div class="homework-card" style="background:white; border-radius:20px; padding:20px; margin-bottom:15px; border:1px solid #D68A68;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <h3 style="color:#8C2119; margin:0;">${escapeHtml(hw.title)}</h3>
                <span style="background:#FF9800; color:white; padding:5px 12px; border-radius:20px;">⏳ Ожидает проверки</span>
            </div>
            <div style="color:#D68A68;">📚 ${getSubjectName(hw.subject)}</div>
            <div style="color:#5e3a34;">👤 Ученик: ${escapeHtml(hw.studentName)}</div>
            <div style="color:#5e3a34;">⏰ Дедлайн: ${hw.deadline ? new Date(hw.deadline).toLocaleString() : 'не указан'}</div>
            <button onclick="openTutorReview('${hw.groupId}', '${hw.studentId}')" style="margin-top:15px; background:#8C2119; color:white; border:none; padding:10px 20px; border-radius:30px; cursor:pointer;">🔍 Проверить</button>
        </div>
    `).join('');
}

// 9. Получение всех отправленных ДЗ
function getAllSubmissions() {
    const submissions = {};
    const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    groups.forEach(group => {
        const sub = localStorage.getItem(`homework_submissions_${group.id}`);
        if (sub) submissions[group.id] = JSON.parse(sub);
    });
    return submissions;
}

// 10. Открытие модалки проверки для репетитора
function openTutorReview(groupId, studentId) {
    const groups = JSON.parse(localStorage.getItem('studyGroups') || '[]');
    const group = groups.find(g => g.id == groupId);
    const submissions = getAllSubmissions();
    const submission = submissions[groupId]?.[studentId];
    const students = JSON.parse(localStorage.getItem('individualStudents') || '[]');
    const student = students.find(s => s.id === studentId);
    
    if (!group || !submission) return;
    
    let tasksHtml = '';
    group.tasks.forEach((task, idx) => {
        const answer = submission.answers[task.number];
        tasksHtml += `
            <div style="margin-bottom:25px; padding-bottom:15px; border-bottom:1px solid #D68A68;">
                <h4 style="color:#8C2119;">Задание ${task.number}</h4>
                <p><strong>Условие:</strong> ${escapeHtml(task.description)}</p>
                <div style="background:#F5E6DC; padding:10px; border-radius:15px; margin:10px 0;">
                    <strong>📝 Ответ ученика:</strong><br>
                    ${task.type === 'text' ? (escapeHtml(answer) || '—') : (answer ? `<img src="${answer}" style="max-width:200px; border-radius:10px;">` : '—')}
                </div>
                <div style="margin-top:10px;">
                    <label>💬 Комментарий:</label>
                    <textarea id="comment_${task.number}" class="tutor-comment" style="width:100%; padding:10px; border-radius:15px; border:1px solid #D68A68; margin-top:5px;" rows="2"></textarea>
                    <label style="margin-top:10px; display:block;">⭐ Оценка (0-${task.maxScore}):</label>
                    <input type="number" id="score_${task.number}" class="tutor-score" min="0" max="${task.maxScore}" value="${task.maxScore}" style="width:100px; padding:8px; border-radius:15px; border:1px solid #D68A68;">
                </div>
            </div>
        `;
    });
    
    const modalHtml = `
        <div id="tutorReviewOverlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000000; display:flex; justify-content:center; align-items:center; overflow-y:auto;">
            <div style="background:#E6DDD4; border-radius:30px; width:90%; max-width:700px; max-height:90vh; overflow-y:auto;">
                <div style="background:#8C2119; color:white; padding:20px; border-radius:30px 30px 0 0; display:flex; justify-content:space-between;">
                    <h3 style="margin:0;">Проверка: ${escapeHtml(group.title)}</h3>
                    <button onclick="this.closest('#tutorReviewOverlay').remove()" style="background:none; border:none; color:white; font-size:24px; cursor:pointer;">✖</button>
                </div>
                <div style="padding:25px;">
                    <p><strong>👤 Ученик:</strong> ${escapeHtml(student?.name || studentId)}</p>
                    <p><strong>📚 Предмет:</strong> ${getSubjectName(group.subject)}</p>
                    <p><strong>📅 Дата отправки:</strong> ${new Date(submission.submittedAt).toLocaleString()}</p>
                    <hr style="margin:15px 0; border-color:#D68A68;">
                    ${tasksHtml}
                    <hr style="margin:15px 0; border-color:#D68A68;">
                    <div>
                        <label>📝 Общий комментарий:</label>
                        <textarea id="generalComment" style="width:100%; padding:10px; border-radius:15px; border:1px solid #D68A68; margin-top:5px;" rows="3"></textarea>
                    </div>
                </div>
                <div style="padding:20px; display:flex; gap:15px; justify-content:flex-end; border-top:1px solid rgba(140,33,25,0.2);">
                    <button onclick="this.closest('#tutorReviewOverlay').remove()" style="background:transparent; border:2px solid #D68A68; color:#8C2119; padding:12px 25px; border-radius:30px; cursor:pointer;">Отмена</button>
                    <button onclick="submitReview('${groupId}', '${studentId}')" style="background:#8C2119; color:white; border:none; padding:12px 25px; border-radius:30px; cursor:pointer;">✅ Сохранить проверку</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// 11. Сохранение проверки
function submitReview(groupId, studentId) {
    const reviews = [];
    const taskItems = document.querySelectorAll('#tutorReviewOverlay .homework-task-preview, #tutorReviewOverlay > div > div:nth-child(4) > div');
    
    // Собираем оценки по всем заданиям
    document.querySelectorAll('#tutorReviewOverlay [id^="comment_"]').forEach((comment, idx) => {
        const taskNum = comment.id.split('_')[1];
        const scoreInput = document.getElementById(`score_${taskNum}`);
        reviews.push({
            taskNumber: parseInt(taskNum),
            comment: comment.value,
            score: parseInt(scoreInput?.value) || 0
        });
    });
    
    const generalComment = document.getElementById('generalComment')?.value || '';
    
    // Сохраняем результат
    let submissions = getAllSubmissions();
    if (submissions[groupId] && submissions[groupId][studentId]) {
        submissions[groupId][studentId].reviewed = true;
        submissions[groupId][studentId].reviewData = {
            reviewedAt: new Date().toISOString(),
            generalComment: generalComment,
            taskReviews: reviews
        };
        localStorage.setItem(`homework_submissions_${groupId}`, JSON.stringify(submissions[groupId]));
    }
    
    alert('✅ Проверка сохранена!');
    document.getElementById('tutorReviewOverlay')?.remove();
    loadTutorHomework();
}

// 12. Добавляем вкладку для репетитора в боковое меню
function addTutorHomeworkTab() {
    const role = localStorage.getItem('userRole');
    if (role !== 'tutor') return;
    
    const nav = document.querySelector('.sidebar-nav');
    if (!nav || document.querySelector('.nav-btn[data-tab="tutor-homework"]')) return;
    
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.setAttribute('data-tab', 'tutor-homework');
    btn.textContent = '📋 проверка ДЗ';
    btn.style.display = 'flex';
    
    const statsBtn = document.querySelector('.nav-btn[data-tab="stats"]');
    if (statsBtn) nav.insertBefore(btn, statsBtn);
    else nav.appendChild(btn);
    
    // Создаём вкладку
    const main = document.querySelector('.dashboard-main');
    const tab = document.createElement('div');
    tab.id = 'tab-tutor-homework';
    tab.className = 'tab-content';
    tab.innerHTML = `
        <h2>📋 Проверка домашних заданий</h2>
        <div id="homeworkList" class="homework-list"></div>
    `;
    main.appendChild(tab);
    
    btn.onclick = () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        loadTutorHomework();
    };
}

// Запускаем добавление вкладки после загрузки
setTimeout(addTutorHomeworkTab, 500);

