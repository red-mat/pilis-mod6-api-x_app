import { Request, Response } from "express";
import { Product } from "../core/ProductEntity";
import ProductService from "../core/product";


export const get = async (req: Request, res: Response) => {
  const id: string = req.params.productId;
  try {
    if (id) {
      const getProduct = await new ProductService().get(id)
      if (!getProduct) return res.send("The product not exist");
      return res.status(200).json(getProduct);
    }
    else {
      const products: Product[] = await Product.find();
      return res.json(products);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const createProduct = await new ProductService().create(req.body)
    return res.status(200).json(createProduct);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const update = async (req: Request, res: Response) => {
  const id = req.params.productId
  try {
    await new ProductService().update(id, req.body)
    return res.status(200).json({ msg: "Product updated" });

  } catch (error: any) {
    res.status(500).json(error.message);
  };
}

export const destroy = async (req: Request, res: Response) => {
  const id: string = req.params.productId;
  try {
    await new ProductService().delete(id)

    res.status(200).json({ mensaje: "Product deleted" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  };
};
