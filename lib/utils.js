import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function mkdirp ( dir ) {
	try {
		fs.mkdirSync( dir, { recursive: true } );
	} catch ( e ) {
		if ( e.code === 'EEXIST' ) return;
		throw e;
	}
}

export function rimraf ( path ) {
	( fs.rmSync || fs.rmdirSync )( path, { recursive: true, force: true } );
}

function identity ( x ) {
	return x;
}

export function copy ( from, to, rename = identity ) {
	if ( !fs.existsSync( from ) ) return;

	const stats = fs.statSync( from );

	if ( stats.isDirectory() ) {
		fs.readdirSync( from ).forEach( ( file ) => {
			copy( path.join( from, file ), path.join( to, rename( file ) ) );
		} );
	} else {
		mkdirp( path.dirname( to ) );
		fs.copyFileSync( from, to );
	}
}

export function dist ( path ) {
	return fileURLToPath( new URL( `./dist/${ path }`, import.meta.url ).href );
}
