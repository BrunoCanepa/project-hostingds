const ClientModel = require('./models/clientModel');
const ContactModel = require('./models/contactModel');
const ServiceModel = require('./models/serviceModel');
const ServiceTypeModel = require('./models/serviceTypeModel');

ClientModel.hasMany(ContactModel, { foreignKey: 'clientid' });
ClientModel.hasMany(ServiceModel, { foreignKey: 'clientid' });

ContactModel.belongsTo(ClientModel, { foreignKey: 'clientid' });

ServiceModel.belongsTo(ClientModel, { foreignKey: 'clientid' });
ServiceModel.belongsTo(ServiceTypeModel, { foreignKey: 'servicetypeid' });

module.exports = { ClientModel, ContactModel, ServiceModel, ServiceTypeModel };
