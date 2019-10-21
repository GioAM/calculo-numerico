function Iteracao(id, A, B, X, Fx, taxaDeErro) {
  this.id = id;
	this.A = A;
  this.B = B;
  this.X = X;
  this.Fx = Fx;
  this.taxaDeErro = taxaDeErro;
}
function IteracaoSec(id, X, Fx, taxaDeErro) {
  this.id = id;
  this.X = X;
  this.Fx = Fx;
  this.taxaDeErro = taxaDeErro;
}
$('#bissecao').click(function(){
  bissecao();
});
function calcularMaxIteracoes(A, B, errorTax){
  var valor = (B - A)/errorTax;
  var total = Math.log(valor)/Math.log(2);
  return parseInt(total,10)
}
function funcao(value){
  var scope = {
    x: value
  }
  var funcao = $("#function").val();
  var total = math.evaluate(funcao, scope);
  return parseFloat(total.toFixed(4));
}
function calcularPontoMedio(A,B){
  var total = (A + B) / 2;
  return parseFloat(total.toFixed(4));
}
function calcularTaxaDeErro(A,B){
  var total = (B - A) / 2;
  return parseFloat(total.toFixed(4));
}
function drawTable(iteracoes){
  $("#table-bissecao").empty();
  var taxErro = $('#errorTax').val();
  $('#table-bissecao').append(`<thead id='thead-bissecao'><tr><th scope='col'>n</th><th scope='col'>An</th><th scope='col'>Bn</th><th scope='col'>Xn</th><th scope='col'>f(Xn)</th><th scope='col'>Taxa de Erro(${taxErro})</th></tr></thead><tbody id='tbody-bissecao'></tbody>`);
   for(var i = 0; i < iteracoes.length; i++){
     var element = iteracoes[i];
     $('#tbody-bissecao').append(`<tr><th>${element.id}</th><th>${element.A}</th><th>${element.B}</th><th>${element.X}</th><th>${element.Fx}</th><th>${element.taxaDeErro}</th></tr>`)
   }
}
function bissecao(){
  var iteracoes = [];
  var A = parseFloat($('#valueA').val());
  var B = parseFloat($('#valueB').val());
  var X = calcularPontoMedio(A,B);
  var Fx = funcao(X);
  var taxErro = $('#errorTax').val();
  var maxIt = calcularMaxIteracoes(A, B, taxErro);
  var iteracao = new Iteracao(0, A, B, X, Fx, "-");
  iteracoes.push(iteracao);
  for(var i = 1; i <= maxIt; i++){
    if(iteracoes[i - 1].Fx > 0){
      B = iteracoes[i - 1].X;
    }else{
      A = iteracoes[i - 1].X;
    }
    X = calcularPontoMedio(A,B);
    Fx = funcao(X);
    var taxaDeErro = calcularTaxaDeErro(A,B);
    var iteracao = new Iteracao(i, A, B, X, Fx, Math.abs(taxaDeErro));
    iteracoes.push(iteracao);
  }
  drawTable(iteracoes);
  console.log(iteracoes);
}
$('#secantes').click(function(){
  secantes();
});
function secantes(){
  var iteracoes = [];
  var A = parseFloat($('#valueASec').val());
  var B = parseFloat($('#valueBSec').val());
  var taxErro = $('#errorTaxSec').val();
  var id = 2;

  var Fa = funcaoSec(A);
  var Fb = funcaoSec(B);

  var iteracao = new IteracaoSec(0, A, Fa.toFixed(4), "-");
  iteracoes.push(iteracao);
  var iteracao = new IteracaoSec(1, B, Fb.toFixed(4), Math.abs(A - B));
  iteracoes.push(iteracao);
  var erro = 1;
  while(erro > taxErro){
    iteracoes.push(calcularSecantes(iteracoes, id));
    erro = iteracoes[id].taxaDeErro;
    id++;
  }
  console.log(iteracoes);
  drawTableSec(iteracoes);
}
function calcularSecantes(iteracoes, id){
  var scope = {
    a: iteracoes[id-2].X,
    b: iteracoes[id-1].X,
    c: iteracoes[id-2].Fx,
    d: iteracoes[id-1].Fx
  }
  var total = math.evaluate("((a*d)-(b*c))/(d-c)", scope);
  var Ftotal = funcaoSec(total);
  var iteracao = new IteracaoSec(id, total.toFixed(4), Ftotal.toFixed(4), Math.abs(scope.b - total).toFixed(4));
  return iteracao;
}
function funcaoSec(value){
  var scope = {
    x: value
  }
  var funcao = $("#functionSec").val();
  var total = math.evaluate(funcao, scope);
  return parseFloat(total.toFixed(4));
}
function drawTableSec(iteracoes){
  $("#table-secantes").empty();
  var taxErro = $('#errorTaxSec').val();
  $('#table-secantes').append(`<thead id='thead-secantes'><tr><th scope='col'>n</th><th scope='col'>Xn</th><th scope='col'>f(Xn)</th><th scope='col'>Taxa de Erro(${taxErro})</th></tr></thead><tbody id='tbody-secantes'></tbody>`);
   for(var i = 0; i < iteracoes.length; i++){
     var element = iteracoes[i];
     $('#tbody-secantes').append(`<tr><th>${element.id}</th><th>${element.X}</th><th>${element.Fx}</th><th>${element.taxaDeErro}</th></tr>`)
   }
}
