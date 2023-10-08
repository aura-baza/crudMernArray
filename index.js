import  express  from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const users=[
    // {name:"Aura Baza Puello",identity:11111, email:"email@gmail.com", phone:3218805120},
    // {name:"Shiara Baza Puello",identity:11112, email:"email@gmail.com", phone:311613434},
    // {name:"Daniela Baza Puello",identity:11113, email:"email@gmail.com", phone:3116160276},
];

//
const app=express();
//de donde van a darte uso
app.use(cors());

// se le indica que la informacion de intercambio será solo en json.
app.use(express.json());

app.get("/", (request, response)=>{
    response.json({message:"Mi API con express"})
});

//listando todos los usuarios.
app.get("/get-all-users", (request, response) => {
    try {
      return response.status(200).json({
        code: 200,
        response: true,
        message:"Lista de usuarios",
        data: users,
      });
    } catch (error) {
      return response.status(400).json({
        code: 400,
        response: false,
        message: "Se produjo un error",
  });
  }
  });

  //agregando un usuario.
  app.post("/create-user",(request, response)=>{
    try {
        const currentLength= users.length;
        // console.log(request.body);
        const data=request.body;
        if (data.name===null || data.identity===null || data.email===null || data.phone===null) {
            return response.status(400).json({
                message:"Algunos campos están vacíos",
                code:400,
                response:false
            });
        }
        users.push(data);
        if (currentLength < users.length) {
            return response.status(201).json({
                code:201,
                message:"Usuario creado correctamente",
                response:true
            });
        }else{
            return response.status(400).json({
                code:400,
                message:"Error",
                response:true
            }); 
        } 
    } catch (error) {
        console.log(error);   
    }
  });

//actualizando un usuario
app.put("/up-date-user",(request, response)=>{
 try {
    const data=request.body;
    // console.log(data);
    if (users.indexOf(data)===-1) {
    const userFind=users.find((item)=>item.identity===data.identity);
    const index= users.indexOf(userFind);
    users[index].name=data.name;
    users[index].email=data.email;
    users[index].phone=data.phone;
    return response.status(200).json({
        code:200,
        message:"Usuario actualizado correctamente",
        response:true
    });
    
    }else{
        return response.status(200).json({
            code:200,
            response:true
        });   
    }
 } catch (error) {
    console.log(error);
 }
  
})
//eliminando un usuario
app.delete('/delete-user/:identity',(request,response)=>{
    try {
        const identity=request.params.identity;
        const userFind=users.find((user)=>user.identity===identity);
        const index=users.indexOf(userFind);
        users.splice(index,1);
        return response.status(200).json({
            code:200,
            message:"Usuario Eliminado correctamente",
            response:true,
            index
        });
    } catch (error) {
        console.log(error);
    }
})

//me estoy ejecutnado en el puerto 4000
app.listen(process.env.PORT,()=>{
    console.log('escuchando en el puerto 4000');
});


