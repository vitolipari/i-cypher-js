# iCypher
## simmetric key cript algorithm

version: 1.1.1

<img style="background:#aaa; padding: 1rem; border-radius: 0.3rem;" src="https://render.githubusercontent.com/render/math?math=b_i \\oplus ([x,y])_{i \\mod 255} \\oplus p_{j : j \\mod len(p)}">

Ogni byte _b_ viene messo in xor con un byte _c_ che è l'indice i-esimo del byte _b_ in modulo 255
il risultato viene messo in xor con un byte _p_ che è il byte della chiave in modulo 
lunghezza della chiave

