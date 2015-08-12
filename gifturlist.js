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
    });

    Session.setDefault('createGroupVisible',false);

    Template.createGroup.events({
        "click .toggle-create-group": function () {
            Session.set("createGroupVisible", true)
        }
    });

    Template.createGroup.helpers({
        showCreateGroup:function(){
            var showCreateGroupVisible = Session.get('createGroupVisible');
            if(showCreateGroupVisible === true){
                return true;
            }else{
                return false;
            }
        }
    });

    //to set the session to false on refresh.
    Template.createGroup.destroyed = function(){
        Session.set('createGroupVisible',false)
    };

    Session.setDefault('joinGroupVisible',false);

    Template.joinGroup.events({
        "click .toggle-join-group": function () {
            Session.set("joinGroupVisible", true)
        }
    });

    Template.joinGroup.helpers({
        showJoinGroup:function(){
            var show = Session.get('joinGroupVisible');
            if(show === true){
                return true;
            }else{
                return false;
            }
        }
    });

    //to set the session to false on refresh.
    Template.joinGroup.destroyed = function(){
        Session.set('joinGroupVisible',false)
    };

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

}
