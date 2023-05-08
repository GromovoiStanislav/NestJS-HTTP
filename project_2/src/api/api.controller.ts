import { Controller, Get } from "@nestjs/common";
import { ApiService } from "./api.service";

@Controller()
export class ApiController {

  constructor(
    private apiService: ApiService
  ) {
  }

  @Get("price/bitcoin")
  getBitcoinPrice() {
    return this.apiService.getBitcoinPrice();
  }

  @Get("price/bitcoin/USD")
  getBitcoinUSDPrice() {
    return this.apiService.getBitcoinUSDPrice();
  }

  @Get("facts/cats")
  getCatFacts() {
    return this.apiService.getCatFacts();
  }

  @Get("facts/cats/axios")
  getCatFactsWithAxiosLib() {
    return this.apiService.getCatFactsWithAxiosLib();
  }
}
