const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows, 
        docTitle: 'Products', 
        path: '/products', 
      })
    })
    .catch(err => console.log(err))
    
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findProductById(prodId, product => {
    res.render('shop/product-detail', 
    {
      product: product, 
      docTitle: product.title, 
      path: '/products',
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows, 
        docTitle: 'Home Page', 
        path: '/', 
      })
    })
    .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
  Cart.getProducts(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty})
        }
      }
      res.render('shop/cart', {
        docTitle: 'Your Cart', 
        path: '/cart',
        products: cartProducts
      })
    })
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findProductById(prodId, (product) => {
    Cart.addProduct(prodId, product.price)
  })
  res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findProductById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', 
  {
    docTitle: 'Your Orders', 
    path: '/orders', 
  })
}

exports.getCheckout = (req, res, next) => {
  res,render('shop/checkout', {
    path: '/checkout',
    docTitle: 'Checkout'
  })
}