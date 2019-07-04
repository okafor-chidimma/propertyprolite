/* eslint-disable camelcase */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import signInData from '../testData/users';

const { testUser, testUserSignin } = signInData;

chai.use(chaiHttp);
chai.should();

/* eslint-disable no-unused-vars */

describe('Auth Endpoints', () => {
  describe('POST /signup', () => {
    it('should create a new user account', (done) => {
      chai.request(app).post('/api/v1/auth/signup').send(testUser).end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.token.should.be.a('string');
        res.body.data.should.have.property('newUser');
        res.body.data.newUser.should.be.an('object');
        res.body.data.newUser.should.have.property('first_name');
        res.body.data.newUser.first_name.should.be.a('string');
        res.body.data.newUser.should.have.property('last_name');
        res.body.data.newUser.last_name.should.be.a('string');
        res.body.data.newUser.should.have.property('email');
        res.body.data.newUser.email.should.be.a('string');
        res.body.data.newUser.should.have.property('password');
        res.body.data.newUser.password.should.be.a('string');
        res.body.data.newUser.should.have.property('phoneNumber');
        res.body.data.newUser.phoneNumber.should.be.a('string');
        res.body.data.newUser.should.have.property('address');
        res.body.data.newUser.address.should.be.a('string');
        res.body.data.newUser.should.have.property('type');
        res.body.data.newUser.type.should.be.a('string');
        res.body.data.newUser.should.have.property('is_admin');
        res.body.data.newUser.is_admin.should.be.a('string');
        res.body.data.newUser.should.have.property('id');
        res.body.data.newUser.id.should.be.a('number');
        done();
      });
    });
    it('should return 400 error if firstname is empty', (done) => {
      const { first_name, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Firstname is required!');
        done();
      });
    });
    it('should return 400 error if lastname is empty', (done) => {
      const { last_name, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Lastname is required!');
        done();
      });
    });
    it('should return 400 error if email is empty', (done) => {
      const { email, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Email is required!');
        done();
      });
    });
    it('should return 400 error if password is empty', (done) => {
      const { password, ...partialUserDetails } = testUser;
      chai.request(app).post('/api/v1/auth/signup').send(partialUserDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Password is required!');
        done();
      });
    });
    it('should return 400 error if phone number is empty', (done) => {
      const { phoneNumber, ...partialUserDetails } = testUser;
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
        res.body.should.have.property('error').eql('Is Admin is required!');
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
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.token.should.be.a('string');
        res.body.data.should.have.property('singleUser');
        res.body.data.singleUser.should.be.an('object');
        res.body.data.singleUser.should.have.property('first_name');
        res.body.data.singleUser.first_name.should.be.a('string');
        res.body.data.singleUser.should.have.property('last_name');
        res.body.data.singleUser.last_name.should.be.a('string');
        res.body.data.singleUser.should.have.property('email');
        res.body.data.singleUser.email.should.be.a('string');
        res.body.data.singleUser.should.have.property('id');
        res.body.data.singleUser.id.should.be.an('number');
        res.body.data.singleUser.should.have.property('address');
        res.body.data.singleUser.address.should.be.a('string');
        res.body.data.singleUser.should.have.property('phoneNumber');
        res.body.data.singleUser.phoneNumber.should.be.a('string');
        res.body.data.singleUser.should.have.property('type');
        res.body.data.singleUser.type.should.be.a('string');
        res.body.data.singleUser.should.have.property('is_admin');
        res.body.data.singleUser.is_admin.should.be.a('boolean');
        done();
      });
    });
    it('should return 400 error if email is empty', (done) => {
      const { password: PasswordTestSigin } = testUserSignin;
      chai.request(app).post('/api/v1/auth/signin').send({ password: PasswordTestSigin }).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Email is required!');
        done();
      });
    });
    it('should return 400 error if password is empty', (done) => {
      const { email: EmailTestSignin } = testUserSignin;
      chai.request(app).post('/api/v1/auth/signin').send({ email: EmailTestSignin }).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Password is required!');
        done();
      });
    });
  });
});
