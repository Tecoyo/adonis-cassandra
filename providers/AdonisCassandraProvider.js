const { ServiceProvider } = require('@adonisjs/fold');
const cassanknex = require('cassanknex');

class AdonisMongodbProvider extends ServiceProvider {
    register() {
        this.app.singleton('Cassandra', () => {
            const Config = this.app.use('Adonis/Src/Config');
            return new (require('../src/AdonisCassandra'))({ Config,cassanknex });
        });
    }

    boot() {
        /** @type {import('../src/AdonisMongodb')} */
        const Client = this.app.use('Cassandra');
        Client.connect();
    }
}

module.exports = AdonisMongodbProvider;
