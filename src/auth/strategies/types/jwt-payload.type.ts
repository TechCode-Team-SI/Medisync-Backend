import { Session } from '../../../session/domain/session';
import { User } from '../../../users/domain/user';

export type JwtPayloadType = Pick<User, 'id' | 'email'> & {
  sessionId: Session['id'];
  roleSlugs: string[];
  iat: number;
  exp: number;
};
