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
const { testAgentSignin, noPropToken } = signInDet;
const { newProperty } = newProp;
let AgentToken;
let propertyId = 2;

chai.use(chaiHttp);
chai.should();
describe('Agents Property Endpoints', () => {
  before('Get request token', async () => {
    try {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(testAgentSignin)
        .end((err, res) => {
          AgentToken = res.body.data.token;
        });
    } catch (error) {
      console.log(error);
    }
  });
  describe('POST /property/agent', () => {
    it('should create a new property advert', (done) => {
      chai.request(app)
        .post('/api/v1/property/agent')
        .set('x-auth-token', AgentToken)
        .send(newProperty)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
          res.body.data.should.have.property('fraud');
          res.body.data.fraud.should.be.a('string');
          res.body.data.should.have.property('owner');
          res.body.data.owner.should.be.a('number');
          res.body.data.should.have.property('status');
          res.body.data.status.should.be.a('string');
          res.body.data.should.have.property('price');
          res.body.data.price.should.be.a('string');
          res.body.data.should.have.property('country');
          res.body.data.country.should.be.a('string');
          res.body.data.should.have.property('state');
          res.body.data.state.should.be.a('string');
          res.body.data.should.have.property('city');
          res.body.data.city.should.be.a('string');
          res.body.data.should.have.property('address');
          res.body.data.address.should.be.a('string');
          res.body.data.should.have.property('no_of_rooms');
          res.body.data.no_of_rooms.should.be.a('string');
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
    it('should return 400 error if fraud is empty', (done) => {
      const { fraud, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Fraud is required!');
        done();
      });
    });
    it('should return 400 error if status is empty', (done) => {
      const { status, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Invalid value');
        done();
      });
    });
    it('should return 400 error if price is empty', (done) => {
      const { price, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Invalid value');
        done();
      });
    });
    it('should return 400 error if country is empty', (done) => {
      const { country, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Invalid value');
        done();
      });
    });
    it('should return 400 error if state is empty', (done) => {
      const { state, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Invalid value');
        done();
      });
    });
    it('should return 400 error if city is empty', (done) => {
      const { city, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Invalid value');
        done();
      });
    });
    it('should return 400 error if address is empty', (done) => {
      const { address, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Address is required!');
        done();
      });
    });
    it('should return 400 error if number of rooms is empty', (done) => {
      const { no_of_rooms, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Invalid value');
        done();
      });
    });
    it('should return 400 error if Type is empty', (done) => {
      const { type, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Invalid value');
        done();
      });
    });
    it('should return 400 error if Advert Description is empty', (done) => {
      const { adv_desc, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Invalid value');
        done();
      });
    });
    it('should return 400 error if Advert Purpose is empty', (done) => {
      const { adv_purpose, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Advert Purpose is required!');
        done();
      });
    });
    it('should return 400 error if duration is empty', (done) => {
      const { duration, ...partialPropertyDetails } = newProperty;
      chai.request(app).post('/api/v1/property/agent').send(partialPropertyDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Advert Must contain only string');
        done();
      });
    });
  });
  describe('PATCH /property/agent/:id', () => {
    it('Should Update a property advert', (done) => {
      chai.request(app)
        .patch(`/api/v1/property/agent/${propertyId}`)
        .set('x-auth-token', AgentToken)
        .send(newProperty)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
          res.body.data.should.have.property('fraud');
          res.body.data.fraud.should.be.a('boolean');
          res.body.data.should.have.property('owner');
          res.body.data.owner.should.be.a('number');
          res.body.data.should.have.property('status');
          res.body.data.status.should.be.a('string');
          res.body.data.should.have.property('price');
          res.body.data.price.should.be.a('string');
          res.body.data.should.have.property('country');
          res.body.data.country.should.be.a('string');
          res.body.data.should.have.property('state');
          res.body.data.state.should.be.a('string');
          res.body.data.should.have.property('city');
          res.body.data.city.should.be.a('string');
          res.body.data.should.have.property('address');
          res.body.data.address.should.be.a('string');
          res.body.data.should.have.property('no_of_rooms');
          res.body.data.no_of_rooms.should.be.a('string');
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
      propertyId = 1000;
      chai.request(app)
        .patch(`/api/v1/property/agent/${propertyId}`)
        .set('x-auth-token', AgentToken)
        .send(newProperty)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('No such property exists');
          done();
        });
    });
  });
  describe('PATCH /property/agent/:id/sold', () => {
    it('Should Mark a property advert as sold', (done) => {
      propertyId = 2;
      chai.request(app)
        .patch(`/api/v1/property/agent/${propertyId}/sold`)
        .set('x-auth-token', AgentToken)
        .send({ status: 'sold' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
          res.body.data.should.have.property('fraud');
          res.body.data.fraud.should.be.a('boolean');
          res.body.data.should.have.property('owner');
          res.body.data.owner.should.be.a('number');
          res.body.data.should.have.property('status');
          res.body.data.status.should.be.a('string');
          res.body.data.should.have.property('price');
          res.body.data.price.should.be.a('string');
          res.body.data.should.have.property('country');
          res.body.data.country.should.be.a('string');
          res.body.data.should.have.property('state');
          res.body.data.state.should.be.a('string');
          res.body.data.should.have.property('city');
          res.body.data.city.should.be.a('string');
          res.body.data.should.have.property('address');
          res.body.data.address.should.be.a('string');
          res.body.data.should.have.property('no_of_rooms');
          res.body.data.no_of_rooms.should.be.a('string');
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
      propertyId = 1000;
      chai.request(app)
        .patch(`/api/v1/property/agent/${propertyId}/sold`)
        .set('x-auth-token', AgentToken)
        .send(newProperty)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('No such property exists');
          done();
        });
    });
  });
  // describe('DELETE /property/agent/:id', () => {
  //   it('Should delete a property advert', (done) => {
  //     propertyId = 2;
  //     chai.request(app)
  //       .delete(`/api/v1/property/agent/${propertyId}`)
  //       .set('x-auth-token', AgentToken)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have.property('status').eql('success');
  //         res.body.should.have.property('data');
  //         res.body.data.should.be.an('object');
  //         res.body.data.should.have.property('message');
  //         res.body.data.message.should.be.a('string').eql('Property successfully deleted!');
  //         done();
  //       });
  //   });
  //   it('Should return 404 if property advert does not exist', (done) => {
  //     propertyId = 1000;
  //     chai.request(app)
  //       .patch(`/api/v1/property/agent/${propertyId}/sold`)
  //       .set('x-auth-token', AgentToken)
  //       .send(newProperty)
  //       .end((err, res) => {
  //         res.should.have.status(404);
  //         res.body.should.have.property('status').eql('error');
  //         res.body.should.have.property('error');
  //         res.body.error.should.be.a('string').eql('No such property exists');
  //         done();
  //       });
  //   });
  // });
  describe('GET /property', () => {
    it('should get all adverts for a specific agent', (done) => {
      chai.request(app)
        .get('/api/v1/property/agent')
        .set('x-auth-token', AgentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].id.should.be.a('number');
          res.body.data[0].should.have.property('owner');
          res.body.data[0].owner.should.be.a('number');
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
          done();
        });
    });
    it('Should return 404 if agent has no advert', (done) => {
      chai.request(app)
        .get('/api/v1/property/agent')
        .set('x-auth-token', noPropToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('You do not have any property advert yet');
          done();
        });
    });
    it('Should Get A single Advert', (done) => {
      propertyId = 1;
      chai.request(app)
        .get(`/api/v1/property/agent/${propertyId}`)
        .set('x-auth-token', AgentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('id');
          res.body.data.id.should.be.a('number');
          res.body.data.should.have.property('owner');
          res.body.data.owner.should.be.a('number');
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
          done();
        });
    });
    it('Should return 404 if property advert does not exist', (done) => {
      propertyId = 1000;
      chai.request(app)
        .get(`/api/v1/property/agent/${propertyId}`)
        .set('x-auth-token', AgentToken)
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
