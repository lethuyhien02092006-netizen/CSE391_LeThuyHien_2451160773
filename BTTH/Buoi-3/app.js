let students = [];
const modal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');

function loadStudents() {
    const storedData = localStorage.getItem('students_list');
    if (storedData) {
        students = JSON.parse(storedData);
    } else {
        students = [
            { id: "SV01", name: "Lê Thùy Hiền", dob: "2005-04-12", className: "SE1802", gpa: 8.5, email: "hienlt@gmail.com" },
            { id: "SV02", name: "Trần Minh Hoàng", dob: "2005-09-20", className: "SE1802", gpa: 7.2, email: "hoangtm@gmail.com" }
        ];
        saveStudents();
    }
    renderStudents();
    updateStatistics();
}

function saveStudents() {
    localStorage.setItem('students_list', JSON.stringify(students));
}

function renderStudents() {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = ''; 

    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="empty-row">Danh sách trống. Vui lòng thêm sinh viên mới!</td></tr>`;
        return;
    }

    students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${student.id}</strong></td>
            <td>${student.name}</td>
            <td>${formatDate(student.dob)}</td>
            <td>${student.className}</td>
            <td>${Number(student.gpa).toFixed(1)}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn btn-edit" onclick="editStudent('${student.id}')">Sửa</button>
                <button class="btn btn-delete" onclick="deleteStudent('${student.id}')">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateStatistics() {
    const total = students.length;
    let average = 0;

    if (total > 0) {
        const sum = students.reduce((acc, curr) => acc + parseFloat(curr.gpa), 0);
        average = sum / total;
    }

    document.getElementById('totalStudents').innerText = total;
    document.getElementById('classAverage').innerText = average.toFixed(2);
}

function openModal(mode, studentId = null) {
    modal.classList.add('active');
    document.getElementById('formMode').value = mode;

    if (mode === 'add') {
        document.getElementById('modalTitle').innerText = 'Thêm Sinh Viên Mới';
        document.getElementById('studentId').disabled = false;
        studentForm.reset();
    } else if (mode === 'edit') {
        document.getElementById('modalTitle').innerText = 'Cập Nhật Thông Tin Sinh Viên';
        document.getElementById('studentId').disabled = true;
        
        const target = students.find(s => s.id === studentId);
        if (target) {
            document.getElementById('studentId').value = target.id;
            document.getElementById('fullName').value = target.name;
            document.getElementById('dob').value = target.dob;
            document.getElementById('className').value = target.className;
            document.getElementById('gpa').value = target.gpa;
            document.getElementById('email').value = target.email;
        }
    }
}

function closeModal() {
    modal.classList.remove('active');
    studentForm.reset();
}

studentForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang khi submit

    const mode = document.getElementById('formMode').value;
    const id = document.getElementById('studentId').value.trim();
    const name = document.getElementById('fullName').value.trim();
    const dob = document.getElementById('dob').value;
    const className = document.getElementById('className').value.trim();
    const gpa = parseFloat(document.getElementById('gpa').value);
    const email = document.getElementById('email').value.trim();

    if (mode === 'add') {
        const isExist = students.some(s => s.id.toLowerCase() === id.toLowerCase());
        if (isExist) {
            alert('Mã sinh viên này đã tồn tại trong hệ thống. Vui lòng kiểm tra lại!');
            return;
        }
        const newStudent = { id, name, dob, className, gpa, email };
        students.push(newStudent);
    } else if (mode === 'edit') {
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = { id, name, dob, className, gpa, email };
        }
    }

    saveStudents();
    renderStudents();
    updateStatistics();
    closeModal();
});


window.editStudent = function(id) {
    openModal('edit', id);
}

window.deleteStudent = function(id) {
    if (confirm(`Bạn có chắc chắn muốn xóa sinh viên có mã ${id} không?`)) {
        students = students.filter(s => s.id !== id);
        saveStudents();
        renderStudents();
        updateStatistics();
    }
}

document.getElementById('btnOpenAddModal').addEventListener('click', () => openModal('add'));
document.getElementById('btnCloseModal').addEventListener('click', closeModal);
document.getElementById('btnCancelForm').addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

document.addEventListener('DOMContentLoaded', loadStudents);