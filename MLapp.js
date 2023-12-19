//imports the trained model along with data that is used for text pre-proccessing
import dict from './dict.json' assert {type:'json'};
const model = await tf.loadLayersModel('model.json');

//encodes text
function encoder(str) {
    str = str.toLowerCase().split(' ');
    var hotEncode = Array(10000).fill(0);
    for (var i = 0; i < str.length; i++) {
        if (str[i] in dict) {
            hotEncode[dict[str[i]] + 3] = 1;
        } 
    }
    return hotEncode;
}

function predict() {
    var text = document.getElementById('input').value;
    var output = model.predict(tf.tensor2d([encoder(text)]));
    document.getElementById('output').style.width = (output.dataSync()[0] * 100).toString() + '%';
    document.getElementById('output2').innerHTML = 'Result: ' + Number((output.dataSync()[0] * 100).toFixed(1)).toString() + '%' + ' confidence in positive sentiment';
    console.log((output.dataSync()[0] * 100).toString());
}

let button = document.getElementById('btn');
button.addEventListener('click', predict);
