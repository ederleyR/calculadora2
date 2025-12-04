let pantalla = document.getElementById("resultado");
let current = "0";

function AgregarNumero(num) {
    if (current === "0") {
        current = num;  
    } else {
        current += num;
    }
    pantalla.value = current;
}

function AgregarDecimal() {
    let partes = current.split(/[\+\-\x\/]/);
    let ultima = partes[partes.length - 1];

    if (ultima.includes(".")) return;

    if (current === "0") {
        current = "0.";
    } else {
        current += ".";
    }

    pantalla.value = current;
}

function AgregarOperador(op) {
    if (current === "0") {
        alert("El formato usado no es válido!");
        return;
    }

    current += op;
    pantalla.value = current;
}

function ClearALL() {
    current = "0";
    pantalla.value = current;
}

function DeleteLast() {
    if (current.length === 1) {
        current = "0";
    } else {
        current = current.slice(0, -1); 
    }
    pantalla.value = current;
}
function Evaluar() {
    let expresion = current.replace(/x/g, "*"); 

    try {
      
        if (expresion.includes("/0")) {
            throw new Error("División por cero");
        }
        if(expresion.includes ("%")) {
            try {
                let numero = parseFloat(current);
                if (isNaN(numero)) throw new Error("Expresión inválida");
                current = (numero / 100).toString();
                pantalla.value = current;
            } catch (error) {
                pantalla.value = "Error";
            }
            return;
        }

        let resultado = eval(expresion);  

        if (!isFinite(resultado)) throw new Error("Inválido");

        pantalla.value = resultado;
        current = resultado.toString();

        
        setTimeout(() => {
            current = "0";
            pantalla.value = current;
        }, 3000);

    } catch (e) {
        pantalla.value = "Error";
        current = "0";
    }
}
