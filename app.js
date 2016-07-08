var koa = require('koa');

var json = require('koa-json');

var Router = require('koa-router');

var views = require('co-views');

var request = require('request');

var app = new koa();

var router = new Router();

var render = views('views', {
  map: {
    html: 'swig'
  },
  default: 'html',
  locals: {
    title: 'demo-web'
  }
});

var getDemoDataFromApi = () => {
  var url = 'http://localhost:6688/demo/data';
  return new Promise(function (resolve, reject) {
    request({url: url, json: true}, function (error, response, body) {
      if (error) return reject(error);

      resolve(body);
    });
  });
};

var renderIndex = async (ctx, next) => {
  let data = await getDemoDataFromApi();
  console.log(data)
  ctx.body = await render('index', {
    demoData: JSON.stringify(data)
  });
};

router.get('/', renderIndex);

app.use(router.routes()).use(router.allowedMethods());

app.listen('6677', function () {
  console.log('web running at port 6677');
});