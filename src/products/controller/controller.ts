import { Request, Response } from "express";
import { Product } from "../core/Entity";
import { ItemProduct } from "./product";


export const getProduct = async (req: Request, res: Response) => {
  const id: string = req.params.productId;

  try {
    const products: Product[] = await Product.find();
    if (products.length > 0 && id) {
      const getProduct: Product = products.find(product => product.id === id) as Product;
      if (!getProduct) return res.send("The product not exist");
      return res.status(200).json(getProduct);
    }
    return res.json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, stock }: ItemProduct = req.body;
  console.log(name)

  try {
    const newProduct: Product = new Product();
    newProduct.name = name;
    newProduct.price = price;
    newProduct.stock = stock;
    await newProduct.save();

    return res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id: string = req.params.productId;
  const { name, price, stock }: ItemProduct = req.body;

  try {
    const productValidate: Product | null = await Product.findOneBy({ id: id })
    if (!productValidate) return res.status(404).json({ message: "The product no exist" });

    await Product.update({ id: productValidate.id }, {
      name,
      price,
      stock
    });

    return res.status(200).json({ msg: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: error });
  };
}

export const deleteProduct = async (req: Request, res: Response) => {
  const id: string = req.params.productId;

  try {
    const productValidate: Product | null = await Product.findOneBy({ id: id });
    if (!productValidate) return res.status(404).json({ message: "The product no exist" });

    await Product.delete({ id: productValidate.id });

    res.status(200).json({ mensaje: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: error });
  };
};
