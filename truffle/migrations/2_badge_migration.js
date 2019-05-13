const Badge = artifacts.require("Badge");

module.exports = function(deployer) {
  deployer.deploy(Badge, 0);
};
