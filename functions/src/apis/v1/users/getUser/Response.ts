import BaseResponse from "../../../../utils/BaseResponse";

export default interface mResponse extends BaseResponse{
    user: object | null,
}