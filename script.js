const means = {
    "age": 27.734600,
    "income": 66074.848470,
    "emp_length": 4.789686,
    "loan_amnt": 9589.371106,
    "int_rate": 11.011695,
    "percent_income": 0.170203,
    "cred_hist": 5.804211
}

const std = {
    "age": 6.348078,
    "income": 61983.119168,
    "emp_length": 4.142630,
    "loan_amnt": 6322.086646,
    "int_rate": 3.240459,
    "percent_income": 0.106782,
    "cred_hist": 4.055001
}

const yellow_color = "#ffc800"
const green_color = "#18bb9c"
const red_color = "#e84c3d"

function setRisk(percent){
    if(percent<=15){
        document.getElementById("pie").style.cssText = "--p:" + percent + ";--c:" + green_color;
        document.getAnimations()[0].play();
    }else if(percent<=45){
        document.getElementById("pie").style.cssText = "--p:" + percent + ";--c:" + yellow_color;
        document.getAnimations()[0].play();
    }else{
        document.getElementById("pie").style.cssText = "--p:" + percent + ";--c:" + red_color;
        document.getAnimations()[0].play();
    }
    document.getElementById("pie").innerText = percent + "%"
}