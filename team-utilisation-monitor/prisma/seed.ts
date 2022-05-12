import {PrismaClient}  from '@prisma/client'


const prisma=new PrismaClient()

async function main()
{


  const thesoftcompany= await prisma.company.create({
    data:{
      company_name:'the Soft Company',
      admin_id:1,

      projects:{
        create:[{
          project_name:'project E90',

          workers:{
            create:[
              {
                name:'Agape',
                surname:'mamphasa',
                email:'theaman249@gmail.com',
                role:'ADMIN',

                position:{
                  create:{
                    title:'ceo'
                  }
                },

                skills:{
                  create:[
                    {skill_type:'java'},{skill_type:'leadership'}
                  ]
                }
              }
            ]
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