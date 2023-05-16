import { Options } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { Base } from '@/common/infra/orm/models/Base'
import { User } from './user/infra/orm/models/User'
import { SqliteDriver } from '@mikro-orm/sqlite'

export default {
  metadataProvider: TsMorphMetadataProvider,
  entities: [User, Base], // no need for `entitiesTs` this way
  dbName: 'test.db',
  type: 'sqlite' // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
} as Options<SqliteDriver>
