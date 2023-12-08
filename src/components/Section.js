export default class Section {
  constructor(renderer, classSelector) {
    this._renderer = renderer;
    this.container = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._renderer(item);
  }

  setItems(items) {
    this._items = items;
  }
}
