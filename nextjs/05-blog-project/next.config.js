const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "dbAdmin",
        mongodb_password: "Pass.123",
        mongodb_clustername: "kjartancluster",
        mongodb_database: "my-site-dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "dbAdmin",
      mongodb_password: "Pass.123",
      mongodb_clustername: "kjartancluster",
      mongodb_database: "my-site",
    },
  };
};