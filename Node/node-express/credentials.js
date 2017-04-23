module.exports = {
    //cookie密钥
    cookieSecret: 'node%development&random&cookies',
    qq: {
        user: '809271934@qq.com',
        pass: 'yvmhqikxtvsqbdgd'
    },
    mongo: {
        development: {
            connectionString: 'mongodb://admin:123456@ds061474.mlab.com:61474/node-express-dev'
        },
        production: {
            connectionString: 'mongodb://admin:123456@ds061474.mlab.com:61474/node-express-dev'
        }
    },
    authProviders: {
        facebook: {
            development: {
                appId: '147314099136933',
                appSecret: '59b4153675b13942bf5e1dd58d8d0d17'
            }
        }
    }
}