import fs from "fs";
import path from "path";

const PATH_STORAGE = path.join("./", "storage");
class Storage {
  private readonly path: string;

  static setup() {
    const isPathStorage = fs.existsSync(PATH_STORAGE);
    if (isPathStorage) return;
    fs.mkdirSync(PATH_STORAGE);
  }

  constructor(folder: string) {
    this.path = path.join(PATH_STORAGE, folder);
    const isPathFolder = fs.existsSync(this.path);
    if (isPathFolder) return;
    fs.mkdirSync(this.path);
  }

  save(file: Buffer, name: string) {
    const filePath = path.join(this.path, name);

    try {
      fs.writeFileSync(filePath, file);
      return true;
    } catch (error) {
      console.log((error as Error).message);
      return false;
    }
  }

  delete(name: string) {
    const filePath = path.join(this.path, name);

    try {
      fs.rmSync(filePath);
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  exists(name: string) {
    const filePath = path.join(this.path, name);
    return fs.existsSync(filePath);
  }

  reWrite(file: Buffer, name: string) {
    if (this.exists(name)) this.delete(name);
    this.save(file, name);
  }
}
export default Storage;
