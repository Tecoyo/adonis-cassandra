/**
 * adonis-cassandra is a provider that gives you power to use Cassandra whitout limitation
 *
 * @constructor
 * @singleton
 * @uses (['Adonis/Src/Config'])
 *
 * @class AdonisCassandra
 */

class AdonisCassandra {
    constructor({ Config, CassandraDriver }) {
        this.Config = Config;
        this.configuration = this.Config.get('cassandra');
        this.Client = CassandraDriver.Client;
    }

    /**
     * Check if there's existing connections
     *
     * @method isConnected
     *
     * @return {Boolean}
     */
    isConnected() {
        return !!this.db;
    }

    /**
     * Creates a new database connection for the config defined inside
     * `config/cassandra` file. If there's existing connections, this method
     * will reuse and returns it.
     *
     * @method connect
     *
     * @return
     */
    async connect() {
        if (this.isConnected()) {
            console.log('Client is already connected, returning...');
            return this.db;
        }
        this.db = new this.Client({ ...this.configuration });
        return this.db;
    }

}

module.exports = AdonisCassandra;
