#! /usr/bin/env node

'use strict';

const meow = require('meow');
const ncp = require('copy-paste');

const cli = meow(`
	How to use:
	$ cnpj-gen
	`, {});


ncp.copy(gerarCnpj());

function gerarCnpj() {
	let arr = [];

    // Define os caracteres variáveis
    for (let i = 0; i < 8; i ++) {
    	arr.push(Math.floor(Math.random() * 10));
    }

    // Define os caracteres fixos
    arr.push(0, 0, 0, 1);

    // Cálculo do primeiro dígito verificador
    const v1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let soma1 = 0;

    v1.forEach(function(value, index){
    	soma1 += arr[index] * value;
    });

    let d1 = soma1 % 11;

    if (d1 < 2)
    	d1 = 0;
    else
    	d1 = 11 - d1;

    // Fim cálculo 1

    // Adiciona o primeiro dígito ao array para entrar nno cálculo do segundo dígito
    arr.push(d1)

    // Cálculo do segundo dígito verificador
    const v2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let soma2 = 0;

    v2.forEach(function(value, index) {
    	soma2 += arr[index] * value;
    });

    let d2 = soma2 % 11;

    if (d2 < 2)
    	d2 = 0;
    else
    	d2 = 11 - d2;

    // Fim cálculo 2

    // Acrescenta os dígitos verificadores ao array
    arr.push(d2);

    // Exibe o cnpj no campo
    let cnpj = arr.join('');

    console.log(`
        CNPJ: ${cnpj} - copiado para área de transferência!
    `);

    return cnpj;
}

function formatarCnpj() {
    if (vm.chkFormatarCnpj === true) {
        vm.cnpj = vm.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    } else {
        vm.cnpj = vm.cnpj.replace(/\D/g, '');
    }
}
