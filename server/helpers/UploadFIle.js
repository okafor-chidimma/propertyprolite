/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import cloudinary from 'cloudinary';
import Response from './Response';
// eslint-disable-next-line no-unused-vars
import cloudDet from '../config/cloudinary';

const { errorResponse } = Response;


/**
 * Defines methods for users
 *
 * @class Uploadfile
 */

class Uploadfile {
  /**
   *
   * Creates an advert
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @returns
   * @memberof Uploadfile
   */
  static async imageUpload (req, res, next) {
    let result_cloud;
    let result_cloud_url;
    let fileReq;
    let publicId;
    if (req.file !== undefined) {
      fileReq = req.file.path;
      try {
        result_cloud = await cloudinary.v2.uploader.upload(fileReq);
        result_cloud_url = result_cloud.url;
        publicId = result_cloud.public_id;
      } catch (error) {
        return res.status(400).json(errorResponse(`Could not upload Image to cloudinary!`));
      }
    } else {
      fileReq = `http://res.cloudinary.com/okafor-chidimma/image/upload/v1562108668/ybxnh9g2jlkiho1ubpq2.jpg`;
      result_cloud_url = fileReq;
      publicId = 'uuyyytttfdfgf';
    }
    req.body.public_id = publicId;
    req.body.result_cloud_url = result_cloud_url;
    next();
  }
}

export default Uploadfile;
