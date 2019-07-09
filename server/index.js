import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import path from 'path';
import userRoute from './routes/userRoute';
import propertyRoute from './routes/propertyRoute';

const swaggerDocument = YAML.load(`${__dirname}/../swagger.yaml`);

// to initialise express package
const app = express();
// host
// const host = '0.0.0.0';
// run on the port in the env variable, if no port, then use port 3000
const PORT = process.env.PORT || 6890;


app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'companylogo.ico')));

app.use('/api-document', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/property', propertyRoute);


app.get('/', (req, res) => {
  console.log(req.headers);
  return res.status(200).json("Property Pro Lite Api");
});

app.listen(PORT, () => {
  console.log(`Property pro lite server listening on port ${PORT}!`);
});

export default app;
