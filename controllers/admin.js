const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', 
    {
    docTitle: 'Add Product', 
    path: '/admin/add-product',
    editing: false
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  const product = new Product(null, title, price, description, imageUrl)
  product
    .save()
    .then(() => {
      res.redirect('/')
    })
    .catch(err => 
      res.status(400).send({ error: err })
    )
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findProductById(prodId, product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', 
      {
      docTitle: 'Edit Product', 
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedImageUrl = req.body.imageUrl
  const updatedPrice = req.body.price
  const updatedDescription = req.body.description
  const updateProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice)
  updateProduct.save()
  res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', 
    {
      prods: products, 
      docTitle: 'Products', 
      path: '/admin/products', 
    })
  })
}