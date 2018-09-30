/**
 * @author Vincent Paquette <vpaquette@spektrummedia.com>
 */

export default function () {
    return new Promise(resolve => {
        let ajax = new XMLHttpRequest()

        ajax.open("GET", "/img/icons/dest/sprite.svg", true)

        ajax.onload = (evt) => {

            // create hidden wrapper element at top of document, containing sprite
            let div = document.createElement("div");
            div.innerHTML = ajax.responseText
            div.style.position = 'absolute'
            div.style.width = 0
            div.style.height = 0
            div.style.overflow = 'hidden'
            document.body.insertBefore(div, document.body.childNodes[0])

            // replace all .js-svg elements with matching sprite element
            Array.prototype.forEach.call(document.body.querySelectorAll('.js-svg'), (el, i) => {

                // get sprite element name
                let name = el.getAttribute('data-name')
				
				//TEST FREDE				
                // get sprite element modifier
                let modifier = el.getAttribute('data-modifier')===null ? "" : ' icon--' + el.getAttribute('data-modifier')
				

                // If no match, return false
                if (!div.querySelector(`svg#${name}`)) return false;

                // create clone of matching element
                const clone = div.querySelector(`#${name}`).cloneNode(true);

                // add icon classes
//                clone.setAttribute('class', 'icon '+ name + " " + "icon--" + modifier)
                clone.setAttribute('class', 'icon' + modifier)

                // add a prefix to the id to avoid duplicate id
                clone.id = `${name}-clone`

                // perform element replacement
                el.parentNode.replaceChild(clone, el)
            })

            resolve()

            document.body.classList.add('icons-loaded')
        }

        ajax.onerror = (err) => {
            console.log(err)
        }

        ajax.send()
    })
}