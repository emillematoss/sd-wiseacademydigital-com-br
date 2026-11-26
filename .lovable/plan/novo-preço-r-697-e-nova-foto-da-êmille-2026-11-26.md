# Novo preço R$ 697 e nova foto da Êmille

## O que muda
- Oferta: sai "De R$ 497 por" (sem valor riscado). Fica só "R$ 697" grande, com "à vista" embaixo.
- Todos os botões de compra: "QUERO SER DONA DO JOGO POR R$697".
- Descrição da página (a que aparece no Google e ao compartilhar o link): R$197 vira R$697.
- "Quem está por trás da Dona do Jogo": a foto atual é trocada pela nova foto enviada (IKF_2591.jpg).
- Salvar na memória do projeto: preço R$ 697, sem preço riscado. Pacote de 10 sessões (R$ 997) e site de ofertas ficam para depois, fora desta página.

## Detalhes técnicos
- `src/routes/index.tsx`: head description (linha 12), texto padrão do BuyButton (linha 43), seção Oferta (linhas 373-374).
- Nova foto enviada via lovable-assets → `src/assets/emille-nova.jpg.asset.json`; atualizar o import na seção "Quem está por trás".
- Conferir no navegador o preço e a foto.
