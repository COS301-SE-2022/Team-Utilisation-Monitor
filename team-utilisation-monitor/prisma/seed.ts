import {PrismaClient}  from '@prisma/client'


const prisma=new PrismaClient()

async function main()
{
  /***
   * In this seed. The user with an id of 2 is connecting to the skill with an id of 3
   */
  const assignskill=await prisma.person.update({
    where:{
      id:2,
    },
    data:{
      skills:{
        create:[{
          skill:{
            connect:{
              id:3
            }
          }
        }]
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
