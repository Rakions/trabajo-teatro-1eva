const selectedSeats = localStorage.getItem("asientos");
const obraId = localStorage.getItem("id");

async function makePurchase(seatId) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const id_asiento = parseInt(seatId, 10);

    const raw = JSON.stringify({
        id_obra: obraId,
        id_asiento: id_asiento,
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
    };

    try {
        const response = await fetch("http://54.242.0.71/obras/compra", requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to make a purchase for seat ${id_asiento}.`);
        }
        const result = await response.text();
        return JSON.parse(result);
    } catch (error) {
        console.error(`Error in makePurchase for seat ${id_asiento}: ${error.message}`);
        throw error;
    }
}

async function buyTickets() {
    const seatNumbers = selectedSeats.split(",");
    const purchasePromises = seatNumbers.map((number) => makePurchase(number));

    try {
        const results = await Promise.all(purchasePromises);
        // Handle the results if needed
    } catch (error) {
        console.error("Error while making purchases:", error);
    }
}

document.querySelector(".purchase_buttons_purchase").addEventListener("click", () => {
    const userEmail = document.getElementById("email").value;
    localStorage.setItem("email", userEmail);
    buyTickets();
});
