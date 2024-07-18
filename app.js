function criptografarMensagem(textoDigitado) {
  const textoCriptografado = textoDigitado
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");

  return textoCriptografado;
}

function descriptografarMensagem(textoCriptografado) {
  return textoCriptografado
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
}

function copiarTextoDoBotao(texto) {
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      console.log("Texto copiado para a área de transferência!");
    })
    .catch((e) => {
      console.error("Erro ao copiar o texto: ", e);
    });
}

function exibeTexto(texto) {
  const caixa = document.getElementById("caixa-texto");
  while (caixa.firstChild) {
    caixa.removeChild(caixa.firstChild);
  }
  let elementoTexto = document.createElement("p");
  elementoTexto.innerText = texto;
  elementoTexto.classList.add("conteiner__direito__texto__exibido");
  caixa.appendChild(elementoTexto);
}

document.getElementById("botao-crip").addEventListener("click", (evt) => {
  const textarea = document.getElementById("texto");
  console.log("Botão Criptografar clicado");

  if (textarea.value === "") {
    console.error("Texto não foi informado");
    return;
  }
  const textoCriptografado = criptografarMensagem(textarea.value);

  exibeTexto(textoCriptografado);
  textarea.value = "";
  document.getElementById("botao-copiar").style.visibility = "visible";
});

document.getElementById("botao-descrip").addEventListener("click", (evt) => {
  const textarea = document.getElementById("texto");

  if (textarea.value === "") {
    console.error("Texto não foi informado");
    return;
  }

  const textoDescriptografado = descriptografarMensagem(textarea.value);
  exibeTexto(textoDescriptografado);
});

document.getElementById("botao-copiar").addEventListener("click", () => {
  const caixaTexto = document.getElementById("caixa-texto");
  const textoParaCopiar = caixaTexto.innerText;

  if (textoParaCopiar === "") {
    console.error("Não há texto para copiar");
    return;
  }

  copiarTextoDoBotao(textoParaCopiar);
  caixaTexto.innerText = "";
});
