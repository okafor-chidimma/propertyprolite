/* eslint-disable camelcase */
import cloudinary from 'cloudinary';
import properties from '../models/propertyModel';

import auth from '../helpers/Auth';

// eslint-disable-next-line no-unused-vars
import cloudDet from '../config/cloudinary';

const { verifyToken } = auth;

const allProperties = properties;
const propertyCount = allProperties.length;

class AgentPropertyController {
  static async createProperty(req, res) {
    let resultCloud;
    let fileReq;
    if (req.file !== undefined) {
      fileReq = req.file.path;
    } else {
      fileReq = 'http://res.cloudinary.com/okafor-chidimma/image/upload/v1562108668/ybxnh9g2jlkiho1ubpq2.jpg';
    }
    const token = req.headers['x-auth-token'];
    const verifyTokenAnswer = verifyToken(res, token);
    const userId = verifyTokenAnswer.id;
    const newProperty = {};
    newProperty.id = propertyCount + 1;
    newProperty.owner = userId;
    const bodyProperty = req.body;
    const keysNew = Object.keys(bodyProperty);
    keysNew.forEach((key) => {
      newProperty[key] = bodyProperty[key];
    });
    newProperty.created_on = new Date();
    allProperties.push(newProperty);
    let resultCloudUrl;
    if (req.file !== undefined) {
      try {
        resultCloud = await cloudinary.v2.uploader.upload(fileReq);
        resultCloudUrl = resultCloud.url;
      } catch (error) {
        console.log(error, 'error');
      }
    } else {
      resultCloudUrl = fileReq;
    }
    newProperty.image_url = resultCloudUrl;
    return res.status(201).json({
      status: 'success',
      data: newProperty,
    });
  }

  static async UpdateProperty(req, res) {
    const token = req.headers['x-auth-token'];
    const verifyTokenAnswer = verifyToken(res, token);
    const userId = verifyTokenAnswer.id;
    const id = parseInt(req.params.id, 10);
    const found = allProperties.some((property) => {
      return (property.id === id && property.owner === userId);
    });
    if (!found) {
      return res.status(404).json({
        status: 'error',
        error: 'No such property exists',
      });
    }
    const updateProperty = req.body;
    const singleProperty = allProperties.find((property) => {
      return (property.id === id && property.owner === userId);
    });
    const keysUpdate = Object.keys(updateProperty);
    keysUpdate.forEach((key) => {
      if (typeof updateProperty[key] === 'string') {
        updateProperty[key] = updateProperty[key].trim();
      }
      if (updateProperty[key] !== "") {
        singleProperty[key] = updateProperty[key];
      } else {
        return res.status(400).json({
          status: 'error',
          error: `${key} cannot be empty`,
        });
      }
      return singleProperty;
    });
    return res.status(200).json({
      status: 'success',
      data: singleProperty,
    });
  }

  static async MarkSoldProperty(req, res) {
    const token = req.headers['x-auth-token'];
    const verifyTokenAnswer = verifyToken(res, token);
    const userId = verifyTokenAnswer.id;
    const id = parseInt(req.params.id, 10);
    const found = allProperties.some((property) => {
      return (property.id === id && property.owner === userId);
    });
    if (!found) {
      return res.status(404).json({
        status: 'error',
        error: 'No such property exists',
      });
    }
    const soldProperty = req.body.status;
    const singleProperty = allProperties.find((property) => {
      return (property.id === id && property.owner === userId);
    });
    singleProperty.status = soldProperty;
    return res.status(200).json({
      status: 'success',
      data: singleProperty,
    });
  }

  static async DeleteProperty(req, res) {
    const token = req.headers['x-auth-token'];
    const verifyTokenAnswer = verifyToken(res, token);
    const userId = verifyTokenAnswer.id;
    const id = parseInt(req.params.id, 10);
    const found = allProperties.some((property) => {
      return (property.id === id && property.owner === userId);
    });
    if (!found) {
      return res.status(404).json({
        status: 'error',
        error: 'No such property exists',
      });
    }
    const deletedProp = allProperties.find((property, index) => {
      return (property.id === id && property.owner === userId);
    });
    const index = allProperties.indexOf(deletedProp);
    allProperties.splice(index, 1);
    const deleteSuccess = {
      message: 'Property successfully deleted!',
    };
    return res.status(200).json({
      status: 'success',
      data: deleteSuccess,
    });
  }
}

export default AgentPropertyController;
