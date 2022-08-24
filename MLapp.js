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

//test data
// var text1 = "this movie is absoulte crap";
// var text = "this film was just brilliant casting location scenery story direction everyone's really suited the part they played and you could just imagine being there robert ? is an amazing actor and now the same being director ? father came from the same scottish island as myself so i loved the fact there was a real connection with this film the witty remarks throughout the film were great it was just brilliant so much that i bought the film as soon as it was released for ? and would recommend it to everyone to watch and the fly fishing was amazing really cried at the end it was so sad and you know what they say if you cry at a film it must have been good and this definitely was also ? to the two little boy's that played the ? of norman and paul they were just brilliant children are often left out of the ? list i think because the stars that play them all grown up are such a big profile for the whole film but these children are amazing and should be praised for what they have done don't you think the whole story was so lovely because it was true and was someone's life after all that was shared with us all"
// //model predictions
// model.predict(tf.tensor2d([encoder(text1)])).print();