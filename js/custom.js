const casasDecimais = 5;
function Iteracao(id, X, Fx, taxaDeErro, A, B) {
  this.id = id;
	this.A = A;
  this.B = B;
  this.X = X;
  this.Fx = Fx;
  this.taxaDeErro = taxaDeErro;
}
$('#defaultCheck1').click(function(){
  if($('#defaultCheck1').is(':checked')){
    $('#valueBNewton').attr('disabled','true');
    $('#valueBNewton').val('');
  }else{
    $('#valueBNewton').removeAttr("disabled");
  }
});
$('#secantes').click(function(){
  secantes.init();
});
$('#secButton').click(function(){
  secantes.show();
});
$('#bissecao').click(function(){
  bissecao.init();
});
$('#bisButton').click(function(){
  bissecao.show();
});
$('#newton').click(function(){
  newton.init();
});
$('#newButton').click(function(){
  newton.show();
});
$('#juros').click(function(){
  juros.init();
});
$('#jurosButton').click(function(){
  juros.show();
});
bissecao = {
  init : function(){
    var iteracoes = [];
    var A = parseFloat($('#valueA').val());
    var B = parseFloat($('#valueB').val());
    var X = bissecao.calcularPontoMedio(A,B);
    var Fx = bissecao.funcao(X);
    var taxErro = $('#errorTax').val();
    var maxIt = bissecao.calcularMaxIteracoes(A, B, taxErro);
    var iteracao = new Iteracao(0,X, Fx, "-", A, B);
    iteracoes.push(iteracao);
    for(var i = 1; i <= maxIt; i++){
      if(iteracoes[i - 1].Fx > 0){
        B = iteracoes[i - 1].X;
      }else{
        A = iteracoes[i - 1].X;
      }
      X = bissecao.calcularPontoMedio(A,B);
      Fx = bissecao.funcao(X);
      var taxaDeErro = bissecao.calcularTaxaDeErro(A,B);
      var iteracao = new Iteracao(i, X, Fx, Math.abs(taxaDeErro), A, B);
      iteracoes.push(iteracao);
    }
    bissecao.drawTable(iteracoes);
  },
  funcao : function(value){
    var scope = {
      x: value
    }
    var funcao = $("#function").val();
    var total = math.evaluate(funcao, scope);
    return parseFloat(total.toFixed(casasDecimais));
  },
  calcularMaxIteracoes : function(A, B, errorTax){
    var valor = (B - A)/errorTax;
    var total = Math.log(valor)/Math.log(2);
    return parseInt(total,10)
  },
  calcularPontoMedio : function(A,B){
    var total = (A + B) / 2;
    return parseFloat(total.toFixed(casasDecimais));
  },
  calcularTaxaDeErro : function(A,B){
    var total = (B - A) / 2;
    return parseFloat(total.toFixed(casasDecimais));
  },
  drawTable : function(iteracoes){
    $("#table-bissecao").empty();
    var taxErro = $('#errorTax').val();
    $('#table-bissecao').append(`<thead id='thead-bissecao'><tr><th scope='col'>n</th><th scope='col'>An</th><th scope='col'>Bn</th><th scope='col'>Xn</th><th scope='col'>f(Xn)</th><th scope='col'>Taxa de Erro(${taxErro})</th></tr></thead><tbody id='tbody-bissecao'></tbody>`);
     for(var i = 0; i < iteracoes.length; i++){
       var element = iteracoes[i];
       $('#tbody-bissecao').append(`<tr><th>${element.id}</th><th>${element.A}</th><th>${element.B}</th><th>${element.X}</th><th>${element.Fx}</th><th>${element.taxaDeErro}</th></tr>`)
     }
  },
  show : function(){
    $("#table-bissecao").empty();
    $("#table-secantes").empty();
    $("#table-juros").empty();
    $("#table-newton").empty();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
secantes ={
  init : function(){
    var iteracoes = [];
    var A = parseFloat($('#valueASec').val());
    var B = parseFloat($('#valueBSec').val());
    var taxErro = $('#errorTaxSec').val();
    var id = 2;

    var Fa = this.funcao(A);
    var Fb = this.funcao(B);

    var iteracao = new Iteracao(0, A, parseFloat(Fa.toFixed(casasDecimais)) , "-");
    iteracoes.push(iteracao);
    var iteracao = new Iteracao(1, B, parseFloat(Fb.toFixed(casasDecimais)), Math.abs(A - B));
    iteracoes.push(iteracao);
    var erro = 1;
    while(erro > taxErro){
      iteracoes.push(this.calcular(iteracoes, id));
      erro = iteracoes[id].taxaDeErro;
      id++;
    }
    secantes.drawTable(iteracoes);
  },
  calcular : function(iteracoes, id){
    var scope = {
      a: iteracoes[id-2].X,
      b: iteracoes[id-1].X,
      c: iteracoes[id-2].Fx,
      d: iteracoes[id-1].Fx
    }
    var total = math.evaluate("((a*d)-(b*c))/(d-c)", scope);
    var Ftotal = secantes.funcao(total);
    var iteracao = new Iteracao(id, parseFloat(total.toFixed(casasDecimais)), parseFloat(Ftotal.toFixed(casasDecimais)), parseFloat(Math.abs(scope.b - total).toFixed(casasDecimais)));
    return iteracao;
  },
  drawTable : function(iteracoes){
    $("#table-secantes").empty();
    var taxErro = $('#errorTaxSec').val();
    $('#table-secantes').append(`<thead id='thead-secantes'><tr><th scope='col'>n</th><th scope='col'>Xn</th><th scope='col'>f(Xn)</th><th scope='col'>Taxa de Erro(${taxErro})</th></tr></thead><tbody id='tbody-secantes'></tbody>`);
     for(var i = 0; i < iteracoes.length; i++){
       var element = iteracoes[i];
       $('#tbody-secantes').append(`<tr><th>${element.id}</th><th>${element.X}</th><th>${element.Fx}</th><th>${element.taxaDeErro}</th></tr>`)
     }
  },
  funcao : function(value){
    var scope = {
      x: value
    }
    var funcao = $("#functionSec").val();
    var total = math.evaluate(funcao, scope);
    return parseFloat(total.toFixed(casasDecimais));
  },
  show : function(){
    $("#table-secantes").empty();
    $("#table-bissecao").empty();
    $("#table-juros").empty();
    $("#table-newton").empty();
    window.scrollTo({ top: 600, behavior: 'smooth' });
  }
}
newton = {
  init : function(){
    var iteracoes = [];
    var A = parseFloat($('#valueANewton').val());
    var B = parseFloat($('#valueBNewton').val());
    var taxErro = $('#errorTaxNewton').val();
    var funcao = $("#functionNewton").val();
    var erro = 1
    var id = 1;
    var valorInicial = this.valorInicial(funcao, A, B);

    if($('#defaultCheck1').is(':checked')){
      valorInicial = A;
    }
    var Fa = this.funcao(funcao, valorInicial);

    var iteracao = new Iteracao(0, valorInicial, parseFloat(Fa.toFixed(casasDecimais)) , "-");
    iteracoes.push(iteracao);

    while(erro > taxErro){
      this.calcular(iteracoes, id);
      erro = iteracoes[id].taxaDeErro;
      id++;
      if(id > 100){
        console.log("Vazando do while id: " + id)
        break;
      }
    }

    this.drawTable(iteracoes);
  },
  valorInicial : function(funcao, A, B){
    var funcao1 = math.derivative(funcao,"x").toString();
    var funcao2 = math.derivative(funcao1,"x").toString();
    var valueA = this.funcao(funcao, A) * this.funcao(funcao2, A);
    return valueA>1 ? A : B;
  },
  calcular : function(iteracoes, id){
    var funcao = $("#functionNewton").val();
    var funcao1 = math.derivative(funcao,"x").toString();
    var valor = iteracoes[id - 1].X;
    var Fx = this.funcao(funcao, valor);
    var Fx1 = this.funcao(funcao1, valor);
    var total = valor - ( Fx / Fx1 );
    var erro = Math.abs(total - valor);
    var Fx = this.funcao(funcao, total);
    var iteracao = new Iteracao(id, parseFloat(total.toFixed(casasDecimais)), parseFloat(Fx.toFixed(casasDecimais)), parseFloat(erro.toFixed(casasDecimais)));
    iteracoes.push(iteracao);
  },
  funcao : function(funcao, value){
    var scope = {
      x: value
    }
    var total = math.evaluate(funcao, scope);
    return parseFloat(total.toFixed(casasDecimais));
  },
  show : function(){
    $("#table-secantes").empty();
    $("#table-bissecao").empty();
    $("#table-newton").empty();
    $("#table-juros").empty();
    window.scrollTo({ top: 1200, behavior: 'smooth' });
  },
  drawTable : function(iteracoes){
    $("#table-newton").empty();
    var taxErro = $('#errorTaxNewton').val();
    $('#table-newton').append(`<thead id='thead-newton'><tr><th scope='col'>n</th><th scope='col'>Xn</th><th scope='col'>f(Xn)</th><th scope='col'>Taxa de Erro(${taxErro})</th></tr></thead><tbody id='tbody-newton'></tbody>`);
     for(var i = 0; i < iteracoes.length; i++){
       var element = iteracoes[i];
       $('#tbody-newton').append(`<tr><th>${element.id}</th><th>${element.X}</th><th>${element.Fx}</th><th>${element.taxaDeErro}</th></tr>`)
     }
  },
}
juros = {
  init : function(){
    var iteracoes = [];
    var jurosPMT = $("#jurosPMT").val();
    var jurosFV = $('#jurosFV').val();
    var jurosN = $('#jurosN').val();
    var jurosErro = $('#jurosErro').val();
    var funcao = "(1 + x)^ " + jurosN +" - 1 - x * (" + jurosFV + "/" + jurosPMT + ")";
    var erro = 1;
    var id = 1;
    var valorInicial = this.valorInicial(jurosPMT, jurosFV, jurosN);
    var Fa = this.funcao(funcao, valorInicial);

    var iteracao = new Iteracao(0, valorInicial, parseFloat(Fa.toFixed(casasDecimais)) , "-");
    iteracoes.push(iteracao);

    while(erro > jurosErro){
      this.calcular(iteracoes, id, funcao);
      erro = iteracoes[id].taxaDeErro;
      id++;
      if(id > 100){
        break;
      }
    }
    this.drawTable(iteracoes);
  },
  valorInicial : function(jurosPMT, jurosFV, jurosN){
    var funcao = jurosFV + "/ ("+ jurosPMT +" * " + jurosN +"^2) - " + jurosPMT + "/"+ jurosFV;
    var total = math.evaluate(funcao);
    return parseFloat(total.toFixed(casasDecimais));
  },
  calcular : function(iteracoes, id, funcao){
    var funcao1 = math.derivative(funcao,"x").toString();
    var valor = iteracoes[id - 1].X;
    var Fx = this.funcao(funcao, valor);
    var Fx1 = this.funcao(funcao1, valor);
    var total = valor - ( Fx / Fx1 );
    var erro = Math.abs(total - valor);
    var Fx = this.funcao(funcao, total);
    var iteracao = new Iteracao(id, parseFloat(total.toFixed(casasDecimais)), parseFloat(Fx.toFixed(casasDecimais)), parseFloat(erro.toFixed(casasDecimais)));
    iteracoes.push(iteracao);
  },
  funcao : function(funcao, value){
    var scope = {
      x: value
    }
    var total = math.evaluate(funcao, scope);
    return parseFloat(total.toFixed(casasDecimais));
  },
  show : function(){
    $("#table-secantes").empty();
    $("#table-bissecao").empty();
    $("#table-newton").empty();
    $("#table-juros").empty();
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  },
  drawTable : function(iteracoes){
    $("#table-juros").empty();
    var taxErro = $('#jurosErro').val();
    $('#table-juros').append(`<thead id='thead-juros'><tr><th scope='col'>n</th><th scope='col'>Xn</th><th scope='col'>f(Xn)</th><th scope='col'>Taxa de Erro(${taxErro})</th></tr></thead><tbody id='tbody-juros'></tbody>`);
     for(var i = 0; i < iteracoes.length; i++){
       var element = iteracoes[i];
       $('#tbody-juros').append(`<tr><th>${element.id}</th><th>${element.X}</th><th>${element.Fx}</th><th>${element.taxaDeErro}</th></tr>`)
     }
  },
}
