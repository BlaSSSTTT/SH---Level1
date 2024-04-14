
function validateEmail(email){
    let reg = /^[\d\w][a-zA-Z0-9\.\+\-]{1,19}@[a-zA-Z0-9\.\!\$\%\&\’\*\+\/\=\?\^\_\-]+\.[a-zA-Z]{1,5}$/;

    return email.match(reg) !== null;
}
function validatePhone(phone){
    if (phone.length > 25) {
        return false;
    }
    let reg = /^(\+?38?)?(\(\d{3}\)?)?[\d\s-]{7,}$/;

    return reg.test(phone.replace(/[\s-]/g, ''));
}
function validatePassword(password) {
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_]{8,}$/;
    return pattern.test(password);
}

const emails = [
    "fi@secondpart.end",
    "first-part@.se=cond%p.art.end",
    "first.part@se=cond%part.r",
    "f@secondart.end",
    "first-part@.se=cond@part.end",
    "-firstpart@.se=cond%.enddeded",
    "firs_tpart@.se.en",
    "firstpart@.se.enddeded"
];
const phones = [
    "+38 (099) 567 8901",
    "+38 099 5 6 7 8 9 01",
    "(09-9) 567-890-1",
    "--  (099) 567 890-1",
    "+38 (099) 567 8901 0",
    "+38 099 a0000000",
    "+38 (0989) 567 8901",
    "+48 (0989) 567 8901"
];

const passwords = [
    "C00l_Pass",
    "SupperPas1",
    "Cool_pass",
    "C00l"
];
emails.forEach(function(email) {
    if (validateEmail(email)) {
        console.log(email + " є валідною email-адресою.");
    } else {
        console.log(email + " не є валідною email-адресою.");
    }
});
console.log();
phones.forEach(function(phone) {
    if (validatePhone(phone)) {
        console.log(phone + " є валідним номером телефону.");
    } else {
        console.log(phone + " не є валідним номером телефону.");
    }
});
console.log();
passwords.forEach(function(password) {
    if (validatePassword(password)) {
        console.log(password + " є валідним паролем.");
    } else {
        console.log(password + " не є валідним паролем.");
    }
});