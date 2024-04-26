const yoga_set1_model_path = "../static/models/Yoga_Set1_Tfjs/model.json"
const yoga_set2_model_path = "../static/models/Yoga_Set2_Tfjs/model.json"

const set1_labels = { 0: "Downward Dog", 1: "Tree", 2: "Warrior 1" }
const set2_labels = { 0: "Goddess", 1: "Mountain", 2: "Warrior 2" }

// Drag and drop image handling
var fileDrag = document.getElementById("file-drag");
var fileSelect = document.getElementById("file-upload");

// Add event listeners
fileDrag.addEventListener("dragover", fileDragHover, false);
fileDrag.addEventListener("dragleave", fileDragHover, false);
fileDrag.addEventListener("drop", fileSelectHandler, false);
fileSelect.addEventListener("change", fileSelectHandler, false);

function fileDragHover(e) {
    // prevent default behaviour
    e.preventDefault();
    e.stopPropagation();

    fileDrag.className = e.type === "dragover" ? "upload-box dragover" : "upload-box";
}

function fileSelectHandler(e) {
    // handle file selecting
    var files = e.target.files || e.dataTransfer.files;
    fileDragHover(e);
    for (var i = 0, f;
        (f = files[i]); i++) {
        previewFile(f);
    }
}

// Web page elements for functions to use
var imagePreview = document.getElementById("image-preview");
var imageDisplay = document.getElementById("image-display");
var uploadCaption = document.getElementById("upload-caption");
var predResult = document.getElementById("pred-result2");
var loader = document.getElementById("loader");
var model = undefined;



