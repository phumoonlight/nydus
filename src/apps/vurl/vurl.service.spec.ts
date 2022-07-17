import { Test, TestingModule } from '@nestjs/testing';
import { VurlService } from './vurl.service';

describe('VurlService', () => {
  let service: VurlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VurlService],
    }).compile();

    service = module.get<VurlService>(VurlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
