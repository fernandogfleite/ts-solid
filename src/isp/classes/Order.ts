import { OrderStatus } from './interfaces/OrderStatus';
import { Messaging } from '../services/Messaging';
import { Persistency } from '../services/Persistency';
import ShoppingCart from './ShoppingCart';
import { CustomerOrder } from './interfaces/CostumerProtocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly shoppingCart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
    private readonly customer: CustomerOrder,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.shoppingCart.isEmpty()) {
      console.log('Seu carrinho vazio.');
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de ${this.shoppingCart.totalWithDiscount()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.shoppingCart.clear();
    console.log(
      `O cliente é: ${this.customer.getName()} ${this.customer.getIDN()}`,
    );
  }

  saveOrder() {
    console.log('Pedido salvo com sucesso.');
  }
}
