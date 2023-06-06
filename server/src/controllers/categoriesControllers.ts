import { NextFunction, Request, Response } from "express";
import categoriesServices from "../service/categories";

const index = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categoriesArray = await categoriesServices.getCategoriesNames();
    res.status(200).send(categoriesArray);
  } catch (error: unknown) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const category = await categoriesServices.getCategoryById(id);
    res.status(200).send(category);
  } catch (error: unknown) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name }: { name: string } = req.body;
    const createdCategory = await categoriesServices.createCategory(name);
    res.status(201).send(createdCategory);
  } catch (error: unknown) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const { name }: { name: string } = req.body;
    const category = await categoriesServices.putCategory(name, id);
    res.status(201).send(category);
  } catch (error: unknown) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const category = await categoriesServices.removeCategory(id);
    res.status(200).json(category);
  } catch (error: unknown) {
    next(error);
  }
};

const showProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const name: string = req.params.category;

    const category = {
      name
    }
    
    const productsFromCategory =
      await categoriesServices.getProductsByCategory(category);

    res.status(200).send(productsFromCategory);
  } catch (error: unknown) {
    next(error);
  }
};

export default { index, show, insert, update, remove, showProductsByCategory };
