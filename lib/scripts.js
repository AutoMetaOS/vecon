import fs from 'fs';
import prompts from 'prompts';
import { execSync } from "child_process";

const run = ( cmd ) => execSync( cmd );

const getPackage = () => JSON.parse( fs.readFileSync( './package.json', 'utf-8' ) );

export const deploy = async () => {

}

export const publish = async ( versionUpd ) => {
    const { version: version_old } = getPackage();
    run( `npm version ${ versionUpd }` );
    // Get Version
    const { version: version_new } = getPackage();
    console.log( `Version Bump: ${ version_old } => ${ version_new }` );

    // Git
    const { message } = await prompts( {
        type: 'text',
        name: 'message',
        message: `Add Commit Message: (default: "chore: release")`,
    } );
    run( `git add .` );
    run( `git commit -m "${ message || "chore: release" }"` );
    run( `git push` );

    // Run Publish
    // console.log( "pnpm publish" );
    run( `npm publish` );

    return "Package Published!";
}