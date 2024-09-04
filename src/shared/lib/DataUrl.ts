import { fileToDataURL } from './fileToDataURL';

export class DataUrl {
  public dataUrl!: string;
  public size?: number;
  public name?: string;

  public static async create(file: File | string) {
    const instance = new DataUrl(file);
    await instance.convertFile();
    return instance;
  }

  public static createFromString(file: string) {
    const instance = new DataUrl(file);
    return instance;
  }

  private constructor(public file: File | string) {
    if (typeof file === 'string') {
      this.dataUrl = file;
      return;
    }
    this.name = file.name;
    this.size = file.size;
  }

  private async convertFile() {
    if (typeof this.file === 'string') {
      return;
    }
    this.dataUrl = await fileToDataURL(this.file);
  }
}
