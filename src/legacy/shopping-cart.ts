type CartItem = {
  name: string;
  price: number;
};

type OrderStatus = 'open' | 'closed';

export class ShoppingCartLegacy {
  private readonly _items: CartItem[] = [];
  private _orderStatus: OrderStatus = 'open';

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  total(): number {
    return Number(
      this._items.reduce((total, next) => total + next.price, 0).toFixed(2),
    );
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Seu carrinho vazio.');
      return;
    }

    this._orderStatus = 'closed';
    this.sendMessage(`Seu pedido com total de ${this.total()} foi recebido.`);
    this.saveOrder();
    this.clear();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(message: string): void {
    console.log('Mensagem enviada: ', message);
  }

  saveOrder() {
    console.log('Pedido salvo com sucesso.');
  }

  clear() {
    console.log('Carrinho de compras foi limpo.');
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCartLegacy();
shoppingCart.addItem({
  name: 'Camisa',
  price: 58,
});
shoppingCart.addItem({
  name: 'Bermuda',
  price: 32.56,
});
shoppingCart.addItem({
  name: 'Cueca',
  price: 20,
});

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.orderStatus);

shoppingCart.checkout();
console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.orderStatus);
