x="0"; //número en pantalla
xi=1; //iniciar número en pantalla: 1=si; 0=no;
coma=0; //estado coma decimal 0=no, 1=si;
ni=0; //número oculto o en espera.
op="no"; //operación en curso; "no" =  sin operación.



// Función para borrar el contenido de la pantalla
function limpiar() {
	document.getElementById('pantalla').value = '';
}

// Función para añadir números y operaciones a la pantalla
function setValue(valor) {
	// Si hay un error en la pantalla y se presiona un número, se borra el error y se escribe el número
	if (document.getElementById('pantalla').value == 'ERROR' && /[0-9]/.test(valor)) {
		document.getElementById('pantalla').value = valor;
		return;
	}

	// Si se presiona un número después de calcular una operación, se borra el resultado anterior
	if (op == 'calculado' && /[0-9]/.test(valor)) {
		document.getElementById('pantalla').value = valor;
		op = 'no';
		return;
	}

	// Si se presiona una operación después de calcular una operación, se usa el resultado anterior como primer operando
	if (op == 'calculado' && /[\+\-\*\/]/.test(valor)) {
		document.getElementById('pantalla').value = resultado.toString() + valor;
		ni = resultado;
		op = valor;
		coma = 0;
		return;
	}

	// Si se presiona un número después de haber calculado una operación y después haber borrado el resultado, se escribe el número
	if (op == 'no' && /[0-9]/.test(valor)) {
		document.getElementById('pantalla').value += valor;
		return;
	}

	// Si se presiona una operación después de haber calculado una operación y después haber borrado el resultado, se borra el resultado y se escribe la operación
	if (op == 'no' && /[\+\-\*\/]/.test(valor)) {
		document.getElementById('pantalla').value = '';
		op = valor;
		return;
	}

	// Si se presiona una coma después de haber calculado una operación y después haber borrado el resultado, se borra el resultado y se escribe "0,"
	if (op == 'no' && valor == '.') {
		document.getElementById('pantalla').value = '0,';
		coma = 1;
		return;
	}

	// Si se presiona una coma después de haber escrito un número, se escribe la coma si no se ha escrito ya
	if (valor == '.') {
		if (coma == 0) {
			document.getElementById('pantalla').value += valor;
			coma = 1;
		}
	} else {
		document.getElementById('pantalla').value += valor;
	}
}



function calcular() {
	// Obtenemos el valor de la pantalla
	var expresion = document.getElementById('pantalla').value;

	// Si no hay nada en la pantalla, mostramos ERROR
	if (expresion == '') {
		document.getElementById('pantalla').value = 'ERROR';
		return;
	}

	// Reemplazamos la expresión (a)(b) por la expresión a*b
	expresion = expresion.replace(/\((\d+)\)\((\d+)\)/g, '$1*$2');

	// Realizamos la operación con la función eval()
	var resultado = eval(expresion);

	// Si el resultado no es un número o no es finito, mostramos ERROR
	if (!isFinite(resultado)) {
		document.getElementById('pantalla').value = 'ERROR';
		return;
	}

	// Mostramos el resultado en la pantalla
	document.getElementById('pantalla').value = resultado.toString();
}

function toBin() {
    var num = parseFloat(document.getElementById('pantalla').value);
    if (!isNaN(num)) {
        var bin = num.toString(2);
        document.getElementById('pantalla').value = bin;
    }
}

function toHex() {
    var num = parseFloat(document.getElementById('pantalla').value);
    if (!isNaN(num)) {
        var hex = num.toString(16);
        document.getElementById('pantalla').value = hex;
    }
}

function toOct() {
    var num = parseFloat(document.getElementById('pantalla').value);
    if (!isNaN(num)) {
        var oct = num.toString(8);
        document.getElementById('pantalla').value = oct;
    }
}

function raiz() {
	// Obtenemos el valor de la pantalla
	var expresion = document.getElementById("pantalla").value;
  
	// Convertimos la expresión a número y calculamos su raíz cuadrada
	var resultado = Math.sqrt(parseFloat(expresion));
  
	// Si el resultado no es un número o no es finito, mostramos ERROR
	if (!isFinite(resultado)) {
	  document.getElementById("pantalla").value = "ERROR";
	  return;
	}
  
	// Mostramos el resultado en la pantalla
	document.getElementById("pantalla").value = resultado.toString();
  }

  function porcentaje() {
	// Obtenemos el valor de la pantalla
	var expresion = document.getElementById("pantalla").value;
  
	// Convertimos la expresión a número y calculamos el porcentaje
	var resultado = parseFloat(expresion) / 100;
  
	// Si el resultado no es un número o no es finito, mostramos ERROR
	if (!isFinite(resultado)) {
	  document.getElementById("pantalla").value = "ERROR";
	  return;
	}
  
	// Mostramos el resultado en la pantalla
	document.getElementById("pantalla").value = resultado.toString();
  }