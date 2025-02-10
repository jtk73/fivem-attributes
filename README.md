# fivem-attributes

A attributes system for setting and viewing details of a character.

## Features

- Utilizes [Prisma](https://www.prisma.io) to interact with your database.
- Set a age, height, and description of your character for better interactions.
- Attributes are stored in your database.
- Administrators have the ability to manage and oversee attributes via command.

![preview](https://github.com/user-attachments/assets/6ffd27a7-a59d-4a6c-8907-b4759ccfce90)

## Installation

##### _If you download the source code via the green `Code` button, you'll need to build the resource. Information on how to do this is provided below. If you prefer not to build it, you can download latest release and drag and drop it into your server. However, any changes made to the built resource will need to be re-built to apply the changes._

### Dependencies

- [ox_core](https://github.com/overextended/ox_core)
- [ox_lib](https://github.com/overextended/ox_lib)

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

#### `/attributes [age] [height] [details]` _(alias: `/attr`)_

- Set your character age, height, and details.

#### `/examine [playerId]` _(alias: `/ex`)_

- Examine another character age, height, and description.

#### [ADMIN] `/setattributes [playerId] [age] [height] [details]` _(alias: `/sattr`)_

- Update a character age, height, and or description.

#### [ADMIN] `/deleteattributes [playerId]` _(alias: `/dattr`)_

- Delete saved attributes for the specified player.

#### [ADMIN] `/listattributes` _(alias: `/lattr`)_

- View a list of all saved attributes.

## Support

For any feedback or support regarding this script, please reach out on [discord](https://discord.com/invite/QZgyyBkUkp).
