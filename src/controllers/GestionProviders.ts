import { Request, Response, NextFunction } from "express";
import ProviderSchema from "../models/modelProviders";
import { Provider } from "../interfaces/providers";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";

abstract class ManageProviders {
  public async postProviders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {

      const tokenCreated: any = req.headers["token"];
      const verifyToken: any = jwt.verify(tokenCreated, SECRET);
      const tokenIdUser = verifyToken.id;
      const {idCategory, name, company, email, phone, address,fecha } = req.body;
      if (!tokenIdUser) {
        return res.status(400).json({
          message: "No existe el token",
        });
      } else {
        const provider: Provider = new ProviderSchema({
          idCategory,
          tokenIdUser,
          name,
          company,
          email,
          phone,
          address,
        });

        const prov = await provider.save();
        console.log(prov);
        return res.status(201).json({
          message: "Provider created",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  public async getProviders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const tokenCreated: any = req.headers["token"];
      const verifyToken: any = jwt.verify(tokenCreated, SECRET);
      const tokenIdUser = verifyToken.id;
      if (!tokenIdUser) {
        return res.status(400).json({
          message: "No existe el token",
        });
      } else {
        const providers = await ProviderSchema.find();
        return res.status(200).json(providers);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  public async getProvidersId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const tokenCreated: any = req.headers["token"];
      const verifyToken: any = jwt.verify(tokenCreated, SECRET);
      const tokenIdUser = verifyToken.id;
      if (!tokenIdUser) {
        return res.status(400).json({
          message: "No existe el token",
        });
      } else {
        const { id } = req.params;
        const provider = await ProviderSchema.findById(id);
        return res.status(200).json(provider);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  public async putProviders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const tokenCreated: any = req.headers["token"];
      const verifyToken: any = jwt.verify(tokenCreated, SECRET);
      const tokenIdUser = verifyToken.id;
      if (!tokenIdUser) {
        return res.status(400).json({
          message: "No existe el token",
        });
      } else {
        const { id } = req.params;
        const { name, company, email, phone, address } = req.body;
        const provider: Provider | any = {
          name,
          company,
          email,
          phone,
          address,
        };
        const providerUpdated = await ProviderSchema.findByIdAndUpdate(
          id,
          provider,
          { new: true }
        );
        return res.status(200).json(providerUpdated);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  public async deleteProviders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const tokenCreated: any = req.headers["token"];
      const verifyToken: any = jwt.verify(tokenCreated, SECRET);
      const tokenIdUser = verifyToken.id;
      if (!tokenIdUser) {
        return res.status(400).json({
          message: "No existe el token",
        });
      } else {
        const { id } = req.params;
        const providerDeleted = await ProviderSchema.findByIdAndDelete(id);
        return res.status(200).json(providerDeleted);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  public async getProvidersProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const tokenCreated: any = req.headers["token"];
      const verifyToken: any = jwt.verify(tokenCreated, SECRET);
      const tokenIdUser = verifyToken.id;
      if (!tokenIdUser) {
        return res.status(400).json({
          message: "No existe el token",
        });
      } else {
        const { id } = req.params;
        const provider = await ProviderSchema.find({ productIdCategory: id });
        return res.status(200).json(provider);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export default ManageProviders;
