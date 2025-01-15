// RICHIAMO TUTTI GLI ELEMENTI CHE MI SERVONO DAL FILE INDEX
const inputName = document.getElementById("inputName");
const inputSurname = document.getElementById("inputSurname");
const inputEmail = document.getElementById("inputEmail");
const selectTypeWork = document.getElementById("selectTypeWork");
const inputPromoCode = document.getElementById("inputPromoCode");
const checkPrivacyPolicy = document.getElementById("checkPrivacyPolicy");
const submitButton = document.getElementById("submitButton");

const BEPricePerHour = 20.50
const FEPricePerHour = 15.30
const PAPricePerHour = 33.60

const validPromoCode = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"]

// FUNZIONE PER LA GESTIONE DEL RESPONSE DELLA VALIDAZIONE
function handleValidationClass(input, isValid){
    if(isValid){
        input.classList.remove(`is-invalid`);
        input.classList.add(`is-valid`);
    } else{
        input.classList.remove(`is-valid`);
        input.classList.add(`is-invalid`);
    } 
    return
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
function calcFinalPrice(pricePerHour){
    let finalPrice = pricePerHour * 10;
    const priceInEuro = `€${finalPrice.toFixed(2).replace("." , ",")}`;

    return console.log(priceInEuro);    
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
    const validSelect = valueTypeWork !== "notAvailable"
    const validUserPromoCode = handleValidationClass(inputPromoCode, validPromoCode.includes(valuePromoCode)) ;
    const validCheckbox = handleValidationClass(checkPrivacyPolicy, checkPrivacyPolicy.checked);
    
    // RICHIAMO LA FUNZIONE PER IL PREZZO DOPO AVER VERIFICATO IL LAVORO SCELTO
    if(validName && validSurname && validEmail && validSelect && validCheckbox){
        if(valueTypeWork === "devBackend"){
            calcFinalPrice(BEPricePerHour);
        }
        if(valueTypeWork === "devFrontend"){
            calcFinalPrice(FEPricePerHour);
        }
        if(valueTypeWork === "prjAnalysis"){
            calcFinalPrice(PAPricePerHour);
        }
    } else{
        console.log("non valido");
    }       
})