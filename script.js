const filters = {
    Brighness: {
        value: 0,
        min: -100,
        max: 100,
        unit: "%"
    },
    Contrast: {
        value: 0,
        min: -100,
        max: 100,
        unit: "%"
    },
    Exposure: {
        value: 0,
        min: -100,
        max: 100,
        unit: "%"
    },
    HueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    Blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    GrayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Sepia: {
        value: 0,
        min: -100,
        max: 100,
        unit: "%"
    },
    Opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    Invert: {
        value: 0,
        min: -100,
        max: 100,
        unit: "%"
    },
}

const filterContainer = document.querySelector(".filters")
const imageCanvas = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")

const createElementFilter = (name, unit = "%", value, min, max) => {

    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")

    input.type = "range",
    input.id = name
    input.value = value,
    input.min = min,
    input.max = max

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    return div
}

Object.keys(filters).forEach(key => {
    const filterElement = createElementFilter(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
    filterContainer.appendChild(filterElement)
})

imgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    const img = new Image()
    img.src = URL.createObjectURL(file)
    
    img.onload = () => {
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0)
    }
})