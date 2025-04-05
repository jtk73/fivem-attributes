import * as Cfx from '@nativewrappers/fivem';
import { GetPlayer } from '@overextended/ox_core/server';
import { addCommand } from '@overextended/ox_lib/server';
import * as config from '../../static/config.json';
import { formatHeight, isAdmin, sendChatMessage } from '../common/utils';
import * as db from './db';

const restrictedGroup = `group.${config.ace_group}`;

async function attributes(source: number, args: { age: number; height: number; details: string }): Promise<void> {
  const player = GetPlayer(source);

  if (!player?.charId) return;

  const age = args.age;
  const height = args.height;
  // @ts-ignore
  const details = `${args.details} ${args.filter((item: any): boolean => item !== null).join(' ')}`;

  try {
    const result = await db.getAttributes(player.charId);
    if (result) {
      sendChatMessage(source, '^#d73232You already have attributes saved!');
      return;
    }

    if (age < config.options.age.min || age > config.options.age.max) {
      sendChatMessage(
        source,
        `^#d73232ERROR ^#ffffffAge must be between ${config.options.age.min} and ${config.options.age.max}.`,
      );
      return;
    }

    if (height < config.options.height.min || height > config.options.height.max) {
      sendChatMessage(
        source,
        `^#d73232ERROR ^#ffffffHeight must be between ${config.options.height.min} (${formatHeight(config.options.height.min)}) and ${config.options.height.max} (${formatHeight(config.options.height.max)}).`,
      );
      return;
    }

    await Cfx.Delay(100);

    await db.saveAttributes(player.charId, player.get('name'), age, height, details);
    sendChatMessage(source, '^#5e81acAttributes have been saved successfully!');
  } catch (error) {
    console.error('attributes:', error);
    sendChatMessage(source, '^#d73232ERROR ^#ffffffAn error occurred while saving your attributes.');
  }
}

async function examine(source: number, args: { playerId: number }): Promise<void> {
  const player = GetPlayer(source);

  if (!player?.charId) return;

  const playerId = args.playerId;

  try {
    const target = GetPlayer(playerId);
    if (!target?.charId) {
      sendChatMessage(source, `^#d73232ERROR ^#ffffffNo player found with id ${playerId}.`);
      return;
    }

    // @ts-ignore
    if (!isAdmin(source, restrictedGroup)) {
      const distance = Math.sqrt(
        (player.getCoords()[0] - target.getCoords()[0]) ** 2 +
          (player.getCoords()[1] - target.getCoords()[1]) ** 2 +
          (player.getCoords()[2] - target.getCoords()[2]) ** 2,
      );
      if (distance > config.distance) {
        sendChatMessage(source, '^#d73232Player is too far away!');
        return;
      }
    }

    const result = await db.getAttributes(target.charId);
    if (!result) {
      sendChatMessage(source, `^#d73232${target.get('name')} doesn't have any attributes set.`);
      return;
    }

    sendChatMessage(source, `^#1c873f|_____ ${target.get('name')}'s Details _____|`);
    // @ts-ignore
    if (!isAdmin(source, restrictedGroup)) {
      sendChatMessage(source, `^#f5491eID: ${result.id}`);
    }
    sendChatMessage(source, `^#f5491eAge: ${result.age}`);
    sendChatMessage(source, `^#f5491eHeight: ${result.height !== null ? formatHeight(result.height) : 'N/A'}`);
    sendChatMessage(source, `^#f5491eDescription: ${result.details}`);
  } catch (error) {
    console.error('examine:', error);
    sendChatMessage(source, "^#d73232ERROR ^#ffffffAn error occurred while trying to fetch player's attributes.");
  }
}

async function set(
  source: number,
  args: { playerId: number; age: number; height: number; details: string },
): Promise<void> {
  const player = GetPlayer(source);

  if (!player?.charId) return;

  const playerId = args.playerId;
  const age = args.age;
  const height = args.height;
  // @ts-ignore
  const details = `${args.details} ${args.filter((item: any): boolean => item !== null).join(' ')}`;

  try {
    const target = GetPlayer(playerId);
    if (!target?.charId) {
      sendChatMessage(source, `^#d73232ERROR ^#ffffffNo player found with id ${playerId}.`);
      return;
    }

    const result = await db.getAttributes(target.charId);
    if (!result) {
      sendChatMessage(source, `^#d73232${target.get('name')} doesn't have any attributes to update.`);
      return;
    }

    await Cfx.Delay(100);

    await db.updateAttributes(target.charId, age, height, details);
    sendChatMessage(source, `^#5e81acAttributes have been successfully updated for ^#ffffff${target.get('name')}`);
  } catch (error) {
    console.error('set:', error);
    sendChatMessage(source, "^#d73232ERROR ^#ffffffAn error occurred while updating player's attributes.");
  }
}

async function del(source: number, args: { playerId: number }): Promise<void> {
  const player = GetPlayer(source);

  if (!player?.charId) return;

  const playerId = args.playerId;

  try {
    const target = GetPlayer(playerId);
    if (!target?.charId) {
      sendChatMessage(source, `^#d73232ERROR ^#ffffffNo player found with id ${playerId}.`);
      return;
    }

    const result = await db.getAttributes(target.charId);
    if (!result) {
      sendChatMessage(source, `^#d73232${target.get('name')} doesn't have any attributes to delete.`);
      return;
    }

    await Cfx.Delay(100);

    await db.deleteAttributes(target.charId);
    sendChatMessage(source, `^#5e81acAttributes have been successfully deleted for ^#ffffff${target.get('name')}`);
  } catch (error) {
    console.error('del:', error);
    sendChatMessage(source, "^#d73232ERROR ^#ffffffAn error occurred while deleting player's attributes.");
  }
}

async function list(source: number): Promise<void> {
  try {
    const list = await db.getAllAttributes();
    if (!list || list.length === 0) {
      sendChatMessage(source, '^#d73232No players have set attributes yet.');
      return;
    }

    sendChatMessage(source, '^#1c873f|_________ Player Attributes _________|');
    for (const character of list) {
      sendChatMessage(
        source,
        `^#f5491e${character.name}: Age ${character.age} | Height ${formatHeight(character.height ?? 0)} | Description: ${character.details}`,
      );
    }
  } catch (error) {
    console.error('list:', error);
    sendChatMessage(source, '^#d73232ERROR ^#ffffffAn error occurred while fetching the attributes list.');
  }
}

addCommand(['attributes', 'attr'], attributes, {
  params: [
    {
      name: 'age',
      paramType: 'number',
      optional: false,
    },
    {
      name: 'height',
      paramType: 'number',
      optional: false,
    },
    {
      name: 'details',
      paramType: 'string',
      optional: false,
    },
  ],
  restricted: false,
});

addCommand(['examine', 'ex'], examine, {
  params: [
    {
      name: 'playerId',
      paramType: 'number',
      optional: false,
    },
  ],
  restricted: false,
});

addCommand(['sattr'], set, {
  params: [
    {
      name: 'playerId',
      paramType: 'number',
      optional: false,
    },
    {
      name: 'age',
      paramType: 'number',
      optional: false,
    },
    {
      name: 'height',
      paramType: 'number',
      optional: true,
    },
    {
      name: 'details',
      paramType: 'string',
      optional: true,
    },
  ],
  restricted: restrictedGroup,
});

addCommand(['deleteattributes', 'dattr'], del, {
  params: [
    {
      name: 'playerId',
      paramType: 'number',
      optional: false,
    },
  ],
  restricted: restrictedGroup,
});

addCommand(['listattributes', 'lattr'], list, {
  restricted: restrictedGroup,
});
