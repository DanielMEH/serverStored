import {Router } from 'express';
const router:Router = Router()


class RouterProducts{
   
    public Getproducts(){
    router.get('/products',this.products );
      return router;    
   }

    public GetproductsId(){
    router.get('/products/:id',this.productsId);
      return router;
    }

    public GetproductsIdCategory(){
    router.get('/products/category/:id',this.productsIdCategory);
      return router;
    }

    public PostProduct(){
    router.post('/products',this.postProduct);
      return router;
    }

    public PutProduct(){
    router.put('/products/:id',this.putProduct);
      return router;
    }

    public DeleteProduct(){
    router.delete('/products/:id',this.deleteProduct);
      return router;
    }
}


export default RouterProducts;
