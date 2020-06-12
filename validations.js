import React from 'react';

export default function validations(type,val){
    var emailpat = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}");
    var passpat = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}");
            /*at least 8 characters
        at least 1 numeric character
        at least 1 lowercase letter
        at least 1 uppercase letter
        at least 1 special character*/
    var namepat = new RegExp("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$");
   /* Only contains alphanumeric characters, underscore and dot.
        Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.).
        Underscore and dot can't be next to each other (e.g user_.name).
        Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
        Number of characters must be between 8 to 20.*/

    if(type === "email"){
        return emailpat.test(val);
    } else if(type === "name"){
        return namepat.test(val);
 
    } else if(type === "password"){
        return passpat.test(val);
    }
    return true;
}