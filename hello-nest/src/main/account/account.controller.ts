import {
    Body,
    Controller, Delete, Get, HttpCode, Param, Patch,
    Post,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";

import {
    AccountService,
} from "@main/account/account.service";

import {
    Account as AccountModel,
} from "@prisma/client";

@Controller("accounts")
export class AccountController {
    constructor(private readonly accountService: AccountService) {

    }

  @Post("signup")
    async signup(
    @Body() account: {
      email: string,
      password: string,
      name?: string,
    },
    ): Promise<AccountModel> {
        account.password = await bcrypt.hash(account.password, 10);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.accountService.create(account);
    }

  @HttpCode(200)
  @Post("signin")
  async signin(
    @Body() account: {
      email: string,
      password: string
    },
  ): Promise<object> {
      const foundAccount = await this.accountService.findByEmail(account.email);

      const isMatch = await bcrypt.compare(account.password, foundAccount.password);

      return isMatch ? {
          "status": 200,
          "message": "OK",
      } : {
          "status": 401,
          "message": "UnAuthorized",
      };
  }

  @Get("findAll")
  async findAll(): Promise<AccountModel[]> {
      return this.accountService.findAll();
  }

  @Get(":id")
  async findById(
    @Param("id") id: string,
  ): Promise<AccountModel> {
      return this.accountService.findById(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() account: {
      email: string,
    },
  ): Promise<AccountModel> {
      return this.accountService.update(id, account);
  }

  @Patch("")
  async updateAll(
    @Body() account: {
      email: string,
    },
  ): Promise<AccountModel[]> {
      return this.accountService.updateAll(account);
  }

  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ): Promise<AccountModel> {
      return this.accountService.remove(id);
  }
}
