// Ներկայացնում ենք EmailJS-ի հաղորդագրությունների ուղարկման կոդը

// Կատարեք տեղադրված "User ID", "Service ID" և "Template ID"-ները ձեր EmailJS հաշվի տվյալներից
const userID = 'eHNVI4LifL6Z_x8e7';  // Ձեր User ID-ը, ստանում եք EmailJS-ից
const serviceID = 'service_c184vfj';  // Ձեր Service ID-ը
const templateID = 'template_0ph8sbd';  // Ձեր Template ID-ը

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Խուսափել էջի նորից բեռնումից

        emailjs.sendForm(serviceID,templateID, this)
            .then(function(response) {
                alert("Հաղորդագրությունը ուղարկվել է հաջողությամբ!");
            }, function(error) {
                alert("Սխալ է առաջացել հաղորդագրությունը ուղարկելու ընթացքում: " + error.text);
            });
    });
});
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// OAuth-ի կոդի միջոցով Gmail API-ով մուտք գործելու համար
gapi.auth2.init({
  client_id: 'YOUR_CLIENT_ID',
  scope: SCOPES.join(' '),
});
