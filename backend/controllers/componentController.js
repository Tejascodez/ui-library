import Component from "../models/Component.js";
import fs from "fs";

// @desc Create a new component
export const createComponent = async (req, res) => {
  try {
    const { componentName, componentHeading, installation, utilFile, sourceCode, cli, previewVideo } = req.body;

    const newComponent = await Component.create({
      componentName,
      componentHeading,
      installation,
      utilFile,
      sourceCode,
      cli,
      previewVideo, // now a string (YouTube URL)
    });

    res.status(201).json(newComponent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all components
export const getAllComponents = async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single component
export const getComponentById = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ message: "Component not found" });
    res.json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update component
export const updateComponent = async (req, res) => {
  try {
    const { componentName, componentHeading, installation, utilFile, sourceCode, cli, video } = req.body;

    const updatedFields = {
      componentName,
      componentHeading,
      installation,
      utilFile,
      sourceCode,
      cli,
      video, // update with string URL
    };

    const updatedComponent = await Component.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });

    res.json(updatedComponent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc Delete component
export const deleteComponent = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ message: "Component not found" });

    // delete video from storage
    if (component.video && fs.existsSync(component.video)) {
      fs.unlinkSync(component.video);
    }

    await component.deleteOne();
    res.json({ message: "Component deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
