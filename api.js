// ===== API ДЛЯ РАБОТЫ С БЕКЕНДОМ =====
/* const API_BASE = 'http://111.88.156.119:5500';

// 1. Регистрация пользователя
async function registerUser(email, password, fullName, role) {
    const response = await fetch(`${API_BASE}/users/`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',  // ← ДОБАВЬ ЭТУ СТРОКУ
        body: JSON.stringify({
            email: email,
            password: password,
            full_name: fullName,
            role: role === 'tutor' ? 't' : 's'
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Ошибка регистрации');
    }
    
    const data = await response.json();
    
    localStorage.setItem('userId', data.id);
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userName', data.full_name);
    localStorage.setItem('userRole', data.role === 't' ? 'tutor' : 'student');
    
    return data;
}

// 2. Добавление предметов для репетитора
async function addTutorSubjects(subjects) {
    const response = await fetch(`${API_BASE}/me/subjects`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            subjects: subjects
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Ошибка добавления предметов');
    }
    
    return await response.json();
}

// 3. Привязка ученика к репетитору
async function addStudentToTutor(tutorId) {
    const response = await fetch(`${API_BASE}/students/add`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            id_tutor: parseInt(tutorId)
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Ошибка привязки к репетитору');
    }
    
    return await response.json();
}

// 4. Вход пользователя
async function loginUser(email, password) {
    const response = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Ошибка входа');
    }
    
    const data = await response.json();
    
    localStorage.setItem('userId', data.id);
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userName', data.full_name);
    localStorage.setItem('userRole', data.role === 't' ? 'tutor' : 'student');
    
    return data;
}  */
  // ===== РЕЖИМ МОКОВ (БЕЗ БЕКЕНДА) =====
const API_BASE = 'http://localhost:8000';
const USE_MOCK = true;

async function registerUser(email, password, fullName, role) {
    console.log('MOCK: регистрация', {email, fullName, role});
    const mockId = Math.floor(Math.random() * 10000);
    localStorage.setItem('userId', mockId);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', fullName);
    localStorage.setItem('userRole', role === 'tutor' ? 'tutor' : 'student');
    return { id: mockId, email, full_name: fullName, role: role === 'tutor' ? 't' : 's' };
}

async function addTutorSubjects(subjects) {
    console.log('MOCK: добавлены предметы', subjects);
    localStorage.setItem('tutorSubjects', JSON.stringify(subjects));
    return { message: 'ok' };
}

async function addStudentToTutor(tutorId) {
    console.log('MOCK: привязка к репетитору', tutorId);
    localStorage.setItem('tutorId', tutorId);
    return { message: 'ok' };
}

async function loginUser(email, password) {
    console.log('MOCK: вход', email);
    return { id: 123, email, full_name: 'Тест', role: 's' };
} 

