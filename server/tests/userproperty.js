/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

import signInDet from '../testData/users';
import fraudDet from '../testData/userflaggedproperty';

import properties from '../models/propertyModel';

const { flaggedProp } = fraudDet;
const { testUserSignin } = signInDet;
const allProperties = properties;
let userToken;
let propertyId = 2;
let type = 'duplex';
let rooms = 2;

chai.use(chaiHttp);
chai.should();
describe('Users Property Endpoints', () => {
  before('Get request token', async () => {
    try {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(testUserSignin)
        .end((err, res) => {
          userToken = res.body.data.token;
        });
    } catch (error) {
      console.log(error);
    }
  });
  describe('GET /property', () => {
    it('should get all adverts', (done) => {
      chai.request(app)
        .get('/api/v1/property/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].id.should.be.a('number');
          res.body.data[0].should.have.property('fraud');
          res.body.data[0].fraud.should.be.a('boolean');
          res.body.data[0].should.have.property('status');
          res.body.data[0].status.should.be.a('string');
          res.body.data[0].should.have.property('price');
          res.body.data[0].price.should.be.a('number');
          res.body.data[0].should.have.property('country');
          res.body.data[0].country.should.be.a('string');
          res.body.data[0].should.have.property('state');
          res.body.data[0].state.should.be.a('string');
          res.body.data[0].should.have.property('city');
          res.body.data[0].city.should.be.a('string');
          res.body.data[0].should.have.property('address');
          res.body.data[0].address.should.be.a('string');
          res.body.data[0].should.have.property('no_of_rooms');
          res.body.data[0].no_of_rooms.should.be.a('number');
          res.body.data[0].should.have.property('type');
          res.body.data[0].type.should.be.a('string');
          res.body.data[0].should.have.property('adv_desc');
          res.body.data[0].adv_desc.should.be.a('string');
          res.body.data[0].should.have.property('adv_purpose');
          res.body.data[0].adv_purpose.should.be.a('string');
          res.body.data[0].should.have.property('duration');
          res.body.data[0].duration.should.be.a('string');
          res.body.data[0].should.have.property('image_url');
          res.body.data[0].image_url.should.be.a('string');
          res.body.data[0].should.have.property('created_on');
          res.body.data[0].created_on.should.be.a('string');
          res.body.data[0].should.have.property('ownerEmail');
          res.body.data[0].ownerEmail.should.be.a('string');
          res.body.data[0].should.have.property('ownerPhoneNumber');
          res.body.data[0].ownerPhoneNumber.should.be.a('string');
          done();
        });
    });
    it('Should Get All Properties of the same type', (done) => {
      chai.request(app)
        .get(`/api/v1/property/?type=${type}&rooms=${rooms}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].id.should.be.a('number');
          res.body.data[0].should.have.property('fraud');
          res.body.data[0].fraud.should.be.a('boolean');
          res.body.data[0].should.have.property('status');
          res.body.data[0].status.should.be.a('string');
          res.body.data[0].should.have.property('price');
          res.body.data[0].price.should.be.a('number');
          res.body.data[0].should.have.property('country');
          res.body.data[0].country.should.be.a('string');
          res.body.data[0].should.have.property('state');
          res.body.data[0].state.should.be.a('string');
          res.body.data[0].should.have.property('city');
          res.body.data[0].city.should.be.a('string');
          res.body.data[0].should.have.property('address');
          res.body.data[0].address.should.be.a('string');
          res.body.data[0].should.have.property('no_of_rooms');
          res.body.data[0].no_of_rooms.should.be.a('number');
          res.body.data[0].should.have.property('type');
          res.body.data[0].type.should.be.a('string');
          res.body.data[0].should.have.property('adv_desc');
          res.body.data[0].adv_desc.should.be.a('string');
          res.body.data[0].should.have.property('adv_purpose');
          res.body.data[0].adv_purpose.should.be.a('string');
          res.body.data[0].should.have.property('duration');
          res.body.data[0].duration.should.be.a('string');
          res.body.data[0].should.have.property('image_url');
          res.body.data[0].image_url.should.be.a('string');
          res.body.data[0].should.have.property('created_on');
          res.body.data[0].created_on.should.be.a('string');
          res.body.data[0].should.have.property('ownerEmail');
          res.body.data[0].ownerEmail.should.be.a('string');
          res.body.data[0].should.have.property('ownerPhoneNumber');
          res.body.data[0].ownerPhoneNumber.should.be.a('string');
          done();
        });
    });
    it('Should return 404 if property advert does not exist', (done) => {
      type = 'bungalow';
      rooms = 5;
      chai.request(app)
        .get(`/api/v1/property/?type=${type}&rooms=${rooms}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('No such property exists');
          done();
        });
    });
    it('Should Get A single Advert', (done) => {
      propertyId = 3;
      chai.request(app)
        .get(`/api/v1/property/${propertyId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
          res.body.data.should.have.property('fraud');
          res.body.data.fraud.should.be.a('boolean');
          res.body.data.should.have.property('status');
          res.body.data.status.should.be.a('string');
          res.body.data.should.have.property('price');
          res.body.data.price.should.be.a('number');
          res.body.data.should.have.property('country');
          res.body.data.country.should.be.a('string');
          res.body.data.should.have.property('state');
          res.body.data.state.should.be.a('string');
          res.body.data.should.have.property('city');
          res.body.data.city.should.be.a('string');
          res.body.data.should.have.property('address');
          res.body.data.address.should.be.a('string');
          res.body.data.should.have.property('no_of_rooms');
          res.body.data.no_of_rooms.should.be.a('number');
          res.body.data.should.have.property('type');
          res.body.data.type.should.be.a('string');
          res.body.data.should.have.property('adv_desc');
          res.body.data.adv_desc.should.be.a('string');
          res.body.data.should.have.property('adv_purpose');
          res.body.data.adv_purpose.should.be.a('string');
          res.body.data.should.have.property('duration');
          res.body.data.duration.should.be.a('string');
          res.body.data.should.have.property('image_url');
          res.body.data.image_url.should.be.a('string');
          res.body.data.should.have.property('created_on');
          res.body.data.created_on.should.be.a('string');
          res.body.data.should.have.property('ownerEmail');
          res.body.data.ownerEmail.should.be.a('string');
          res.body.data.should.have.property('ownerPhoneNumber');
          res.body.data.ownerPhoneNumber.should.be.a('string');
          done();
        });
    });
    it('Should return 404 if property advert does not exist', (done) => {
      propertyId = 1000;
      chai.request(app)
        .get(`/api/v1/property/${propertyId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('No such property exists');
          done();
        });
    });
  });
  describe('PATCH /property/:id', () => {
    it('Should mark an advert as fraudulent', (done) => {
      propertyId = 3;
      chai.request(app)
        .patch(`/api/v1/property/${propertyId}/fraud`)
        .set('x-auth-token', userToken)
        .send(flaggedProp)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
          res.body.data.should.have.property('propertyId');
          res.body.data.propertyId.should.be.a('number');
          res.body.data.should.have.property('location');
          res.body.data.location.should.be.a('string');
          res.body.data.should.have.property('reason');
          res.body.data.reason.should.be.a('string');
          res.body.data.should.have.property('fraud_desc');
          res.body.data.fraud_desc.should.be.a('string');
          res.body.data.should.have.property('created_on');
          res.body.data.created_on.should.be.a('string');
          done();
        });
    });
    it('Should return 404 if property advert does not exist', (done) => {
      propertyId = 1000;
      chai.request(app)
        .patch(`/api/v1/property/${propertyId}/fraud`)
        .set('x-auth-token', userToken)
        .send(flaggedProp)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('No such property exists');
          done();
        });
    });
  });
});
