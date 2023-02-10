import express from "express";
import dotenv from 'dotenv'
dotenv.config()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port=process.env.PORT || 5001

//intialize the server
const server=app.listen(port, () => console.log("Server up and running at port:",port))


//listen unhandleRejection
  process.on('unhandledRejection', (reason, p) => {
  //get slack notification about the error  
    console.error('Unhandled Rejection at:', p, 'reason:', reason)
  server.close()
  process.exit(1)
});
process.on('uncaughtException', (e) => {
  console.error('Uncaught exception at:', e)
  
  server.close()
  process.exit(1)
});
