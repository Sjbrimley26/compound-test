const fastify = require("./src/app");

fastify.listen(8080, (err, port) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Now listening on ${port}`);
});
