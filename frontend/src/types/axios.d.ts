import "axios";

declare module "axios" {
  export interface AxiosRequestConfig<D = any> {
    toastId?: string;
    suppressToast?: boolean;
    successMessage?: string;
    suppressSuccessToast?: boolean;
  }

  export interface InternalAxiosRequestConfig<D = any> {
    toastId?: string;
    suppressToast?: boolean;
    successMessage?: string;
    suppressSuccessToast?: boolean;
  }
}
