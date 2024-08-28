

function estimateCarValue(originalPrice, age, mileage, condition) {
    // Depreciation rates
    const baseDepreciationRate = 0.15; // Base 15% for the first year
    const annualDepreciationRate = 0.10; // 10% per additional year
    const mileageAdjustmentRate = 0.01; // 1% per 10,000 miles over the average mileage



    // Condition adjustment rates
    const conditionRates = {
        "Excellent": 0.10, // +10%
        "Good": 0.05,      // +5%
        "Fair": 0.00,      // No adjustment
        "Poor": -0.10      // -10%
    };

    // Calculate depreciation for the first year
    let valueAfterFirstYear = originalPrice * (1 - baseDepreciationRate);
    
    // Calculate depreciation for the remaining years
    let valueAfterNYears = valueAfterFirstYear * Math.pow((1 - annualDepreciationRate), (age - 1));

    // Calculate average mileage
    const averageMileagePerYear = 12000; // Average mileage per year
    const expectedMileage = averageMileagePerYear * age;

    // Calculate mileage adjustment
    let mileageAdjustment = 0;
    if (mileage > expectedMileage) {
        mileageAdjustment = ((mileage - expectedMileage) / 10000) * mileageAdjustmentRate;
    }
    mileageAdjustment = Math.min(mileageAdjustment, 0.15); // Cap at 15% adjustment

    // Apply mileage adjustment
    let valueAdjustedForMileage = valueAfterNYears * (1 - mileageAdjustment);
    
    // Determine condition adjustment
    const conditionAdjustment = conditionRates[condition] || 0; // Default to 0 if condition is not found

    // Apply condition adjustment
    let finalValue = valueAdjustedForMileage * (1 + conditionAdjustment);

    return finalValue;
}

// Event listener for form submission
document.getElementById("car-deal-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve values from the form
    const originalPrice = parseFloat(document.getElementById("value_price").innerHTML.replace(/[^0-9.-]/g, '')); // Remove currency symbols
    const manufactureYear = parseInt(document.getElementById("value_year").innerHTML, 10);
    const currentYear = new Date().getFullYear();
    const age = currentYear - manufactureYear; // Calculate age of the car
    const mileage = parseFloat(document.getElementById("car-mileage").value);
    const condition = document.querySelector('input[name="car-condition"]:checked').value;

    // Call estimateCarValue function
    const estimatedValue = estimateCarValue(originalPrice, age, mileage, condition);

    // Display the result
    document.querySelector(".modal").classList.add('moda1');
    document.querySelector(".titl").innerHTML = "Estimate Price: $ " + estimatedValue.toFixed(2);
    document.querySelector(".modal").style.display = "block";


    Compare()

    function Compare(){
        let price = document.getElementById("car-price").value;
        let difference = price - estimatedValue;
        let percentage = (difference / estimatedValue) * 100;
        
        
        let background = document.querySelector("#div_image_v");
        let title = document.querySelector("#title1");
        let message = document.querySelector("#message");
        let icon = document.querySelector("#image img");
        
        if( percentage < -15){
            background.style.backgroundColor = "#2ECC71";
            message.innerHTML = "This is an exceptional deal! The price is significantly below the estimated value.";
            title.innerHTML = "Excellent Deal";
            icon.src = "/images/star.png";
        }
        else if(percentage >= -15 && percentage < -5){
            background.style.backgroundColor = "#4CAF50";
            message.innerHTML = "This is a great deal based on the car's age, mileage, and condition.";
            title.innerHTML = "Good Deal";
            icon.src = "/images/check.png";
        }
        else if(percentage >= -5 && percentage <= 5){
            background.style.backgroundColor = "#FFC107";
            message.innerHTML = "This price is reasonable but not exceptional. You may want to consider negotiating.";
            title.innerHTML = "Fair Deal";
            icon.src = "/images/handshake.png";
        }
        else if(percentage > 5 && percentage <= 15){
            background.style.backgroundColor = "#FF9800";
            message.innerHTML = "This price is above the estimated value. Be cautious and consider negotiating.";
            title.innerHTML = "Overpriced Deal";
            icon.src = "/images/warning.png";
        }
        else if(percentage > 15){
            background.style.backgroundColor = "#F44336";
            message.innerHTML = "This price is significantly above the estimated value. It may not be a good deal.";
            title.innerHTML = "Poor Deal";
            icon.src = "/images/close.png";
        }
        else{
            console.log("A car like this can't be this cheap");
        }
    }
});

document.getElementById("dismiss").addEventListener("click", ()=>{
    document.querySelector(".modal").style.display = "none";
})
