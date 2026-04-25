import { RegisterRequest } from "./register-request.model";

export interface RegisterOwnerRequest extends RegisterRequest{
    authorizedName: string;
    licenseNumber: string;
}
