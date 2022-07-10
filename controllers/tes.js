const jwt=require('jsonwebtoken');

console.log(jwt);




const accesToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMDEiLCJuYW1lIjoic2FuanlhIiwiaWF0IjoxNjQ2NzEwOTgxLCJleHAiOjE2NDY3MTEwNDF9.eb9c4zCx5xnMPqzklSTV9CTN-o1NUfzSzD7ApMEfTII'

console.log(accesToken);

 function verifyaccesstoken(token) {
    
    return jwt.verify(token,"secert");

}

try {
    const result= verifyaccesstoken(accesToken);
    console.log("result after verify");

    console.log(result);

} catch (error) {
 
    console.log("error in verify jwt");

    console.log(error);

}


