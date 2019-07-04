/* eslint-disable camelcase */
import properties from '../models/propertyModel';
import users from '../models/userModel';

const allProperties = properties;
const allUsers = users;

class PropertyController {
  static async GetAllProperties(req, res) {
    const Prop = [];
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
