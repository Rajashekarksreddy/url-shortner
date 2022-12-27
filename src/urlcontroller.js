const urlModel = require('./urlmodel')
const baseUrl = 'http://localhost:3000'
var validUrl = require('valid-url');
const shortid = require('shortid')


const createUrl = async function(req, res) {
    try {
        if (!(Object.keys(req.body).length > 0)) { // Checking Body is not Empty
            
            res.status(400).send("No Url Found")
        }

        const longUrl = req.body.longUrl.trim();
        
        //validation start
        if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(longUrl)) {
            if (!/(.com|.org|.co.in|.in|.co|.us)/.test(longUrl)) 
        return res.status(400).send({ status: false, message: `This is not a valid Url` });
    }
    if (!(longUrl.includes('//'))) {
       return res.status(400).send({ status: false, msg: 'Invalid longUrl' })
     }

     
  //validation end

        if (validUrl.isUri(longUrl)) { //used  valid url package
            const shortCode = shortid.generate();
            let checkUrl = await urlModel.findOne({ longUrl: longUrl })
            if (checkUrl) {
                return res.send({ message: " You already created Short Url for this Long Url :", data: checkUrl })

            } else {
                const shortUrl = baseUrl + '/' + shortCode;
                const storedData = { longUrl, shortUrl, urlCode: shortCode }
                let savedData = await urlModel.create(storedData)
                res.status(200).send({ status: true, data: savedData })
            }
        } else {
            return res.status(400).send({ status: false, message: "Invalid Long Url" })
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

}


const geturl = async function(req,res){
  let urlCode = req.params.urlCode


  let findurl = await urlModel.findOne({urlCode:urlCode})

  if(findurl){
    return res.status(302).redirect(findurl.longUrl)
  } else {
    res.status(400).send('no ahort url found')
  }

}

module.exports.geturl = geturl
module.exports.createUrl = createUrl