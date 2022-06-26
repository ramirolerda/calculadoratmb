var form;
window.addEventListener('load', function () {
    localStorage.clear();
    form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const userData = {
            sex: form.elements['sex'].value,
            activity: form.elements['activity'].value,
            age: form.elements['age'].value,
            height: form.elements['height'].value,
            weight: form.elements['weight'].value,
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        calculateTMB();
        calculateIMC();
    });
})

function calculateTMB() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    let tmb = 0;
    const af = userData.activity == '0' ? 1.2 : (userData.activity == '1' ? 1.375 : (userData.activity == '2' ? 1.55 : 1.725));
    if (userData.sex === 'f') {
        tmb = 655 + (9.6 * parseInt(userData.weight)) + (1.8 * parseInt(userData.height) - (4.7 * parseInt(userData.age)));
    } else {
        tmb = 66 + (13.7 * parseInt(userData.weight)) + (5 * parseInt(userData.height) - 6.8 * parseInt(userData.age));
    }
    document.getElementById("results").style.display = 'block';
    document.getElementById("tmb").innerHTML = tmb;
    document.getElementById("kcal").innerHTML = Math.ceil(tmb * af);
    // alert('Debes consumir ' + Math.ceil(tmb) + 'Kcal');
}

function calculateIMC() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const imc = parseInt(userData.weight) / (parseInt(userData.height) / 100)**2;
    const message = (imc < 18.5 ? '🥲 Apa! Tenes bajo peso, vas a tener que empezar a comer mas. Igual tranqui, un doctor de nutrias te puede ayudar, algunos los llaman Nutricionistas' : (imc < 24.9 && imc > 18.5 ? '👌 Estas perfecto, segui asi!' : (imc < 29.9 && imc > 25 ? '🤔 Estas un poquito por encima de lo normal, nada grave' : '🥲 Ufff, tenes sobrepeso, pero no te preocupes, se puede solucionar consultandolo con un profecional')));
    document.getElementById("imc").innerHTML = message;
}