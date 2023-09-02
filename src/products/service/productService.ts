import { Storage } from "@/shared/storage";
import mime from "mime";
import { DataImage } from "../core/types";


export const saveImage = async ({ folder, file, productId }: DataImage): Promise<string> => {
  const buffer = file.buffer;
  const extension = mime.extension(file.mimetype);

  const storage = new Storage(folder);
  const fileName = `${productId}.${extension}`;
  const relativePath = `${folder}/${fileName}`;

  storage.save(buffer, fileName);

  return relativePath;
};
