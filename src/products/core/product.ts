import { Storage } from "@/shared/storage";
import { ItemProduct } from "../controller/product";
import { saveImage } from "../service/productService";
import { ProductEntity } from "./ProductEntity";
import path from "path";


export default class Product {

  async getList() {
    return ProductEntity.find();
  };

  async get(productId: string) {
    return ProductEntity.findOneBy({ id: productId });
  };

  async create(data: ItemProduct, file: any) {
    const { name, price, stock, category } = data;
    try {
      if (name && price && stock && category) {
        const newProduct: ProductEntity = new ProductEntity();
        newProduct.name = name;
        newProduct.price = price;
        newProduct.stock = stock;
        newProduct.category = category
        await newProduct.save();

        const dataImage = {
          folder: "product",
          file,
          productId: newProduct.id
        };
        newProduct.image = await saveImage(dataImage);
        await newProduct.save();

        return newProduct;
      };
      throw new Error("One of the fields is incorrect");
    } catch (error) {
      throw error
    }
  };

  async update(data: ItemProduct, file: any, productId: string) {
    const { name, price, stock, category } = data;
    const product = await this.get(productId);
    if (!product) throw new Error("The product no exist");
    if (file) {
      const dataImage = {
        folder: "product",
        file,
        productId: product.id
      };
      const newImage = await saveImage(dataImage);

      await ProductEntity.update({ id: product.id }, {
        name,
        price,
        stock,
        image: newImage,
        category
      });
    }
    await ProductEntity.update({ id: product.id }, {
      name,
      price,
      stock,
      category
    });
  };

  async delete(productId: string) {
    const product = await this.get(productId);
    if (!product) throw new Error("The product no exist");
    await ProductEntity.delete({ id: product.id });
    const pathImage = path.join(__dirname, `../../../storage/${product.image}`)
    if (Storage.exists(pathImage)) {
      Storage.delete(pathImage);
    };
  };
};
