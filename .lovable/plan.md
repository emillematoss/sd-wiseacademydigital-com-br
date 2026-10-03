# Página de vendas DONA DO JOGO — réplica fiel da referência

## Objetivo
Recriar dona-do-jogo.vmcursos.com como uma única página, com o topo idêntico: mesmas fontes, mesma composição, e a figura da dama/rainha de xadrez em dourado luxuoso posicionada do lado direito.

## Topo (prioridade)
- Faixa de oferta: "OFERTA DE LANÇAMENTO: R$197 | VAGAS LIMITADAS" + contador de 24h por visitante.
- Navegação discreta com menu funcional no celular.
- Abertura: textos à esquerda (DONA DO JOGO, MENTORIA INDIVIDUAL COM ÊMILLE MATOS, MÃE • EMPREENDEDORA • MENTORA, ÊMILLE MATOS, PARE DE SE SABOTAR..., A VIDA É HOJE!), botão "QUERO SER DONA DO JOGO POR R$197", pagamento seguro e garantia.
- Lado direito: imagem gerada de peças de xadrez (rainha/dama) em dourado champanhe sobre preto, dissolvida em degradê bordô, sem bordas duras. Fica no lugar da foto até a foto real da Êmille chegar. Nenhum rosto gerado.
- No celular, a dama fica acima ou atrás do texto, sem cobrir nada.

## Seções seguintes (na ordem do briefing)
Faixa em movimento "VOCÊ É A DONA DO SEU FUTURO" -> O Primeiro Movimento (4 pilares) -> O Diagnóstico -> O Método -> Por que vai funcionar -> É para você / Não é para você -> O que você recebe -> Bônus (3 capas geradas + extras) -> Oferta R$197 -> Quem está por trás (moldura dourada, imagem provisória) -> Garantia 7 dias -> Perguntas frequentes expansíveis -> Chamada final e rodapé.
Textos copiados da referência, sem inventar dados, preços antigos ou depoimentos.

## Interações
- Todos os botões de compra levam a um único link de checkout; WhatsApp, e-mail, termos e privacidade também. Enquanto não houver links reais, aparece um aviso ao clicar.
- Pixel da Meta preparado, ligado apenas quando o ID for informado.
- Botão de compra fixo embaixo no celular (bordô com detalhe dourado).
- Animações discretas, respeitando quem reduz movimento. Favicon de coroa. Título e descrição próprios.

## Detalhes técnicos
- Fontes iguais à referência: Cormorant Garamond (títulos) e Karla (textos), via link no head.
- Paleta em tokens: preto/grafite, bordô profundo, dourado champanhe, marfim.
- Página em `src/routes/index.tsx`, seções em componentes separados; configuração de links/pixel num único arquivo.
- Imagens geradas: dama dourada do topo + 3 capas de bônus.

## Pendente com você
Foto real da Êmille, link de checkout, WhatsApp, e-mail e ID do Pixel.
