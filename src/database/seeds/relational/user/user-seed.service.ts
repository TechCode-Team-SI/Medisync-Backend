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
          id: 'd3b07384-d9a7-4e6b-8f3e-2e4d3b9b8b8b',
          fullName: 'Jane Doe',
          email: 'admin@example.com',
          password,
          roles: [ownerRole],
          employeeProfile: {
            id: 'b9a8c7d6-e5f4-3a2b-1c0d-9e8f7d6c5b4a',
            dni: '123479503',
            birthday: new Date('1990-01-01'),
            address: 'Av. Libertador',
            specialties: [
              {
                id: '3f50c3e6-8f1e-4d3b-9b8b-1f2e4d3b9b8b',
              },
            ],
          },
        }),
      );
    }

    const medicRole = roles.find((role) => role.name === 'Medico');
    if (medicRole) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
          fullName: 'John Doe',
          email: 'medic@example.com',
          password,
          roles: [medicRole],
          employeeProfile: {
            id: 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
            dni: '12345678',
            birthday: new Date('1990-01-01'),
            address: 'Av Vargas',
            specialties: [
              {
                id: '3f50c3e6-8f1e-4d3b-9b8b-1f2e4d3b9b8b',
              },
            ],
          },
        }),
      );
    }

    const patientRole = roles.find((role) => role.name === 'Paciente');
    if (patientRole) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          id: 'f7e8d9c0-b1a2-3d4e-5f6a-7b8c9d0e1f2a',
          fullName: 'Juanito Moralez',
          email: 'juanito@example.com',
          password,
          roles: [patientRole],
        }),
      );
    }
  }
}
