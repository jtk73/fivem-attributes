export function sendChatMessage(source: number, message: string) {
  return exports.chat.addMessage(source, message);
}

export function isAdmin(source: string, group: string): boolean {
  return IsPlayerAceAllowed(source, group);
}

export function formatHeight(height: number): string {
  const adjusted: number = height + 12;
  const feet: number = Math.floor(adjusted / 12);
  const inches: number = adjusted % 12;

  return `${feet}'${inches}`;
}
