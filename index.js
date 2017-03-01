const nodemailer = require('nodemailer');
let transporter = null;

module.exports = {
	/**
	 * @param {object} options
	 * @param {string} options.service
	 * @param {object} options.auth
	 * @param {string} options.auth.user
	 * @param {string} options.auth.pass
	 */
	setup(options) {
		transporter = nodemailer.createTransport(options);
	},
	/**
	 * @param {object} mail
	 * @param {string} mail.from
	 * @param {string|string[]} mail.to
	 * @param {string|string[]} mail.cc
	 * @param {string|string[]} mail.bcc
	 * @param {string} mail.subject
	 * @param {string} mail.text
	 * @param {string} mail.html
	 * @param {object[]} mail.attachments
	 * @returns {Promise}
	 */
	send(mail) {
		if(!transporter) {
			throw new Error('Setup ctk-mailer first!');
		} else {
			return new Promise((resolve, reject)=>{
				transporter.sendMail(mail, (error, info) => {
					if (error) return reject(error);
					resolve(info);
				});
			});
		}
	}
};