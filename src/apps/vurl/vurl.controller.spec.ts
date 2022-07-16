import { Test, TestingModule } from '@nestjs/testing';
import { VurlController } from './vurl.controller';

describe('VurlController', () => {
  let controller: VurlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VurlController],
    }).compile();

    controller = module.get<VurlController>(VurlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
