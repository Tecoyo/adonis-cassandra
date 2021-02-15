const { ServiceProvider } = require('@adonisjs/fold');
const Cassanknex = require('cassanknex');

class AdonisCassandraProvider extends ServiceProvider {
    register() {
        this.app.singleton('Cassandra', () => {
            const Config = this.app.use('Adonis/Src/Config');
            return new (require('../src/AdonisCassandra'))({ Config, Cassanknex });
        });
    }

    boot() {
        /** @type {import('../src/AdonisCassandra')} */
        const Client = this.app.use('Cassandra');
        Client.connect();
    }
}

module.exports = AdonisCassandraProvider;
