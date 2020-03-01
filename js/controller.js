/**
*@file         Ici sont implémentés les fonctions qui permettent de gérer les controles
*@author       KARUNAKARAN Nithushan
*@author       RANDRIANASOLO Stephan
**/

export { accesCam, createMedia, initButtonListeners};
import { ElementFactory } from './models.js';
import { videoToCanvas, blur, hueRotation, xRayAvecPixels } from './views.js';


/**
*@function                          Initialise les medias pour l'affichage
*@param {Object} biblio             Contient les paramètres d'affichage des canvas et videos
*@param {number} biblio.ratio       Contient les paramètres d'affichage des canvas et videos
*@param {number} biblio.width       Contient la largeur de l'élement video
*@param {number} biblio.height      Contient la hauteur de l'élement video
*@param {Object} biblio.video       Contient l'élement video
*@param {Object} biblio.canvas      Contient l'élement canvas
*@param {Object} biblio.canvas2d    Contient le contexte de l'élement canvas
*@param {Object} biblio.bgCanvas    Contient l'élement canvas background
*@param {Object} biblio.bgCanvas2d  Contient le contexte du canvas background
*@return {void}
**/
function initMedia(biblio){

  biblio["ratio"] = biblio["video"].thisElement().videoWidth / biblio["video"].thisElement().videoHeight;
  biblio["width"] = (biblio["video"].thisElement().videoWidth / 100) * 70;
  biblio["height"] = parseInt(biblio["width"] / biblio["ratio"], 10);

  biblio["video"].thisElement().width = biblio["width"];
  biblio["video"].thisElement().height = biblio["height"];

  biblio["canvas"].thisElement().width = biblio["width"];
  biblio["canvas"].thisElement().height = biblio["height"];
  biblio["canvas2d"] = biblio["canvas"].thisElement().getContext("2d");

  biblio["bgCanvas"].thisElement().width = biblio["width"];
  biblio["bgCanvas"].thisElement().height = biblio["height"];
  biblio["bgCanvas2d"] = biblio["bgCanvas"].thisElement().getContext("2d");

}

/**
*@function                          Demande à l'utilisateur l'accès à la webcam.
*@param     {Object} biblio         Contient les paramètres du programme.
*@param     {Object} biblio.video   Contient l'élement video
*@return    {void}
**/
function accesCam(biblio){

  biblio["video"].addListeners([['loadedmetadata', function() { initMedia(biblio); }],
                                  ['canplaythrough', function() { initMedia(biblio); }]]);

  if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true})

        .then(function(stream) {
          biblio["video"].thisElement().srcObject = stream;
          biblio["video"].thisElement().play();

        })

        .catch(function(erreur) {
          console.log("Erreur lors de l'accès webcam" + erreur);
        });
      }
}

/**
*@function                             Crée les medias necessaire à l'affichage.
*@param    {Object} biblio             Contient les paramètres du programme.
*@param    {HtmlElement} divCanvas     Contient la div de l'element l'html père.
*@param    {Object} biblio.video       Contient l'élement video
*@param    {Object} biblio.canvas      Contient l'élement canvas
*@param    {Object} biblio.canvas2d    Contient le contexte de l'élement canvas
*@param    {Object} biblio.bgCanvas    Contient l'élement canvas background
*@param    {Object} biblio.bgCanvas2d  Contient le contexte du canvas background
*@return   {void}
**/
function createMedia(biblio, divCanvas,bordure){
  biblio["canvas"] = new ElementFactory("el-canvas", "canvas");
  biblio["canvas"].element.style.position = "absolute";
  biblio["canvas"].element.style.border = bordure;
  biblio["canvas"].addToParent(divCanvas);

  biblio["canvas2d"] = biblio["canvas"].thisElement().getContext('2d');
  biblio["bgCanvas"] = new ElementFactory("el-canvas", "bgCanvas");
  biblio["bgCanvas2d"] = biblio["bgCanvas"].thisElement().getContext('2d');

  biblio["video"] = new ElementFactory("el-video", "video");
  biblio["video"].addToParent(divCanvas);

}

function initButtonListeners(biblio, resetButton, xRayButton, blurButton, hueButton){
  biblio["interval"] = setInterval( ()=>{videoToCanvas(biblio);}, 33);

  resetButton.addListeners([['click', ()=> {
    clearInterval(biblio["interval"]);
    biblio["interval"] = setInterval( ()=>{videoToCanvas(biblio);}, 33);
  }]]);

  xRayButton.addListeners([['click', ()=> {
    clearInterval(biblio["interval"]);
    biblio["interval"] = setInterval(()=>{xRayAvecPixels(biblio);}, 33);
  }]]);

  blurButton.addListeners([['click', ()=> {
    clearInterval(biblio["interval"]);
    biblio["interval"] = setInterval( ()=>{blur(biblio);}, 33);
  }]]);
  
  hueButton.addListeners([['click', ()=> {
    clearInterval(biblio["interval"]);
    biblio["interval"] = setInterval( ()=>{hueRotation(biblio);}, 33);
  }]]);
}