// Main button events
async function predict() {
    // action for the submit button
    if (!imageDisplay.src || !imageDisplay.src.startsWith("data")) {
        window.alert("Please select an image before submit.");
        return;
    }

    let tensorImg = tf.browser.fromPixels(imagePreview).resizeNearestNeighbor([300, 300]).toFloat().expandDims();
    prediction = await model.predict(tensorImg).data();

    let pred_index = prediction.indexOf(Math.max(...prediction));
    console.log()


    let benefitsHTML = "";
    let cautionsHTML = "";

    pre_text = "I think it's a "
    if (pred_index === 0) {
        result = labels[pred_index] + " Pose"
        predResult.innerHTML = pre_text + result;
        console.log()

    } else if (pred_index === 1) {
        result = labels[pred_index] + " Pose"
        predResult.innerHTML = pre_text + result;

    } else {
        result = labels[pred_index] + " Pose"
        predResult.innerHTML = pre_text + result;
    }
    console.log(pre_text + result)

    switch(result) {
        case "Tree Pose":
            console.log("tree pose")
            benefitsHTML = '<p style="color: black; font-weight: bold;">The Physical Benefits of Tree Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Strengthens Thighs, Calves, Ankles, and Spine</li>';
            benefitsHTML += '<li>Stretches the Inner Thighs, Groins, Chest, and Shoulders</li>';
            benefitsHTML += '<li>Enhances Your Sense of Balance</li>';
            benefitsHTML += '</ul>';

            benefitsHTML += '<p style="color: black; font-weight: bold;">The Mental & Spiritual Benefits of Tree Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Energizing, De-stressing, Relaxing</li>';
            benefitsHTML += '<li>Develops Focus, Physically & Mentally</li>';
            benefitsHTML += '<li>Builds Self-Confidence & Esteem</li>';
            benefitsHTML += '</ul>';

            cautionsHTML = '<p style="color: black; font-weight: bold;">Cautionary Points to keep in mind:</p>'
            cautionsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-right: 20px;">';
            cautionsHTML += '<li><span style="color: black;"> Balance:</span> Maintain stability to avoid falling. Use support if needed, especially for beginners.</li>';
            cautionsHTML += '<li><span style="color: black;">Joint Safety:</span> Keep a slight bend in the standing knee to protect joints, particularly the knee.</li>';
            cautionsHTML += '<li><span style="color: black;">Foot Placement:</span> Avoid placing the foot directly on the knee joint. Aim for placement above or below the knee.</li>';
            cautionsHTML += '</ul>';

            break;
        case "Downward Dog Pose":
            console.log("Downward Dog pose")
            benefitsHTML = '<p style="color: black; font-weight: bold;">The Physical Benefits of Downward Dog Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Stretches the Spine</li>';
            benefitsHTML += '<li>Strengthens the Arms and Shoulders</li>';
            benefitsHTML += '<li>Stimulates Circulation</li>';
            benefitsHTML += '</ul>';

            benefitsHTML += '<p style="color: black; font-weight: bold;">The Mental & Spiritual Benefits of Downward Dog Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Calms the Mind</li>';
            benefitsHTML += '<li>Improves Concentration</li>';
            benefitsHTML += '<li>Promotes Relaxation</li>';
            benefitsHTML += '</ul>';
            
            cautionsHTML = '<p style="color: black; font-weight: bold;">Cautionary Points to keep in mind:</p>'
            cautionsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-right: 20px;">';
            cautionsHTML += '<li><span style="color: black;">Straighten Your Back:</span> Maintain a long spine by lengthening through the arms and lifting the tailbone towards the ceiling.</li>';
            cautionsHTML += '<li><span style="color: black;">Avoid Overarching:</span> Keep the lower back from sinking down excessively to prevent strain. Engage the core muscles to support the spine.</li>';
            cautionsHTML += '<li><span style="color: black;">Mind Your Wrists:</span> Distribute weight evenly across the palms and fingers to avoid wrist discomfort. Spread fingers wide for stability.</li>';
            cautionsHTML += '</ul>';

            break;
        case "Warrior 1 Pose":
            console.log("Warrior 1 pose")
            benefitsHTML = '<p style="color: black; font-weight: bold;">The Physical Benefits of Warrior 1 Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Opens the Chest and Lungs</li>';
            benefitsHTML += '<li>Strengthens the Legs</li>';
            benefitsHTML += '<li>Improves Balance and Stability</li>';
            benefitsHTML += '</ul>';

            benefitsHTML += '<p style="color: black; font-weight: bold;">The Mental & Spiritual Benefits of Warrior 1 Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Build Confidence</li>';
            benefitsHTML += '<li>Enhances Focus and Determination</li>';
            benefitsHTML += '<li>Cultivates Inner Strength</li>';
            benefitsHTML += '</ul>';

            cautionsHTML = '<p style="color: black; font-weight: bold;">Cautionary Points to keep in mind:</p>'
            cautionsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-right: 20px;">';
            cautionsHTML += '<li><span style="color: black;">Engage Your Core:</span> Draw the navel in towards the spine to engage the core muscles, providing support for the lower back and pelvis.</li>';
            cautionsHTML += '<li><span style="color: black;">Lengthen Through the Arms:</span> Extend the arms overhead, keeping them active and strong, with the palms facing each other or pressed together.</li>';
            cautionsHTML += '<li><span style="color: black;">Ground Down Through the Feet:</span> Press firmly into the back foot to ground down and create a stable foundation. Keep the back heel rooted to the mat or slightly lifted for balance.</li>';
            cautionsHTML += '</ul>';

            break;  
        case "Goddess Pose":
            console.log("Goddess pose")
            benefitsHTML = '<p style="color: black; font-weight: bold;">The Physical Benefits of Goddess Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Opens the Hips and Groin</li>';
            benefitsHTML += '<li>Strengthens the Legs and Core Muscles</li>';
            benefitsHTML += '<li>Improves Posture and Balance</li>';
            benefitsHTML += '</ul>';

            benefitsHTML += '<p style="color: black; font-weight: bold;">The Mental & Spiritual Benefits of Goddess Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Increases Confidence and Self-Empowerment</li>';
            benefitsHTML += '<li>Promotes Relaxation and Stress Relief</li>';
            benefitsHTML += '<li>Encourages Connection with Feminine Energy</li>';
            benefitsHTML += '</ul>';

            cautionsHTML = '<p style="color: black; font-weight: bold;">Cautionary Points to keep in mind:</p>'
            cautionsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-right: 20px;">';
            cautionsHTML += '<li><span style="color: black;">Knees Aligned:</span> Knees Aligned: Ensure that your knees are aligned with your ankles, forming a 90-degree angle, to prevent strain on the knees and maintain stability.</li>';
            cautionsHTML += '<li><span style="color: black;">Open Your Chest:</span> Lift and open the chest by drawing the shoulder blades together and down the back, promoting better posture and expanding the chest cavity for deeper breaths.</li>';
            cautionsHTML += '<li><span style="color: black;">Keep Your Torso Upright:</span> Maintain an upright posture with the torso, avoiding leaning forward or backward, to fully engage the core and strengthen the spine.</li>';
            cautionsHTML += '</ul>';

            break;
        case "Mountain Pose":
            console.log("Mountain pose")
            benefitsHTML = '<p style="color: black; font-weight: bold;">The Physical Benefits of Mountain Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Improves Posture and Alignment </li>';
            benefitsHTML += '<li>Strengthens the Legs, Ankles, and Feet</li>';
            benefitsHTML += '<li>Enhances Stability and Balance</li>';
            benefitsHTML += '</ul>';

            benefitsHTML += '<p style="color: black; font-weight: bold;">The Mental & Spiritual Benefits of Mountain Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Promotes Mental Clarity and Focus</li>';
            benefitsHTML += '<li>Cultivates Inner Strength and Confidence</li>';
            benefitsHTML += '<li>Instills a Sense of Grounding and Stability</li>';
            benefitsHTML += '</ul>';

            cautionsHTML = '<p style="color: black; font-weight: bold;">Cautionary Points to keep in mind:</p>'
            cautionsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-right: 20px;">';
            cautionsHTML += '<li><span style="color: black;">Alignment:</span> Stand tall with your feet hip-width apart, ensuring that your weight is evenly distributed across both feet.</li>';
            cautionsHTML += '<li><span style="color: black;">Engage Muscles:</span> Engage your thigh muscles by lifting your kneecaps and firming your quadriceps, while gently tucking the tailbone to lengthen the spine.</li>';
            cautionsHTML += '<li><span style="color: black;">Shoulder Relaxation:</span> Roll your shoulders back and down, allowing your arms to hang naturally by your sides with palms facing forward.</li>';
            cautionsHTML += '</ul>';

            break;
        case "Warrior 2 Pose":
            console.log("Warrior 2 pose")
            benefitsHTML = '<p style="color: black; font-weight: bold;">The Physical Benefits of Warrior 2 Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Increases Strength and Endurance in the Legs and Core</li>';
            benefitsHTML += '<li>Opens the Hips and Chest, Improving Flexibility</li>';
            benefitsHTML += '<li>Improves Balance and Stability</li>';
            benefitsHTML += '</ul>';

            benefitsHTML += '<p style="color: black; font-weight: bold;">The Mental & Spiritual Benefits of Warrior 2 Pose:</p>';
            benefitsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-left: 20px;">';
            benefitsHTML += '<li>Cultivates Concentration and Focus</li>';
            benefitsHTML += '<li>Builds confidence and Inner Strength</li>';
            benefitsHTML += '<li>Promotes a Sense of Determination and Resilience</li>';
            benefitsHTML += '</ul>';

            cautionsHTML = '<p style="color: black; font-weight: bold;">Cautionary Points to keep in mind:</p>'
            cautionsHTML += '<ul style="list-style-type: disc; color: #0078d4; margin-right: 20px;">';
            cautionsHTML += '<li><span style="color: black;">Stance:</span> Begin in a standing position, then step your feet about 3 to 4 feet apart, with the front foot pointing forward and the back foot angled slightly inward.</li>';
            cautionsHTML += '<li><span style="color: black;">Torso and Arms:</span> Extend your arms parallel to the floor, with the palms facing down. Keep your torso facing the side, aligning it with your arms.</li>';
            cautionsHTML += '<li><span style="color: black;">Gaze:</span> Soften your gaze over your front hand, maintaining focus and concentration. Keep your spine long and strong, engaging your core muscles for stability.</li>';
            cautionsHTML += '</ul>';

            break;                     
        default:
            benefitsHTML = ""
            cautionsHTML = ""
            break;
    }

    document.getElementById("cautions-panel").innerHTML = cautionsHTML;
    show(document.getElementById("cautions-panel"));
    document.getElementById("benefits-panel").innerHTML = benefitsHTML;
    show(document.getElementById("benefits-panel"));

    show(predResult)

    window.scrollBy(0, 300);

}

