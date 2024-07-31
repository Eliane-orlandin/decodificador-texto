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

async function copiarTextoDoBotao(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    abrirModal("Texto copiado");
  });
}

function exibeTexto(texto) {
  const caixa = document.getElementById("caixa-texto");
  while (caixa.firstChild) {
    caixa.removeChild(caixa.firstChild);
  }
  let elementoTexto = document.createElement("p");
  elementoTexto.innerText = texto;
  elementoTexto.classList.add("coluna__3__texto__exibido");
  caixa.appendChild(elementoTexto);
}

function abrirModal(mensagem) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  modalText.innerText = mensagem;
  modal.style.display = "block";
}

function fecharModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", (event) => {
  document
    .querySelector(".coluna__2__modal__fechar")
    .addEventListener("click", fecharModal);
});

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    fecharModal();
  }
};

function validarTexto(texto) {
  let caracteresInvalidos = [];
  for (let i = 0; i < texto.length; i++) {
    let charCode = texto.charCodeAt(i);
    if ((charCode < 97 || charCode > 122) && charCode !== 32) {
      caracteresInvalidos.push(`${texto[i]}`);
    }
  }
  if (caracteresInvalidos.length > 0) {
    abrirModal(
      `Caracteres inválidos encontrados: ${caracteresInvalidos.join(
        ", "
      )}.\n O texto deve conter apenas letras minúsculas e sem acento.`
    );
    return false;
  }
  return true;
}

document.getElementById("botao-crip").addEventListener("click", (evt) => {
  const textarea = document.getElementById("texto");

  if (textarea.value === "") {
    abrirModal("Texto não foi informado");
    return;
  }

  if (!validarTexto(textarea.value)) {
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
    abrirModal("Texto não foi informado");
    return;
  }
  if (!validarTexto(textarea.value)) {
    return;
  }

  const textoDescriptografado = descriptografarMensagem(textarea.value);
  exibeTexto(textoDescriptografado);
  textarea.value = "";
});

document.getElementById("botao-copiar").addEventListener("click", () => {
  const caixaTexto = document.getElementById("caixa-texto");
  const textoParaCopiar = caixaTexto.innerText;

  if (textoParaCopiar === "") {
    abrirModal("Não há texto para copiar");
    return;
  }

  copiarTextoDoBotao(textoParaCopiar);
  caixaTexto.innerText = "";
});
