const axios = require('axios');
const crypto = require('crypto');

let timestamp = new Date().getTime();
const appSecret = 'SECe3b4f9c9b91210b079b7750f97f0589d';
let str = `${timestamp}\n${appSecret}`;

function generateSign(str) {
  let hash = crypto
    .createHmac('SHA256', appSecret)
    .update(str, 'utf8')
    .digest('base64');
  hash = encodeURIComponent(hash);
  return hash;
}

const sign = generateSign(str);

const baseUrl =
  'https://yach-oapi.zhiyinlou.com/robot/send?access_token=WUp4dTNPd2o2djNkKyt2MWJUUitFSnZzV29VanhyRktRVXBpZC9lenZRV3dLM3Fsa215blpWbE1JeWhEVG95dQ';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  timestamp,
  sign: '',
};
const data = {
  msgtype: 'text',
  text: {
    content: '该订餐了',
  },
};
let url = `${baseUrl}&timestamp=${timestamp}&sign=${sign}`;
axios.post(url, data).then((res) => {
  console.log(res);
});
