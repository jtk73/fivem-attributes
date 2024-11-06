import { PrismaClient } from '@prisma/client';

class Database {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async saveAttributes(charId: number, age: number, height: number, details: string) {
    return await this.prisma.attributes.create({
      data: {
        charId: charId,
        age: age,
        height: height,
        details: details,
        created_date: new Date(),
      }
    });
  }

  async getAttributes(charId: number) {
    return await this.prisma.attributes.findFirst({ where: { charId: charId } });
  }

  async updateAttributes(charId: number, age: number, height: number, details: string) {
    return await this.prisma.attributes.update({
      where: { charId: charId },
      data: {
        age: age,
        height: height,
        details: details,
        created_date: new Date(),
      }
    });
  }
}

const db: Database = new Database();

export default db;
