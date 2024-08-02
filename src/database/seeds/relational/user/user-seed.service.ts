import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import bcrypt from 'bcryptjs';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async run() {
    const userCount = await this.repository.count();
    if (userCount > 0) return;

    const roles = await this.roleRepository.find({ select: ['id', 'name'] });

    const ownerRole = roles.find((role) => role.name === 'Dueño');
    if (ownerRole) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          fullName: 'Jane Doe',
          email: 'admin@example.com',
          password,
          roles: [ownerRole],
        }),
      );
    }

    const medicRole = roles.find((role) => role.name === 'Medico');
    if (medicRole) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          fullName: 'John Doe',
          email: 'medic@example.com',
          password,
          roles: [medicRole],
        }),
      );
    }

    const patientRole = roles.find((role) => role.name === 'Paciente');
    if (patientRole) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          fullName: 'Juanito Moralez',
          email: 'juanito@example.com',
          password,
          roles: [patientRole],
        }),
      );
    }
  }
}
