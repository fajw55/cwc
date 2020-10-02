class FirstCwc extends HTMLElement {
	static get observedAttributes() {
		return ["count"];
	}

	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		const counter = document.createElement("div");
		counter.setAttribute("class", "aaa");

		const button = document.createElement("div");
		button.setAttribute("class", "ccc");
		button.setAttribute("id", "inner-button");
        button.textContent = `Increase inner count`;
        
        const secondButton = document.createElement("div");
		secondButton.setAttribute("class", "bbb");
		secondButton.setAttribute("id", "inner-button");
		secondButton.textContent = `Increase all counts`;

		shadow.appendChild(counter);
        shadow.appendChild(button);
        shadow.appendChild(secondButton);

        button.onclick = () => {
            console.log("click button");
            let innerCount = parseInt(this.getAttribute('count'), 10);
            let newInnerCount = `${innerCount + 1}`;
            this.setAttribute('count', newInnerCount);
        }
	}

	connectedCallback() {
        console.log("connectedCallback");
        updateInner(this)
	}

	disconnectedCallback() {
		console.log("disconnectedCallback");
	}

	adoptedCallback() {
		console.log("adoptedCallback");
	}

	attributeChangedCallback(name, oldValue, newValue) {
        console.log("attributeChangedCallback");
        updateInner(this)
	}
}

customElements.define("first-cwc", FirstCwc);
console.log("first-cwc is defined.");

const cart = document.getElementById("cart");
const custom = document.querySelector("first-cwc");

function updateInner(elem) {
    const shadow = elem.shadowRoot;
    let aaa = shadow.querySelector('.aaa')
    aaa.textContent = `count: ${elem.getAttribute('count')}`;
}

document.body.addEventListener(
	"click",
	function (event) {
		let element = event.target;
		console.log("click %o", element.id);
		if (element.className === "bbb") {
			cart.dataset.value++;
            cart.innerText = cart.dataset.value;

            let innerCount = parseInt(custom.getAttribute('count'), 10);
            let newInnerCount = `${innerCount + 1}`;
            custom.setAttribute('count', newInnerCount);
		}
	},
	false
);

// const innerButton = custom.shadowRoot.querySelector(".ccc");
// innerButton.onclick = function() {
//     let innerCount = parseInt(custom.getAttribute('count'), 10);
//     let newInnerCount = `${innerCount + 1}`;
//     custom.setAttribute('count', newInnerCount);
// }

const secondInnerButton = custom.shadowRoot.querySelector(".bbb");
secondInnerButton.onclick = function() {
    console.log("click secondButton");
    cart.dataset.value++;
    cart.innerText = cart.dataset.value;

    let innerCount = parseInt(custom.getAttribute('count'), 10);
    let newInnerCount = `${innerCount + 1}`;
    custom.setAttribute('count', newInnerCount);
}
