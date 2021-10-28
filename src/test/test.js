import { iCypherEncrypt, iCypherDecrypt } from "../index";
import { showlog, errorlog } from "@liparistudios/js-utils";



let data = `Nel mezzo del cammin di nostra vita, mi ritrovai per una selva oscura
che la dritta via era smarrita`;
let pwd = "15Root99@#$€";

/*
let data = "abcd";
let pwd = "012";
*/

showlog("data");
showlog(data);
showlog("password");
showlog(pwd);


iCypherEncrypt(data, pwd)
    .then( digest => {
        showlog("\n");
        showlog("digest");
        showlog(digest);
        showlog("\n");


        iCypherDecrypt( digest, pwd )
            .then( clearRaw => {
                showlog("clearRaw");
                showlog(clearRaw);

                let clearString = String.fromCharCode(...clearRaw);
                showlog( clearString );

                console.log('SUCCESS');

            })

    })
    .catch(e => {
        errorlog("Cifratura");
        showlog( e );
    })
;

