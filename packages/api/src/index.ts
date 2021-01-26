import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  console.log('DB is Connected');

  app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
  });
}

main();

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
