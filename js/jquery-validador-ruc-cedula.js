//Funciones Matemáticas de Validación
function validarCedula(numero) {
    if (!numero || numero.length != 10) {
        return false;
    }
    //if is Not A Number
    if (isNaN(numero)) {
        return false;
    }

    var digitos = new Array();
    var j;
    for (i = 0; i <= 9; i++) {
        j = i + 1;
        digitos[i] = numero.substring(i, j);
    }
    var verificador = parseInt(digitos[9]);

    for (i = 0; i <= 8; i++) {
        j = parseInt(digitos[i]);
        j = j * 2;
        if (j > 9) {
            j = j - 9;
        }
        digitos[i] = j;
        i = i + 1;
    }

    var sum = 0;
    for (i = 0; i < 9; i++) {
        sum = sum + parseInt(digitos[i]);
    }

    var cont = 0;
    while (cont < sum) {
        cont = cont + 10;
    }

    if ((cont - sum) == verificador) {
        return true;
    }
    return false;
}

function validarRUC(numero) {
    if (!numero || numero.length != 13) {
        return false;
    }
    //if is Not A Number
    if (isNaN(numero)){
        return false;
    }
    if (numero.substring(10, 13) != "001") {
        return false;
    }
    
    if (parseInt(numero.substring(0, 1)) > 22) {
        return false;
    }
    var verificador = parseInt(numero.substring(9, 10));

    var Coeficientes = "212121212";
    var Divisor = 10;
    var Residuo = 0;
    var Resultado = 0;
    var Restar9 = true;

    if (numero.substring(2, 3) == "9") {
        Coeficientes = "432765432";
        Divisor = 11;
        Restar9 = false;
    }
    if (numero.substring(2, 3) == "6") {
        verificador = parseInt(numero.substring(8, 9));
        Coeficientes = "32765432";
        Divisor = 11;
        Restar9 = false;
    }

    var Suma = 0;
    var Valor1 = 0;
    var Valor2 = 0;
    var Prod = 0;
    var j = 0;

    for (i = 0; i < Coeficientes.length; i++) {
        j = i + 1;
        Valor1 = parseInt(Coeficientes.substring(i, j));
        Valor2 = parseInt(numero.substring(i, j));
        Prod = Valor1 * Valor2;
        if (Prod > 9 && Restar9) {
            Prod = Prod - 9;
        }
        Suma = Suma + Prod;
    }
    Residuo = Suma % Divisor;
    if (Residuo == 0) {
        Resultado = 0;
    } else {
        Resultado = Divisor - Residuo;
    }
    if (Resultado == verificador) {
        return true;
    }
    return false;
}

//Funciones Personalizadas para la aplicacion

$(document).ready(function () {
    $(".identificacion").each(function (index) {
        var _tipo = $(this).attr("data-tipo");
        var numero = $(this).val();
        var _img = $(this).parent().parent().find("img.val-cedula-ruc");
        var _bloquear = false;

        if (!numero || numero.length == 0) {
            _img.attr("src", "images/alert-question.png");
            $(this).attr("data-identificacion-correcta", false);
            //_bloquear = true;
        } else {
            var _result = false;
            if (_tipo == "C") {
                _result = validarCedula(numero);
            }
            if (_tipo == "R") {
                _result = validarRUC(numero);
            }
            if (_result) {
                _img.attr("src", "images/alert-ok.png");
                _img.attr("title", "No. de Identificación Válido");
                $(this).attr("data-identificacion-correcta", true);
            } else {
                _img.attr("src", "images/alert-error.png");
                _img.attr("title", "No. de Identificación Inválido");
                $(this).attr("data-identificacion-correcta", false);
                _bloquear = true;
            }
        }
        if (_bloquear == true) {
            //Error Inicial
            if (typeof CedulaRucInvalidoOnInit == 'function') {
                CedulaRucInvalidoOnInit($(this));
            }
        }
    });
});

$(".identificacion").keydown(function (e) {
	var ret = false;
	if (e.keyCode == 8 || e.keyCode == 46){
		ret = true;
	}
	if (e.keyCode >= 48 && e.keyCode <= 57){
		ret = true;
	}
	if (e.keyCode >= 96 && e.keyCode <= 105){
		ret = true;
	}
	return ret;
});

$(".identificacion").keyup(function (e) {
	var _tipo = $(this).attr("data-tipo");
    var numero = $(this).val();
    var _img = $(this).parent().parent().find("img.val-cedula-ruc");
    if (!numero || numero.length == 0) {
        _img.attr("src", "images/alert-question.png");
        $(this).attr("data-identificacion-correcta", false);
    } else {
        var _result = false;
        if (_tipo == "C") {
            _result = validarCedula(numero);
        }
        if (_tipo == "R") {
            _result = validarRUC(numero);
        }
        if (_result) {
            _img.attr("src", "images/alert-ok.png");
            _img.attr("title", "No. de Identificación Válido");
			if (typeof CedulaRucValidosOnKeyUp == 'function') {
				CedulaRucValidosOnKeyUp($(this));
			}
            $(this).attr("data-identificacion-correcta", true);
        } else {
            _img.attr("src", "images/alert-error.png");
            _img.attr("title", "No. de Identificación Inválido");
			if (typeof CedulaRucInvalidoOnKeyUp == 'function') {
                CedulaRucInvalidoOnKeyUp($(this));
            }
            $(this).attr("data-identificacion-correcta", false);
        }
    }
});

$(".identificacion").change(function () {
    $(".identificacion").each(function (index) {
        var _ok = $(this).attr("data-identificacion-correcta");
        if (_ok == "false") {
            if (typeof CedulaRucInvalidoOnChange == 'function') {
                CedulaRucInvalidoOnChange($(this));
            }
            return false;
        }
    });
});