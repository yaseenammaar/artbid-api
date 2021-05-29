export default interface BaseResponse {
    statusCode: number,
    error: string | any,
    isError: boolean,
}