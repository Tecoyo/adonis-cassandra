const { ServiceProvider } = require('@adonisjs/fold');
const CassandraDriver = require('cassandra-driver');

class AdonisCassandraProvider extends ServiceProvider {
    register() {
        this.app.singleton('Cassandra', () => {
            const Config = this.app.use('Adonis/Src/Config');
            return new (require('../src/AdonisCassandra'))({ Config, CassandraDriver });
        });
    }

    boot() {
        /** @type {import('../src/AdonisCassandra')} */
        const Client = this.app.use('Cassandra');
        Client.connect();
    }
}

module.exports = AdonisCassandraProvider;
