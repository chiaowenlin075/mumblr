Mumblr.Mixins.FollowOrLikeable = {

  target: function () {
    if (!this._target) {
      if (this.options.targetEvent === "following") {
        this._target = new Mumblr.Models.Following();
      } else if (this.options.targetEvent === "liking") {
        this._target = new Mumblr.Models.Liking();
      }
    }
    return this._target;
  },

  createModel: function () {
    this.target().set(this.options.foreignKey, this.escape('id'));
    this.target().save({}, {
      success: function (data) {
        this.updateNumCount(1);
        this.eventCollection.add(this);
      }.bind(this)
    });
  },

  destroyModel: function () {
    this.target().destroy({
      success: function (model) {
        model.unset("id");
        this.updateNumCount(-1);
        this.eventCollection.remove(this);
      }.bind(this)
    });
  },

  toggleEvent: function () {
    if (this.target().isNew()) {
      this.createModel();
    } else {
      this.destroyModel();
    }
  },

  updateNumCount: function (delta) {
    if (this.options.targetEvent === "following") {
      this.set("num_follows", this.get("num_follows") + delta);
    } else if (this.options.targetEvent === "liking") {
      this.set("num_likes", this.get("num_likes") + delta);
    }
  },

  parseTarget: function (payload) {
    if (payload[this.options.targetEvent]) {
      this.target().set(payload[this.options.targetEvent]);
      delete payload[this.options.targetEvent];
    };
  }
}
