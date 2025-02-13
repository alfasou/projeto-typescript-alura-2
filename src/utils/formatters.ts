import { FormatoData } from "../types/FormatoData.js";

export function formatarMoeda(valor: number): string {
	return valor.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' });
}

export function formatarData(
	data: Date,
	formato: FormatoData = FormatoData.PADRAO
): string {
	if (formato === FormatoData.DIA_LONGO) {
		return data.toLocaleDateString('pt-br', {
			weekday: 'long',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	} else if (formato === FormatoData.DIA_CURTO) {
		return data.toLocaleDateString('pt-br', {
			day: '2-digit',
			month: '2-digit',
		});
	}

	return data.toLocaleDateString('pt-br');
}
