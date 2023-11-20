import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { getModelToken } from '@nestjs/mongoose';
import { Account } from './schemas/account.schema';
import { AccountStatus, UpdateAccountoDTO } from './dto/account.dto';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getModelToken(Account.name),
          useValue: {
            new: jest.fn().mockResolvedValue({ save: jest.fn().mockResolvedValue(true) }),
            findByIdAndUpdate: jest.fn().mockResolvedValue({ exec: jest.fn() }),
          },
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an account', async () => {
    const account: any = await service.createAccount('testAddress');
    expect(account).toBeDefined();
    expect(account.save).toHaveBeenCalled();
  });

  it('should update an account', async () => {
    const updateAccountDto: UpdateAccountoDTO = {
      lastBlockUpdate: 1,
      balance: '1000',
      status: AccountStatus.Online,
      rewards: 10,
    };
    const account: any = await service.updateAccount('testId', updateAccountDto);
    expect(account).toBeDefined();
    expect(account.exec).toHaveBeenCalled();
  });
});