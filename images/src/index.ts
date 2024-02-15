import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World");
});

app.post(
  "/upload",
  (req, res, next) => {
    console.log("Coucou");
    next();
  },
  upload.single("file"),
  (req: any, res: Response) => {
    console.log("req file", req.file);
    console.log("req body", req.body);

    ///traiter  le fichier
  }
);
app.listen(6000, () => {
  console.log("Lancé sur http://localhost:6000");
});
