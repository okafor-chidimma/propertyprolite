/* eslint-disable camelcase */
import properties from '../models/propertyModel';
import users from '../models/userModel';
import flaggedProps from '../models/flaggedProperties';
import auth from '../helpers/Auth';

const { verifyToken } = auth;


const allProperties = properties;
const allUsers = users;
const allflaggedProperties = flaggedProps;
const flaggedPropsCount = allflaggedProperties.length;

class PropertyController {
  static async GetAllProperties(req, res) {
    const { query } = req;
    const Prop = [];
    if (Object.keys(query).length !== 0) {
      const rooms = parseInt(query.rooms, 10);
      const found = allProperties.some((property) => {
        return (property.no_of_rooms === rooms && property.type === query.type);
      });
      if (!found) {
        return res.status(404).json({
          status: 'error',
          error: 'No such property exists',
        });
      }
      const sameTypeProp = allProperties.filter((property) => {
        return (property.no_of_rooms === rooms && property.type === query.type);
      });
      sameTypeProp.forEach((prop) => {
        const userD = allUsers.find((userDet) => {
          return userDet.id === prop.owner;
        });
        const singleProp = { ...prop };
        singleProp.ownerEmail = userD.email;
        singleProp.ownerPhoneNumber = userD.phoneNumber;
        delete singleProp.owner;
        Prop.push(singleProp);
      });
      return res.status(200).json({
        status: 'success',
        data: Prop,
      });
    }
    // get all properties
    // remove the owner property id from the object
    // use the owner id to grab the phone no and address of the owners

    allProperties.forEach((prop) => {
      const userD = allUsers.find((userDet) => {
        return userDet.id === prop.owner;
      });
      const singleProp = { ...prop };
      singleProp.ownerEmail = userD.email;
      singleProp.ownerPhoneNumber = userD.phoneNumber;
      delete singleProp.owner;
      Prop.push(singleProp);
    });
    return res.status(200).json({
      status: 'success',
      data: Prop,
    });
  }

  static async GetProperty(req, res) {
    const Prop = [];
    const id = parseInt(req.params.id, 10);
    const found = allProperties.some((property) => {
      return (property.id === id);
    });
    if (!found) {
      return res.status(404).json({
        status: 'error',
        error: 'No such property exists',
      });
    }
    const singleProperty = allProperties.find((property) => {
      return (property.id === id);
    });
    const userDet = allUsers.find((user) => {
      return (singleProperty.owner === user.id);
    });
    const singleProp = { ...singleProperty };
    singleProp.ownerEmail = userDet.email;
    singleProp.ownerPhoneNumber = userDet.phoneNumber;
    delete singleProp.owner;
    Prop.push(singleProp);
    return res.status(200).json({
      status: 'success',
      data: singleProp,
    });
  }

  static async MarkPropAsFraud(req, res) {
    // must be logged in
    const token = req.headers['x-auth-token'];
    verifyToken(res, token);
    const bodyProperty = req.body;
    const propertyId = parseInt(req.params.id, 10);
    const found = allProperties.some((property) => {
      return (property.id === propertyId);
    });
    if (!found) {
      return res.status(404).json({
        status: 'error',
        error: 'No such property exists',
      });
    }
    const newFlaggedProp = {};
    newFlaggedProp.id = flaggedPropsCount + 1;
    newFlaggedProp.propertyId = propertyId;
    const keysNew = Object.keys(bodyProperty);
    keysNew.forEach((key) => {
      newFlaggedProp[key] = bodyProperty[key];
    });
    newFlaggedProp.created_on = new Date();
    allflaggedProperties.push(newFlaggedProp);
    const updatePropFlag = allProperties.find((prop) => {
      return prop.id === parseInt(propertyId, 10);
    });
    updatePropFlag.fraud = true;
    return res.status(201).json({
      status: 'success',
      data: newFlaggedProp,
    });
  }
}

export default PropertyController;
