import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

// CORS: permite que qualquer front-end consuma a API
server.register(cors, {
  origin: "*",
});

interface Team {
  id: number;
  name: string;
  base: string;
}

interface Driver {
  id: number;
  name: string;
  team: string;
}

const teams: Team[] = [
  { id: 1, name: "McLaren", base: "Woking, Inglaterra" },
  { id: 2, name: "Mercedes", base: "Brackley, Inglaterra" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, Inglaterra" },
  { id: 4, name: "Ferrari", base: "Maranello, Itália" },
  { id: 5, name: "Aston Martin", base: "Silverstone, Inglaterra" },
];

const drivers: Driver[] = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Mercedes" },
  { id: 3, name: "Lando Norris", team: "McLaren" },
  { id: 4, name: "Charles Leclerc", team: "Ferrari" },
  { id: 5, name: "Fernando Alonso", team: "Aston Martin" },
];

// GET /teams -> lista todas as equipes
server.get("/teams", async (_request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

// GET /drivers -> lista todos os pilotos
server.get("/drivers", async (_request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

// GET /drivers/:id -> filtra um piloto pelo id (Filter Driver)
interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>("/drivers/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const driver = drivers.find((d) => d.id === id);

  if (!driver) {
    response.type("application/json").code(404);
    return { message: "Driver Not Found" };
  }

  response.type("application/json").code(200);
  return { driver };
});

const port = Number(process.env.PORT ?? 3333);

server.listen({ port, host: "0.0.0.0" }, (error, address) => {
  if (error) {
    server.log.error(error);
    process.exit(1);
  }
  console.log(`🏎️  Server init at ${address}`);
});
