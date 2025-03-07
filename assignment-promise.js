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
const fetchAdviceByID = (id) => {
    fetch(`https://api.adviceslip.com/advice/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Response was not successful!");
            }
            return response.json();
        })
        .then((data) => {
            const advice = data.slip.advice;
            document.getElementById("resultMessage").innerText = `😢 You lose! Here's some advice: "${advice}"`;
        })
        .catch((error) => {
            console.error("Error fetching advice:", error);
            document.getElementById("resultMessage").innerText = "⚠️ Error fetching advice!";
        });
};

const fetchDadJoke = () => {
    fetch("https://icanhazdadjoke.com/", {
        headers: { "Accept": "application/json" }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Response was not successful!");
            }
            return response.json();
        })
        .then((data) => {
            const joke = data.joke;
            document.getElementById("resultMessage").innerText = `🎉 You Win! Here's a joke for you: "${joke}"`;
        })
        .catch((error) => {
            console.error("Error fetching joke:", error);
            document.getElementById("resultMessage").innerText = "⚠️ Error fetching joke!";
        });
};


function startFlip() {
    document.getElementById("resultMessage").innerText = "Flipping the coin...";

    flipCoin(fetchDadJoke, fetchAdviceByID)
        .then((message) => {
            document.getElementById("resultMessage").innerText = message;
        })
        .catch((error) => {
            console.log("Error:", error);
        });
}
