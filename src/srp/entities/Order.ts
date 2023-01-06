import { OrderStatus } from './interfaces/OrderStatus';
import { Messaging } from '../services/Messaging';
import { Persistency } from '../services/Persistency';
import ShoppingCart from './ShoppingCart';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly shoppingCart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
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
      `Seu pedido com total de ${this.shoppingCart.total()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.shoppingCart.clear();
  }

  saveOrder() {
    console.log('Pedido salvo com sucesso.');
  }
}
