var UiGenerator = function() {
    this.generateRadioButtons = function(dataSource) {
        var option = '';
        for(var i in dataSource){
            option+= '<input type="radio" name="radioBtn"/>' + dataSource[i];
        }
        return option;
    };

    this.generateRadioBtns = function(dataSource) {
        var option = '<div>';
        option += "<h3>Companies</h3>";
        for(var i in dataSource){
            if(dataSource[i].deptType === "company") {
                option+= '<input type="radio" name="' + dataSource[i].deptType + '"/>' + dataSource[i].deptName;
            }
        }
        option += "<h3>Gender</h3>";
        for(var i in dataSource){
            if(dataSource[i].deptType === "gender") {
                option+= '<input type="radio" name="' + dataSource[i].deptType + '"/>' + dataSource[i].deptName;
            }
        }
        option += '</div>';
        return option;
    };

    this.generateCheckBoxes = function(dataSource) {
        var option = '';
        for(var i in dataSource){
            option+= '<input type="checkbox"/>' + dataSource[i];
        }
        return option;
    };
}