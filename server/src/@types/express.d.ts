import mongoose from 'mongoose'
import {
    Request as ERequest,
    Response as EResponse,
    NextFunction as ENextFunction,
  } from 'express'
  export interface Request extends ERequest {
    startTime: [number, number]
    user?: {
      userId: number,
      role: number,
      email:string
    }
      data?:null,
    originalRoute: ERequest['route']
    apiClient?: {
      os: string
      version: string
      buildNumber?: string
      platformVersion?: string
      deviceId?: string
    }
  }
  export interface Response extends EResponse {
    sentry?: string
    apiCode?: string
  }
  
  export type mongooseType=mongoose.Types.ObjectId
  export type NextFunction = ENextFunction
  