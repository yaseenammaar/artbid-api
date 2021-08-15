import axios, {AxiosRequestConfig} from "axios";

// prod secret -> 5p3LPrg2wWqScGC1kfgg5t
// test secret -> QuQQDXKq1WAWovuAQ6esbV
export namespace OwnUtils {
    const variants = {
        "O": [ "Ó", "Ò", "Ȯ", "Ȱ","Ô","Ö"],
        "I": ["í","ì","i","î","ï"],
        "A": ["Å", "å","Ǻ", "ǻ", "Ḁ", "ḁ", "ẚ", "Ă", "ă"],
        "E": [ "Ĕ", "ĕ", "Ḝ", "ḝ", "Ȇ", "ȇ", "Ê", "ê","Ê̄"],
        "U": ["Ǜ", "ǜ", "Ǘ", "ǘ", "Ǚ", "ǚ", "Ǖ"],
    }

    const baseUrl = "https://api.godaddy.com"
    const prodSecret = "5p3LPrg2wWqScGC1kfgg5t"
    const prodApiKey = "fXqVVPvu6W7a_6eLTdqCvXoFA4TTJAFzcZx"
    async function request(
        method: 'get' | 'GET' | 'post' | 'POST',
        url: string,
        data: any = {}) {
        const apiConfig: AxiosRequestConfig = {
            method,
            url: url,
            headers: {
                'accept': 'application/json',
                'Authorization': `sso-key ${prodApiKey}:${prodSecret}`,
                'Content-Type': 'application/json',
            },
            data: data,
            responseType: 'json',
        }
        return await axios.request(apiConfig)
    }

    export async function getCoolNames(domain: string){
        let names: string[] = [];

        if(domain.includes('o')||domain.includes('O')){
            variants["O"].forEach(v=>{
                names.push(domain.replace(/o/g, v))
                names.push(domain.replace(/O/g, v))
            })
        }

        if(domain.includes('a')||domain.includes('A')){
            variants["A"].forEach(v=>{
                names.push(domain.replace(/a/g, v))
                names.push(domain.replace(/A/g, v))
            })
        }

        if(domain.includes('e')||domain.includes('E')){
            variants["E"].forEach(v=>{
                names.push(domain.replace(/e/g, v))
                names.push(domain.replace(/E/g, v))
            })
        }

        if(domain.includes('i')||domain.includes('I')){
            variants["I"].forEach(v=>{
                names.push(domain.replace(/i/g, v))
                names.push(domain.replace(/I/g, v))
            })
        }

        if(domain.includes('u')||domain.includes('U')){
            variants["U"].forEach(v=>{
                names.push(domain.replace(/u/g, v))
                names.push(domain.replace(/U/g, v))
            })
        }

        console.log("Cool Domains : ", names)
        return names;
    }

    export async function getDomainAvailability(domain: string) {
        const url = `${baseUrl}/v1/domains/available?domain=${domain}&checkType=FULL`
        return await request('get', url)
    }

    export async function getDomainAvailabilityMultiple(domains: string[]) {
        const url = `${baseUrl}/v1/domains/available?checkType=FAST`
        return await request('post', url, domains)
    }

    export async function getDomainSuggestions(query: string) {
        const url = `${baseUrl}/v1/domains/suggest?query=${query}&waitMs=${1000}`
        return await request('get', url)
    }

    export async function getSupportedTlds() {
        const url = `${baseUrl}/v1/domains/tlds`
        return await axios.get(url)
    }
}