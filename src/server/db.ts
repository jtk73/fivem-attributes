import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAttributes(charId: number) {
  try {
    return await prisma.attributes.findFirst({ where: { charId } });
  } catch (error) {
    console.error('getAttributes:', error);
  }
}

export async function saveAttributes(charId: number, name: string, age: number, height: number, details: string) {
  try {
    return await prisma.attributes.create({ data: { charId, name, age, height, details, created: new Date() } });
  } catch (error) {
    console.error('saveAttributes:', error);
  }
}

export async function updateAttributes(charId: number, age: number, height: number, details: string) {
  try {
    const result = await getAttributes(charId);
    if (!result) return null;
    return await prisma.attributes.update({
      where: { id: result.id },
      data: { age, height, details, created: new Date() },
    });
  } catch (error) {
    console.error('updateAttributes:', error);
  }
}

export async function deleteAttributes(charId: number) {
  try {
    return await prisma.attributes.deleteMany({ where: { charId: charId } });
  } catch (error) {
    console.error('deleteAttributes:', error);
  }
}

export async function getAllAttributes() {
  try {
    return await prisma.attributes.findMany();
  } catch (error) {
    console.error('getAllAttributes:', error);
  }
}
