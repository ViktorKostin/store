const uuid = require("uuid");
const fs = require('fs')
const { Product } = require('@models');

module.exports = new function() {
  var module = {}
  module.all = async () => {
    return await Product.find().sort({created_at: -1}).then(x => x)
  }

  module.count = async () => {
    return await Product.find().countDocuments().then(x => x)
  }

  module.pagination = async req => {
    const pageNumber = parseInt(req.params.pageNumber);
    const nPerPage = parseInt(req.params.perPage);
    const response = await Product
                            .find()
                            .sort({created_at: -1})
                            .skip((pageNumber-1)*nPerPage)
                            .limit(nPerPage)
                            .then(x => x)
    return response;
  }

  module.new = async req => {
    const {type, path} = req.files.image;
    const fileExt = type.split('/')[1];
    const id = uuid.v4();
    const fileName = `${id}.${fileExt}`;
    filePath = '/var/www/static/images/' + fileName;
    fs.writeFileSync(filePath, fs.readFileSync(path));

    var product = new Product({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      sizes: req.fields.sizes.split(' '),
      image: fileName
    });

    return await product.save().then(x => x);
  }

  module.findOne = async req => {
    return await Product.findOne({_id: req.params.productId}).then(x => x)
  }

  module.delete = req => {
    filePath = '/var/www/static/images/'
    return Product.findOneAndDelete({_id: req.params.productId})
                  .then(x => x.image)
                  .then(image => fs.unlinkSync(filePath + image))
  }
  return module;
}

