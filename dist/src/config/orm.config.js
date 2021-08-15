"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = [
    {
        name: 'dev',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'anthony',
        password: 'pass123',
        database: 'per_diem_dev_db',
        synchronize: true,
        entities: [
            'dist/src/modules/orders/entities/*.{js,ts}',
            'dist/src/modules/users/entities/*.{js,ts}'
        ],
        cli: {
            'migrationsDir': 'dist/src/modules/database/migration',
            'subscribersDir': 'dist/src/modules/database/subscriber'
        }
    },
    {
        name: 'test',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'anthony',
        password: 'pass123',
        database: 'per_diem_test_db',
        synchronize: true,
        entities: [
            'dist/src/modules/orders/entities/*.{js,ts}',
            'dist/src/modules/users/entities/*.{js,ts}'
        ],
        cli: {
            'migrationsDir': 'dist/src/modules/database/migration',
            'subscribersDir': 'dist/src/modules/database/subscriber'
        }
    },
];
exports.default = config;
//# sourceMappingURL=orm.config.js.map