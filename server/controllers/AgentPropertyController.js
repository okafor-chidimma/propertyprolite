/* eslint-disable camelcase */
/* eslint-disable-next-line no-unused-vars */
import cloudinary from 'cloudinary';
import pool from '../database/db';
import agentPropQueries from '../database/queries/agentProp';
import Response from '../helpers/Response';
// eslint-disable-next-line no-unused-vars
import cloudDet from '../config/cloudinary';

const {
  insertPropertyQuery, updateAllProperty,
  updatePropertyStat, getpublicId,
  deleteProperty, getPropertyQuery
} = agentPropQueries;

const { successResponse, errorResponse } = Response;

let result_cloud;
let result_cloud_url;
let fileReq;
let publicId;

/**
 * Defines methods for users
 *
 * @class AgentPropertyController
 */

class AgentPropertyController {
  /**
   *
   * Creates an advert
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @returns
   * @memberof AgentPropertyController
   */
  static async createProperty(req, res) {
    const { user_id } = req.headers['x-auth-token'];
    console.log(req.headers['x-auth-token'], 'user create token');
    console.log(user_id, 'user');
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
      console.log(error, 'creatprop internal error');
      return res.status(500).json(errorResponse(`Internal Server error`));
    } finally {
      await client.release();
    }
  }

  /**
   *
   * Update an advert
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @returns
   * @memberof AgentPropertyController
   */

  static async UpdateProperty(req, res) {
    const { user_id } = req.headers['x-auth-token'];
    console.log(req.headers['x-auth-token'], 'user update token');
    console.log(user_id, 'user');
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
    console.log(req.params.id, 'user');
    console.log(typeof req.params.id, 'user');
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
      console.log(error, 'updateproperror');
      return res.status(500).json(errorResponse(`Internal Server Error`));
    } finally {
      await client.release();
    }
  }

  /**
   *
   * Marks an advert as sold
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @returns
   * @memberof AgentPropertyController
   */

  static async MarkSoldProperty(req, res) {
    const { user_id } = req.headers['x-auth-token'];
    console.log(req.headers['x-auth-token'], 'user sold token');
    console.log(user_id, 'user');
    console.log(req.params.id, 'user');
    console.log(typeof req.params.id, 'user');
    const property_id = parseInt(req.params.id, 10);
    let values = [property_id, user_id];
    const status = req.body.status || 'SOLD';
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
      console.log(error, 'soldprop internal error');
      return res.status(500).json(errorResponse(`Internal Server Error`));
    } finally {
      await client.release();
    }
  }

  /**
   *
   * Deletes an advert
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @returns
   * @memberof AgentPropertyController
   */
  static async DeleteProperty(req, res) {
    const { user_id } = req.headers['x-auth-token'];
    const property_id = parseInt(req.params.id, 10);
    let values = [property_id, user_id];
    console.log(req.headers['x-auth-token'], 'user sold token');
    console.log(user_id, 'user');
    console.log(req.params.id, 'user');
    console.log(typeof req.params.id, 'user');
    const client = await pool.connect();
    try {
      const { rows } = await client.query(getpublicId, values);
      if (!rows[0]) {
        return res.status(404).json(errorResponse(`This Property Advert can not found!`));
      }
      await cloudinary.v2.uploader.destroy(rows[0].public_id);
      values = [property_id, user_id];
      await client.query(deleteProperty, values);
      const deleteProp = { message: 'Advert Deleted Successfully' };
      return res.status(200).json(successResponse(`success`, deleteProp));
    } catch (error) {
      console.log(error, 'delete internal error');
      return res.status(500).json(errorResponse(`Internal Server Error`));
    } finally {
      await client.release();
    }
  }
}

export default AgentPropertyController;
