const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('password');
const confirmPwdInput = document.getElementById('confirmPwd');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

const nameIcon = document.getElementById('nameIcon');
const emailIcon = document.getElementById('emailIcon');
const confirmPwdIcon = document.getElementById('confirmPwdIcon');
const phoneIcon = document.getElementById('phoneIcon');

const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const passwordGroup = pwdInput.closest('.input-group');

// Modal Elements
const modal = document.getElementById('successModal');
const userDetails = document.getElementById('userDetails');
const closeModalBtn = document.getElementById('closeModal');

// State
let isValid = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

const checkOverallValidity = () => {
    const allValid = Object.values(isValid).every(val => val === true);
    submitBtn.disabled = !allValid;
};

const updateStatus = (input, icon, isValidField, group) => {
    const inputGroup = group || input.closest('.input-group');
    if (isValidField) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        if(icon) icon.textContent = '✅';
        inputGroup.classList.remove('error');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        if(icon) icon.textContent = '❌';
        inputGroup.classList.add('error');
    }
    checkOverallValidity();
};

// Listeners
nameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    isValid.name = val.length >= 2 && val.length <= 50;
    updateStatus(nameInput, nameIcon, isValid.name);
});

emailInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    // basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid.email = emailRegex.test(val);
    updateStatus(emailInput, emailIcon, isValid.email);
});

pwdInput.addEventListener('input', (e) => {
    const val = e.target.value;
    let strength = 0;
    
    passwordGroup.classList.remove('weak', 'medium', 'strong');
    strengthText.className = 'strength-text';

    if (val.length === 0) {
        strengthText.textContent = '';
        isValid.password = false;
    } else if (val.length < 8) {
        passwordGroup.classList.add('weak');
        strengthText.textContent = 'Yếu (Cần ít nhất 8 ký tự)';
        strengthText.classList.add('weak-text');
        isValid.password = false;
    } else {
        const hasLetters = /[a-zA-Z]/.test(val);
        const hasNumbers = /[0-9]/.test(val);
        const hasLower = /[a-z]/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasSpecial = /[^a-zA-Z0-9]/.test(val);

        if (hasLower && hasUpper && hasNumbers && hasSpecial) {
            passwordGroup.classList.add('strong');
            strengthText.textContent = 'Mạnh';
            strengthText.classList.add('strong-text');
            isValid.password = true;
        } else if (hasLetters && hasNumbers) {
            passwordGroup.classList.add('medium');
            strengthText.textContent = 'Trung bình';
            strengthText.classList.add('medium-text');
            isValid.password = true;
        } else {
            passwordGroup.classList.add('weak');
            strengthText.textContent = 'Yếu (Cần thêm số/chữ)';
            strengthText.classList.add('weak-text');
            isValid.password = false;
        }
    }
    
    // Recheck confirm password if already typed
    if (confirmPwdInput.value.length > 0) {
        isValid.confirm = confirmPwdInput.value === val;
        updateStatus(confirmPwdInput, confirmPwdIcon, isValid.confirm);
    }
    checkOverallValidity();
});

confirmPwdInput.addEventListener('input', (e) => {
    isValid.confirm = e.target.value === pwdInput.value && e.target.value.length > 0;
    updateStatus(confirmPwdInput, confirmPwdIcon, isValid.confirm);
});

phoneInput.addEventListener('input', (e) => {
    // Format input directly
    let val = e.target.value.replace(/\D/g, ''); // remove non-digits
    
    if (val.length > 4 && val.length <= 7) {
        val = val.slice(0, 4) + '-' + val.slice(4);
    } else if (val.length > 7) {
        val = val.slice(0, 4) + '-' + val.slice(4, 7) + '-' + val.slice(7, 10);
    }
    
    e.target.value = val;
    
    // Validate: must be exactly 10 digits
    const digitsOnly = val.replace(/\D/g, '');
    isValid.phone = digitsOnly.length === 10 && digitsOnly.startsWith('0');
    updateStatus(phoneInput, phoneIcon, isValid.phone);
});

// Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!submitBtn.disabled) {
        userDetails.innerHTML = `
            <p><strong>Name:</strong> ${nameInput.value}</p>
            <p><strong>Email:</strong> ${emailInput.value}</p>
            <p><strong>Phone:</strong> ${phoneInput.value}</p>
        `;
        modal.classList.add('active');
    }
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    form.reset();
    
    // Reset validations
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('valid', 'invalid');
        const icon = input.nextElementSibling;
        if(icon && icon.classList.contains('status-icon')) icon.textContent = '';
    });
    document.querySelectorAll('.input-group').forEach(group => group.classList.remove('error'));
    passwordGroup.classList.remove('weak', 'medium', 'strong');
    strengthText.textContent = '';
    
    isValid = { name: false, email: false, password: false, confirm: false, phone: false };
    checkOverallValidity();
});
