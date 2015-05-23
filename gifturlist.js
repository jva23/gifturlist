myGifts = new Meteor.Collection("myGifts");


if (Meteor.isClient) {
  Template.body.helpers({
    myGifts: function () {
        return myGifts.find({owner: Meteor.userId()}, {sort: {createdAt: -1}});
    }
  });

    Template.body.events({
        "submit .new-gift": function (event) {
            var text = event.target.text.value;

            myGifts.insert({
                gift: text,
                createdAt: new Date(),
                owner: Meteor.userId(),
                name: Meteor.user().username,
                purchased: false
            });

            event.target.text.value = "";

            return false;
        }
    });

    Template.gifts.events({
        "click .delete": function() {
            myGifts.remove(this._id);
        }
    })

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
