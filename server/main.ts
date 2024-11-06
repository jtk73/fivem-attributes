import * as Cfx from "@nativewrappers/fivem/server";
import { GetPlayer } from "@overextended/ox_core/server";
import { addCommand } from "@overextended/ox_lib/server";
import * as db from './db';
import { formatHeight, sendChatMessage } from './utils';

addCommand(["attributes", "atr"], async (source: number, args: { age: number; height: number, details: string }) => {
  const player = GetPlayer(source);

  if (!player?.charId) return;

  const age: number = args.age;
  const height: number = args.height;
  // @ts-ignore
  const details = `${args.details} ${args.filter((item: any): boolean => item !== null).join(" ")}`;

  try {
    if (age < 16 || age > 90) {
      sendChatMessage(source, "^#d73232ERROR ^#ffffffAge must be between 16 and 90.");
      return;
    }

    if (height < 45 || height > 75) {
      sendChatMessage(source, "^#d73232ERROR ^#ffffffHeight must be between 45 (4'5) and 75 (7'5).");
      return;
    }

    const result = await db.getAttributes(player.charId);
    if (result) {
      sendChatMessage(source, `^#d73232You already have attributes saved!`);
      return;
    }

    await Cfx.Delay(100);

    await db.saveAttributes(player.charId, age, height, details);
    sendChatMessage(source, `^#5e81acAttributes have been saved successfully!`);
  } catch (error) {
    console.error("/attributes:", error);
    sendChatMessage(source, "^#d73232ERROR ^#ffffffAn error occurred while saving attributes.");
  }
}, {
  params: [
    {
      name: "age",
      paramType: "number",
      optional: false
    },
    {
      name: "height",
      paramType: "number",
      optional: false
    },
    {
      name: "details",
      paramType: "string",
      optional: false
    },
  ],
  restricted: false,
});

addCommand(["examine", "ep"], async (source: number, args: { playerId: number }) => {
  const player = GetPlayer(source);

  if (!player?.charId) return;

  const playerId: number = args.playerId;

  try {
    const target = GetPlayer(playerId);
    if (!target?.charId) {
      sendChatMessage(source, `^#d73232ERROR ^#ffffffNo player found with id ${playerId}.`);
      return;
    }

    const result = await db.getAttributes(target.charId);
    if (!result) {
      sendChatMessage(source, `^#d73232Player doesn't have any details set.`);
      return;
    }

    sendChatMessage(source, `^#1c873f|_____ ${target.get("name")}'s Details _____|`);
    sendChatMessage(source, `^#f5491eAge: ${result.age}`);
    sendChatMessage(source, `^#f5491eHeight: ${formatHeight(result.height)}`);
    sendChatMessage(source, `^#f5491eDescription: ${result.details}`);
  } catch (error) {
    console.error("/examine:", error);
    sendChatMessage(source, "^#d73232ERROR ^#ffffffAn error occurred while trying to fetch player attributes.");
  }
}, {
  params: [
    {
      name: "playerId",
      paramType: "number",
      optional: false,
    },
  ],
  restricted: false,
});

addCommand(["updatedetails", "ud"], async (source: number, args: { playerId: number; age: number; height: number; details: string }) => {
  const player = GetPlayer(source);

  if (!player?.charId) return;

  const playerId: number = args.playerId;
  const age: number = args.age;
  const height: number = args.height;
  // @ts-ignore
  const details = `${args.details} ${args.filter((item: any): boolean => item !== null).join(" ")}`;

  try {
    const target = GetPlayer(playerId);
    if (!target?.charId) {
      sendChatMessage(source, `^#d73232ERROR ^#ffffffNo player found with id ${playerId}.`);
      return;
    }

    const result = await db.getAttributes(target.charId);
    if (!result) {
      sendChatMessage(source, `^#d73232This player doesn't have attributes to update.`);
      return;
    }

    await Cfx.Delay(100);

    await db.updateAttributes(target.charId, age, height, details);
    sendChatMessage(source, `^#5e81acAttributes have been updated successfully for ^#ffffff${target.get("name")}`);
  } catch (error) {
    console.error("/updatedetails:", error);
    sendChatMessage(source, "^#d73232ERROR ^#ffffffAn error occurred while updating attributes.");
  }
}, {
  params: [
    {
      name: "playerId",
      paramType: "number",
      optional: false,
    },
    {
      name: "age",
      paramType: "number",
      optional: false,
    },
    {
      name: "height",
      paramType: "number",
      optional: false,
    },
    {
      name: "details",
      paramType: "string",
      optional: false,
    },
  ],
  restricted: "group.admin",
});
