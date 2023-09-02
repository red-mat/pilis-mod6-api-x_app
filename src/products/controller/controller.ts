import { Request, Response } from "express";
import { ProductEntity } from "../core/ProductEntity";
import Product from "../core/product";


export const get = async (req: Request, res: Response) => {
  const id: string = req.params.productId;
  try {
    if (id) {
      const getProduct = await new Product().get(id)
      if (!getProduct) return res.send("The product not exist");
      return res.status(200).json(getProduct);
    }
    else {
      const products: ProductEntity[] = await ProductEntity.find();
      return res.json(products);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const create = async (req: Request, res: Response) => {

  try {
    const createProduct = await new Product().create(req.body, req.file)
    res.status(200).json(createProduct)
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const update = async (req: Request, res: Response) => {
  const id = req.params.productId
  try {
    await new Product().update(req.body, req.file, id)
    return res.status(200).json({ msg: "Product updated" });

  } catch (error: any) {
    res.status(500).json(error.message);
  };
}

export const destroy = async (req: Request, res: Response) => {
  const id: string = req.params.productId;
  try {
    await new Product().delete(id)

    res.status(200).json({ mensaje: "Product deleted" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  };
};
