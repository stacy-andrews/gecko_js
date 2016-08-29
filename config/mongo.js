function getConnectionString() {
  let user = process.env.MONGODB_USER || "gecko"
  , password = process.env.MONGODB_PASSWORD || "6CWLV8PQCB5vZgP6XAnDnuQNPJ7p"
  , server = process.env.MONGODB_SERVER || "ds033307.mongolab.com:33307"
  , name = process.env.MONGODB_NAME || "gecko_dev";

  return `mongodb://${user}:${password}@${server}/${name}`;
}

module.exports = getConnectionString;