addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with variant URL page
 * @param {Request} request
 */
async function handleRequest(request) {
  // Requirement 1: Request the URLs from the API
  const url = "https://cfw-takehome.developers.workers.dev/api/variants"
  const response = await fetch(url)
  const data = await response.json()
  const variants = data.variants

  // Requirement 2 + 3: Distribute requests between variants
  // Use randomizer to decide which URL to return as response
  const URLRandomizer = Math.floor(Math.random() * 2)
  // console.log("Variant #" + (URLRandomizer + 1));
  
  // Return the variant URL based on the URLRandomizer value
  const webpage = await fetch(variants[URLRandomizer])
  
  // Extra credit 1: Changing copy/URLs: Modify text/html
  let manip = await webpage.text()

  let modiified;
  if(URLRandomizer == 0){ // Variant 1
    manip = manip.replace("<title>Variant 1</title>", "<title>Professional</title>")
    manip = manip.replace("Variant 1", "Professional")
    manip = manip.replace("This is variant one of the take home project!", "This is a link you visit (Variant 1)")
    manip = manip.replace("https://cloudflare.com", "https://www.linkedin.com/in/owen-shen/")
    modified = manip.replace("Return to cloudflare.com", "Go to linkedin.com/in/owen-shen/")
  }else{ // Variant 2
    manip = manip.replace("<title>Variant 2</title>", "<title>Personal</title>")
    manip = manip.replace("Variant 2", "Personal")
    manip = manip.replace("This is variant two of the take home project!", "This is a link I personally visit (Variant 2)")
    manip = manip.replace("https://cloudflare.com", "https://myanimelist.net/")
    modified = manip.replace("Return to cloudflare.com", "Go to myanimelist.net")
  }

  return new Response(modified, {
    headers: { 'content-type': 'text/html' }
  });
}