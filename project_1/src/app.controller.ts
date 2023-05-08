import { Body, Controller, Get, Header, Post, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import {  Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @Get("/http")
  async getHTTP() {
    return this.appService.getHTTP();
  }

  @Header("Content-Type", "application/xml")
  @Get("/xml")
  async getXML() {
    return await this.appService.getXML();
  }


  @Get("/posts")
  async getPosts() {
    return this.appService.getPosts();
  }


  @Get("/redirect")
  async redirect(@Res({ passthrough: true }) res: Response) {
    return this.appService.redirect(res);
  }


}
