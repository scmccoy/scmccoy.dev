// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  // res.statusCode = 200;
  // res.end(JSON.stringify({
  //   test: "hello shane"
  // }));
  res.status(200).json({
    test: "hello shane"
  })
}
