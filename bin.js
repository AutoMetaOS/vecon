#!/usr/bin/env node
import fs from 'fs';
import { bold, cyan, yellow, green, red } from 'kleur/colors';
import prompts from 'prompts';
// import { create } from './index.js';
import { deploy, publish } from "./lib/scripts.js";

const { version } = JSON.parse( fs.readFileSync( new URL( 'package.json', import.meta.url ), 'utf-8' ) );
const VECON = () => {
	let veco = {};
	try {
		veco = fs.readFileSync( './vecon.config.json', 'utf-8' );
	} catch ( err ) {
		console.warn( yellow( 'proceeding without vecon.config.json' ) );
	}
	return JSON.parse( veco );
};

async function main () {
	console.log( bold( cyan( 'Running VECOn! v' + version ) ) );

	const [ name = ".", ...rest ] = process.argv.slice( 2 );
	console.log( rest );

	if ( name === '.' ) console.log( 'VECOn is working!' );

	let task = null;
	if ( name === 'publish' ) {
		const { version } = await prompts( {
			type: 'select',
			name: 'version',
			message: 'Select version update',
			initial: false,
			choices: [
				{ title: 'Patch', value: 'patch' },
				{ title: 'Minor', value: 'minor' },
				{ title: 'Major', value: 'major' }
			]
		} );
		task = await publish( version );
	};

	console.log( bold( green( '\n' + task ) ) );
};

main();
