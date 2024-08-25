import { Database } from "bun:sqlite";

const db = new Database("Bookstore.sqlite");
const query = db.query("select 'Hello world' as message;");
query.get(); // => { message: "Hello world" }

// CRUD

// C

const createBook = (book: any) => {
    try {
        const query = db.query(
            "INSERT INTO books (title, author, price, image) VALUES ($title, $author, $price, $image)"
        );
        query.run({
            $title: book.title,
            $author: book.author,
            $price: book.price,
            $image: book.image,
        });
        return { status: "success", message: `เพิ่ม ${book.title} สำเร็จ` };
    } catch (error) {
        console.log(error);
        return { status: "error", message: `เพิ่ม ${book.title} ไม่สำเร็จ` };
    }
};

// ทดสอบฟังก์ชัน createBook
console.log(
    createBook({
        title: "หนังสือ 1",
        author: "ผู้เขียน",
        price: 1000,
        image: "https:/lnwDew/150",
    })
);

export{createBook}

// อ่านข้อมูล (R)
const getBooks = () => {
    try {
        const query = db.query("SELECT * FROM books");
        const books = query.all();

        if (books.length === 0) {
            return { status: "error", message: "ไม่พบข้อมูล" };
        }
        return { status: "success", data: books };
    } catch (error) {
        console.log(error);
        return { status: "error", message: "เกิดข้อผิดพลาด" };
    }
};

// ทดสอบฟังก์ชัน getBooks
console.log(getBooks());
export{getBooks}

//  read by id

const getBook  = (id : number) =>{

    try {
        const query = db.query("select * from books where id = $id");

        const book = query.get({
            $id : id,
        })

        return {status : "success" , data : book};
    } catch (error) {
        console.log(error);
        return { status: "error", message: "เกิดข้อผิดพลาด" };
    }
}

console.log(getBook(2))
export{getBook}

// update


const updateBook = (book: any , id: number) => {
    try {
      const checkBook = getBook(book.id);
  
      if (checkBook.status === "error") {
        return checkBook;
      }
      // สร้าง query update book
      const query = db.query(
        "update books set title = $title, author = $author, price = $price, image = $image where id = $id"
      );
      // run query
      query.run({
        $title: book.title,
        $author: book.author,
        $price: book.price,
        $image: book.image,
        $id: book.id,
      });
  
      return { status: "success", mesage: `อัพเดท ${book.title} สําเร็จ` };
    } catch (error) {
      console.log(error);
      return { status: "error", mesage: "เกิดข้อผิดพลาด" };
    }
  };
export{updateBook}

// dalete

const daleteBook = (id : number) =>{
    try {
        const checkBook = getBook(id);
        if(checkBook.status === "error"){
            return checkBook
        }

        const query = db.query("delete from books where id = $id")

        query.run({
            $id : id,
        })

        return { status: "success", mesage: `ลบ ${id} สําเร็จ` };

    } catch (error) {
        
    }
}
console.log(daleteBook(9));
export{daleteBook}


const createUser = (user : any) => {

    try {
        const  query = db.query("insert into user (email , password) values ($email,$password)")

        query.run({
            $email : user.email,
            $password : user.password
        })

        
        return { status: "success", message: `เพิ่ม ${user.email} สำเร็จ` };
        
        
    } catch (error) {
        console.log(error);
        return { status: "error", message: `เพิ่ม ${user.email}ไม่สำเร็จ` };
    }
}
export{createUser}
// console.log(createUser({
//     email: "email.com",
//     password: "1234",
// }))

const login = (user : any) =>{
    try {
        const query = db.query("select * from user where email = $email and password = $password")
        
       const users = query.get({
        $email : user.email,
        $password : user.password
       });
        
        if(!user) {
            throw new Error ("รหัสผ่านไม่ถูกต้องหรือม่พบผู้ใช้งาน")
        }

        return {status : "success ", data : users};
    } catch (error) {

    console.log(error);
    return { status : "erro" , mesage : error.mesage}
    }
}
console.log(
    login({
      email: "email.com",
      password: "1234",
    })
  );

  export{login}

