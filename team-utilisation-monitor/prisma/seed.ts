import {PrismaClient}  from '@prisma/client'


const prisma=new PrismaClient()

async function main()
{
  /***
   * In this seed. The user with an id of 2 is connecting to the skill with an id of 3.
   * 
   */
   const new_member= await prisma.team.update({
    where:{
        id:2,
    },
    data:{
        members:{
            create:[{
                members:{
                    connect:{
                        id:4
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
