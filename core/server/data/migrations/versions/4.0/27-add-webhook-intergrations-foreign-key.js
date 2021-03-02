const logging = require('../../../../../shared/logging');
const {createIrreversibleMigration} = require('../../utils');
const {addForeign, dropForeign} = require('../../../schema/commands');

module.exports = createIrreversibleMigration(async (knex) => {
    logging.info('Adding the webhooks to integrations foreign key');

    await dropForeign({
        fromTable: 'webhooks',
        fromColumn: 'integration_id',
        toTable: 'integrations',
        toColumn: 'id',
        transaction: knex
    });
    await addForeign({
        fromTable: 'webhooks',
        fromColumn: 'integration_id',
        toTable: 'integrations',
        toColumn: 'id',
        cascade: true,
        transaction: knex
    });
});
