/* eslint-disable camelcase */
/* eslint-disable-next-line no-unused-vars */
import cloudinary from 'cloudinary';
import pool from '../database/db';
import agentPropQueries from '../database/queries/agentProp';
import Response from '../helpers/Response';
// eslint-disable-next-line no-unused-vars
import cloudDet from '../config/cloudinary';

const {
  insertPropertyQuery, updateAllProperty, updatePropertyStat, getpublicId, deleteProperty, getPropertyQuery
} = agentPropQueries;

const { successResponse, errorResponse } = Response;

// let result_cloud;
// let result_cloud_url;
// let fileReq;
// let publicId;

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
    const {
      status: status_input_create, price: price_input_create, country: country_input_create,
      state: state_input_create, city: city_input_create, address: address_input_create,
      no_of_rooms: room_input_create, type: type_input_create, adv_desc: description_input_create,
      adv_purpose: purpose_input_create, duration: duration_input_create, result_cloud_url: result_cloud_url_create, public_id: public_id_create
    } = req.body;
    const fraud = req.body.fraud || false;
    const insertPropValues = [user_id, status_input_create, price_input_create,
      country_input_create, state_input_create, city_input_create, address_input_create,
      room_input_create, fraud, type_input_create, description_input_create, purpose_input_create, duration_input_create, result_cloud_url_create, public_id_create];
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
    const property_id = parseInt(req.params.id, 10);
    let values = [property_id, user_id];
    const {
      status: status_input_update, price: price_input_update, country: country_input_update,
      state: state_input_update, city: city_input_update, address: address_input_update,
      no_of_rooms: room_input_update, type: type_input_update, adv_desc: description_input_update,
      adv_purpose: purpose_input_update, duration: duration_input_update, result_cloud_url: result_cloud_url_update, public_id: public_id_update
    } = req.body;
    const client = await pool.connect();
    try {
      const { rows: selectRow } = await client.query(getpublicId, values);
      if (!selectRow[0]) {
        return res.status(404).json(errorResponse(`Advert can not be found!`));
      }
      await cloudinary.v2.uploader.destroy(selectRow[0].public_id);
      const fraud_update = req.body.fraud || false;
      values = [status_input_update, price_input_update,
        country_input_update, state_input_update, city_input_update, address_input_update,
        room_input_update, fraud_update, type_input_update, description_input_update,
        purpose_input_update, duration_input_update, result_cloud_url_update, public_id_update, property_id, user_id];
      const { rows: rowUpdated } = await client.query(updateAllProperty, values);
      const updateProp = rowUpdated[0];
      return res.status(200).json(successResponse(`Advert Updated Successfully`, updateProp));
    } catch (error) {
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
      return res.status(500).json(errorResponse(`Internal Server Error`));
    } finally {
      await client.release();
    }
  }
}

export default AgentPropertyController;
