# BeavBright Monorepo

BeavBright's code organization is based on this [awesome turborepo template](https://github.com/dan5py/turborepo-shadcn-ui). We have added some customizations to it to make it more suitable for our needs.

It includes everything you need to get started in a single monorepo, with additional features such as:

- [Next.js](https://nextjs.org/) for the frontend
- [Hono](https://hono.dev/) as lightweight backend
- [shadcn/ui](https://ui.shadcn.com/) for the UI component library
- [Prisma](https://www.prisma.io/) as ORM
- [PostgreSQL](https://www.postgresql.org/) as database
- [Docker](https://www.docker.com/) for containerization, with docker-compose watch for hot reloading
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Livecycle](http://livecycle.io/) for instant sharing of your local development environment
- And some more of the usual goodies such as prettier, eslint, etc.

## Using this template

Clone the repository:

```sh
git clone https://github.com/OSU-App-Club/beavbright.git
```

Create your own `packages/database/.env` based on `packages/database/.env.example`:

Start everything with docker-compose:

```sh
docker-compose watch
```

Push database schema:

```sh
pnpm turbo db:generate
```

### Add ui components

Use the pre-made script:

```sh
pnpm install # if you haven't already
pnpm ui:add <component-name>
```

> This works just like the add command in the [shadcn/ui](https://ui.shadcn.com/docs/cli) CLI.

### Docker

Both the api (`api.Dockerfile`) and the web app (`web.Dockerfile`) are dockerized and managed by docker-compose (`docker-compose.yml`). You can start everything with:
```sh
docker-compose watch
```
This will start the api, the web app, and the database. It also enables hot reloading for both the api and the web app.

### Database

The database is a Postgres database managed by Prisma. It is reachable through this connection: `postgres://postgres:postgres@localhost:5432/beavbright`.

## What's inside?

Currently, the monorepo contains the following packages and applications:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `api`: a [Hono](https://hono.dev/) app
- `database`: a stub Prisma library shared by both `web` and `api` apps
- `ui`: a stub React component library powered by **shadcn/ui**
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo


## Credits

Thank you to [dan5py](https://github.com/dan5py/turborepo-shadcn-ui) for the original template, allowing our club to build on top of it.


## License

BeavBright is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.