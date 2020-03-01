/**
 *@file         Contient les modèles et structures de données utilisées dans ce programme
 *@author       KARUNAKARAN Nithushan
 *@author       RANDRIANASOLO Stephan

*/

export { biblio, ElementFactory, MButton };

/**
*Dictionnaire qui contient tous les medias necessaire à notre programme
*@type {number}   biblio.ratio       Contient les paramètres d'affichage des canvas et videos
*@type {number}   biblio.width       Contient la largeur de l'élement video
*@type {number}   biblio.height      Contient la hauteur de l'élement video
*@type {Object}   biblio.video       Contient l'élement video
*@type {Object}   biblio.canvas      Contient l'élement canvas
*@type {Object}   biblio.canvas2d    Contient le contexte de l'élement canvas
*@type {Object}   biblio.bgCanvas    Contient l'élement canvas background
*@type {Object}   biblio.bgCanvas2d  Contient le contexte du canvas background
*@type {number}   biblio.interval    Contient l'id de l'interval reourner par la fonction setInterval()
**/
var biblio = {
    ratio      : null,
    width      : null,
    height     : null,
    video      : null,
    canvas     : null,
    canvas2d   : null,
    bgCanvas   : null,
    bgCanvas2d : null,
    interval   : null,
}


/**
*@class
*@classdesc                      Crée un element html de base.
*@param     {string} id          Identification de l'element.
*@param     {string} elementName Tag de l'element à créer.
*@function  {function}           thisElement() retourne l'element html.
*@function  {function}           addToParent(parametre) ajoute l'element à l'argument en parametre.
*@function  {function}           addListeners(listEventNMethod) vas ajouter à l'element tous listeners present dans listEventNMethod. Ex de parametre :[["click", fucntion1], ["mousedown", function2]]
*@return    {void}
**/
class ElementFactory{
   constructor(id, elementName){
        this.element = document.createElement(elementName);
        this.element.id = id;
    }
    thisElement(){
        return document.getElementById(this.element.id);
    }
	addToParent(parent){
		parent.appendChild(this.element);
	}
    addListeners(listEventNMethode){
		var length = listEventNMethode.length;
		var itter;
		for(itter = 0; itter < length; itter++){
			this.element.addEventListener(listEventNMethode[itter][0],listEventNMethode[itter][1], true);
		}
	}
}

/**
*@class
*@classdesc                       Crée un element Button.
*@param    {string} id            Id de l'element.
*@param    {string} classe        Type de l'element.
*@param    {string} buttonContent Texte de l'élement
*@param    {string} parent        Parent d élément.
*@return   {void}
**/
class MButton extends ElementFactory{
    constructor(id, classe, buttonContent, parent){
        var text = document.createTextNode(buttonContent);

		super(id, "button");
        this.element.type = "button";
        this.element.class = classe;
        this.element.appendChild(text);
		this.addToParent(parent);
    }
}
