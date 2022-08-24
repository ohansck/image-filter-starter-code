Udagram Image Filtering Service

Project by Ohaneme Kingsley.
Ohanckofficial@gmail.com
[github.com/ohansck](https://github.com/ohansck "Kingsleys Github")

The Udagram Image Service is an application that takes an image url, gets the image, and filters it based on the select paremeters.

The following features were added to the starter code:
 1) Redirect all end points not that are not <code>/filterimage</code> or <code>/login</code> back to home <code>/</code>
 2) Two query parameters <code>'image_url'</code>: image url to be processed, <code>'imageQual'</code>: the output quality needed by the user
 3) In the event of a faulty <code>image_url</code>, the error is handled, and information displayed to the client
 4) Authentication is required to use the service endpoint at <code>http://{host}/filterimage</code>
 5) To generate a JWT token for use, the <code>http://{host}/login</code> path is used
 6) Sample requests, bearer token and body parameters are set up in the postman configuration json file
 7) End point was refactored to also accept the desired image quality, with a default value set in the program

The <code>package.json</code> contains scripts which help to test run and build the project.

1) Test script: Runs a test if specified. Else, exits.
2) Clean script: Using rimraf command, it does a recussive deletion of files and folders.
3) Build script: Runs the Clean script, transpiles the typescript files, copies the needed files, and zips them in a Archive.zip file
4) Dev script: Transpiles the typescript files to run in the local environment server

The [GitHub repo](https://github.com/ohansck/image-filter-starter-code "Ohanck public repo") to find this project
with [main](https://github.com/ohansck/image-filter-starter-code/tree/main "Main branch") being the default branch.
