"use strict";

const logger = require("../utils/logger");

const analytics = {
  calculateBMI(weight,height) {
    if (height <= 0)
      return 0;
    else
      return Math.round(weight*100 / (height * height))/100;
  }, 
  
  isIdealBodyWeight(weight, height, gender) {
    var isIdeal = "red";
    var idealWeightMale = 0;
    var idealWeightFemale = 0;
    const height2 = height*39.37;
    if (height2 > 60) {
            idealWeightMale = 50.0 + (2.3 * (height2-60));
            idealWeightFemale = 45.5 +( 2.3 * (height2-60));
        } else {
            idealWeightMale = 50.0;
            idealWeightFemale = 45.5;
        }

    if (gender =="Male") {
        if (weight < idealWeightMale + 2 && weight > idealWeightMale - 2) {
            isIdeal = "green";
        } 
      else{
        isIdeal = "red";
      }

    }
    else if (gender =="Female") {
      if (weight < idealWeightFemale +2 && weight > idealWeightFemale - 2 ) {
          isIdeal = "green";
      } else  {
          isIdeal = "red";
      }
    }
   
    else{
      if (weight < idealWeightFemale + 2 &&  weight > idealWeightFemale - 2) {
          isIdeal = "green";
      } 
      else{
        isIdeal = "red";
      }
    }
    logger.info("IDEAL WEIGHT: "+idealWeightFemale);
        return isIdeal;
    },
  
  
   determineBMICategory(bmiValue) {

        if (bmiValue < 16) {
            return "SEVERELY UNDERWEIGHT";
        } else if (bmiValue >= 16 && bmiValue < 18.5) {
            return "UNDERWEIGHT";
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
            return "NORMAL";
        } else if (bmiValue >= 25 && bmiValue < 30) {
            return "OVERWEIGHT";
        } else if (bmiValue >= 30 && bmiValue < 35) {
            return "MODERATELY OBESE";
        } else if (bmiValue >= 35)  {

            return "SEVERELY OBESE";
        }

        return "";
    }
    
  
};
module.exports = analytics;