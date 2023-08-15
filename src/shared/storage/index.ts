import fs from "fs";
import path from "path";

type FilePath = string | null;
type FIleBuffer = Buffer | null;
const STORAGE_PATH = path.resolve("./", "storage");
class Storage {
  private readonly path: string;

  static setup() {
    const isPathStorage = fs.existsSync(STORAGE_PATH);
    if (isPathStorage) return;
    fs.mkdirSync(STORAGE_PATH);
  }

  static open(filePath: string): FIleBuffer {
    try {
      return fs.readFileSync(filePath);
    } catch (error) {
      return null;
    }
  }

  constructor(folder: string) {
    this.path = path.join(STORAGE_PATH, folder);
    const isPathFolder = fs.existsSync(this.path);
    if (isPathFolder) return;
    fs.mkdirSync(this.path);
  }

  open(name: string): FIleBuffer {
    const filePath = path.join(this.path, name);

    try {
      return fs.readFileSync(filePath);
    } catch (error) {
      console.log((error as Error).message);
      return null;
    }
  }

  save(file: Buffer, name: string): FilePath {
    const filePath = path.join(this.path, name);

    try {
      fs.writeFileSync(filePath, file);
      return filePath;
    } catch (error) {
      console.log((error as Error).message);
      return null;
    }
  }

  delete(name: string): void {
    const filePath = path.join(this.path, name);

    try {
      fs.rmSync(filePath);
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  exists(name: string): boolean {
    const filePath = path.join(this.path, name);
    return fs.existsSync(filePath);
  }

  reWrite(file: Buffer, name: string): FilePath {
    if (this.exists(name)) this.delete(name);
    return this.save(file, name);
  }
}
export default Storage;
