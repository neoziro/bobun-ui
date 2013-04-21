(function () {
  'use strict';

  Bobun.UI.IconButton = Bobun.UI.Button.extend({

    className: 'btn btn-icon',

    initialize: function () {
      var oldDisabled;

      Bobun.UI.Button.prototype.initialize.apply(this, arguments);

      // options
      this.options = _.extend({
        processing: false,
        defaultIconClassName: null,
        processingIconClassName: 'icon-spin icon-spinner'
      }, Bobun.UI.Button.prototype.options, this.options);

      oldDisabled = this.options.disabled;

      this.bindChange('processing', this, 'disabled');

      if (! this.options.processing) {
        this.options.disabled = oldDisabled;
      }

      // views
      this.views.icon = new Bobun.UI.IconButton.Icon({
        model: this.model,
        processing: this.get('processing'),
        defaultClassName: this.get('defaultIconClassName'),
        processingClassName: this.get('processingIconClassName')
      });

      this.bindChange('processing', this.views.icon);
      this.bindChange('defaultIconClassName', this.views.icon, 'defaultClassName');
      this.bindChange('processingIconClassName', this.views.icon, 'processingClassName');

      this.views.label = new Bobun.UI.IconButton.Label({
        model: this.model,
        label: this.get('label')
      });

      this.bindChange('label', this.views.label);
    },

    render: function () {
      this.updateDisabled();

      return this
      .append(this.views.icon)
      .append(this.views.label);
    }
  });

  Bobun.UI.IconButton.Icon = Bobun.UI.Base.extend({

    tagName: 'i',

    options: {
      processing: null,
      defaultClassName: null,
      processingClassName: 'icon-spin icon-spinner'
    },

    initialize: function () {
      this.on('change:processing change:defaultClassName change:processingClassName', this.render);
    },

    render: function () {
      if (this.get('processing')) {
        this.$el.addClass(this.get('processingClassName'));
        this.$el.removeClass(this.get('defaultClassName'));
      }
      else {
        this.$el.removeClass(this.get('processingClassName'));
        this.$el.addClass(this.get('defaultClassName'));
      }

      return this;
    }
  });

  Bobun.UI.IconButton.Label = Bobun.UI.Base.extend({

    tagName: 'span',

    options: {
      label: null
    },

    initialize: function () {
      this.on('change:label', this.render);
    },

    render: function () {
      this.$el.html(this.get('label'));
      return this;
    }
  });
}());