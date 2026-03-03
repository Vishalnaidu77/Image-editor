let filters = {
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Saturation: {
        value: 100,
        min: 0,
        max: 200,
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
        min: 0,
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
        min: 0,
        max: 100,
        unit: "%"
    },
}

const presets = {
    Normal: {
        Brightness: 100,
        Contrast: 100,
        Saturation: 100,
        HueRotation: 0,
        Blur: 0,
        GrayScale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 0,
    },
    Drama: {
        Brightness: 95,
        Contrast: 165,
        Saturation: 120,
        HueRotation: 0,
        Blur: 0,
        GrayScale: 20,
        Sepia: 10,
        Opacity: 100,
        Invert: 0,
    },
    Vintage: {
        Brightness: 110,
        Contrast: 90,
        Saturation: 75,
        HueRotation: 15,
        Blur: 1,
        GrayScale: 15,
        Sepia: 45,
        Opacity: 100,
        Invert: 0,
    },
    OldSchool: {
        Brightness: 105,
        Contrast: 85,
        Saturation: 55,
        HueRotation: 8,
        Blur: 0,
        GrayScale: 30,
        Sepia: 65,
        Opacity: 100,
        Invert: 0,
    },
    Noir: {
        Brightness: 95,
        Contrast: 140,
        Saturation: 0,
        HueRotation: 0,
        Blur: 0,
        GrayScale: 100,
        Sepia: 0,
        Opacity: 100,
        Invert: 0,
    },
    CoolBlue: {
        Brightness: 102,
        Contrast: 110,
        Saturation: 120,
        HueRotation: 25,
        Blur: 0,
        GrayScale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 0,
    },
    WarmSunset: {
        Brightness: 112,
        Contrast: 108,
        Saturation: 130,
        HueRotation: 340,
        Blur: 0,
        GrayScale: 0,
        Sepia: 20,
        Opacity: 100,
        Invert: 0,
    },
    HighKey: {
        Brightness: 125,
        Contrast: 85,
        Saturation: 110,
        HueRotation: 0,
        Blur: 0,
        GrayScale: 5,
        Sepia: 0,
        Opacity: 100,
        Invert: 0,
    },
}

const filterContainer = document.querySelector(".filters")
const imageCanvas = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
const placeHolder = document.querySelector(".placeholder")
const resetBtn = document.querySelector("#reset-btn")
const downloadBtn = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")

let file = null;
let image = null;


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

    input.addEventListener("input", (e) => {
        filters[name].value = input.value
        applyFilters()
    })

    return div
}

const createFilters = () => {
    Object.keys(filters).forEach(key => {
        const filterElement = createElementFilter(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
        filterContainer.appendChild(filterElement)
    })
}

createFilters()


imgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    imageCanvas.style.display = "block"

    const img = new Image()
    img.src = URL.createObjectURL(file)
    
    img.onload = () => {
        image = img
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0)
    }

    placeHolder.style.display = "none"
})


function applyFilters(){
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter = `
    brightness(${filters.Brightness.value}${filters.Brightness.unit})
    contrast(${filters.Contrast.value}${filters.Contrast.unit})
    saturate(${filters.Saturation.value}${filters.Saturation.unit})
    hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
    blur(${filters.Blur.value}${filters.Blur.unit})
    grayscale(${filters.GrayScale.value}${filters.GrayScale.unit})
    sepia(${filters.Sepia.value}${filters.Sepia.unit})
    opacity(${filters.Opacity.value}${filters.Opacity.unit})
    invert(${filters.Invert.value}${filters.Invert.unit})
    `
    canvasCtx.drawImage(image, 0, 0)
}

resetBtn.addEventListener("click", () => {
    filters = {
        Brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        Contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        Saturation: {
            value: 100,
            min: 0,
            max: 200,
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
            min: 0,
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
            min: 0,
            max: 100,
            unit: "%"
        },
    }

    applyFilters()

    filterContainer.innerHTML = "";
    createFilters()
})

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presetsOption = document.createElement("select")
presetsOption.classList.add("presets-box")

Object.keys(presets).forEach(presetName => {
    const options = document.createElement("option")
    options.innerHTML = presetName
    options.value = presetName
    presetsOption.appendChild(options)
})

if (presetsContainer) {
    presetsContainer.appendChild(presetsOption)
}

presetsOption.addEventListener("change", (e) => {
    const selectedPreset = e.target.value
    const preset = presets[selectedPreset] || {}

    Object.keys(preset).forEach(filterName => {
        filters[filterName].value = preset[filterName]

        const filterInput = document.getElementById(filterName)
        if (filterInput) {
            filterInput.value = preset[filterName]
        }
    })

    applyFilters()
})

