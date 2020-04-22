addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = "https://cfw-takehome.developers.workers.dev/api/variants"
  
  let response = await fetch(url);
  const data = await response.json();
  const variants = data.variants;
  console.log(variants);

  // 
  
  return fetch(url);

  // return new Response('Hello worker!', {
  //   headers: { 'content-type': 'application/json' },
  // })
}

// fetch()
//     .then(function(response) {
//       //response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
//       return response.json();
//     })
//     .then(function(data){
//       //console.log(data);
//       for(const variant of data.variants){
//         console.log(variant);
//       }
//     })
