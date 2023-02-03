const config = require('config');
const admin = config.get('config.admin');

const isAdmin = (userId) => {
	return userId == admin;
};

module.exports = isAdmin;
