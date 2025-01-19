// RICHIAMO TUTTI GLI ELEMENTI CHE MI SERVONO DAL FILE INDEX
const inputName = document.getElementById("inputName");
const inputSurname = document.getElementById("inputSurname");
const inputEmail = document.getElementById("inputEmail");
const selectTypeWork = document.getElementById("selectTypeWork");
const inputPromoCode = document.getElementById("inputPromoCode");
const checkPrivacyPolicy = document.getElementById("checkPrivacyPolicy");
const submitButton = document.getElementById("submitButton");
const boxFinalPrice = document.getElementById("boxFinalPrice");
const displayFinalPrice = document.getElementById("displayFinalPrice");

// (BONUS) ARRAY DI OGGETTI PER POPOLARE LE OPTIONI DELL'INPUT SELECT
const arrayTypeWork = [
    {
        option: "Sviluppo Backend",
        price: 20.50
    } ,
    {
        option: "Sviluppo Frontend",
        price: 15.30
    } ,
    {
        option: "Analisi Progettuale",
        price: 33.60
    }
];

// POPOLAMENTO DELLE OPTION
arrayTypeWork.forEach(element => {
    const optionLast = document.createElement(`option`);
    optionLast.innerHTML = element.option;
    selectTypeWork.append(optionLast);
});
console.log(arrayTypeWork);

// ARRAY CHE CONTIENE TUTTI I CODICI PROMOZIONALI VALIDI
const validPromoCode = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"]

// FUNZIONE PER LA GESTIONE DEL RESPONSE DELLA VALIDAZIONE
function handleValidationClass(input, isValid){
    if(isValid){
        input.classList.remove(`is-invalid`);
        input.classList.add(`is-valid`);
        return true
    } else{
        input.classList.remove(`is-valid`);
        input.classList.add(`is-invalid`);
        return false
    } 
}

// FUNZIONE PER LA VALIDITA' DEGLI INPUT
function handleValidationInput(value, input){
    if(value === "" || /\d/.test(value)){
        handleValidationClass(input, false);
        return false
    } else{
        handleValidationClass(input, true);
        return true
    } 
}

// FUNZIONE PER IL CALCOLO DEL PREZZO DEL LAVORO
function calcFinalPrice(value, PromoCode){
    arrayTypeWork.forEach(element => {
        const arrayOption = element.option;
        const arrayPrice = element.price;
        let finalPrice = arrayPrice * 10;
        const discount = 25;

        if(value === arrayOption && PromoCode){
            const discountedPrice = finalPrice - (finalPrice * discount) / 100;
            const finalPriceInEuro = discountedPrice.toFixed(2).replace("." , ",");
            return arrayFinalPrice = finalPriceInEuro.split(",");
        } else if(value === arrayOption){
            const finalPriceInEuro = finalPrice.toFixed(2).replace("." , ",");
            return arrayFinalPrice = finalPriceInEuro.split(",");
        }
    });
}

// EVENTO AL "CLICK" DEL FORM
submitButton.addEventListener("click", function(e){
    e.preventDefault();
    
    // RICHIAMO I VALORI DEGLI INPUT CHE MI SERVONO
    const valueName = inputName.value;
    const valueSurname = inputSurname.value;    
    const valueEmail = inputEmail.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valueTypeWork = selectTypeWork.value;
    const valuePromoCode = inputPromoCode.value;

    // VERIFICO LA VALIDITA' DEGLI INPUT
    const validName = handleValidationInput(valueName, inputName);
    const validSurname = handleValidationInput(valueSurname, inputSurname);
    const validEmail = handleValidationClass(inputEmail, emailRegex.test(valueEmail));
    const validSelect = handleValidationClass(selectTypeWork, valueTypeWork !== "notAvailable");
    const validUserPromoCode = handleValidationClass(inputPromoCode, validPromoCode.includes(valuePromoCode));
    const validCheckbox = handleValidationClass(checkPrivacyPolicy, checkPrivacyPolicy.checked);
    
    // ATTIVO L'ANIMAZIONE DEL BOTTONE E IL CALCOLO DEL PREZZO SOLO SE TUTTI GLI INPUT OBBLIGATORI SONO STATI COMPILATI CORRETTAMENTE
    if(validName && validSurname && validEmail && validSelect && validCheckbox){
        
        // ATTIVO ANIMAZIONE PER IL BOTTONE
        submitButton.disabled = true;
        const spinner = submitButton.querySelector("#spinner");
        const statusSpan = submitButton.querySelector("#status");
        const ogStatusText = statusSpan.innerHTML;

        spinner.classList.toggle("d-none");
        statusSpan.innerHTML = "Calcolo...";
        
        setTimeout(() => {
            
            // CALCOLO IL PREZZO E LO STAMPO NEL FORM
            calcFinalPrice(valueTypeWork, validUserPromoCode);

            boxFinalPrice.classList.remove("d-none");
            displayFinalPrice.innerHTML = `<span class="fw-bold fs-4">€ ${arrayFinalPrice[0]}</span><span class="fw-light fs-5">,${arrayFinalPrice[1]}</span>`;
            
            // DOPO IL CALCOLO TORNO ALLO STATUS ORIGINALE DEL BOTTONE
            submitButton.disabled = false;
            spinner.classList.toggle("d-none");
            statusSpan.innerHTML = ogStatusText;
        }, 300);
    } 
})