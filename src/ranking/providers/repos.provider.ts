import { getConnectionToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PROVIDER_TOKENS } from '../../../config/enums';
import MatchEntity from '../entities/match.entity';

const providers = [
  {
    provide: PROVIDER_TOKENS.MatchRepository,
    useFactory: (connection: Connection): Repository<MatchEntity> =>
      connection.getRepository(MatchEntity),
    inject: [getConnectionToken('test')],
  },
];

export default providers;
