import DataUriParser from "datauri/parser.js";
// This package converts file buffer into a base64 encoded string.
import path from "path";
//Node.js built-in module used to get file extension.
const getDatauri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};
export default getDatauri;

/* 
1️⃣ User uploads resume
2️⃣ Multer stores it in memory
3️⃣ getDatauri converts it to base64
4️⃣ Cloudinary uploads it
5️⃣ Cloudinary returns URL
6️⃣ You store that URL in database */
