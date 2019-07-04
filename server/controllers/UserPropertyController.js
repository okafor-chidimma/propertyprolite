/* eslint-disable camelcase */
import properties from '../models/propertyModel';
import users from '../models/userModel';

const allProperties = properties;
const allUsers = users;

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
}

export default PropertyController;
