<h1>API de Caixa Eletrônico</h1>

> Status: Em desenvolvimento ⚠️

### Apresentação

Esta API é um desafio técnico para a a posição de desenvolvedor jr em uma grande empresa de tecnologia. Tem como fim demonstrar um pouco dos conhecimentos na produção de sistemas de mensageiria afim de pleitear a vaga. 

A intenção é entregar o sistema pronto para rodar em um container com unix, conforme solicitado no descritivo do desafio. 

A API-REST visa simular um caixa eletrônico, ao qual realizará o saque de uma conta com o mínimo de notas possível. Para isso criamos 2 classes: a conta e o saque. Também criei o depósito, porém devido a brevidade do tempo concedido para o desenvolvimento do desafio, o mesmo será implementado posteriormente, junto com o controle de saldo da conta. Portanto, para esse desafio, fica-se sub-entendido que as contas possuem saldo infinito. 

### Descrição das classes

Na classe Contas, teremos os atributos:
 + id_contas(identificador da conta - int),
 + proprietário(nome do dono da conta - Varchar(45)), 
 + saldo (saldo da conta - Number). 
 
Na classe Saque teremos os atributos:
 + id_saque(identificador do saque - int),
 + valor_saque (valor a ser sacado - Number),  
 + id_contas(FK, id da conta a ser realizado o saque).

Utilizaremos o MariaDB como SGBD e durante seu desenvolvimento estaremos utilizando-o em um container docker. 

### Funcionamento

A classe Contas possui os verbos http GET, POST, PATCH e DELETE, porém a classe Saque possui apenas os verbos GET e POST, visto que não queremos alterar os dados de um saque realizado. 

Neste desafio, foi proposto para que trabalhássemos apenas com as notas de $100, $50, $20 e $10, impossibilitando assim um saque de um valor que não seja múltiplo de 10. Assim sendo, qualquer valor que não atenda esse requisito não permitirá o saque. 


### O desenvolvimento 

A brevidade do prazo para entrega não me permitiu finalizar o que eu tinha em mente, em especial a as boas práticas de REST. Estou tento dificuldades com as 2 possibilidades do método POST na classe de Saque, visto que caso o valor solicitado para o saque não atenda a constraint informada a anteriormente, o saque não é efetuado, o status http muda e a mensagem informada para o a response também. Assim que conseguir modelar corretamente, farei a alteração. Até lá, este projeto ainda não atende a principal função, que é realizar o saque com o menor número de notas possível. 🛠️🛠️🛠️

Segue o link para primeira modelagem que fim do método, que está funcionando plenamente de forma isolada:
https://github.com/Hipertrofia/metodo-post-api-caixa

### Melhorias futuras

Além de implementar corretamente o método do troco, respondendo a mensagem e o statos correto para as duas possibilidades de no método post para o saque, também podemos implementar a classe depósito e assim poderemos fazer o controle do saldo das contas. 

Os testes unitários também precisam ser implementados. São um dos requisitos do descritivo do desafio, porém não havia como realiza-los a tempo útil, em especial pelo tempo que o if no POST do saque consumiu.  

Também podemos implementar um front-end para api, a fim de torna-la funcional e melhorando as skills de front-end no processo. 👷
