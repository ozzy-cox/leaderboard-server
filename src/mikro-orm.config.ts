import { Options } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { Base } from '@/common/infra/orm/models/Base'
import { User } from './user/infra/orm/models/User'
import { SqliteDriver } from '@mikro-orm/sqlite'
import { RedisCacheAdapter } from 'mikro-orm-cache-adapter-redis'

export default {
  metadataProvider: TsMorphMetadataProvider,
  entities: [User, Base], // no need for `entitiesTs` this way
  dbName: 'test.db',
  type: 'sqlite', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  cache: {
    adapter: RedisCacheAdapter,
    options: {
      // Base options
      // An optional key prefix. By default is `mikro`
      keyPrefix: 'mikro',
      // Optional: print debug informations
      debug: false,

      // Here goes IORedis connection options (the library will instantiate the client)
      host: '127.0.0.1',
      port: 6379
    }
  }
} as Options<SqliteDriver>
