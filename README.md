# ArtBid API

NODE.js 10 Api Deployment to artbid.

Two apis are there:

`1.)` https://us-central1-artbid-d3199.cloudfunctions.net/webApi/api/checkLatestBidder
        
        This is post request;
        
        Request body contains :
        {
            "itemKey": "kfdjsklfj",
            "uid": "dsfhkjsdhfk"        
        }

`2.)` https://us-central1-artbid-d3199.cloudfunctions.net/webApi/api/getNextHomeItems
        
        This is get request;
        
        Request body dosent contain anything;
