function renderData() {
	const cargo = document.getElementById('cargo');
	const area = document.getElementById('area');
	const time = +document.getElementById('360time').value;
	const gestor = +document.getElementById('360gestor').value;
	const salario = +document.getElementById('salario').value;
	const discricionario = +document.getElementById('discricionario').value;
	const calibragem = +document.getElementById('calibragem').value;
	const diasTrabalhados = +document.getElementById('dtrabalhados').value;
	const resultado = document.getElementById('resultado');

	const indexCargo = cargo.options.selectedIndex;
	const valorCargo = cargo.options[indexCargo].value;

	const indexArea = area.options.selectedIndex;
	const valorArea = area.options[indexArea].value;

	let target = salario * valorCargo;

	let flag = 0;
	let marea=0;
	let time3=0;
	let gestor3=0;
	let discriflag=0;
	let porcflag=0;
	let porcentmarea=0;
	let porcenttime=0;
	let porcentgestor=0;
	let porcentdiscri=0;
	if (indexCargo == 3) {
		flag = PLR_base_BP_gerente(target);
		marea=PLR_Meta_area_gerente(target, valorArea);
		time3=PLR_360_time_gerente(target, time);
		gestor3=PLR_360_gestor_gerente(target, gestor);
		discriflag=PLR_final_discricionario_gerente(target, discricionario);
		porcflag="30%";
		porcentmarea="40%";
		porcenttime="6%";
		porcentgestor="9%";
		porcentdiscri="15%";
		porcentagemYouse="99,72%";
	} else {
		flag = PLR_base_BP_anaesp(target);
		marea=PLR_Meta_area_anaesp(target, valorArea);
		time3=PLR_360_time_anaesp(target, time);
		gestor3=PLR_360_gestor_anaesp(target, gestor);
		discriflag=PLR_final_discricionario_anaesp(target, discricionario);
		porcentagemYouse="99,72%";
	}

	
	const vfinal =
		calibragem +discriflag +gestor3+time3 + marea+ flag


	const template = `
		<ul style="color: #5c5c5c">Salário
			<li>${salario}</li>
		</ul>
		<ul style="color: #5c5c5c">Multiplicador
			<li>${valorCargo}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor do target
		<li>${target}</li>
		</ul>
		<ul style="color: #5c5c5c"> atingimento Meta Youse
			<li>${porcentagemYouse}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor do PLR com base na Meta Youse
			<li>${flag.toFixed(2)}</li>
		</ul>		
		<ul style="color: #5c5c5c">Atingimento Meta Área
			<li>${valorArea,"%"}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor do PLR com Meta Área
			<li>${marea.toFixed(2)}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor do PLR com base na 360 do gestor
			<li>${gestor3.toFixed(2)}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor do PLR com base na 360 do time
			<li>${time3.toFixed(2)}</li>
		</ul>

		<ul style="color: #5c5c5c">Valor final do discricionário
			<li>${discriflag.toFixed(2)}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor Calibragem
		<li>${calibragem}</li>
	</ul>
		<ul style="color: #5c5c5c">Quantidade de dias trabalhados
			<li>${diasTrabalhados}</li>
		</ul>
		<ul style="color: #5c5c5c"><strong>Resultado</strong>
			<li>${(vfinal / 365 * diasTrabalhados).toFixed(2)}</li>
		</ul>
	`;

	resultado.innerHTML = template;
}


const PLR_base_BP =(target)=>{
	const porcentqueoBPrep = 0.2;
  const atingimento_do_BP = 0.9972;
  const valor_BPrep = target * porcentqueoBPrep;

  return valor_BPrep * atingimento_do_BP;
}


const PLR_base_BP_anaesp = (target) => {
	const porcentqueoBPrep = 0.2;
	const atingimento_do_BP = 0.9972;
	const valor_BPrep = target * porcentqueoBPrep;

	return valor_BPrep * atingimento_do_BP;
};


const PLR_base_BP_gerente = (target) => {
	const porcentqueoBPrep = 0.3;
	const atingimento_do_BP = 0.9972;
	const valor_BPrep = target * porcentqueoBPrep;

	return valor_BPrep * atingimento_do_BP;
};


const PLR_Meta_area_anaesp = (target, area) => {
	const totalquerepMetaArea = 0.3;
	const valorqueoBPrepMetaArea = target * totalquerepMetaArea;

	return valorqueoBPrepMetaArea * (area / 100);
};
const PLR_Meta_area_gerente = (target, area) => {
	const totalquerepMetaArea = 0.4;
	const valorqueoBPrepMetaArea = target * totalquerepMetaArea;

	return valorqueoBPrepMetaArea * (area / 100);
};


const PLR_360_time_anaesp = (target, time) => {
	const porcent_time = 0.1;
	const valor_alvo_time = target * porcent_time;
	const resultante_notatime = time / 5;

	return valor_alvo_time * resultante_notatime;
};
const PLR_360_time_gerente = (target, time) => {
	const porcent_time = 0.06;
	const valor_alvo_time = target * porcent_time;
	const resultante_notatime = time / 5;

	return valor_alvo_time * resultante_notatime;
};


const PLR_360_gestor_anaesp = (target, gestor) => {
	const porcent_gestor = 0.15;
	const vagestor = target * porcent_gestor;
	const resultante_nota_gestor = gestor / 5;

	return vagestor * resultante_nota_gestor;
};
const PLR_360_gestor_gerente = (target, gestor) => {
	const porcent_gestor = 0.09;
	const vagestor = target * porcent_gestor;
	const resultante_nota_gestor = gestor / 5;

	return vagestor * resultante_nota_gestor;
};

const PLR_final_discricionario_anaesp = (target, discricionario) => {
	const porc_discri = 0.25;
	const vadiscri = target * porc_discri;

	return vadiscri * (discricionario / 100);
};
const PLR_final_discricionario_gerente = (target, discricionario) => {
	const porc_discri = 0.15;
	const vadiscri = target * porc_discri;

	return vadiscri * (discricionario / 100);
};