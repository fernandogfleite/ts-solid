import { Messaging } from './services/Messaging';
import { Order } from './entities/Order';
import { Persistency } from './services/Persistency';
import { Product } from './entities/Product';
import ShoppingCart from './entities/ShoppingCart';

const shoppingCart = new ShoppingCart();
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);

shoppingCart.addItem(new Product('Camisa', 58));
shoppingCart.addItem(new Product('Cueca', 20));
shoppingCart.addItem(new Product('Bermuda', 40));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(order.orderStatus);

order.checkout();
console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(order.orderStatus);
