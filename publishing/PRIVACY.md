# Política de Privacidade — ZeroDelay

**Última atualização:** 23/06/2026

O ZeroDelay ("a extensão") é uma extensão de navegador que reduz a latência das
lives do YouTube ajustando a reprodução para que o player alcance o ao vivo.

## Resumo

**O ZeroDelay não coleta, transmite, vende nem compartilha nenhum dado pessoal.**
Não há analytics, não há rastreamento e não há servidores externos. Tudo o que a
extensão guarda fica no seu próprio dispositivo.

## O que é armazenado, e onde

Todos os dados ficam localmente no seu dispositivo, usando a API `storage.local`
do navegador. Nada sai do seu computador.

| Dado | Por que existe |
| --- | --- |
| Suas configurações (modo escolhido e indicadores no player) | Para lembrar como você configurou a extensão. |
| Tempo de uso anônimo (segundos totais de uso e a data da primeira execução) | Apenas para decidir quando mostrar um lembrete opcional e dispensável de "me pague um café". |
| Estado do lembrete (sinalizadores de "lembrar depois" / "não mostrar novamente") | Para respeitar a sua escolha sobre esse lembrete. |

Esses dados são anônimos, não estão ligados à sua identidade e nunca são enviados
a lugar nenhum. O botão "Restaurar padrões" limpa suas configurações; as suas
escolhas sobre o lembrete são preservadas de propósito, para que você não seja
perguntado de novo.

## Doações

O recurso opcional de doação gera um código PIX "copia e cola" e um QR Code
**inteiramente no seu dispositivo**. Nenhuma informação de pagamento passa pela
extensão e nenhum dado de doação é coletado. Se você optar por doar, o pagamento
acontece no app do seu próprio banco, fora da extensão.

## Permissões

- **storage** — para salvar localmente as configurações e os contadores
  descritos acima.
- **alarms** — para agendar a verificação local que decide se deve mostrar o
  lembrete opcional de doação.
- **Acesso a `youtube.com`** — para a extensão rodar seu script de controle de
  latência nas páginas do YouTube. Ela não lê sua conta, seu histórico nem
  qualquer informação pessoal.

## Código remoto

O ZeroDelay **não carrega nenhum código remoto**. Todos os scripts, incluindo o
gerador de QR Code, vêm empacotados dentro da extensão, em conformidade com o
Manifest V3.

## Alterações

Se esta política mudar, a data de "Última atualização" acima será revisada.

## Contato

Dúvidas sobre privacidade: **joao@solitus.com.br** (João Gustavo França,
<https://github.com/joaogfc>).
