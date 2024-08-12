interface IRequestParams {
    url: string;
    data?: object;
}
declare class AxiosHelper {
    private baseUrl;
    http: import("axios").AxiosInstance;
    constructor();
    /**
     * 将WebApi地址作为baseUrl
     * @returns 返回axios
     */
    useWebApi(apiRootKey?: string): Promise<this>;
    /**
     * 将本地地址作为baseUrl
     * @returns 返回axios
     */
    useLocal(): Promise<this>;
    /**
     * 设置请求根目录
     */
    private setBaseUrl;
    get(request: IRequestParams): Promise<import("axios").AxiosResponse<any, any>>;
    post(request: IRequestParams): Promise<import("axios").AxiosResponse<any, any>>;
    put(request: IRequestParams): Promise<import("axios").AxiosResponse<any, any>>;
    delete(request: IRequestParams): Promise<import("axios").AxiosResponse<any, any>>;
}
export declare const superAxios: AxiosHelper;
export {};
