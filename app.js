// Sistema de Cadastro e Login
const users = JSON.parse(localStorage.getItem('users')) || {};

function toggleForms() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function signup() {
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();

    if (users[newUsername]) {
        alert('Usuário já existe!');
    } else {
        users[newUsername] = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
    }
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (users[username] && users[username] === password) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

// Sistema de Gerenciamento de Treinos
if (window.location.pathname.includes('dashboard.html')) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('userWelcome').textContent = loggedInUser;
    }

    const workoutList = JSON.parse(localStorage.getItem(`workouts_${loggedInUser}`)) || [];

    document.getElementById('workoutForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const workoutName = document.getElementById('workoutName').value.trim();
        const workoutDetails = document.getElementById('workoutDetails').value.trim();

        const workout = { name: workoutName, details: workoutDetails };
        workoutList.push(workout);
        localStorage.setItem(`workouts_${loggedInUser}`, JSON.stringify(workoutList));
        displayWorkouts();
    });

    function displayWorkouts() {
        const listElement = document.getElementById('workoutList');
        listElement.innerHTML = '';
        workoutList.forEach((workout, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${workout.name}</strong>: ${workout.details} 
            <button onclick="deleteWorkout(${index})">Excluir</button>`;
            listElement.appendChild(li);
        });
    }

    function deleteWorkout(index) {
        workoutList.splice(index, 1);
        localStorage.setItem(`workouts_${loggedInUser}`, JSON.stringify(workoutList));
        displayWorkouts();
    }

    displayWorkouts();
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
