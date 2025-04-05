# fivem-attributes

A attributes system for setting and viewing details of a character.

## Features

- Utilizes [Prisma](https://www.prisma.io) to interact with your database.
- Set a age, height, and description of your character for better interactions.
- Attributes are stored in your database.
- Administrators have the ability to manage and oversee attributes via command.

![preview](https://github.com/user-attachments/assets/6ffd27a7-a59d-4a6c-8907-b4759ccfce90)

## Installation

### Dependencies

- [ox_core](https://github.com/overextended/ox_core)
- [ox_lib](https://github.com/overextended/ox_lib)

### Build

1. Download and install the LTS version of [Node.js](https://nodejs.org/en).
2. Open a command-line terminal (e.g., Terminal, Command Prompt).
3. Enter `node --version` to verify the installation.
4. Run `npm install -g pnpm` to globally install the package manager [pnpm](https://pnpm.io).
5. Download or clone the repository with `git clone https://github.com/jacobbernoulli/fivem-attributes`.
6. Execute the queries found in `sql/schema.sql` in your database.
7. Install all dependencies with `pnpm i`.
8. Create a new file named `.env` within the root directory.
9. Copy the contents of `.env.example` to the newly created `.env` file and edit accordingly.
10. Connect your database to add Prisma models to `schema.prisma` and generate Prisma client using `pnpm connect`.
11. Build the resource with `pnpm build`.

Use `pnpm watch` to rebuild whenever a file is modified.

## Usage

### Commands

#### Player

- `/attributes [age] [height] [details]` _(alias: `/attr`)_ - Set your character age, height, and description.
- `/examine [playerId]` _(alias: `/ex`)_ - Examine a character age, height, and description.

#### Admin

- `/sattr [playerId] [age] [height] [details]` - Update a character age, height, and or description.
- `/deleteattributes [playerId]` _(alias: `/dattr`)_ - Delete attributes from database and target player.
- `/listattributes` _(alias: `/lattr`)_ - View a list of all saved attributes in database.
