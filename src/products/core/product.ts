import { ItemProduct } from "../controller/product";
import { Product } from "./ProductEntity";

export default class ProductService {

  async getList() {
    return Product.find();
  };

  async get(productId: string) {
    return Product.findOneBy({ id: productId });
  };

  async create(data: ItemProduct) {
    const { name, price, stock, category } = data;
    if (name && price && stock) {
      const newProduct: Product = new Product();
      newProduct.name = name;
      newProduct.price = price;
      newProduct.stock = stock;
      newProduct.category = category
      await newProduct.save();

      return newProduct;
    };
    throw new Error("One of the fields is incorrect");
  };

  async update(productId: string, data: ItemProduct) {
    const { name, price, stock } = data;
    const product = await this.get(productId);

    if (!product) throw new Error("The product no exist");
    await Product.update({ id: product.id }, {
      name,
      price,
      stock
    });
  };

  async delete(productId: string) {
    const product = await this.get(productId);
    if (!product) throw new Error("The product no exist");

    await Product.delete({ id: product.id });
  };
};
