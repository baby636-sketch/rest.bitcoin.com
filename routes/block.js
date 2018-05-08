let express = require('express');
let router = express.Router();

let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli({
  protocol: 'http',
  host: "138.68.54.100",
  port: "8332",
  username: "bitcoin",
  password: "xhFjluMJMyOXcYvF"
});

router.get('/', function(req, res, next) {
  res.json({ status: 'block' });
});

router.get('/details/:id', function(req, res, next) {
  if(req.params.id.length !== 64) {
    BITBOX.Blockchain.getBlockHash(req.params.id)
    .then((result) => {
      BITBOX.Block.details(result)
      .then((result) => {
        res.json(result);
      }, (err) => { console.log(err);
      });
    }, (err) => { console.log(err);
    });
  } else {
    BITBOX.Block.details(req.params.id)
    .then((result) => {
      res.json(result);
    }, (err) => { console.log(err);
    });
  }
});

module.exports = router;