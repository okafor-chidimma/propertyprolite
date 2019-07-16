/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import signInDet from '../testData/users';
import newProp from '../testData/agentproperty';
// import properties from '../models/propertyModel';
const { UserToken, testAgentSignin } = signInDet;
const { newProperty } = newProp;
let AgentToken;
let property_id;

chai.use(chaiHttp);
chai.should();
describe('Agents Property Endpoints', () => {
  before('Get request tokens', async () => {
    try {
      const url = '/api/v1/auth/signin';
      const responseOne = await chai.request(app).post(url).send(testAgentSignin);
      AgentToken = responseOne.body.data.token;
    } catch (error) {
      throw error;
    }
  });
  describe('POST /property', () => {
    it('should create a new property advert', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('x-auth-token', AgentToken)
        .send(newProperty)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').eql('Advert posted Successfully');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
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
          done();
        });
    });
    it('should return 400 error if status is empty', (done) => {
      const { status, ...partialPropertyDetails } = newProperty;
      chai.request(app)
        .post('/api/v1/property')
        .set('x-auth-token', AgentToken)
        .send(partialPropertyDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('Status is required!');
          done();
        });
    });
    it('should return 400 error if price is empty', (done) => {
      const { price, ...partialPropertyDetails } = newProperty;
      chai.request(app)
        .post('/api/v1/property')
        .set('x-auth-token', AgentToken)
        .send(partialPropertyDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('Invalid value');
          done();
        });
    });
    it('should return 400 error if state is empty', (done) => {
      const { state, ...partialPropertyDetails } = newProperty;
      chai.request(app)
        .post('/api/v1/property')
        .set('x-auth-token', AgentToken)
        .send(partialPropertyDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('Invalid value');
          done();
        });
    });
    it('should return 400 error if city is empty', (done) => {
      const { city, ...partialPropertyDetails } = newProperty;
      chai.request(app)
        .post('/api/v1/property')
        .set('x-auth-token', AgentToken)
        .send(partialPropertyDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('Invalid value');
          done();
        });
    });
    it('should return 400 error if address is empty', (done) => {
      const { address, ...partialPropertyDetails } = newProperty;
      chai.request(app)
        .post('/api/v1/property')
        .set('x-auth-token', AgentToken)
        .send(partialPropertyDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('Address is required!');
          done();
        });
    });
    it('should return 400 error if Type is empty', (done) => {
      const { type, ...partialPropertyDetails } = newProperty;
      chai.request(app)
        .post('/api/v1/property')
        .set('x-auth-token', AgentToken)
        .send(partialPropertyDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('Invalid value');
          done();
        });
    });
  });
  describe('PATCH /property/:id', () => {
    property_id = 7;
    it('Should Update a property advert', (done) => {
      chai.request(app)
        .patch(`/api/v1/property/${property_id}`)
        .set('x-auth-token', AgentToken)
        .send(newProperty)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('Advert Updated Successfully');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
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
          done();
        });
    });
    it('Should return 404 if property advert does not exist', (done) => {
      property_id = 1000;
      chai.request(app)
        .patch(`/api/v1/property/${property_id}`)
        .set('x-auth-token', AgentToken)
        .send(newProperty)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql('Error');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('Advert can not be found!');
          done();
        });
    });
    it('Should return 400 if property id is not valid', (done) => {
      property_id = 'xhjsjsgkak';
      chai.request(app)
        .patch(`/api/v1/property/${property_id}`)
        .set('x-auth-token', AgentToken)
        .send(newProperty)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('Invalid property Id.');
          done();
        });
    });
  });
  describe('PATCH /property/:id/sold', () => {
    it('Should Mark a property advert as sold', (done) => {
      property_id = 7;
      chai.request(app)
        .patch(`/api/v1/property/${property_id}/sold`)
        .set('x-auth-token', AgentToken)
        .send({ status: 'sold' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('Advert Status Updated Successfully');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
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
          done();
        });
    });
  });
  describe('DELETE /property/:id', () => {
    it('Should delete a property advert', (done) => {
      property_id = 7;
      chai.request(app)
        .delete(`/api/v1/property/${property_id}`)
        .set('x-auth-token', AgentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('message');
          res.body.data.message.should.be.a('string').eql('Advert Deleted Successfully');
          done();
        });
    });
  });
  describe('GET /property', () => {
    it('Should return 403 if user is not an agent', (done) => {
      property_id = 7;
      chai.request(app)
        .patch(`/api/v1/property/${property_id}`)
        .set('x-auth-token', UserToken)
        .send(newProperty)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('status').eql('Error');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('Forbidden. Only an Agent can perform this action.');
          done();
        });
    });
  });
});
