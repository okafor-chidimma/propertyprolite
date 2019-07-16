/* eslint-disable camelcase */
/* eslint-disable-next-line no-unused-vars */
import cloudinary from 'cloudinary';
import pool from '../database/db';
import agentPropQueries from '../database/queries/agentProp';
import Response from '../helpers/Response';
import properties from '../models/propertyModel';

import auth from '../helpers/Auth';
// eslint-disable-next-line no-unused-vars
import cloudDet from '../config/cloudinary';

const {
  insertPropertyQuery, getpublicId, updateAllProperty,
  getPropertyQuery, updatePropertyStat
} = agentPropQueries;

const { successResponse, errorResponse } = Response;

const { verifyToken } = auth;

const allProperties = properties;
let result_cloud;
let result_cloud_url;
let fileReq;
let publicId;


class AgentPropertyController {
  static async createProperty(req, res) {
    const { user_id } = req.headers['x-auth-token'];
    if (req.file !== undefined) {
      fileReq = req.file.path;
    } else {
      fileReq = `http://res.cloudinary.com/okafor-chidimma/image/upload/v1562108668/ybxnh9g2jlkiho1ubpq2.jpg`;
    }
    if (req.file !== undefined) {
      try {
        result_cloud = await cloudinary.v2.uploader.upload(fileReq);
        result_cloud_url = result_cloud.url; publicId = result_cloud.public_id;
      } catch (error) {
        return res.status(400).json(errorResponse(`Could not upload Image to cloudinary!`));
      }
    } else {
      result_cloud_url = fileReq; publicId = 'uuyyytttfdfgf';
    }
    const {
      status: status_input, price: price_input, country: country_input,
      state: state_input, city: city_input, address: address_input,
      no_of_rooms: room_input, type: type_input, adv_desc: description_input,
      adv_purpose: purpose_input, duration: duration_input
    } = req.body;
    const fraud = req.body.fraud || false;
    const insertPropValues = [user_id, status_input, price_input,
      country_input, state_input, city_input, address_input,
      room_input, fraud, type_input, description_input,
      purpose_input, duration_input, result_cloud_url, publicId];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(insertPropertyQuery, insertPropValues);
      const newProp = rows[0];
      return res.status(201).json(successResponse(`Advert posted Successfully`, newProp));
    } catch (error) {
      return res.status(500).json(errorResponse(`Internal Server error`));
    } finally {
      await client.release();
    }
  }

  static async UpdateProperty(req, res) {
    const { user_id } = req.headers['x-auth-token'];
    if (req.file !== undefined) {
      fileReq = req.file.path;
    } else {
      fileReq = `http://res.cloudinary.com/okafor-chidimma/image/upload/v1562108668/ybxnh9g2jlkiho1ubpq2.jpg`;
    }
    if (req.file !== undefined) {
      try {
        result_cloud = await cloudinary.v2.uploader.upload(fileReq);
        result_cloud_url = result_cloud.url; publicId = result_cloud.public_id;
      } catch (error) {
        return res.status(400).json(errorResponse(`Could not upload Image to cloudinary!`));
      }
    } else {
      result_cloud_url = fileReq; publicId = 'uuyyytttfdfgf';
    }
    const property_id = parseInt(req.params.id, 10);
    let values = [property_id, user_id];
    const {
      status: status_input, price: price_input, country: country_input,
      state: state_input, city: city_input, address: address_input,
      no_of_rooms: room_input, type: type_input, adv_desc: description_input,
      adv_purpose: purpose_input, duration: duration_input,
    } = req.body;
    const client = await pool.connect();
    try {
      const { rows: selectRow } = await client.query(getpublicId, values);
      if (!selectRow[0]) {
        return res.status(404).json(errorResponse(`Advert can not be found!`));
      }
      await cloudinary.v2.uploader.destroy(selectRow[0].public_id);
      const fraud = req.body.fraud || false;
      values = [status_input, price_input,
        country_input, state_input, city_input, address_input,
        room_input, fraud, type_input, description_input,
        purpose_input, duration_input, result_cloud_url, publicId, property_id, user_id];
      const { rows: rowUpdated } = await client.query(updateAllProperty, values);
      const updateProp = rowUpdated[0];
      return res.status(200).json(successResponse(`Advert Updated Successfully`, updateProp));
    } catch (error) {
      return res.status(500).json(errorResponse(`Internal Server Error`));
    } finally {
      await client.release();
    }
  }


  static async MarkSoldProperty(req, res) {
    const { user_id } = req.headers['x-auth-token'];
    const property_id = parseInt(req.params.id, 10);
    let values = [property_id, user_id];
    const { status } = req.body;
    const client = await pool.connect();
    try {
      const { rows: soldProp } = await client.query(getPropertyQuery, values);
      if (!soldProp[0]) {
        return res.status(404).json(errorResponse(`This Property Advert can not found!`));
      }
      values = [status, property_id, user_id];
      const { rows: rowUpdated } = await client.query(updatePropertyStat, values);
      const updateProp = rowUpdated[0];
      return res.status(200).json(successResponse(`Advert Status Updated Successfully`, updateProp));
    } catch (error) {
      return res.status(500).json(errorResponse(`Internal Server Error`));
    } finally {
      await client.release();
    }
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
    const deletedProp = allProperties.find((property) => {
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

  static async GetMyProperties(req, res) {
    const token = req.headers['x-auth-token'];
    const verifyTokenAnswer = verifyToken(res, token);
    const userId = verifyTokenAnswer.id;
    // get all properties
    // remove the owner property id from the object
    // use the owner id to grab the phone no and address of the owners
    const found = allProperties.some((property) => {
      return (property.owner === userId);
    });
    if (!found) {
      return res.status(404).json({
        status: 'error',
        error: 'You do not have any property advert yet',
      });
    }
    const myProperties = allProperties.filter((property) => {
      return property.owner === userId;
    });
    return res.status(200).json({
      status: 'success',
      data: myProperties,
    });
  }

  static async GetMyproperty(req, res) {
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
    const singleProperty = allProperties.find((property) => {
      return (property.id === id && property.owner === userId);
    });
    return res.status(200).json({
      status: 'success',
      data: singleProperty,
    });
  }
}

export default AgentPropertyController;
