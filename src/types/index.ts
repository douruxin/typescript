import { AxiosRequestConfig, AxiosPromise } from 'axios'

interface Person {
  readonly id: number; // ID（只读参数）
  name: string; // 名字（必传参数）
  age?: number; // 年龄（可选参数）
}

interface IUser {
  err: number;
  msg: string;
  data: {
    _id: string;
    nikename: string;
    fans: number;
    follow: number;
    time: number;
    icon: string;
  }
  token: string;
}

type TUser = (Partial<IUser> & string) | null

// 定义全局变量，重新定义了 Window 接口
declare global {
  interface Window {
    axios(config: AxiosRequestConfig): AxiosPromise<any>
  }
}

export {
  Person,
  TUser
}