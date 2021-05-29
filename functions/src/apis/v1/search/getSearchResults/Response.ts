import BaseResponse from "../../../../utils/BaseResponse";

export default interface mResponse extends BaseResponse{
    results: any,
    allItemsFetched: boolean,
}