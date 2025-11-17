import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsRepository } from './buildings.repository';
import { Building } from './entities/building.entity';

describe('BuildingsService', () => {
  let service: BuildingsService;
  let repository: BuildingsRepository;

  const mockBuilding: Building = {
    id: '1',
    name: 'Test Building',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuildingsService,
        {
          provide: BuildingsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BuildingsService>(BuildingsService);
    repository = module.get<BuildingsRepository>(BuildingsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of buildings', async () => {
      mockRepository.findAll.mockResolvedValue([mockBuilding]);

      const result = await service.findAll();

      expect(result).toEqual([mockBuilding]);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a building by id', async () => {
      mockRepository.findById.mockResolvedValue(mockBuilding);

      const result = await service.findById('1');

      expect(result).toEqual(mockBuilding);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if building not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findById('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new building', async () => {
      const createDto = {
        name: 'New Building',
        description: 'New Description',
      };
      mockRepository.create.mockResolvedValue(mockBuilding);

      const result = await service.create(createDto);

      expect(result).toEqual(mockBuilding);
      expect(repository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('should update a building', async () => {
      const updateDto = { name: 'Updated Building' };
      mockRepository.findById.mockResolvedValue(mockBuilding);
      mockRepository.update.mockResolvedValue({ ...mockBuilding, ...updateDto });

      const result = await service.update('1', updateDto);

      expect(result.name).toBe('Updated Building');
      expect(repository.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('should throw NotFoundException if building not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.update('999', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a building', async () => {
      mockRepository.findById.mockResolvedValue(mockBuilding);
      mockRepository.delete.mockResolvedValue(undefined);

      await service.delete('1');

      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if building not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.delete('999')).rejects.toThrow(NotFoundException);
    });
  });
});
