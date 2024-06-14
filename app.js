document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    const calculatorContainer = document.createElement('div');
    calculatorContainer.className = 'calculator-container';

    const title = document.createElement('h1');
    title.textContent = 'Car Leasing Calculator';
    calculatorContainer.appendChild(title);

    const form = document.createElement('div');
    form.className = 'calculator-form';
    calculatorContainer.appendChild(form);

    // Car Type and Lease Period elements
    const carTypeContainer = document.createElement('div');
    carTypeContainer.className = 'carTypeContainer';
    const leasePeriodContainer = document.createElement('div');
    leasePeriodContainer.className = 'leasePeriodContainer';
    form.appendChild(carTypeContainer);
    form.appendChild(leasePeriodContainer);

    createCarTypeInput(carTypeContainer);
    createLeasePeriodInput(leasePeriodContainer);

    // Car Value and Down Payment elements
    const carValueContainer = document.createElement('div');
    carValueContainer.className = 'carValueContainer';
    const downPaymentContainer = document.createElement('div');
    downPaymentContainer.className = 'downPaymentContainer';
    form.appendChild(carValueContainer);
    form.appendChild(downPaymentContainer);

    createCarValueInput(carValueContainer);
    createDownPaymentInput(downPaymentContainer);

    const leasingDetailsTitle = document.createElement('h2');
    leasingDetailsTitle.textContent = 'Leasing Details';
    calculatorContainer.appendChild(leasingDetailsTitle);

    const leasingDetails = document.createElement('div');
    leasingDetails.className = 'leasing-details';
    calculatorContainer.appendChild(leasingDetails);

    const leftColumn = document.createElement('div');
    leftColumn.className = 'left-column';
    leasingDetails.appendChild(leftColumn);

    const totalCostP = document.createElement('p');
    totalCostP.innerHTML = 'Total Leasing Cost: €<span id="total-cost">0.00</span>';
    leftColumn.appendChild(totalCostP);

    const downPaymentAmountP = document.createElement('p');
    downPaymentAmountP.innerHTML = 'Down Payment: €<span id="down-payment-amount">0.00</span> (<span id="down-payment-percent">0</span>%)';
    leftColumn.appendChild(downPaymentAmountP);

    const rightColumn = document.createElement('div');
    rightColumn.className = 'right-column';
    leasingDetails.appendChild(rightColumn);

    const monthlyInstallmentP = document.createElement('p');
    monthlyInstallmentP.innerHTML = 'Monthly Installment: €<span id="monthly-installment">0.00</span>';
    rightColumn.appendChild(monthlyInstallmentP);

    const interestRateP = document.createElement('p');
    interestRateP.innerHTML = 'Interest Rate: <span id="interest-rate">0.00</span>%';
    rightColumn.appendChild(interestRateP);

    root.appendChild(calculatorContainer);

    // Function to update all values 
    function updateValues() {
        const carValueNum = parseFloat(document.getElementById('car-value').value);
        const downPaymentPercentNum = parseFloat(document.getElementById('down-payment').value);
        const downPaymentAmountNum = carValueNum * (downPaymentPercentNum / 100);
        const leasePeriodNum = parseFloat(document.getElementById('lease-period').value);
        const interestRateNum = document.getElementById('car-type').value === 'new' ? 2.99 : 3.7;

        const principal = carValueNum - downPaymentAmountNum;
        const monthlyInterestRate = (interestRateNum / 100) / 12;
        const monthlyInstallmentNum = (principal * monthlyInterestRate) / (1 - Math.pow((1 + monthlyInterestRate), -leasePeriodNum));

        document.getElementById('total-cost').textContent = (monthlyInstallmentNum * leasePeriodNum).toFixed(2);
        document.getElementById('down-payment-amount').textContent = downPaymentAmountNum.toFixed(2);
        document.getElementById('down-payment-percent').textContent = downPaymentPercentNum;
        document.getElementById('monthly-installment').textContent = monthlyInstallmentNum.toFixed(2);
        document.getElementById('interest-rate').textContent = interestRateNum.toFixed(2);
    }

    // Function to create car type input
    function createCarTypeInput(container) {
        const carTypeLabel = document.createElement('label');
        carTypeLabel.setAttribute('for', 'car-type');
        carTypeLabel.textContent = 'Car Type:';
        container.appendChild(carTypeLabel);

        const carTypeSelect = document.createElement('select');
        carTypeSelect.id = 'car-type';
        carTypeSelect.innerHTML = `
            <option value="new">Brand New</option>
            <option value="used">Used</option>
        `;
        container.appendChild(carTypeSelect);

        carTypeSelect.addEventListener('change', updateValues);
    }

    // Function to create car value input
    function createCarValueInput(container) {
        const carValueLabel = document.createElement('label');
        carValueLabel.setAttribute('for', 'car-value');
        carValueLabel.textContent = 'Car Value (€10,000 - €200,000):';
        container.appendChild(carValueLabel);

        const carValueInput = document.createElement('input');
        carValueInput.type = 'number';
        carValueInput.id = 'car-value';
        carValueInput.min = 10000;
        carValueInput.max = 200000;
        carValueInput.step = 1000;
        carValueInput.value = 120000;
        container.appendChild(carValueInput);

        const carValueRange = document.createElement('input');
        carValueRange.type = 'range';
        carValueRange.id = 'car-value-range';
        carValueRange.min = 10000;
        carValueRange.max = 200000;
        carValueRange.step = 1000;
        carValueRange.value = 120000;
        container.appendChild(carValueRange);

        carValueInput.addEventListener('input', () => {
            carValueRange.value = carValueInput.value;
            updateValues();
        });

        carValueRange.addEventListener('input', () => {
            carValueInput.value = carValueRange.value;
            updateValues();
        });
    }

    // Function to create lease period input
    function createLeasePeriodInput(container) {
        const leasePeriodLabel = document.createElement('label');
        leasePeriodLabel.setAttribute('for', 'lease-period');
        leasePeriodLabel.textContent = 'Lease Period (months):';
        container.appendChild(leasePeriodLabel);

        const leasePeriodInput = document.createElement('input');
        leasePeriodInput.type = 'number';
        leasePeriodInput.id = 'lease-period';
        leasePeriodInput.min = 12;
        leasePeriodInput.max = 60;
        leasePeriodInput.step = 12;
        leasePeriodInput.value = 60;
        container.appendChild(leasePeriodInput);

        leasePeriodInput.addEventListener('input', () => {
            leasePeriodRange.value = leasePeriodInput.value;
            updateValues();
        });
    }

    // Function to create down payment input
    function createDownPaymentInput(container) {
        const downPaymentLabel = document.createElement('label');
        downPaymentLabel.setAttribute('for', 'down-payment');
        downPaymentLabel.textContent = 'Down Payment (10% - 50%):';
        container.appendChild(downPaymentLabel);

        const downPaymentInput = document.createElement('input');
        downPaymentInput.type = 'number';
        downPaymentInput.id = 'down-payment';
        downPaymentInput.min = 10;
        downPaymentInput.max = 50;
        downPaymentInput.step = 5;
        downPaymentInput.value = 10;
        container.appendChild(downPaymentInput);

        const downPaymentRange = document.createElement('input');
        downPaymentRange.type = 'range';
        downPaymentRange.id = 'down-payment-range';
        downPaymentRange.min = 10;
        downPaymentRange.max = 50;
        downPaymentRange.step = 5;
        downPaymentRange.value = 10;
        container.appendChild(downPaymentRange);

        downPaymentInput.addEventListener('input', () => {
            downPaymentRange.value = downPaymentInput.value;
            updateValues();
        });

        downPaymentRange.addEventListener('input', () => {
            downPaymentInput.value = downPaymentRange.value;
            updateValues();
        });
    }

    // Initialize the values on page load
    updateValues(); 
});
