import { GetPlayer } from "@overextended/ox_core/server";
import { addCommand } from "@overextended/ox_lib/server";
import db from "./db";

addCommand(["attributes"], async (source: number, args: { age: number; height: number, details: string }) => {
  const player = GetPlayer(source);

  if (!player?.charId) return;

  const age: number = args.age;
  const height: number = args.height;
  // @ts-ignore
  const details = `${args.details} ${args.filter((item: any): boolean => item !== null).join(" ")}`;

  try {
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

addCommand(["examine"], async (source: number, args: { playerId: number }) => {
  const player = GetPlayer(source);

  if (!player?.charId) return;

  const playerId: number = args.playerId;

  try {
    const target = GetPlayer(playerId);
    if (!target?.charId) {
      exports.chat.addMessage(source, `^#d73232ERROR ^#ffffffNo player found with ID ${playerId}.`);
      return;
    }

    const attributes = await db.getAttributes(target.charId);
    if (!attributes) return;

    const formattedHeight: string = formatHeight(attributes.height);

    exports.chat.addMessage(source, `^#5e81ac--------- ^#ffffff${target.get("name")}"s Details ^#5e81ac---------`);
    exports.chat.addMessage(source, `^#ffffffAge: ^#5e81ac${attributes.age}`);
    exports.chat.addMessage(source, `^#ffffffHeight: ^#5e81ac${formattedHeight}`);
    exports.chat.addMessage(source, `^#ffffffDescription: ^#5e81ac${attributes.details}`);
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
  const feet: number = Math.floor(height / 12);
  const inches: number = height % 12;

  return `${feet}'${inches}`;
}
