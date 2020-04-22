addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with variant URL page
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = "https://cfw-takehome.developers.workers.dev/api/variants"
  // Requirement 1: Request the URLs from the API
  const response = await fetch(url);
  const data = await response.json();
  const variants = data.variants;

  // Requirement 2 + 3: Distribute requests between variants
  // Use randomizer to decide which URL to return as response
  const URLRandomizer = Math.floor(Math.random() * 2); // Returns either 0 or 1
  console.log("Variant #" + (URLRandomizer + 1));

  return fetch(variants[URLRandomizer]);
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
