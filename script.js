// initial step number and step count
let stepNumber = 1;
let stepCount = 3;

// get Dom elements
const steps = document.querySelectorAll(".step");
const prevBtn = document.querySelector(".prev-button")
const nextBtn = document.querySelector(".next-button")

const getFromLocalStorage = () => {
    try {
        const localStorageData = localStorage.getItem("stepInfo");
        if (localStorageData) {
            stepNumber = JSON.parse(localStorageData)
        }
    } catch (error) {

    }
}

const setStepToLocalStorage = () => {
    try {
        localStorage.setItem("stepInfo", JSON.stringify(stepNumber))
    } catch (error) {
        console.error("Error retrieving step number from lovcal storage:", error)
    }
}

// initialize baseUrl
let baseUrl = "";

const getBaseUrl = () => {
    const currentUrl = window.location.href;
    const pathArray = currentUrl.split("/");
    baseUrl = pathArray[0] + "//" + pathArray[2];
}

getBaseUrl();

const setUrl = () => {
    // send step as a querry parameter
    window.location.href = `${baseUrl}?step=${stepNumber}`;
}

const getFromUrl = () => {
    let currentUrl = window.location.href;
    let params = new URLSearchParams(new URL(currentUrl).search);
    let step = params.get("step");
    stepNumber = step ? Number(step) : Number(stepNumber);
}


const isPrevBtnEnable = () => {
    return stepNumber !== 1;
}

const isNextBtnEnable = () => {
    return stepNumber !== stepCount;
}

const isButtonsEnable = () => {
    // enable/ disable previos and next buttons based on step number
    prevBtn.disabled = !isPrevBtnEnable();
    nextBtn.disabled = !isNextBtnEnable();
}

const setCurrentStep = () => {
    // update current step style
    isButtonsEnable();
    for (let index = 0; index < stepCount; index++) {
        if (index < stepNumber) {
            // Add step-success class to completed steps
            !steps[index].classList.contains("step-success") && steps[index].classList.add("step-success")
        } else {
            steps[index].classList.contains("step-success") && steps[index].classList.remove("step-success")
        }
    }
}

const buttonEventHandler = (type) => {
    try {
        // handle button click event
        // we need to know witch button is clicked so add argument
        if (type === "prev") {
            // first avoid doing anything even user change disable setting from inspect
            // user can remove or add disabled attr in inspect like I do so you dont allow to do anything if user enable this button even if it is disable
            if (!isPrevBtnEnable()) return
            stepNumber -= 1;
        } else {
            if (!isNextBtnEnable()) return
            stepNumber += 1;
        }
        console.log(stepNumber)
        setCurrentStep();
        // setStepToLocalStorage();
        setUrl();

    } catch (error) {
        console.error("Error Handling button event: ", error)
    }
}

// Event listoners
// this func is called like bellow to pass argument later 
prevBtn.addEventListener("click", () => buttonEventHandler("prev"))
nextBtn.addEventListener("click", () => buttonEventHandler("next"))

// initialization 
// steps is begining with step one if you dont want it set stepNumber from 0
// getFromLocalStorage();
getFromUrl();
setCurrentStep();