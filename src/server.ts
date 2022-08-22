import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
const path = require('path');

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  // app.get('/filteredimage', async (req, res) => {
  //   const image_URL = req.query.image_url;
  //   console.log(typeof image_URL, image_URL)
  //   if (image_URL) {
  //     if (image_URL !== '') {
  //       const filterImagePath = await filterImageFromURL(image_URL)
  //       console.log(filterImagePath)
  //       res.status(200).sendFile(filterImagePath, () => {
  //         deleteLocalFiles([filterImagePath])
  //       })
  //     } else {
  //       res.status(406).send('Please enter image URL')
  //     }
  //   } else {
  //     res.status(406).send('Invalid Query Key')
  //   }
  // })
  //Endpoint recieves two queries. Image URL and desired output quality
  app.get('/filteredimage', async (req, res) => {
    let image_URL = req.query.image_url;
    //Takes the first image url in the event of same multiple queries
    if (typeof image_URL === 'object') {
      image_URL = image_URL[0]
    }

    //Check if query 'imageQual' exists
    let quality = req.query.imageQual;

    //Set image quality limits 10 >= quality <= 100
    if (quality) {
      quality = parseInt(quality.toString());
      if (quality < 10) { quality = 10; }
      else if (quality >= 100) { quality = 100 }
    } else {
      quality = 60;
    }

    if (image_URL) {
      if (image_URL !== '') {
        //Prevents processing imageQual query as part of image url
        let image__URL = image_URL.split('&imageQual=')[0]
        await filterImageFromURL(image__URL, quality)
          //if promise resolved
          .then((filterImagePath) => {
            res.status(200).sendFile(filterImagePath, () => {
              deleteLocalFiles([filterImagePath])
            })
          })
          //if promise rejected
          .catch((error) => {
            console.log(error.message)
            res.status(404).send(`Invalid Query Value. Could not fetch resource. Check image URL`)
          })
      } else {
        //if image URL empty
        res.status(406).send('Please enter image URL')
      }
    } else {
      //if image_url query does not exist
      res.status(400).send('Invalid Query Key. Try GET /filteredimage?image_url={{}}&imageQual={{1-100}}')
    }
  })
  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user. Edited to add new query
  app.get("/", async (req, res) => {
    //res.send("try GET /filteredimage?image_url={{}}&imageQual={{1-100}}")
    var options = {
      root: path.join(__dirname)
    };
    res.sendFile('index.html', options)
  });

  //Added by me: Ohaneme Kingsley. To redirect all other request types.
  app.use((req, res) => {
    res.redirect('/')
  })
  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();