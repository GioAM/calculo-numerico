function Iteracao(id, A, B, X, Fx, taxaDeErro) {
  this.id = id;
	this.A = A;
  this.B = B;
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
  var total = Math.pow(value, 2) - 2;
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
  var A = parseInt($('#valueA').val(),10);
  var B = parseInt($('#valueB').val(),10);
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
