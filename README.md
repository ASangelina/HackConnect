🚀 HackConnect
Conectando pessoas às oportunidades da comunidade de tecnologia.

O HackConnect é uma API inteligente que facilita a descoberta e o gerenciamento de eventos de tecnologia e hackathons. Utilizando inteligência artificial com Gemma 4, a plataforma permite que usuários consultem eventos por meio de linguagem natural, conectando conversas a operações reais no backend.

💡 Nosso propósito é aproximar estudantes, desenvolvedores e profissionais de tecnologia das oportunidades que impulsionam a inovação e a colaboração.
🎯 Problema

Eventos de tecnologia, hackathons e oportunidades de inovação estão espalhados por diferentes plataformas, dificultando sua descoberta e acompanhamento.

O HackConnect propõe centralizar essas informações em uma API que combina dados estruturados e inteligência artificial para tornar a consulta de eventos mais simples e acessível.

💡 Solução

Uma API REST com um agente de IA capaz de interpretar solicitações em linguagem natural e encaminhá-las às funcionalidades do sistema.

✨ Funcionalidades do MVP
📅 Gerenciamento de eventos: cadastro, listagem, consulta e exclusão de eventos.
🤖 Agente inteligente: interpretação de solicitações utilizando Gemma 4.
🔎 Consultas em linguagem natural: perguntas sobre eventos cadastrados.
🗄️ Persistência de dados: armazenamento de eventos no PostgreSQL.
📖 Documentação interativa: testes dos endpoints por meio do Swagger.
🔮 Funcionalidades futuras
🌐 Pesquisa de eventos em fontes externas da internet.
💬 Cadastro e compartilhamento de experiências da comunidade.
📸 Upload e compartilhamento de fotos.
🎯 Recomendações personalizadas de eventos.
👥 Recursos para organizadores e comunidades de tecnologia.
🛠️ Tecnologias utilizadas
Tecnologia	Finalidade
NestJS	Construção da API REST
TypeScript	Linguagem principal do backend
Gemma 4	Interpretação de solicitações com IA
Ollama	Execução local do modelo de IA
PostgreSQL	Banco de dados relacional
Prisma	ORM e acesso ao banco de dados
Swagger	Documentação e interface para testes
Docker	Execução dos serviços em containers
🏗️ Arquitetura

O HackConnect separa a interpretação da linguagem natural das regras de negócio e do armazenamento dos dados.


                    ┌─────────────────────┐
                    │      Swagger UI     │
                    │   Interface de API  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    NestJS Backend   │
                    │                     │
                    │  Events Controller  │
                    │  Agent Controller   │
                    │  Events Service     │
                    │  Agent Service      │
                    └───────┬─────┬───────┘
                            │     │
                 ┌──────────┘     └──────────┐
                 ▼                           ▼
      ┌────────────────────┐      ┌────────────────────┐
      │    GemmaService    │      │    Prisma ORM      │
      └─────────┬──────────┘      └─────────┬──────────┘
                │                           │
                ▼                           ▼
      ┌────────────────────┐      ┌────────────────────┐
      │   Ollama + Gemma 4 │      │    PostgreSQL      │
      │       Docker       │      │       Docker       │
      └────────────────────┘      └────────────────────┘

🔄 Fluxo do agente
O usuário envia uma mensagem pelo Swagger.
O NestJS recebe a solicitação.
O agente utiliza o Gemma 4 para interpretar a intenção.
O backend encaminha a operação para o serviço correspondente.
O Prisma consulta ou modifica os dados no PostgreSQL, conforme a operação implementada e autorizada.
A API devolve o resultado ao usuário.

Importante: o modelo de IA interpreta as solicitações, mas as operações no banco são controladas pelo backend. O modelo não possui acesso irrestrito ao banco de dados.

📂 Estrutura do projeto
text
HackConnect/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── agent/
│   │   │   ├── dto/
│   │   │   ├── agent.controller.ts
│   │   │   ├── agent.service.ts
│   │   │   └── gemma.service.ts
│   │   ├── events/
│   │   │   ├── dto/
│   │   │   ├── events.controller.ts
│   │   │   └── events.service.ts
│   │   ├── experiences/
│   │   ├── prisma/
│   │   │   └── prisma.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── docker-compose.yml
│
