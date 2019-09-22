import data from '../database/bikerentals';

const fetchAndSortProducts = ()=>{
        const products =  data.products
        const res = {}
        products.map((product)=>{
            if (product.product_type in res){
                res[product.product_type].push(product)
            } else {
                res[product.product_type] = [product]
            }
        })
        return res
  }
  export default fetchAndSortProducts