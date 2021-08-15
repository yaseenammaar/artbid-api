import {Request, Response} from "express";
import mResponse from "./Response";
import {OwnUtils} from "../../../../utils/OwnUtils";

const getSearchResults = async (req : Request, res : Response) => {
    const {
        domain,
    } = req.params
    console.log("domain is : ", domain)

    let isDomainAvailable: boolean = false
    let coolDomains: string[] = []
    let normalDomains: string[] = []

    try {

        // get domain availability and also check if it is correct or not
        const availabilityRes = await OwnUtils.getDomainAvailability(domain)
        if(availabilityRes.status == 422) {
            // domain malformed
            console.log("status: 422", availabilityRes)
            const mDomainError: mResponse = {
                status:422,
                error: "Domain is invalid",
                available: isDomainAvailable,
                coolDomains: coolDomains,
                normalDomains: normalDomains,
            }

            res.status(mDomainError.status).send(mDomainError)
            return
        }
        else if(availabilityRes.status == 200) {
            // correct domain; get availability
            console.log("status: 200", availabilityRes)
            isDomainAvailable = availabilityRes.data['available']
        }
        else {
            // error is there
            console.log("status: 400", availabilityRes)
            const mErrorRes: mResponse = {
                status:400,
                error: "Some other error came",
                available: isDomainAvailable,
                coolDomains: coolDomains,
                normalDomains: normalDomains,
            }

            res.status(mErrorRes.status).send(mErrorRes)
            return
        }

        // get cool domains and check availability
        const uncheckedCoolDomainsList = await OwnUtils.getCoolNames(domain)
        const availabilityCoolDomainsRes = await OwnUtils.getDomainAvailabilityMultiple(uncheckedCoolDomainsList)
        const checkedCoolDomainsList: string[] = []
        const domainsRes = availabilityCoolDomainsRes.data['domains'] as { available: boolean, domain: string }[]
        domainsRes.forEach((value, i) => {
            if(value.available) {
                checkedCoolDomainsList.push(value.domain)
            }
        })
        coolDomains = checkedCoolDomainsList

        // get normal suggestions
        const domainSuggestionRes = await OwnUtils.getDomainSuggestions(domain)
        const unsanitizedData = domainSuggestionRes.data as {domain: string}[]
        const sanitizedData: string[] = []
        unsanitizedData.forEach((value, i) => {
            sanitizedData.push(value.domain)
        })
        normalDomains = sanitizedData

        const response: mResponse = {
            status:200,
            error: null,
            available: isDomainAvailable,
            coolDomains: coolDomains,
            normalDomains: normalDomains,
        }

        res.status(response.status).send(response)
    }
    catch (e) {
        console.log(e)
        const response: mResponse = {
            status:400,
            error: e.message,
            available: isDomainAvailable,
            coolDomains: coolDomains,
            normalDomains: normalDomains,
        }

        res.status(response.status).send(response)
    }

}


export default getSearchResults