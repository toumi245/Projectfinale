import React, { useEffect } from 'react'
import  {Link, useNavigate, useParams,useLocation}from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart,removeFromCart} from'../actions/cartActions'
function CartScreen() {
  // const {id}=useParams();
const location=useLocation()
  const {productId}=useParams()
  const qty=location.search ? Number(location.search. split('=')[1]):1
  
  
  const dispatch =useDispatch()
  
  const cart=useSelector((state)=>state.cart)
  const {cartItems}=cart
  console.log('cartItems:', cartItems); // console log the cartItems variable
   const navigate=useNavigate()
  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[productId,dispatch,qty])
  const removeFromCartHandler=(id)=>{
    dispatch(removeFromCart(id))
  }
  const checkoutHandler=()=>{
    navigate('/login?redirect=shipping')
  }
  return (
    <div>
        <Row>
          <Col>
            <ListGroup variant='flush' >
              {cartItems.map((item,index)=>(
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form.Control as='select' value={item.qty} onChange={(e)=>dispatch(
                          addToCart(item.product,Number(e.target.value))
                        )}>
                          {[...Array(item.countInStock ).keys()].map((x)=>{
                          return(<option key={x+1} value={x+1}>{x+1}
                          </option>
                          )  
                        })}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button type='button'
                        variant='light'
                        onClick={()=>removeFromCartHandler(item.product)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>subTotal({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h2>
              ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block'
                disabled={cartItems.length===0}
                onClick={checkoutHandler}>proceed to ckeck out</Button>
              </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export default CartScreen