import {PrismaClient}  from '@prisma/client'


const prisma=new PrismaClient()

async function main()
{
  const addHistoric=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:20.2, week2:36.2, week3:25.8,week4:36,month:"JAN"},
            {week1:27.2, week2:34.2, week3:29.8,week4:44},
            {week1:20.2, week2:77.2, week3:35.8,week4:24},
            {week1:25.2, week2:30.2, week3:40.8,week4:20},
          ]
        }
      }
    },where:{
      id:2 //change the id here to add the id of the target person
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
