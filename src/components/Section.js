export default class Section {
  constructor(renderer, classSelector) {
    this._renderer = renderer;
    this.container = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this.appendItem(item);
    });
  }

  appendItem(item) {
    const element = this._renderer(item);
    this.container.append(element);
  }

  prependItem(item) {
    const element = this._renderer(item);
    this.container.prepend(element);
  }

  setItems(items) {
    this._items = items;
  }
}
