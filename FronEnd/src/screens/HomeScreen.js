import React,{useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
// import Products from  '../products'
import Product from '../components/product'
import {Row,Col} from 'react-bootstrap'
import {listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
export default function HomeScreen() {
  const dispatch=useDispatch()
  const productList=useSelector((state)=> state.productList)
  const {loading,error,products}=productList
  
  useEffect(()=>{
      dispatch(listProducts())
    },[dispatch])
  return (
    <div>
      
        {loading ? (
          <Loader/>
          )
          :error ? (
            <Message varian='danger'>{error}</Message>
            )
            :(
              <Row>
        {products.map((product,indx)=>{
            return(
                <Col key={indx} sm={12} md={6} lg={4} xl={3}>
                  <div>product {indx}</div>
            <Product singleItem={product}/>
        </Col>
            )
        })}
        </Row>
            )
          
        }
    </div>
  )
}

