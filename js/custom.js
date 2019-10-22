function Iteracao(id, X, Fx, taxaDeErro, A, B) {
  this.id = id;
	this.A = A;
  this.B = B;
  this.X = X;
  this.Fx = Fx;
  this.taxaDeErro = taxaDeErro;
}
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
    return parseFloat(total.toFixed(4));
  },
  calcularMaxIteracoes : function(A, B, errorTax){
    var valor = (B - A)/errorTax;
    var total = Math.log(valor)/Math.log(2);
    return parseInt(total,10)
  },
  calcularPontoMedio : function(A,B){
    var total = (A + B) / 2;
    return parseFloat(total.toFixed(4));
  },
  calcularTaxaDeErro : function(A,B){
    var total = (B - A) / 2;
    return parseFloat(total.toFixed(4));
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

    var iteracao = new Iteracao(0, A, parseFloat(Fa.toFixed(4)) , "-");
    iteracoes.push(iteracao);
    var iteracao = new Iteracao(1, B, parseFloat(Fb.toFixed(4)), Math.abs(A - B));
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
    var iteracao = new Iteracao(id, parseFloat(total.toFixed(4)), parseFloat(Ftotal.toFixed(4)), parseFloat(Math.abs(scope.b - total).toFixed(4)));
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
    return parseFloat(total.toFixed(4));
  },
  show : function(){
    $("#table-secantes").empty();
    $("#table-bissecao").empty();
    window.scrollTo({ top: 600, behavior: 'smooth' });
  }
}
