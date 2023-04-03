import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, lastValueFrom, map, Observable, take } from "rxjs";
import { AxiosError } from "axios";
import { Response } from "express";

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {
  }


  getHello(): string {
    return "Hello World!";
  }

  async getHTTP(): Promise<any> {
    // const { data } = await this.httpService.axiosRef.get("http://localhost:3000",
    //   {
    //     headers: await this.getHeaders("userId")
    //   });
    //return data;

    // const { data } = await this.httpService.get("http://localhost:3000",
    //   {
    //     headers: await this.getHeaders("userId")
    //   }).toPromise(); // deprecated!!!
    //return data;

    return this.httpService
      .get("http://localhost:3000")
      .pipe(map(({ data }) => data ));

  }


  async redirect(res: Response): Promise<void> {
    this.httpService.get("https://www.nbkr.kg/XML/daily.xml")
      .subscribe(res => {
        console.log(res.data);
        // do something...
      });

    res.redirect("http://localhost:3000");
  }


  async getXML(): Promise<any> {
    try {
      const response$ = this.httpService.get("https://www.nbkr.kg/XML/daily.xml");
      const response = await lastValueFrom(response$);
      return response.data;
    } catch (err) {
      throw err.response.data;
    }

    //return (await this.httpService.axiosRef.get("https://www.nbkr.kg/XML/daily.xml")).data;
  }


  async getPosts(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get<any[]>("https://jsonplaceholder.typicode.com/posts").pipe(
        catchError((error: AxiosError) => {
          throw error.response.data;
        })
      )
    );
    return data;

    // const response = await this.httpService.axiosRef.get("https://jsonplaceholder.typicode.com/posts")
    // return response.data

  }


  private async getHeaders(userId: string) {
    return {
      Authorization: `Bearer getAccessToken(userId)}`
    };
  }

  // example new URL():
  private buildAuthorizeUrl() {
    const authorizeUrl = new URL("https://coinbase.com/oauth/authorize");
    authorizeUrl.searchParams.append("response_type", "code");
    authorizeUrl.searchParams.append("client_id", `this.configService.get('COINBASE_CLIENT_ID')`);
    authorizeUrl.searchParams.append("redirect_uri", `this.configService.get('COINBASE_REDIRECT_URI')`);
    authorizeUrl.searchParams.append("scope", "wallet:transactions:read,wallet:accounts:read");
    return authorizeUrl;
  }


}



