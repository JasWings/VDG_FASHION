import { Sequence } from "../../../Models/helpers/sequence.js";
import { Feature, Role, RolePermission } from "../../../Models/user-management/administration/index.js";
import { generateUUID } from "../../../utils/helpers.js";
import Validations from "../../../Validations/index.js";

export const createFeature = async (req, res) => {
  try {
    const value = Validations.createFeature(req.body);
    
    const { identity, description } = value;

    const existingFeature = await Feature.findOne({ identity });

    if (existingFeature) {
      return res.status(400).json({ message: "Feature with this name already exists" });
    }

    const feature = new Feature({ identity, description });
    await feature.save();

    res.status(201).json({ status: 'sucess', message: "Feature created successfully", data: feature });
  } catch (error) {
    res.status(500).json({ status: "failed", message : error?.message  });
  }
};

export const getAllFeatures = async (req, res) => {
  try {

    const features = await Feature.find({ isDeleted: false });
    res.status(200).json({ status: "success", message : "Feature retrived successfully", data: features });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeatureById = async (req, res) => {
  try {
    const { id } = req.params;

    const feature = await Feature.findOne({ _id: id, isDeleted: false });
    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json(feature);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const value = Validations.updateFeature(req.body);
    

    const feature = await Feature.findOneAndUpdate(
      { _id: id, isDeleted: false },
      value,
      { new: true, runValidators: true }
    );

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json({ message: "Feature updated successfully", feature });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;

    const feature = await Feature.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json({ message: "Feature deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const createRoleWithPermissions = async (req, res) => {
    try {
      const value = Validations.RoleValidation(req.body);
  
      const { identity, description, permissions, isActive } = value;
  
      const role = new Role({
        identity,
        description,
        isActive,
      });
  
      await role.save();
  
      const featureList = await Feature.find();
      if (!featureList || featureList.length === 0) {
        return res.status(400).json({ message: 'No features found in the system' });
      }
  
      const rolePermissions = [];
  
      for (const feature of featureList) {
        const permissionsForFeature = permissions[feature.identity];
        if (permissionsForFeature) {
          const allowedActions = Object.keys(permissionsForFeature).filter(
            (action) => permissionsForFeature[action] === true
          );
  
          if (allowedActions.length > 0) {
            const uuid = await generateUUID();
            const sequence = await Sequence.findByIdAndUpdate(
              "PermissionsTables",
              { $inc: { seq: 1 } },
              { new: true, upsert: true }
            );
  
            rolePermissions.push({
              roleId: role._id,
              id: sequence.seq,
              uuid: uuid,
              featureId: feature._id,
              permissions: allowedActions,
              isActive,
            });
          }
        }
      }
  
      if (rolePermissions.length === 0) {
        return res
          .status(400)
          .json({ message: 'No valid permissions found for the specified features' });
      }
  
      await RolePermission.insertMany(rolePermissions);
  
      res.status(201).json({
        message: 'Role and Permissions created successfully',
        role,
        rolePermissions,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  