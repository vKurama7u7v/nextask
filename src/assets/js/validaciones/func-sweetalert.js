console.log("func-sweetalert.js cargado");

function countChars(obj){
  var maxLength = 30;
  var strLength = obj.value.length;
  var charRemain = (maxLength - strLength);

  if (charRemain < 0) {
    document.getElementById("counter").innerText = maxLength;
  } else {
    document.getElementById("counter").innerText = charRemain;
  }

}