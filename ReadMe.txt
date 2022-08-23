Udagram Image Filtering Service

Project by Ohaneme Kingsley.
Ohanckofficial@gmail.com
github.com/ohansck

The Udagram Image Service is an application that takes an image url, gets the image, and filters it based on the select paremeters.

The following features were added to the starter code:
 1) Redirect all end points not that are not /filterimage or /login back to home /
 2) Two query parameters 'image_url': image url to be processed, 'imageQual': the output quality needed by     the user
 3) In the event of a faulty image_url, the error is handled, and information displayed to the client
 4) Authentication is required to use the service endpoint at http://{host}/filterimage
 5) To generate a JWT token for use, the http://{host}/login path is used
 6) Sample requests, bearer token and body parameters are set up in the postman configuration json file
 7) End point was refactored to also accept the desired image quality, with a default value set in the     program

The GitHub repo to find this project: https://github.com/ohansck/image-filter-starter-code
with 'main' being the default branch.