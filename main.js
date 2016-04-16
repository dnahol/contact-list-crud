'use strict'

$(document).ready(init);
function init() {
  renderList();
  $('#btn-id').click(addContact);
  $( "body" ).on("click", "button.del", removeContact);
  // $("button.edit").on("click", "div.media", editContact);
  $("div.contacts").on("click", "button.edit", editContact);
}

function renderList() {
  var contacts = ContactStorage.get();
  console.log(contacts);

  //remove all div.media, except template
  $('div.media').not('.template').remove();
  // console.log("$('div.media').not('.template').remove(): ", $('div.media').not('.template').remove(););

  //append all old contacts to the DOM
  contacts.forEach(contact => createContact(contact));
}

function createContact(info) {
  //clone template
  var $newContact = $('.template').clone();
  //remove template class
  $newContact.removeClass('template');
  //add new contact info
  var $name = $newContact.find('.name');
  $name.text(info.firstName + ' ' + info.lastName);
  var $image = $newContact.find('img');
  $image.attr('src', info.image);
  var otherInfo =  '\nP: ' + info.phoneNumber +'\nA: ' + info.address + '\nE: ' + info.email;
  $newContact.find('.media-body').text(otherInfo)
  //append new contact to the DOM
  $newContact.appendTo('.contacts');

}

function editContact(event) {
  var contacts = ContactStorage.get();
  // var index = 7;
  var index = $(this).index();

  //get text from input boxes and store it
  var firstName = $("#newFirstname").val();
  //  console.log("firstname: ", firstName);
  var lastName= $('#lastName').val();
  var phoneNumber= $('#phoneNumber').val();
  var address= $('#newAddress').val();
  var email= $('#newEmail').val();
  var image= $('#newImage').val();

  contacts[index] = {
    "firstName" :  firstName,
    "lastName" :  lastName,
    "phoneNumber" : phoneNumber,
    "address":  address,
    "email": email,
    "image": image
  };

  //
  // contacts[index] = {
  //        "name": `${$name}`,
  //        "phone": `${$phone}`,
  //        "image": `${$image || "https://goo.gl/BdsbmU"}`,
  //        "address": `${$address}`,
  //        "email": `${$email}`
  //    };


  //populate input boxes with current info values

  ContactStorage.write(contacts);

  renderList();
  //clear inputs
  $('#contactForm').find('input').val('');

}


// function removeName(event) {
//   var index = $(this).index();
//
//   var names = NameStorage.get();
//   names.splice(index, 1); // modify
//   NameStorage.write(names);
//
//   renderList();
// }

function removeContact(event) {
  // `this` is the DOM element that was clicked
  // bug: this doesn't delete the first element for some reason
  var index = $(this).index();
  //figure out index!!
  // var index = 2;
  // console.log("$(this): ", $(this));
  console.log( "That was div index #" + index);

  var contacts = ContactStorage.get();
  contacts.splice(index, 1);
  ContactStorage.write(contacts);

  //console.log("$(this).index(): ", $(this).index());

  //select the whole parent div.media with the same index (index)
  // var $thisContact = $("div.media").eq(index);
  //console.log("index: ", index);
  //console.log("$thisContact: ", $thisContact);

  //remove the whole parent div.media with the same index
  //$thisContact.remove();
  //$(.).remove()
  // $(this).remove();
  renderList();

};


//adds new contact from the form
function addContact(event) {
  var info = {};
  //get text from input boxes and store it
  var firstName = $("#firstname").val();
  //  console.log("firstname: ", firstName);
  var lastName= $('#lastname').val();
  var phoneNumber= $('#phonenumber').val();
  var address= $('#address').val();
  var email= $('#email').val();
  var image= $('#image').val();

  info.firstName= firstName;
  info.lastName = lastName;
  info.phoneNumber = phoneNumber;
  info.address= address;
  info.email=email;
  info.image=image;

  // you store contact object info{} in an array called contacts
  var contacts = ContactStorage.get();
  contacts.push(info);
  ContactStorage.write(contacts);

  //append new contact to the DOM
  createContact(info);

  //clear inputs
  $('#contactForm').find('input').val('');

}

var ContactStorage = {
  get: function() {
    try {
      var contacts = JSON.parse(localStorage.contacts);
    } catch(err) {
      var contacts = [];
    }
    return contacts;
  },
  write: function(contacts) {
    localStorage.contacts = JSON.stringify(contacts);
  }
};
