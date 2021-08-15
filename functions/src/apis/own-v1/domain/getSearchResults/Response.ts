export default interface mResponse{
    status: 200 | 400 | 422,
    error: null | string,
    available: boolean,
    coolDomains: string[],
    normalDomains: string[],
}