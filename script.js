const means = {
    "age": 27.143719,
    "income": 63760.645569,
    "emp_length": 4.596582,
    "loan_amnt": 9173.795068,
    "int_rate": 10.753838,
    "percent_income": 0.162511,
    "cred_hist": 5.477440
}

const std = {
    "age": 5.107622,
    "income": 34709.039770,
    "emp_length": 3.676636,
    "loan_amnt": 5680.218512,
    "int_rate": 2.989239,
    "percent_income": 0.096933,
    "cred_hist": 3.537701
}

let _model;

tf.loadLayersModel("model.json").then(model => {
    _model = model;
})

const yellow_color = "#ffc800"
const green_color = "#4bc970"
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

function retrieveData(){
    let array = Array(25).fill(0);
    array[0] = (parseInt(document.getElementById("age").value) - means["age"]) / std["age"];
    array[1] = (parseInt(document.getElementById("income").value) - means["income"]) / std["income"];
    array[2] = (parseInt(document.getElementById("emp").value) - means["emp_length"]) / std["emp_length"];
    array[3] = (parseInt(document.getElementById("amnt").value) - means["loan_amnt"]) / std["loan_amnt"];
    array[4] = (parseFloat(document.getElementById("int").value) - means["int_rate"]) / std["int_rate"];
    array[5] = ((parseInt(document.getElementById("amnt").value) / parseInt(document.getElementById("income").value)) - means["percent_income"]) / std["percent_income"];
    array[6] = (document.getElementById("default").value == "Yes") ? 1 : 0;
    array[7] = (parseInt(document.getElementById("hist").value) - means["cred_hist"]) / std["cred_hist"];
    switch(document.getElementById("home").value){
        case("mortgage"):
            array[8] = 1;
            break;
        case("other"):
            array[9] = 1;
            break;
        case("own"):
            array[10] = 1;
            break;
        case("rent"):
            array[11] = 1;
            break;
    }
    switch(document.getElementById("intent").value){
        case("debt"):
            array[12] = 1;
            break;
        case("education"):
            array[13] = 1;
            break;
        case("home"):
            array[14] = 1;
            break;
        case("medical"):
            array[15] = 1;
            break;
        case("personal"):
            array[16] = 1;
            break;
        case("venture"):
            array[17] = 1;
            break;
    }
    switch(document.getElementById("grade").value){
        case("a"):
            array[18] = 1;
            break;
        case("b"):
            array[19] = 1;
            break;
        case("c"):
            array[20] = 1;
            break;
        case("d"):
            array[21] = 1;
            break;
        case("e"):
            array[22] = 1;
            break;
        case("f"):
            array[23] = 1;
            break;
        case("g"):
            array[24] = 1;
            break;
    }
    return tf.tensor(array, [1,25]);
}

let pred;
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    pred = _model.predict(retrieveData()).as1D();
    pred_percent = Math.round(pred.dataSync()[0] * 10000)/100;
    document.getElementById("pie").innerText = pred_percent + "%";
    setRisk(pred_percent);
    window.scrollTo({top: 0, behavior: 'smooth'});
  });