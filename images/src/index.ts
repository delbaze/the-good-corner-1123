import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
const app = express();
app.use(cors());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req: any, res: Response) => {
  console.log("req file", req.file);
  console.log("req body", req.body);
  fs.readFile(`${req.file?.path}`, (err) => {
    if (err) {
      console.log("Error", err);
      res.status(500).json({ error: err });
    } else {
      res
        .status(201)
        .json({ status: "success", filename: `/files/${req.file?.filename}` });
    }
  });
  ///traiter  le fichier

  // {status: "success", filename: "/files/......"}
});

app.get("/files/:filename", (req, res) => {
  const file = path.join(__dirname + "/../uploads", req.params.filename) 
  console.log("file", file);
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, {"Content-Type": "text"});
      res.write("Le fichier n'a pas été trouvé")
      res.end();
    } else {
      res.writeHead(200, {"Content-Type": "application/octet-stream"})
      res.write(data);
      res.end()
    }

  })
  //renvoyer le fichier
  // content type : application/octet-stream
});
app.listen(3002, () => {
  console.log("Lancé sur http://localhost:3002");
});
