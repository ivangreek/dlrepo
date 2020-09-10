var sharp = require('sharp');
var dotenv = require('dotenv').config();

Parse.Cloud.beforeSave("Landmark", (request, response) => {
  //Before final object saving, the photo thumbnail is created and assosiated to the object 
  var photo = request.object.get("photo");
  if (photo){
    //If photo exist in file, retrieve the photo
    Parse.Cloud.httpRequest({ url: photo.url() })
    .then(function(responseHttp) {
      var imageBuffer = Buffer.from(responseHttp.buffer, 'base64');
      var photo_thump = sharp(imageBuffer);
      
      //perform the image manipulation and return the Promise with results
      return photo_thump
      .stats()
      .then(function (stats) {
        return photo_thump
        .resize(
          250, 
          250, 
          { 
            fit: 'contain',
            background: stats.dominant
          })
        .toBuffer()  
      })
    })
    .then(thumbBuffer => {
      //Save the file in Parse server
      let base64 = thumbBuffer.toString('base64');
      var photo_thumb = new Parse.File('fileName', {base64: base64});
      return photo_thumb.save();
    })
    .then((thumbnail)=>{
      //Assosiate the photo thumbnail with the saving Landmark
      request.object.set("photo_thumb", thumbnail);
    })
    .then(()=>{
      response.success();
    })
    .catch(function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    });
  } else {
    response.success();
  }
});

Parse.Cloud.afterSave('Landmark', (request) => {
  const photo = request.object.get('photo');
  const photoOriginal = request.original.get('photo');

  if ((photoOriginal && photo === photoOriginal) || !photoOriginal)  {
      return;
  }

  var filename = photoOriginal.name();

  var promises = [];
  promises.push(Parse.Cloud.httpRequest({
    url: `${process.env.SERVER_URL}/files/${filename}`,
    method: 'DELETE',
    headers: {
      'X-Parse-Master-Key': process.env.MASTER_KEY,
      'X-Parse-Application-Id': process.env.APP_ID
    }
  }));

  const photo_thumbOriginal = request.original.get('photo_thumb');
  if (photo_thumbOriginal) {
    filename = photo_thumbOriginal.name();
    promises.push(Parse.Cloud.httpRequest({
      url: `${process.env.SERVER_URL}/files/${filename}`,
      method: 'DELETE',
      headers: {
        'X-Parse-Master-Key': process.env.MASTER_KEY,
        'X-Parse-Application-Id': process.env.APP_ID
      }
    }));
  }

  Promise.all(promises)
  .then((values)=>{
    console.info('Files Deleted');
  })
  .catch(error => console.log(JSON.stringify(error)));
});