import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAttributes(charId: number) {
  return await prisma.attributes.findFirst({ where: { charId } });
};

export async function saveAttributes(charId: number, age: number, height: number, details: string) {
  return await prisma.attributes.create({ data: { charId, age, height, details, created_date: new Date() } });
};

export async function updateAttributes(charId: number, age: number, height: number, details: string) {
  const result = await getAttributes(charId);
  if (!result) return null;

  return await prisma.attributes.update({ where: { id: result.id }, data: { age, height, details, created_date: new Date() } });
};
