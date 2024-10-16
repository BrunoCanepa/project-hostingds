const { Sequelize } = require('sequelize');

// Cambia 'localhost' por 'postgres', que es el nombre del servicio en docker-compose
const sequelize = new Sequelize('hostingDB', 'postgres', 'admin', {
  host: 'postgres',  // Nombre del servicio definido en docker-compose
  port: '5432',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false,
    underscored: true,
  },
  omitNull: true
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
})();

module.exports = sequelize;
