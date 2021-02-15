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
    constructor({ Config, CassandraClient }) {
        this.Config = Config;
        this.ObjectID = ObjectID;
        this.configuration = this.Config.get('cassandra');
        
        this.Client = CassandraClient;
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

        this.db = this.Client(this.configuration)
        await this.connectPromise.on("ready")

        await this.Client.connect(this.url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                throw new Error(err);
            }
            this.db = client.db(this.dbName);
            this.Client = client;
            console.log(`Connected successfully to ${this.host}:${this.port}/${this.dbName}`);
        });
        return this.db;
    }

    connectPromise(event) {
        return new Promise(resolve => {
            this.db.api.on(event, response => resolve(response));
        });
    }

}

module.exports = AdonisCassandra;
