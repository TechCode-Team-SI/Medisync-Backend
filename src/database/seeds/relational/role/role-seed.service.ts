import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/permissions/infrastructure/persistence/relational/entities/permission.entity';
import { In, Repository } from 'typeorm';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import roles from './role-seed';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
  ) {}

  async run() {
    const roleCount = await this.repository.count();
    if (roleCount > 0) return;

    const roleEntities = await Promise.all(
      roles.map(async (role) => {
        const permissionEntities = await this.permissionRepository.find({
          where: { slug: In(role.permissions) },
          select: ['id'],
        });

        return this.repository.create({
          name: role.name,
          permissions: permissionEntities,
        });
      }),
    );
    await this.repository.save(roleEntities);
  }
}
