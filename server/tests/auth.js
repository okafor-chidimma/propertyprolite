/* eslint-disable camelcase */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import signInData from '../testData/users';

const {
  testUser, testUserSignin, testAgent, corectToken, noPropToken
} = signInData;

chai.use(chaiHttp);
chai.should();

/* eslint-disable no-unused-vars */

describe('Auth Endpoints', () => {
  describe('POST /signup', () => {
    it('should create a new user account', (done) => {
      chai.request(app).post('/api/v1/auth/signup').send(testUser).end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql('Account successfully created.');
        res.body.should.have.property('data');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.token.should.be.a('string');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('first_name');
        res.body.data.first_name.should.be.a('string');
        res.body.data.should.have.property('last_name');
        res.body.data.last_name.should.be.a('string');
        res.body.data.should.have.property('email');
        res.body.data.email.should.be.a('string');
        res.body.data.should.have.property('phone_number');
        res.body.data.phone_number.should.be.a('string');
        res.body.data.should.have.property('address');
        res.body.data.address.should.be.a('string');
        res.body.data.should.have.property('type');
        res.body.data.type.should.be.a('string');
        res.body.data.should.have.property('is_admin');
        res.body.data.is_admin.should.be.a('boolean');
        res.body.data.should.have.property('id');
        res.body.data.id.should.be.a('number');
        done();
      });
    });
    it('should create a new agent account', (done) => {
      chai.request(app).post('/api/v1/auth/signup').send(testAgent).end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql('Account successfully created.');
        res.body.should.have.property('data');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.token.should.be.a('string');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('first_name');
        res.body.data.first_name.should.be.a('string');
        res.body.data.should.have.property('last_name');
        res.body.data.last_name.should.be.a('string');
        res.body.data.should.have.property('email');
        res.body.data.email.should.be.a('string');
        res.body.data.should.have.property('phone_number');
        res.body.data.phone_number.should.be.a('string');
        res.body.data.should.have.property('address');
        res.body.data.address.should.be.a('string');
        res.body.data.should.have.property('type');
        res.body.data.type.should.be.a('string');
        res.body.data.should.have.property('is_admin');
        res.body.data.is_admin.should.be.a('boolean');
        res.body.data.should.have.property('id');
        res.body.data.id.should.be.a('number');
        done();
      });
    });
    it('should return 400 error if first_name is empty', (done) => {
      const { first_name, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('First name is required.');
        done();
      });
    });
    it('should return 400 error if last_name is empty', (done) => {
      const { last_name, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Last name is required.');
        done();
      });
    });
    it('should return 400 error if email is empty', (done) => {
      const { email, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Email is required.');
        done();
      });
    });
    it('should return 400 error if password is empty', (done) => {
      const { password, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Password is required.');
        done();
      });
    });
    it('should return 400 error if phone number is empty', (done) => {
      const { phone_number, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Phone number is required!');
        done();
      });
    });
    it('should return 400 error if address is empty', (done) => {
      const { address, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Address is required!');
        done();
      });
    });
    it('should return 400 error if is_admin is empty', (done) => {
      const { is_admin, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Wrong Data type!');
        done();
      });
    });
    it('should return 400 error if user type is empty', (done) => {
      const { type, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('User Type is required!');
        done();
      });
    });
  });
  describe('POST /signin', () => {
    it('should login a user', (done) => {
      chai.request(app).post('/api/v1/auth/signin').send(testUserSignin).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql('User successfully logged in.');
        res.body.should.have.property('data');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.token.should.be.a('string');
        res.body.data.should.have.property('first_name');
        res.body.data.first_name.should.be.a('string');
        res.body.data.should.have.property('last_name');
        res.body.data.last_name.should.be.a('string');
        res.body.data.should.have.property('email');
        res.body.data.email.should.be.a('string');
        res.body.data.should.have.property('id');
        res.body.data.id.should.be.an('number');
        res.body.data.should.have.property('address');
        res.body.data.address.should.be.a('string');
        res.body.data.should.have.property('phone_number');
        res.body.data.phone_number.should.be.a('string');
        res.body.data.should.have.property('type');
        res.body.data.type.should.be.a('string');
        res.body.data.should.have.property('is_admin');
        res.body.data.is_admin.should.be.a('boolean');
        done();
      });
    });
    it('should return 400 error if email is empty', (done) => {
      const { password: PasswordTestSigin } = testUserSignin;
      chai.request(app).post('/api/v1/auth/signin').send({ password: PasswordTestSigin }).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Email is required.');
        done();
      });
    });
    it('should return 400 error if password is empty', (done) => {
      const { email: EmailTestSignin } = testUserSignin;
      chai.request(app).post('/api/v1/auth/signin').send({ email: EmailTestSignin }).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Password is required.');
        done();
      });
    });
    it('should return 400 error if email is incorrect', (done) => {
      chai.request(app).post('/api/v1/auth/signin')
        .send({ email: 'samuelegwuej3yi@gmail.cm', password: 'iamasonofgod', })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          res.body.error.should.eql('Email or password incorrect!');
          done();
        });
    });

    it('should return 400 error if password is incorrect', (done) => {
      chai.request(app).post('/api/v1/auth/signin')
        .send({ email: 'samuelegwuej3yi@gmail.com', password: 'iamasonofgd', })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          res.body.error.should.eql('Email or password incorrect!');
          done();
        });
    });
  });
  describe('POST /auth/validate/token', () => {
    it('should check whether a token is valid', (done) => {
      try {
        chai.request(app).post('/api/v1/auth/validate/token')
          .send({ token: corectToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.message.should.be.a('string')
              .eql('Token validation successful.');
            done();
          });
      } catch (error) {
        console.log(error);
      }
    });

    it('should return 400 error if token is invalid', (done) => {
      chai.request(app).post('/api/v1/auth/validate/token')
        .send({ token: noPropToken })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('status');
          res.body.status.should.eql('Error');
          res.body.should.have.property('error');
          res.body.error.should.eql('Access denied. Invalid user token.');


          done();
        });
    });
  });
});
