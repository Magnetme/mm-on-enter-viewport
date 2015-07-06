//ngDoc example scripts are executed via eval. However, this doesn't support es6. This script
//replaces eval with a function that first transforms the code with 6to5 before evalling;

(function(){
	var originalEval = window.eval;
	window.eval = function es6Eval(es6) {
		return originalEval.call(window, babel.transform(es6).code);
	};

	if (window.execScript) { //IE
		var originalExec = window.execScript;
		window.execScript = function es6Eval(es6) {
			return originalExec.call(window, babel.transform(es6).code);
		};
	}
}());
