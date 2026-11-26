# Frase final "A vida é hoje" em duas linhas

## O que muda
Na chamada final, perto do fim da página, o título fica em duas linhas:
- Em cima: **A VIDA É HOJE.**
- Embaixo: **DAQUI A UM ANO, VOCÊ VAI ESTAR NO MESMO LUGAR OU NA VIDA QUE VOCÊ DECIDIU CONSTRUIR?** ("CONSTRUIR?" continua em dourado e itálico.)

A frase "A VIDA É HOJE!" do topo da página continua como está.

## Detalhes técnicos
- `src/routes/index.tsx`, linha 448: separar o h2 em duas linhas (span em bloco), adicionar a vírgula depois de "UM ANO" e trocar o ponto final por interrogação.
