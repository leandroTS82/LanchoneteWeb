$(document).ready(function() {
    // Função para o botão "Continuar" do formulário de nome
    $('#continuar-nome').click(function() {
        var nome = $('#nome').val();
        if(nome.trim() !== "") {
            $('#nome-usuario').text(nome);
            $('#nome-form').hide();
            $('#produtos-form').show();
        }
    });

    // Funções para os botões de quantidade (+ e -)
    $('.aumentar').click(function() {
        var quantidadeInput = $(this).siblings('.quantidade');
        var quantidadeAtual = parseInt(quantidadeInput.val());
        quantidadeInput.val(quantidadeAtual + 1);
        atualizarTotal($(this).closest('.form-row'));
    });

    $('.diminuir').click(function() {
        var quantidadeInput = $(this).siblings('.quantidade');
        var quantidadeAtual = parseInt(quantidadeInput.val());
        if (quantidadeAtual > 0) {
            quantidadeInput.val(quantidadeAtual - 1);
            atualizarTotal($(this).closest('.form-row'));
        }
    });

    // Função para atualizar o total de cada produto e o total geral
    function atualizarTotal(produtoRow) {
        var valorUnitario = parseFloat(produtoRow.find('.col-2').eq(0).text().replace('R$', '').replace(',', '.'));
        var quantidade = parseInt(produtoRow.find('.quantidade').val());
        var totalProduto = valorUnitario * quantidade;
        produtoRow.find('.total-produto').text('R$ ' + totalProduto.toFixed(2).replace('.', ','));

        var totalGeral = 0;
        $('.total-produto').each(function() {
            totalGeral += parseFloat($(this).text().replace('R$', '').replace(',', '.'));
        });
        $('#total-geral').text('R$ ' + totalGeral.toFixed(2).replace('.', ','));
    }

    // Função para o botão "Continuar" do formulário de produtos
    $('#continuar-pagamento').click(function() {
        $('#produtos-form').hide();
        $('#pagamento-form').show();
    });

    // Função para o botão de pagamento PIX
    $('#pagamento-pix').click(function() {
        $('#info-pix').show();
        $('#contato-form').hide();
    });

    // Função para o botão de pagamento "Pagar Depois"
    $('#pagamento-depois').click(function() {
        $('#info-pix').hide();
        $('#contato-form').show();
    });

    // Função para o botão "Enviar" do formulário de contato
    $('#enviar-contato').click(function() {
        alert('Contato enviado! Confirme seu pedido no caixa.');
    });
});
