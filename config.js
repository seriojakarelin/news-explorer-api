const { NODE_ENV } = process.env;

module.exports.PORT = process.env.PORT || 3001;

module.exports.JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

module.exports.MONGO_URL = NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb://localhost:27017/newsexplorerdb';

module.exports.mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
