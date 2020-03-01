/**
 *@file 		    Permet de gérer l'affichage graphique du canvas et des différents filtres
 *@author       KARUNAKARAN Nithushan
 *@author       RANDRIANASOLO Stephan
*/

export { videoToCanvas , blur, hueRotation, xRayAvecPixels };

/**
*@function    Copie l'image de la video vers le canvas.
*@param       {Object} biblio Dictionnaire de tous les paramètres.
*@return      {void}
**/
function videoToCanvas(biblio) {
    biblio["canvas2d"].fillRect(0, 0, biblio["width"], biblio["height"]);
    biblio["canvas2d"].filter = "none";
	  biblio["canvas2d"].drawImage(biblio["video"].thisElement(), 0, 0, biblio["width"], biblio["height"]);
}

/**
*@function    Ajoute un filtre qui floute au niveau du contexte du canvas et ensuite dessine le resultat dans le canvas.
*@param       {Object} biblio Dictionnaire de tous les paramètres.
*@return      {void}
**/
function blur(biblio){
	biblio["canvas2d"].filter = "blur(10px)";
	biblio["canvas2d"].drawImage(biblio["video"].thisElement(), 0, 0, biblio["width"], biblio["height"]);
}


/**
*@function    Ajoute un filtre qui chane la teinte au niveau du contexte du canvas et ensuite dessine le resultat dans le canvas.
*@param       {Object} biblio Dictionnaire de tous les paramètres.
*@return      {void}
**/
function hueRotation(biblio){
	biblio["canvas2d"].filter = "hue-rotate(90deg)";
	biblio["canvas2d"].drawImage(biblio["video"].thisElement(), 0, 0, biblio["width"], biblio["height"]);
}


/**
*@function    Inverse la valeur des  pixels et ensuite dessine le resultat dans le canvas.
*@param       {Object} biblio dictionnaire de tous les paramètres.
*@return      {void}
**/
function xRayAvecPixels(biblio){
	var videoPixel = getVideoPixel(biblio);
	for(let i = 0; i < videoPixel.data.length;i+=4){
		videoPixel.data[i] = 255 - videoPixel.data[i]
		videoPixel.data[i+1] = 255 - videoPixel.data[i+1]
		videoPixel.data[i+2] = 255 - videoPixel.data[i+2]
	}
	biblio["canvas2d"].putImageData(videoPixel,0,0)
}

/**
*@function    Prend les pixels des images.
*@param       {Object} biblio dictionnaire de tous les paramètres.
*@return      {Object} un context 2d bgCanvas2d 
**/
function getVideoPixel(biblio) {
	biblio["bgCanvas2d"].drawImage(biblio["video"].thisElement(), 0, 0, biblio["width"], biblio["height"]);
	return biblio["bgCanvas2d"].getImageData(0, 0, biblio["width"], biblio["height"]);
}
