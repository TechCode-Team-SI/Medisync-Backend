import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from 'src/permissions/infrastructure/persistence/relational/entities/permission.entity';
import permissions from './permission-seed';

@Injectable()
export class PermissionSeedService {
  constructor(
    @InjectRepository(PermissionEntity)
    private repository: Repository<PermissionEntity>,
  ) {}

  async run() {
    const permissionCount = await this.repository.count();
    if (permissionCount > 0) return;

    const permissionEntities: PermissionEntity[] = permissions.map(
      (permission) => {
        return this.repository.create({
          name: permission.name,
          description: permission.description,
          slug: permission.slug,
        });
      },
    );
    await this.repository.insert(permissionEntities);
  }
}
