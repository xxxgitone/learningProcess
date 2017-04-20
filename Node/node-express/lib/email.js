const nodemailer = require('nodemailer');

module.exports = function(credentials) {
    let poolConfig = {
        pool: true,
        host: 'smtp.qq.com',
        port: 465,
        secure: true, // use TLS
        auth: {
            user: credentials.qq.user,
            pass: credentials.qq.pass
        }
    };

    let mailTransport = nodemailer.createTransport(poolConfig);

    const from = '809271934@qq.com';
    const errorRecipient = '809271934@qq.com';

    return {
        send: function(to, subj, body){
		    mailTransport.sendMail({
		        from: from,
		        to: to,
		        subject: subj,
		        html: body,
		        generateTextFromHtml: true
		    }, function(err){
		        if(err) console.error('Unable to send email: ' + err);
		    });
		},

		emailError: function(message, filename, exception){
			var body = '<h1>Meadowlark Travel Site Error</h1>' +
				'message:<br><pre>' + message + '</pre><br>';
			if(exception) body += 'exception:<br><pre>' + exception + '</pre><br>';
			if(filename) body += 'filename:<br><pre>' + filename + '</pre><br>';
		    mailTransport.sendMail({
		        from: from,
		        to: errorRecipient,
		        subject: 'Meadowlark Travel Site Error',
		        html: body,
		        generateTextFromHtml: true
		    }, function(err){
		        if(err) console.error('Unable to send email: ' + err);
		    });
		},
    }
}