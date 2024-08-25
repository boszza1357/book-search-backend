import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import {getBooks ,getBook, updateBook,daleteBook,createBook,createUser,login} from "./model"


const app = new Elysia()
.use(cors({
  origin : "*",
  methods : ["GET","POST","PUT","DELETE"]
})) // ใช้เชี่อม 
.use(swagger()) // ใช้กับ api
.get("/", () => "Hello World")
.get("/hello", ()=>{
  return "Hello World"
})
.get("/books",() =>{
  return getBooks()
})
.get("/book/:id", ({params})=>{
  return getBook(parseInt(params.id))
})
.post("/book/save",({body})=>{
  return createBook(body)
})
.put("/books/:id", ({ params, body }) => {
  return updateBook(body, parseInt(params.id));
})
.delete("/book/delete/:id",({params})=>{
  return daleteBook(parseInt(params.id))
})
.post("/user",({body})=>{
  return createUser(body);
})
.post("/login",({body}) =>{
  return login(body)
})
.listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
