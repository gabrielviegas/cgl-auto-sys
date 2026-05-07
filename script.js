function somenteLetras(input) { input.value = input.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); }

function mascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, ''); 
    if (valor.length <= 10) {
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    }
    input.value = valor;
}

function mascaraCEP(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
    input.value = valor;
}

async function buscarEndereco(cepOriginal) {
    let cep = cepOriginal.replace(/\D/g, '');
    let campoEndereco = document.getElementById('endereco');
    let campoNumero = document.getElementById('numero-casa');
    if (cep.length === 8) {
        campoEndereco.value = "Buscando...";
        try {
            let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            let dados = await resposta.json();
            if (!dados.erro) {
                campoEndereco.value = `${dados.logradouro} - ${dados.bairro}, ${dados.localidade}-${dados.uf}`;
                campoNumero.focus();
            } else { campoEndereco.value = "Não encontrado."; }
        } catch (e) { campoEndereco.value = "Erro CEP."; }
    }
}

// --- FINANCEIRO ---
function mascaraMoeda(input) {
    let valor = input.value.replace(/\D/g, ''); 
    if(valor === "") valor = "0";
    valor = (parseInt(valor) / 100).toFixed(2) + '';
    valor = valor.replace(".", ",").replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,").replace(/(\d)(\d{3}),/g, "$1.$2,");
    input.value = valor;
    calcularTotalOS(); 
}

function adicionarLinha() {
    let tbody = document.querySelector('#tabela-itens tbody');
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" placeholder="Ex: Mão de obra suspensão"></td>
        <td><input type="text" class="dinheiro val-peca" value="0,00" oninput="mascaraMoeda(this)"></td>
        <td><input type="text" class="dinheiro val-mo" value="0,00" oninput="mascaraMoeda(this)"></td>
        <td><input type="text" class="dinheiro val-total-linha" value="0,00" readonly style="font-weight:bold; color:var(--vermelho-cgl);"></td>
        <td class="no-print" style="text-align:center;"><button class="btn-remove" onclick="removerLinha(this)">X</button></td>
    `;
    tbody.appendChild(tr);
}

function removerLinha(botao) { botao.closest('tr').remove(); calcularTotalOS(); }

function calcularTotalOS() {
    let linhas = document.querySelectorAll('#tabela-itens tbody tr');
    let totalGeral = 0;
    linhas.forEach(linha => {
        let pStr = linha.querySelector('.val-peca').value.replace(/\./g, '').replace(',', '.');
        let mStr = linha.querySelector('.val-mo').value.replace(/\./g, '').replace(',', '.');
        let totalLinha = (parseFloat(pStr) || 0) + (parseFloat(mStr) || 0);
        linha.querySelector('.val-total-linha').value = totalLinha.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        totalGeral += totalLinha;
    });
    document.getElementById('valor-total').value = 'R$ ' + totalGeral.toLocaleString('pt-BR', {minimumFractionDigits: 2});
}

// --- NÚMERO DA O.S. (MEMÓRIA LOCAL SIMPLES) ---
window.onload = function() {
    let ultimoNumero = localStorage.getItem('ultima_os_cgl');
    if (!ultimoNumero) { ultimoNumero = 0; }
    let proximoNumero = parseInt(ultimoNumero) + 1;
    document.getElementById('numero-os').value = String(proximoNumero).padStart(4, '0');
};

function gerarPDF() {
    let numeroAtual = document.getElementById('numero-os').value;
    localStorage.setItem('ultima_os_cgl', parseInt(numeroAtual));
    window.print();
}