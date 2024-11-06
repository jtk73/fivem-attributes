import * as Cfx from "@nativewrappers/fivem/server";
import { GetPlayer } from "@overextended/ox_core/server";
import { addCommand } from "@overextended/ox_lib/server";
import db from "./db";

addCommand(["attributes", "atr"], async (source: number, args: { age: number; height: number, details: string }) => {
  const player = GetPlayer(source);

  if (!player?.charId) return;

  try {
    const result = await db.getAttributes(player.charId);
    if (result) {
      exports.chat.addMessage(source, `^#d73232You already have attributes saved!`);
      return;
    }

    const age: number = args.age;
    const height: number = args.height;
    // @ts-ignore
    const details = `${args.details} ${args.filter((item: any): boolean => item !== null).join(" ")}`;

    await Cfx.Delay(100);

    await db.saveAttributes(player.charId, age, height, details);
    exports.chat.addMessage(source, `^#5e81acAttributes have been saved successfully!`);
  } catch (error) {
    console.error("/attributes:", error);
    exports.chat.addMessage(source, "^#d73232ERROR ^#ffffffAn error occurred while saving attributes.");
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
      exports.chat.addMessage(source, `^#d73232ERROR ^#ffffffNo player found with id ${playerId}.`);
      return;
    }

    const attributes = await db.getAttributes(target.charId);
    if (!attributes) {
      exports.chat.addMessage(source, `^#d73232Player doesn't have any details set.`);
      return;
    }

    exports.chat.addMessage(source, `^#1c873f|_____ ${target.get("name")}'s Details _____|`);
    exports.chat.addMessage(source, `^#f5491eAge: ${attributes.age}`);
    exports.chat.addMessage(source, `^#f5491eHeight: ${formatHeight(attributes.height)}`);
    exports.chat.addMessage(source, `^#f5491eDescription: ${attributes.details}`);
  } catch (error) {
    console.error("/examine:", error);
    exports.chat.addMessage(source, "^#d73232ERROR ^#ffffffAn error occurred while trying to fetch player attributes.");
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

function formatHeight(height: number): string {
  const adjusted: number = height + 12;
  const feet: number = Math.floor(adjusted / 12);
  const inches: number = adjusted % 12;

  return `${feet}'${inches}`;
}

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
      exports.chat.addMessage(source, `^#d73232ERROR ^#ffffffNo player found with id ${playerId}.`);
      return;
    }

    const result = await db.getAttributes(target.charId);
    if (!result) {
      exports.chat.addMessage(source, `^#d73232This player doesn't have attributes to update.`);
      return;
    }

    await Cfx.Delay(100);

    await db.updateAttributes(target.charId, age, height, details);
    exports.chat.addMessage(source, `^#5e81acAttributes have been updated successfully for ^#ffffff${target.get("name")}`);
  } catch (error) {
    console.error("/updatedetails:", error);
    exports.chat.addMessage(source, "^#d73232ERROR ^#ffffffAn error occurred while updating attributes.");
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
