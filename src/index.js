/**
iCypher
 Algoritmo di cifratura a chiave simmetrica



 */

import {
	showlog
	, convert
	, bytesEncodeTypes
} from "@liparistudios/js-utils";
import packageJson from "../package.json"; // assert {type: 'json'};

const isDebug = true;


/**
 * Ritorna un oggetto con il nome e la versione
 * @returns {{name, version}}
 */
export const iCypherInfo = () => {
	return ({
		name: packageJson.name,
		version: packageJson.version
	});
};


/**
 * cifratura dei dati con una chiave
 * La chiave può essere nulla
 *
 * @param data
 * @param pwd
 * @returns {Promise<any | never>}
 */
export const iCypherEncrypt = (data, pwd, options, ...params) => {

	return (
		Promise.resolve()

			// preparing ---------------------------------------------------------------------------------------------------
			.then( () =>{

				// let clearBytes  = Uint8Array.from( data );
				let clearBytes  = convert( data, bytesEncodeTypes.UINT8ARRAY );

				let pwdBytes = [];
				if( !!options && !!options.isKeyBytes ) {
					pwdBytes = pwd;
				}
				else {
					pwdBytes    = convert( pwd, bytesEncodeTypes.UINT8ARRAY );
				}
				
				
				if( !!options && !!options.debug ) {
					showlog("preparing");
	
					showlog("clear bytes");
					showlog( clearBytes );
	
					showlog("pwd bytes");
					showlog(pwdBytes)
				}


				return ({
					clear: clearBytes,
					pwd: pwdBytes
				});

			})

			// digest ------------------------------------------------------------------------------------------------------
			.then( ({clear, pwd}) => {

				let data =
					clear
						// .map( (byte, i) => byte ^ ( i % 0xFF ) ^ pwd[(i % pwd.length)] )
						.map( (byte, i) => byte ^ pwd[(i % pwd.length)] )
				;
				
				if( !!options && !!options.debug ) {
					showlog("digest");
					showlog(data);
				}

				return data;

			})


			// finish ------------------------------------------------------------------------------------------------------
			.then( data => {


				let content = new Uint8Array( data.length );
				content.set(data, 0);
				
				if( !!options && !!options.outputType && (options.outputType.trim().toUpperCase() === 'UINT8ARRAY') ) {
					return content;
				}
				
				let digest = convert( content, { from: bytesEncodeTypes.UINT8ARRAY, to: bytesEncodeTypes.BASE64 });
				
				if( !!options && !!options.debug ) {
					showlog("finish");
					
					showlog("digest");
					showlog(digest);
				}


				return digest;

			})

	);


};



export const iCypherDecrypt = (digest, pwd, options) => {

	return (
		Promise.resolve()

			// preparing ---------------------------------------------------------------------------------------------------
			.then(() => {

				let digestByte = convert( digest, {from: bytesEncodeTypes.BASE64} );
				let pwdBytes = [];
				if( !!options && !!options.isKeyBytes ) {
					pwdBytes = pwd;
				}
				else {
					pwdBytes    = convert( pwd, bytesEncodeTypes.UINT8ARRAY );
				}

				return ({
					digestByte: digestByte,
					pwdBytes: pwdBytes
				});

			})


			// clearing ---------------------------------------------------------------------------------------------------
			.then(({ digestByte, pwdBytes }) => {

				let data =
					digestByte
						// .map( (byte, i) => byte ^ ( i % 0xFF ) ^ pwdBytes[(i % pwd.length)] )
						.map( (byte, i) => byte ^ pwdBytes[(i % pwd.length)] )
				;

				return data;

			})

	);

};



