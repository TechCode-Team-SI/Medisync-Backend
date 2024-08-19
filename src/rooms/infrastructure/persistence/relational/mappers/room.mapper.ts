import { Room } from '../../../../domain/room';
import { RoomEntity } from '../entities/room.entity';

export class RoomMapper {
  static toDomain(raw: RoomEntity): Room {
    const domainEntity = new Room();
    domainEntity.address = raw.address;
    domainEntity.name = raw.name;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Room): RoomEntity {
    const persistenceEntity = new RoomEntity();
    persistenceEntity.address = domainEntity.address;
    persistenceEntity.name = domainEntity.name;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
