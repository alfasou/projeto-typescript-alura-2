import Conta from '../types/Conta.js';
import { FormatoData } from '../types/FormatoData.js';
import { GrupoTransacao } from '../types/GrupoTransacao.js';
import { formatarMoeda, formatarData } from '../utils/formatters.js';

const elementoRegistroTransacoesExtrato: HTMLElement | null =
	document.querySelector('.extrato .registro-transacoes');

function renderizarExtrato(): void {
	if (!elementoRegistroTransacoesExtrato) {
		console.error(
			'Elemento .extrato .registro-transacoes não encontrado no DOM'
		);
		return;
	}

	const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
	elementoRegistroTransacoesExtrato.innerHTML = '';
	let htmlRegistroTransacoes: string = '';

	for (let grupoTransacao of gruposTransacoes) {
		let htmlTransacaoItem: string = '';
		for (let transacao of grupoTransacao.transacoes) {
			htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.data, FormatoData.DIA_CURTO)}</time>
                </div>
            `;
		}

		htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group">${grupoTransacao.label}</strong>
                ${htmlTransacaoItem}
            </div>
        `;
	}

	if (htmlRegistroTransacoes === '') {
		htmlRegistroTransacoes = `<div>Não há transações realizadas</div>`;
	}

	elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
	atualizar(): void {
		renderizarExtrato();
	},
};

export default ExtratoComponent;