function clearImage() {
    // reset selected files
    fileSelect.value = "";

    // remove image sources and hide them
    imagePreview.src = "";
    imageDisplay.src = "";
    predResult.innerHTML = "";

    hide(imagePreview);
    hide(imageDisplay);
    hide(loader);
    hide(predResult);
    show(uploadCaption);

    document.getElementById("cautions-panel").innerHTML = "";
    hide(document.getElementById("cautions-panel"));

    document.getElementById("benefits-panel").innerHTML = "";
    hide(document.getElementById("benefits-panel"));

    imageDisplay.classList.remove("loading");
}

function previewFile(file) {
    // show the preview of the image
    var fileName = encodeURI(file.name);

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        imagePreview.src = URL.createObjectURL(file);

        // show(imagePreview);
        hide(uploadCaption);

        // reset
        predResult.innerHTML = "";
        imageDisplay.classList.remove("loading");

        displayImage(reader.result, "image-display");
    };
}

// Helper functions

function displayImage(image, id) {
    // display image on given id <img> element
    let display = document.getElementById(id);
    display.src = image;
    show(display);
}

function hide(el) {
    // hide an element
    el.classList.add("hidden");
}

function show(el) {
    // show an element
    el.classList.remove("hidden");
}

async function initialize() {
    if (yoga_set === "1") {
        labels = set1_labels
        yoga_model_path = yoga_set1_model_path
    } else if (yoga_set === "2") {
        labels = set2_labels
        yoga_model_path = yoga_set2_model_path
    }
    model = await tf.loadLayersModel(yoga_model_path);

    if (model)
        console.log("Model Loaded " + yoga_set + "...")

}


function loadmodel() {
    yoga_set = sessionStorage.getItem("yogaSet");
    initialize(yoga_set)
}