import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementItem, deleteItem, incrementItem } from '../Redux/Action';

function Cart() {
    const cart = useSelector((state) => state.cart)

    let tq = 0;
    let tp = 0;

    cart.map(item => {
        tq += item.qty;
        tp += item.qty * item.price;
    });


    const dispatch = useDispatch()
    const decreaseQuantity = (id) => {
        dispatch(decrementItem(id));
    }
    const increaseQuantity = (id) => {
        dispatch(incrementItem(id));
    }
    const deleteAll = () => {
        dispatch(deleteItem());
    }
    return (
        <div>
            <table className="table mt-4 table-striped m-auto text-center">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <img src={item.img} width="50px" height="50px" alt="Item" />
                            </td>
                            <td>{item.name}</td>
                            <td>₹ {item.price}</td>
                            <td>
                                <button
                                    onClick={() => decreaseQuantity(index)}
                                    className="border-0 bg-dark text-white"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="text-center"
                                    name="quantity"
                                    value={item.qty}
                                    disabled
                                />
                                <button
                                    onClick={() => increaseQuantity(index)}
                                    className="border-0 bg-dark text-white"
                                >
                                    +
                                </button>
                            </td>
                            <td>₹ {item.qty * item.price}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>TOTAL</th>
                        <th></th>
                        <th></th>
                        <th>{tq}</th>
                        <th>₹ {tp}</th>
                        <th>
                            <button type="submit" onClick={deleteAll} className="border-0">
                                Clear All
                            </button>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Cart;