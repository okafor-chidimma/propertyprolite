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
}

export default AgentPropertyController;
