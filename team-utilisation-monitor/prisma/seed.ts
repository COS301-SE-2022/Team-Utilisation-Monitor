import {PrismaClient}  from '@prisma/client'


const prisma=new PrismaClient()

async function main()
{

  const person_1=await prisma.company.create({

    data:{
      company_name:'Patronas',
      admin_id:4,
      
      teams:{
        create:[{
          team_name:'synthetic Team',

          project:{
            create:
            {
              project_name:'project merc',
              workers:{
                create:[{
                  name:'Orifha',
                  surname:'Mbedzi',
                  email:'om@gmail.com',
                  password:'code',

                  position:{
                      create:{
                      title:'senior software developer'
                    }
                  }
                },
                
                {
                  name:'Theo',
                  surname:'Faresa',
                  email:'thangeni@gmail.com',
                  password:'food',
      
                position:{
                  create:{
                    title:'junior software developer'
                  }
                }},

                {
                  name:'Cornel',
                  surname:'Rourke',
                  email:'CR@gmail.com',
                  password:'braaa',
      
                  position:{
                  create:{
                    title:'junior software developer'
                  }
                }
                }
              
              ]}
            }
          }
        
        }
      ]}

  

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