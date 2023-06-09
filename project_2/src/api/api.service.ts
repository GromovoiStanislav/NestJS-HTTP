import { ForbiddenException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import axios from "axios";
import { catchError, map, lastValueFrom } from "rxjs";

@Injectable()
export class ApiService {

  constructor(
    private http: HttpService
  ) {
  }

  async getBitcoinPrice() {
    const price = this.http
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .pipe(
        map((res) => res.data?.bpi),
        // map((bpi) => {
        //   return {
        //     data: bpi?.USD
        //   };
        // })
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException("API not available");
        })
      );

    return price;
  }


  async getBitcoinUSDPrice() {
    const price = this.http
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .pipe(
        map((res) => res.data?.bpi),
        map((bpi) => {
          return {
            data: bpi?.USD
          };
        })
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException("API not available");
        })
      );

    return price;
  }


  async getCatFacts() {
    const request = this.http
      .get("https://catfact.ninja/fact")
      .pipe(map((res) => res.data?.fact))
      .pipe(
        catchError(() => {
          throw new ForbiddenException("API not available");
        })
      );

    const fact = await lastValueFrom(request);

    return {
      data: {
        fact
      }
    };
  }

  async getCatFactsWithAxiosLib() {
    const response = await axios({
      method: "GET",
      url: "https://catfact.ninja/fact"
    }).catch(() => {
      throw new ForbiddenException("API not available");
    });

    return {
      data: {
        fact: response.data?.fact
      }
    };
  }
}
