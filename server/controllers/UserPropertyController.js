/* eslint-disable camelcase */
import pool from '../database/db';
import userPropQueries from '../database/queries/userProp';
import Response from '../helpers/Response';
import properties from '../models/propertyModel';
import flaggedProps from '../models/flaggedProperties';
import auth from '../helpers/Auth';


const { verifyToken } = auth;
const { getSamePropAdvQuery, getAllPropAdvQuery, getPropertyQuery, } = userPropQueries;

const { successResponse, errorResponse } = Response;
const allProperties = properties;
const allflaggedProperties = flaggedProps;
const flaggedPropsCount = allflaggedProperties.length;

class PropertyController {
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

  static async GetProperty(req, res) {
    const client = await pool.connect();
    try {
      const { id: property_id } = req.params;
      const value = [property_id, 'sold'];
      const { rows } = await client.query(getPropertyQuery, value);
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
