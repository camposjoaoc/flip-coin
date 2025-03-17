const flipCoin = (callbackAPI1, callbackAPI2) => {
    return new Promise((resolve, reject) => {
        let result = Math.random();
        console.log(`Flip result: ${result}`);

        if (result > 0.5) {
            let randomId_1 = Math.floor(Math.random() * 100) + 1;
            callbackAPI1(randomId_1);
            resolve("🎉 You win!");
        } else {
            let randomId_2 = Math.floor(Math.random() * 100) + 1;
            callbackAPI2(randomId_2);
            reject("😢 You lose!");
        }
    });
};

// Fetch advice when losing
const fetchAdviceByID = async (id) => {
    try {
        const response = await fetch(`https://api.adviceslip.com/advice/${id}`, {
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Response was not successful!");
        }
        const data = await response.json();
        const advice = data.slip.advice;
        document.getElementById("resultMessage").innerText = `😢 You lose! Here's some advice: "${advice}"`;

    } catch (error) {
        console.error("Error fetching advice:", error);
        document.getElementById("resultMessage").innerText = "⚠️ Error fetching advice!";
    }
};

// Fetch a joke when winning
const fetchDadJoke = async () => {
    try {
        const response = await fetch("https://icanhazdadjoke.com/", {
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Response was not successful!");
        }
        const data = await response.json();
        const joke = data.joke;
        document.getElementById("resultMessage").innerText = `🎉 You Win! Here's a joke for you: "${joke}"`;

    } catch (error) {
        console.error("Error fetching joke:", error);
        document.getElementById("resultMessage").innerText = "⚠️ Error fetching joke!";
    }
};

async function startFlip() {
    const coin = document.getElementById("coin");
    const messageElement = document.getElementById("resultMessage");
    messageElement.innerText = "Flipping the coin...";
    coin.classList.add("flipping");

    flipCoin(fetchDadJoke, fetchAdviceByID)
        .then((message) => {
            messageElement.innerText = message;
        })
        .catch((error) => {
            messageElement.innerText = error;
        });
    setTimeout(() => {
        coin.classList.remove("flipping");
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("flipButton").addEventListener("click", startFlip);
});