/* eslint-disable camelcase */
import pool from '../database/db';
import userPropQueries from '../database/queries/userProp';
import Response from '../helpers/Response';

const {
  getSamePropAdvQuery, getAllPropAdvQuery, getPropertyQueryUser, getPropFraudQuery, updatePropertyQuery, insertProp
} = userPropQueries;

const { successResponse, errorResponse } = Response;

/**
 * Defines methods for users when accessing adverts
 *
 * @class UserPropertyController
 */
class PropertyController {
  /**
   *
   * Get all or specific Adverts
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @returns
   * @memberof UserPropertyController
   */
  static async GetAllProperties(req, res) {
    let rowProps;
    const { query } = req;
    const client = await pool.connect();
    try {
      if (Object.keys(query).length !== 0) {
        const { type } = query;
        const values = [type];
        const { rows } = await client.query(getSamePropAdvQuery, values);
        rowProps = rows;
      } else {
        const value = ['sold'];
        const { rows } = await client.query(getAllPropAdvQuery, value);
        rowProps = rows;
      }
      if (!rowProps[0]) {
        return res.status(404).json(errorResponse(`Advert can not be found!`));
      }
      return res.status(200).json(successResponse(`Adverts Found`, rowProps));
    } catch (error) {
      return res.status(500).json(errorResponse(`Internal server error!`));
    } finally {
      await client.release();
    }
  }
  /**
   *
   * Get an Advert
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @returns
   * @memberof UserPropertyController
   */

  static async GetProperty(req, res) {
    const client = await pool.connect();
    try {
      const { id: property_id } = req.params;
      const value = [property_id, 'sold'];
      const { rows } = await client.query(getPropertyQueryUser, value);
      if (!rows[0]) {
        return res.status(404).json(errorResponse(`Advert can not be found!`));
      }
      const propertyAdvert = rows[0];
      return res.status(200).json(successResponse(`Adverts Found`, propertyAdvert));
    } catch (error) {
      return res.status(500).json(errorResponse(`Internal server error!`));
    } finally {
      await client.release();
    }
  }

  static async MarkPropAsFraud(req, res) {
    // must be logged in
    const { id: property_id } = req.params;
    const value = [property_id];
    const { reason, location, description } = req.body;
    const client = await pool.connect();
    try {
      const { rows } = await client.query(getPropFraudQuery, value);
      if (!rows[0]) {
        return res.status(404).json(errorResponse(`Advert can not be found!`));
      }
      if (rows[0].fraud) {
        return res.status(400).json(errorResponse(`This Property Advert Has Already Been Flagged!`));
      }
      // begins a transaction
      await client.query('BEGIN');
      const insertPropValues = [property_id, reason, location, description];
      await client.query(updatePropertyQuery, value);
      const { rows: rowFlagged } = await client.query(insertProp, insertPropValues);
      await client.query('COMMIT');
      return res.status(201).json(successResponse(`Advert Flagged Successfully`, rowFlagged[0]));
    } catch (error) {
      console.log(error, 'error in fraud');
      await client.query('ROLLBACK');
      return res.status(500).json(errorResponse(`Internal Server Error!`));
    } finally {
      await client.release();
    }
  }
}

export default PropertyController;
