$(document).ready(function () {
    // Simulação de dados localmente (apenas para testes)
    let produtos = [
        { "ID": 1, "NomeProduto": "Produto 1", "ValorUnitario": 10.00, "QuantidadeEstoque": 5 },
        { "ID": 2, "NomeProduto": "Produto 2", "ValorUnitario": 12.00, "QuantidadeEstoque": 3 },
        { "ID": 3, "NomeProduto": "Produto 3", "ValorUnitario": 15.00, "QuantidadeEstoque": 0 },
        { "ID": 4, "NomeProduto": "Produto 4", "ValorUnitario": 8.00, "QuantidadeEstoque": 10 },
        { "ID": 5, "NomeProduto": "Produto 5", "ValorUnitario": 20.00, "QuantidadeEstoque": 0 }
    ];

    let produtosHtml = '';
    produtos.forEach(function (produto) {
        produtosHtml += `<div data-idproduto="${produto.ID}" class="form-row mb-2" id="produto${produto.ID}">
        <div class="col-4">${produto.NomeProduto}</div>
        <div class="col-2">R$ ${produto.ValorUnitario.toFixed(2).replace('.', ',')}</div>
        <div class="col-4">
            <button class="btn btn-secondary btn-sm diminuir"${produto.QuantidadeEstoque === 0 ? ' disabled' : ''}>-</button>
            <input type="number" class="quantidade" value="0" min="0" readonly style="width: 50px; text-align: center;" ${produto.QuantidadeEstoque === 0 ? ' disabled' : ''}>
            <button class="btn btn-secondary btn-sm aumentar"${produto.QuantidadeEstoque === 0 ? ' disabled' : ''}>+</button>
        </div>
        <div class="col-2 total-produto">R$ 0,00</div>
    </div>`;
    });
    $('#lista-produtos').html(produtosHtml);
    
    // Chama a função para vincular os eventos dinamicamente
    setProductEvents();

    // Função para eventos de produtos usando delegação de eventos
    function setProductEvents() {
        $('#lista-produtos').on('click', '.aumentar', function () {
            var quantidadeInput = $(this).siblings('.quantidade');
            var quantidadeAtual = parseInt(quantidadeInput.val());
            quantidadeInput.val(quantidadeAtual + 1);
            atualizarTotal($(this).closest('.form-row'));
        });

        $('#lista-produtos').on('click', '.diminuir', function () {
            var quantidadeInput = $(this).siblings('.quantidade');
            var quantidadeAtual = parseInt(quantidadeInput.val());
            if (quantidadeAtual > 0) {
                quantidadeInput.val(quantidadeAtual - 1);
                atualizarTotal($(this).closest('.form-row'));
            }
        });
    }

    // Função para o botão "Continuar" do formulário de nome
    $('#continuar-nome').click(function () {
        var nome = $('#nome').val();
        if (nome.trim() !== "") {
            $('#nome-usuario').text(nome);
            $('#nome-form').hide();
            $('#produtos-form').show();
        }
    });

    // Função para atualizar o total de cada produto e o total geral
    function atualizarTotal(produtoRow) {
        var valorUnitario = parseFloat(produtoRow.find('.col-2').eq(0).text().replace('R$', '').replace(',', '.'));
        var quantidade = parseInt(produtoRow.find('.quantidade').val());
        var totalProduto = valorUnitario * quantidade;
        produtoRow.find('.total-produto').text('R$ ' + totalProduto.toFixed(2).replace('.', ','));

        var totalGeral = 0;
        $('.total-produto').each(function () {
            totalGeral += parseFloat($(this).text().replace('R$', '').replace(',', '.'));
        });
        $('#total-geral').text('R$ ' + totalGeral.toFixed(2).replace('.', ','));
    }

    // Função para o botão "Continuar" do formulário de produtos
    $('#continuar-pagamento').click(function () {
        $('#produtos-form').hide();
        $('#pagamento-form').show();
    });

    // Função para o botão de pagamento PIX
    $('#pagamento-pix').click(function () {
        $('#info-pix').show();
        $('#contato-form').hide();
    });

    // Função para o botão de pagamento "Pagar Depois"
    $('#pagamento-depois').click(function () {
        $('#info-pix').hide();
        $('#contato-form').show();
    });

    // Função para o botão "Enviar" do formulário de contato
    $('#enviar-contato').click(function () {
        alert('Contato enviado! Confirme seu pedido no caixa.');
    });
});