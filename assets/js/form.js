const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
	user: /^[a-zA-Z0-9\_\-]{2,16}$/, // Letras y espacios, pueden llevar acentos.
	name: /^[a-zA-ZÀ-ÿ\s]{8,32}$/, // Letras, numeros, guion y guion_bajo.
	password: /^.{8,32}$/, // 8 a 32 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const camp = {
    name: false,
    email: false,
    user: false,
    password: false
}

const validateForm = (e) => {
    switch (e.target.name){
        case "name":
            validateCamp(expressions.name, e.target, 'name');
        break;

        case "e-mail":
            validateCamp(expressions.email, e.target, 'e-mail');
        break;

        case "user":
            validateCamp(expressions.user, e.target, 'user');
        break;

        case "password":
            validateCamp(expressions.password, e.target, 'password');
            validatePassword();
        break;

        case "confpassword":
            validatePassword();
        break;
    }
}

const validateCamp = (expression, input, camp) => {
    if(expression.test(input.value)){
        document.getElementById(`form-${camp}`).classList.remove('form-incorrect');
        document.getElementById(`form-${camp}`).classList.add('form-correct');
        document.querySelector(`#form-${camp} .form-input-error`).classList.remove('form-input-error-active');
        camp[camp] = true;
    } else{
        document.getElementById(`form-${camp}`).classList.add('form-incorrect');
        document.getElementById(`form-${camp}`).classList.remove('form-correct');
        document.querySelector(`#form-${camp} .form-input-error`).classList.add('form-input-error-active');
        camp[camp] = false;
    }
}

const validatePassword = () =>{
    const inputPassword = document.getElementById('password');
    const inputConfPassword = document.getElementById('confpassword');

    if(inputPassword.value == inputConfPassword.value){
        document.getElementById(`form-confpassword`).classList.remove('form-incorrect');
        document.getElementById(`form-confpassword`).classList.add('form-correct');
        document.querySelector(`#form-confpassword .form-input-error`).classList.remove('form-input-error-active');
        camp['password'] = true;
    } else{
        document.getElementById(`form-confpassword`).classList.add('form-incorrect');
        document.getElementById(`form-confpassword`).classList.remove('form-correct');
        document.querySelector(`#form-confpassword .form-input-error`).classList.add('form-input-error-active');
        camp['password'] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(camp.name && camp.email && camp.user && camp.password){
        form.reset();
    } else{
        document.getElementById('form-message-error').classList.add('form-message-error-active');
    }
});