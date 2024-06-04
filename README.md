![[BeavBright Preview Image]](./preview.png)

# BeavBright 🦫✨

Welcome to BeavBright! This is a monorepo for the BeavBright project, a platform for Oregon State University students to find and share resources for their classes. This project is being developed and maintained by the [Oregon State University](https://oregonstate.edu/) [App Development Club](https://osuapp.club/).

BeavBright's code organization is based on this [awesome turborepo template](https://github.com/dan5py/turborepo-shadcn-ui). We have added some customizations to it to make it more suitable for our needs.

## Contributors 🤝

![Contributors](https://contrib.rocks/image?repo=OSU-App-Club/beavbright)

## Tech Stack 🚀

- [TurboRepo](https://turbo.build/) for managing the beavbright monorepo
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for a design system
- [Framer Motion](https://www.framer.com/motion/) for animations and transitions
- [Next.js](https://nextjs.org/) as our frontend framework
- [Hono](https://hono.dev/) as our backend framework
- [JWT](https://jwt.io/) for authentication and authorization
- [Docker](https://www.docker.com/) for containerization, with docker-compose watch for hot reloading
- [Prisma](https://www.prisma.io/) as our type-safe database client
- [PostgreSQL](https://www.postgresql.org/) as our database
- [Snaplet](https://snaplet.dev/) for seeding the database
- [TypeScript](https://www.typescriptlang.org/) for static type checking and improved developer experience
- [ESLint](https://eslint.org/) for linting and code quality checks

## Getting Started 🏁

### Prerequisites

- [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) (for managing environment variables)
- [pnpm](https://pnpm.io/) (v6 or higher)
- [Docker](https://www.docker.com/) (for running the database)
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [OpenSSL](https://www.openssl.org/) (for generating JWT secrets - optional)

1. Clone the repository:

```sh
git clone https://github.com/OSU-App-Club/beavbright.git
```

2. Install the following:

```sh
pnpm install -g dotenv-cli
```

3. Create your `.env.local` files in the `packages/database` and `apps/web` directories:

```sh
cp packages/database/.env.example packages/database/.env.local
cp apps/web/.env.example apps/web/.env.local
```

> [!IMPORTANT]
> Be sure to replace the empty values in the `.env.local` files with your own values.

> [!TIP]
> You can generate a JWT secret by running the following command:

```sh
openssl rand -base64 32
```

4. Install the dependencies:

```sh
pnpm install
```

5. Start the development database:

```sh
docker-compose up -d postgres
```

6. Initialize the database in one command:

```sh
pnpm --filter database db:init
```

> [!NOTE]
> This will start prisma studio, where you can manage your database schema.
> For the next steps, you can close prisma studio or open a new terminal window/tab.

7. Navigate back to the root directory and start the development server:

```sh
pnpm run dev
```

<!-- ### Docker

Both the api (`api.Dockerfile`) and the web app (`web.Dockerfile`) are dockerized and managed by docker-compose (`docker-compose.yml`). You can start everything with:

```sh
docker-compose watch
```

This will start the api, the web app, and the database. It also enables hot reloading for both the api and the web app.

> [!WARNING]
> We're still ironing out some kinks with the docker setup. If you encounter any issues, feel free to open an issue or PR. -->

### Database

The database is a Postgres database managed by Prisma. It is reachable through this connection: `postgres://postgres:postgres@localhost:5432/beavbright` (or `DATABASE_URL` in `.env.local`).

## What's inside? 🤔

Currently, the monorepo contains the following packages and applications:

### Packages 📦

- `database`: Prisma client shared by both the `web` and `api` apps
- `ui`: a React component library powered by **shadcn/ui**
- `eslint-config-custom`: `eslint` configurations (including `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: TypeScript configurations used throughout the monorepo

### Applications 🚀

- `web`: a [Next.js 14](https://nextjs.org/) app
- `api`: a [Hono](https://hono.dev/) app

### Notable Scripts 📜

#### Global Scripts

| Script  | Command                               | Description                  |
| ------- | ------------------------------------- | ---------------------------- |
| build   | `turbo run build`                     | Compiles/transpiles project. |
| dev     | `turbo run dev`                       | Starts development server.   |
| lint    | `turbo run lint`                      | Checks code quality.         |
| format  | `prettier --write "**/*.{ts,tsx,md}"` | Formats code files.          |
| ui:add  | `pnpm --filter ui ui:add`             | Adds a new shadcn component. |
| db:init | `pnpm --filter database db:init`      | Initializes the database.    |

#### Database Scripts

| Command          | Description                                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db:generate`    | Generates Prisma client based on your Prisma schema.                                                                                                                        |
| `db:push`        | Pushes the schema state to the database without running migrations. Useful for prototyping.                                                                                 |
| `db:init`        | Initializes the database by installing dependencies, generating Prisma client, pushing the schema state to the database, seeding the database, and launching Prisma Studio. |
| `db:prod`        | Deploys migrations in production. This is typically used to apply migrations in a production environment.                                                                   |
| `db:studio`      | Opens Prisma Studio, a visual editor for your database.                                                                                                                     |
| `db:migrate`     | Runs migrations in development. This includes creating new migrations from changes in Prisma schema and applying them.                                                      |
| `db:postmigrate` | Generates Prisma client after running migrations.                                                                                                                           |
| `db:seed`        | Executes the seed script to populate the database with initial data.                                                                                                        |
| `db:scrape`      | Updates the database with data directly from OSU. Use the `-f` flag to run the command forcefully.                                                                                                  |
| `db:clean`       | Resets the database by dropping all data and applying migrations from scratch. Uses `--force` to bypass safety checks.                                                      |

## Credits 🙏

Thank you to [dan5py](https://github.com/dan5py/turborepo-shadcn-ui) for the original template. This allowed our club to build on top of it.

## License 📝

BeavBright is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
