# fivem-attributes

A super simple attributes system for setting and viewing details of a character.

_Saw someone selling this on Cfx forums, so here is a free version lol._

## Features

- Set a age, height, and description of your character for better customization and interactions.
- Attributes are stored in your database.
- Utilizes [Prisma](https://www.prisma.io) to save and fetch character details.
- Administrators have the ability to manage character details via command.

![preview](https://github.com/user-attachments/assets/6ffd27a7-a59d-4a6c-8907-b4759ccfce90)

## Installation

##### _If you download the source code via the green `Code` button, you'll need to build the resource. Information on how to do this is provided below. If you prefer not to build it, you can download latest release and drag and drop it into your server. However, any changes made to the built resource will need to be re-built to apply the changes._

### Dependencies

- [ox_lib](https://github.com/overextended/ox_lib)
- [ox_core](https://github.com/overextended/ox_core)

### Building this resource

1. Download and install the LTS version of [Node.js](https://nodejs.org/en).
2. Open a command-line terminal (e.g., Terminal, Command Prompt).
3. Enter `node --version` to verify the installation.
4. Run `npm install -g pnpm` to globally install the package manager [pnpm](https://pnpm.io).
5. Download or clone the repository with `git clone https://github.com/arlofonseca/fivem-attributes`.
6. Execute the queries found in `attributes.sql` in your database.
7. Install all dependencies with `pnpm i`.
8. Create a new file named `.env` within the root directory.
9. Copy the contents of `.env.example` to the newly created `.env` file and edit accordingly.
10. Connect your database with `pnpm pull` to add Prisma models to `schema.prisma`.
11. Generate Prisma client using `pnpm generate`.
12. Build the resource with `pnpm build`.

Use `pnpm watch` to rebuild whenever a file is modified.

## Usage

### Commands

#### `/attributes [age] [height] [details]` _(alias: `/atr`)_

- Set your characters age, height, and details.

#### `/examine [playerId]` _(alias: `/ep`)_

- Examine another player's age, height, and description.

#### [ADMIN] `/updatedetails [playerId] [age] [height] [details]` _(alias: `/ud`)_

- Update another player's age, height, and description.
