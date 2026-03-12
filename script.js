const token = "Provide toden";
const inputTxt = document.getElementById("inputText");
const image = document.getElementById("generatedImage");
const button = document.getElementById("btn");

async function query() {
    console.log("Generating image...");

    try {
        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ "inputs": inputTxt.value }),
            }
        );

        if (!response.ok) {
            console.error("Error fetching image:", response.status, response.statusText);
            return null;
        }

        const result = await response.blob();
        return result;
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

button.addEventListener('click', async function() {
    const imageBlob = await query();

    if (imageBlob) {
        const objectURL = URL.createObjectURL(imageBlob);
        image.src = objectURL;
        image.style.display = "block"; // Show the generated image
        console.log("Image generated successfully!");
    } else {
        console.error("Failed to generate image");
    }
});
