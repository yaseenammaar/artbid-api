## Api Docs

----------------------

This is the documentaion of Artbid Apis. There are some coding styles and rules that we use, to have consistency and readability in this project.

Moreover, Apis have been made with express. We use Firebase functions to deploy these apis on servers.

This api app has been divided into two parts:
- ### [Protected app](./protected_app_apis.md):  
    This app has been protected from unauthorised access. Without firebase token, the apis in this section can't be accessed. 
    Thus, you can use these apis only when user is logged in with firebase authentication.    
         
    If you need to use any apis without login flow, one solution can be anonymous authentication from firebase.

    
    To use the apis in this app, include 'authorisation' header in api request.
    Also, include 'Bearer ' before the token string.

    Eg:
    headers: 
    {
        'Content-Type': contentType,
        'authorization':'Bearer '+token
    },
  
- ### [Unprotected app](./unprotected_app_apis.md):
    This section of app does not have any security from unauthorised access.
    So, use this only when you need it and you don't have any alternative.
    Most of the problems would be solved by using anonymous authentication from firebase.