/** 
 * Select UI component
 *
 * @class select
 * @augments elation.ui.base
 * @memberof elation.ui
 * @todo this could probably inherit from ui.list to be more general
 *
 * @param {object} args
 * @param {string} args.items
 */
elation.component.add('ui.select', function() {
  this.init = function() {
    if (this.container instanceof HTMLSelectElement) {
      this.select = this.container;
    } else {
      this.select = elation.html.create({tag: 'select', append: this.container});
    }
    elation.events.add(this.select, "change", this);
    if (this.args.items) {
      this.setItems(this.args.items, this.args.selected);
    }
    this.value = this.select.value;
  }
  this.setItems = function(items, selected) {
    if (items instanceof Array) {
      this.set('args.items', items.join(';'));
    } else {
      this.set('args.items', items);
      items = items.split(';');
    }
    this.select.innerHTML = '';
    for (var i = 0; i < items.length; i++) {
      var option = elation.html.create({tag: 'option'});
      option.value = items[i];
      if (selected && selected == option.value) {
        option.selected = "selected";
        this.value = option.value;
      }
      option.innerHTML = items[i];
      this.select.appendChild(option);
    }
  }
  this.change = function(ev) {
    this.value = this.select.value;
    elation.events.fire({type: "ui_select_change", data: this.select.value, element: this});
  }
}, elation.ui.base);

