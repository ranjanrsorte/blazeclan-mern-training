function add(x) {
    var nums = x.split("+");
    var a = 0;
    var res = 0;
    for (var i = 0; i < nums.length; i++) {
        a += parseInt(nums[i]);
        res = a;
    }
    return res;
}

function sub(x) {
    var nums = x.split("-");
    var a = nums[0];
    var res = 0;
    for (var i = 1; i < nums.length; i++) {
        a -= parseInt(nums[i]);
        res = a;
    }
    return res;
}

function mult(x) {
    var nums = x.split("*");
    var a = nums[0];
    var res = 0;
    for (var i = 1; i < nums.length; i++) {
        if (nums[i] == 0) {
            return 0;
        } else {
            a *= parseInt(nums[i]);
            res = a;
        }
    }
    return res;
}

function divi(x) {
    var nums = x.split("/");
    var a = nums[0];
    var res = 0;
    for (var i = 1; i < nums.length; i++) {
        if (nums[i] == 0) {
            return "Select non zero value";
        } else {
            a /= parseInt(nums[i]);
            res = a;
        }
    }
    return res;
}

function divideByValue(x) {
    return 1 / x;
}