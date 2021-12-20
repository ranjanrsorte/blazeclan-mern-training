function DateTime() {
    function calculateDifference(selectedFromDate, selectedToDate) {

        let diff = Math.abs(selectedToDate - selectedFromDate);

        // generate Seconds, Hours, Days from the milliseconds
        // 1000*60*60*24
        // (1000*60) Seconds, (1000*60*60) Minutes, (1000*60*60*24) Hours

        // Use the Math.ceil() to round to the nearest up integer

        /*
            - If Months Difference is greater than and equal to 12, the add 1 in year
            - If Days Difference is greater than 30/31 (based on month) add 1 to Month
            - If the year is Leap Year then for February, 29 days Must be used else use 28 days
            - If Hours difference is greater than or equal than 24, then add 1 in days
            - If Minutes difference is greater than or equal 60, then add 1 in hours
            - If Seconds difference is greater than or equal 60, then add 1 in minutes

            - x Years x Months x Days x Hours x Minutes x Seconds 
        */

        let dayDifferences = Math.floor(diff / (1000 * 60 * 60 * 24));
        calculateYears = Math.floor(dayDifferences / 365);

        let selectedFromDateMonth = selectedFromDate.getMonth() + 1;
        let calculatedMonths = 0;
        let calculatedDays = dayDifferences;

        if (dayDifferences >= 30 && (selectedFromDateMonth === 4 || selectedFromDateMonth === 6 || selectedFromDateMonth === 9 || selectedFromDateMonth === 11)) {
            calculatedMonths = Math.floor(dayDifferences / 30);
            if (calculateYears > 0) {
                calculatedMonths = Math.ceil(calculatedMonths % 12);
            }

            if (calculateYears === 0)
                calculatedDays = Math.floor(dayDifferences - (30 * calculatedMonths));
            else
                calculatedDays = Math.floor((dayDifferences - 365) - (30 * calculatedMonths));
        }

        if (dayDifferences >= 31 && (selectedFromDateMonth === 1 || selectedFromDateMonth === 3 || selectedFromDateMonth === 5 || selectedFromDateMonth === 7 ||
            selectedFromDateMonth === 8 || selectedFromDateMonth === 10 || selectedFromDateMonth === 12)) {
            calculatedMonths = Math.floor(dayDifferences / 31);
            if (calculateYears > 0) {
                calculatedMonths = Math.ceil(calculatedMonths % 12);
            }

            if (calculateYears === 0)
                calculatedDays = Math.floor(dayDifferences - (30 * calculatedMonths));
            else
                calculatedDays = Math.floor((dayDifferences - 365) - (30 * calculatedMonths));
        }

        if ((selectedFromDate.getYear() % 4 === 0) && (selectedFromDate.getYear() % 100 !== 0) || (selectedFromDate.getYear() % 400 == 0)) {
            if (dayDifferences === 29 && selectedFromDateMonth === 2) {
                calculatedMonths = Math.floor(dayDifferences / 30) + 1;
                if (calculateYears === 0)
                    calculatedDays = Math.floor(dayDifferences - (30 * calculatedMonths)) + 1;
                else
                    calculatedDays = Math.floor((dayDifferences - 365) - (30 * calculatedMonths)) + 2;
            } else {
                calculatedMonths = Math.floor(dayDifferences / 30);
                if (calculateYears > 0) {
                    calculatedMonths = Math.ceil(calculatedMonths % 12);
                }

                if (calculateYears === 0)
                    calculatedDays = Math.floor(dayDifferences - (30 * calculatedMonths)) + 1;
                else {
                    calculatedDays = dayDifferences - 365;
                    console.log(dayDifferences);
                    /*console.log(`dayDifferences ${dayDifferences}`);
                    calculatedDays = Math.floor((dayDifferences - 366) - 29);
                    calculatedDays = calculatedDays < 0 ? 0 : calculatedDays;
                    console.log(`calculatedDays ${calculatedDays}`);*/
                }
            }

        } else {
            if (dayDifferences === 28 && selectedFromDateMonth === 2) {
                calculatedMonths = Math.floor(dayDifferences / 30) + 1;

                if (calculateYears === 0)
                    calculatedDays = Math.floor(dayDifferences - (30 * calculatedMonths)) + 2;
                else
                    calculatedDays = Math.floor((dayDifferences - 365) - (30 * calculatedMonths)) + 2;
            } /*else {
                calculatedMonths = Math.floor(dayDifferences / 30);
                if (calculateYears > 0) {
                    calculatedMonths = Math.ceil(calculatedMonths % 12);
                }

                if (calculateYears === 0)
                    calculatedDays = Math.floor(dayDifferences - (30 * calculatedMonths)) + 1;
                else
                    calculatedDays = Math.floor((dayDifferences - 365) - (30 * calculatedMonths)) + 2;
            }*/
        }

        let hourDifference = (Math.ceil(diff / (1000 * 60 * 60)));
        let calculatedHours = (hourDifference % 24) - 1 < 0 ? 0 : (hourDifference % 24) - 1;

        let minuteDifference = Math.ceil(diff / (1000 * 60));
        let calculatedMinutes = minuteDifference % 60;

        let secondsDifference = Math.ceil(diff / 1000);
        let calculateSeconds = 0;

        if (secondsDifference >= 60) {
            calculateSeconds = secondsDifference % 60;
        } else {
            calculateSeconds = secondsDifference;
        }

        let htmlDiv = '<div class="container">';
        htmlDiv += '<p>' + 'Difference is ' + calculateYears + ' years ' + calculatedMonths + ' months ' + calculatedDays + ' days '
            + calculatedHours + ' hours ' + calculatedMinutes + ' minutes ' + calculateSeconds + ' seconds '
            + '</p>';
        htmlDiv += '</div>';
        return htmlDiv;
    }

    return {
        getDifference: calculateDifference
    }
}