import { Messaging } from './services/Messaging';
import { Order } from './classes/Order';
import { Persistency } from './services/Persistency';
import { Product } from './classes/Product';
import ShoppingCart from './classes/ShoppingCart';
import { NoDiscount } from './classes/Discount';

// const discount = new FiftyPercentDiscount();
// const discount = new TenPercentDiscount();
const discount = new NoDiscount();

const shoppingCart = new ShoppingCart(discount);
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);

shoppingCart.addItem(new Product('Camisa', 58));
shoppingCart.addItem(new Product('Cueca', 20));
shoppingCart.addItem(new Product('Bermuda', 40));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);

order.checkout();
console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(order.orderStatus);
