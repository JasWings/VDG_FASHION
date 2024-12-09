import express from "express";
import {   
    createFeature,
    getAllFeatures,
    getFeatureById,
    updateFeature,
    deleteFeature,
 } from "../../../../Controllers/user-management/permission/index.js";

const FeatureRouter = express.Router();

FeatureRouter.post("/", createFeature);
FeatureRouter.get("/", getAllFeatures);
FeatureRouter.get("/:id", getFeatureById);
FeatureRouter.put("/:id", updateFeature);
FeatureRouter.delete("/:id", deleteFeature);

export default FeatureRouter;
