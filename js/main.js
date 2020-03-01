/**
 *@file         Fichier principal du programme
 *@author       KARUNAKARAN Nithushan
 *@author       RANDRIANASOLO Stephan
*/
window.onload = main;

import { accesCam, createMedia, initButtonListeners } from './controller.js';
import { biblio, MButton } from './models.js';

function main() {
    console.log("Start programm");
    var divCanvas = document.getElementById("col-canvas");
    var divButton = document.getElementById("col-button");

    var resetButton = new MButton("reset", "btn btn-primary", "Reset", divButton);
    var xRayButton  = new MButton("xRay", "btn btn-primary", "xRay", divButton);
    var blurButton  = new MButton("Blur", "btn btn-primary", "blur", divButton);
    var hueButton   = new MButton("HueRotation", "btn btn-primary", "hueRotation", divButton);

    createMedia(biblio, divCanvas,"2px solid #fff");
    accesCam(biblio);
    initButtonListeners(biblio, resetButton, xRayButton, blurButton, hueButton);
}
