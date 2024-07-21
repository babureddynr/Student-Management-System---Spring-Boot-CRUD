const baseUrl = 'http://localhost:8080/api/student-management/students';

document.getElementById('insert-student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age })
    })
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Failed to create student');
        }
    })
    .then((message) => displayMessage(`Student created successfully! ${message}`))
    .catch((error) => displayMessage(error.message));
});

document.getElementById('get-students-btn').addEventListener('click', () => {
    fetch(baseUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch students');
            }
        })
        .then((data) => {
            const studentsList = document.getElementById('students-list');
            studentsList.innerHTML = '';
            data.forEach((student) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.textContent = `ID: ${student.id}, Name: ${student.name}, Age: ${student.age}`;
                studentsList.appendChild(listItem);
            });
        })
        .catch((error) => displayMessage(error.message));
});

document.getElementById('get-student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;

    fetch(`${baseUrl}/${id}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch student');
            }
        })
        .then((data) => {
            const studentDetails = document.getElementById('student-details');
            studentDetails.innerHTML = '';
            const paragraph = document.createElement('p');
            paragraph.textContent = `ID: ${data.id}, Name: ${data.name}, Age: ${data.age}`;
            studentDetails.appendChild(paragraph);
        })
        .catch((error) => displayMessage(error.message));
});

document.getElementById('update-student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id-update').value;
    const name = document.getElementById('name-update').value;
    const age = document.getElementById('age-update').value;

    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age })
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update student');
        }
    })
    .then((data) => displayMessage(`Student updated successfully! ${data}`))
    .catch((error) => displayMessage(error.message));
});

document.getElementById('delete-student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id-delete').value;

    fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    })
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
                throw new Error('Failed to delete student');
        }
    })
    .then((message) => displayMessage(`Student deleted successfully! ${message}`))
    .catch((error) => displayMessage(error.message));
});

function displayMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'block';
    messageDiv.textContent = message;
}
