'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sdg = sequelize.define('Sdg', {
    name: DataTypes.STRING,
    sdg_no: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  Sdg.associate = function(models) {
    // associations can be defined here
  };
  return Sdg;
};
/* By 2020, promote the implementation of sustainable management of all types
of forests, halt deforestation, restore degraded forests and substantially
increase afforestation and reforestation globally */

/* Possible relevant business actions to help achieve this target:
• Contributing to sustainable management of forests through rehabilitating lands destructed by business operations, and
committing to reduce or remove deforestation and forest degradation from direct operations and the supply chain.
• Improving efficiency in the use of forest-related resources, using reduced-impact harvesting techniques, and supporting
restoration and rehabilitation of degraded landscapes.
• Obtaining and/or promoting the use of forest management certifications and certifications on forest products.
• Working with relevant public and private stakeholders to promote deforestation-free commodities throughout the supply chain.
• Understanding the market opportunities that reducing GHG emissions from deforestation and degradation, related land-based
carbon offsetting and certified forest products may represent for business. */
