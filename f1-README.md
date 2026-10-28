# 🏎️ F1 API

Minimal API da Fórmula 1 com **Node.js**, **TypeScript** e **Fastify**.

## Rodando

```bash
npm install
npm run start:dev
```

## Endpoints

| Método | Rota           | Descrição                 |
|--------|----------------|---------------------------|
| GET    | `/teams`       | Lista as equipes          |
| GET    | `/drivers`     | Lista os pilotos          |
| GET    | `/drivers/:id` | Busca um piloto pelo id   |

Piloto inexistente retorna `404`. CORS liberado para qualquer origem.
