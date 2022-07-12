#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { bold, cyan, gray, green, red } from 'kleur/colors';
import prompts from 'prompts';
// import { create } from './index.js';
import { dist } from './utils.js';

const { version } = JSON.parse( fs.readFileSync( new URL( 'package.json', import.meta.url ), 'utf-8' ) );

async function main () {
	console.log( bold( cyan( 'Running VECOn! v' + version ) ) );

	console.log(
		process.argv,
		process.argv[ 2 ]
	);
	let cwd = process.argv[ 2 ] || '.';

	if ( cwd === '.' ) {
		const opts = await prompts( [
			{
				type: 'text',
				name: 'test',
				message: 'is VECOn working?'
			}
		] );

		if ( opts.dir ) {
			console.log( 'VECOn is working!' );
			cwd = opts.dir;
		}
	}

	if ( fs.existsSync( cwd ) ) {
		if ( fs.readdirSync( cwd ).length > 0 ) {
			const response = await prompts( {
				type: 'confirm',
				name: 'value',
				message: 'Directory not empty. Continue?',
				initial: false
			} );

			if ( !response.value )
				process.exit( 1 );
		}
	}

	const options = (
		await prompts(
			[
				{
					type: 'select',
					name: 'template',
					message: 'Which Svelte app template?',
					choices: fs.readdirSync( dist( 'templates' ) ).map( ( dir ) => {
						const meta_file = dist( `templates/${ dir }/meta.json` );
						const { title, description } = JSON.parse( fs.readFileSync( meta_file, 'utf8' ) );

						return {
							title,
							description,
							value: dir
						};
					} )
				},
				{
					type: 'select',
					name: 'types',
					message: 'Add type checking with TypeScript?',
					initial: false,
					choices: [
						{
							title: 'Yes, using JavaScript with JSDoc comments',
							value: 'checkjs'
						},
						{
							title: 'Yes, using TypeScript syntax',
							value: 'typescript'
						},
						{ title: 'No', value: null }
					]
				},
				{
					type: 'toggle',
					name: 'eslint',
					message: 'Add ESLint for code linting?',
					initial: false,
					active: 'Yes',
					inactive: 'No'
				},
				{
					type: 'toggle',
					name: 'prettier',
					message: 'Add Prettier for code formatting?',
					initial: false,
					active: 'Yes',
					inactive: 'No'
				},
				{
					type: 'toggle',
					name: 'playwright',
					message: 'Add Playwright for browser testing?',
					initial: false,
					active: 'Yes',
					inactive: 'No'
				}
			],
			{
				onCancel: () => {
					process.exit( 1 );
				}
			}
		)
	);

	options.name = path.basename( path.resolve( cwd ) );

	// await create( cwd, options );

	console.log( bold( green( '\nYour project is ready!' ) ) );
}

main();
