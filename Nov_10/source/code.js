function code () {
    let productsList = [
        {productId:1, productName:'Computers', categoryName:'Shopping', price:'60000', manufacturer:'Lenovo'},
        {productId:2, productName:'Mobile phones', categoryName:'Shopping', price:'20000', manufacturer:'Lenovo'},
        {productId:3, productName:'PlayStation', categoryName:'Shopping', price:'25000', manufacturer:'Sony'},
        {productId:4, productName:'Cameras', categoryName:'Shopping', price:'45000', manufacturer:'Sony'},
        {productId:5, productName:'furniture', categoryName:'Shopping', price:'35000', manufacturer:'Sony'},
        {productId:6, productName:'Clothing', categoryName:'Shopping', price:'2000', manufacturer:'Xtrade'},
        {productId:7, productName:'Luggage', categoryName:'Shopping', price:'7000', manufacturer:'Xtrade'},
        {productId:8, productName:'paint', categoryName:'Shopping', price:'1500', manufacturer:'Xtrade'},
        {productId:9, productName:'Swift', categoryName:'Specialty', price:'100000', manufacturer:'Maruti'},
        {productId:10, productName:'Home Loans', categoryName:'Specialty', price:'5000', manufacturer:'LIC'},
        {productId:11, productName:'Tiago', categoryName:'Specialty', price:'300000', manufacturer:'TATA'},
        {productId:12, productName:'Baleno', categoryName:'Specialty', price:'200000', manufacturer:'Maruti'},
        {productId:13, productName:'Vegetables', categoryName:'Food', price:'500', manufacturer:'Farmer'},
        {productId:14, productName:'A', categoryName:'D1', price:'23000', manufacturer:'M1'},
        {productId:15, productName:'B', categoryName:'D1', price:'87000', manufacturer:'M1'},
        {productId:16, productName:'C', categoryName:'D1', price:'23000', manufacturer:'M1'},
        {productId:17, productName:'D', categoryName:'D1', price:'12000', manufacturer:'M1'},
        {productId:18, productName:'Milk', categoryName:'Food', price:'34000', manufacturer:'Amul'},
        {productId:19, productName:'E', categoryName:'D1', price:'45000', manufacturer:'M1'},
        {productId:20, productName:'F', categoryName:'D1', price:'56000', manufacturer:'M1'},
        {productId:21, productName:'G', categoryName:'D1', price:'67000', manufacturer:'M1'},
        {productId:22, productName:'Bread', categoryName:'Food', price:'78000', manufacturer:'Amul'},
        {productId:23, productName:'H', categoryName:'D1', price:'89000', manufacturer:'M1'},
        {productId:24, productName:'Lodgy', categoryName:'Specialty', price:'15000', manufacturer:'Renault'},
        {productId:25, productName:'I', categoryName:'D1', price:'90000', manufacturer:'M1'},
        {productId:26, productName:'Butter', categoryName:'Food', price:'98000', manufacturer:'Amul'},
        {productId:27, productName:'J', categoryName:'D1', price:'87000', manufacturer:'M1'},
        {productId:28, productName:'Specs', categoryName:'Shopping', price:'76000', manufacturer:'Apple'},
        {productId:29, productName:'K', categoryName:'D1', price:'65000', manufacturer:'M1'},
        {productId:30, productName:'L', categoryName:'D1', price:'54000', manufacturer:'M1'},
        {productId:31, productName:'M', categoryName:'Specialty', price:'43000', manufacturer:'M1'},
        {productId:32, productName:'N', categoryName:'D1', price:'32000', manufacturer:'M1'},
        {productId:33, productName:'Iphone', categoryName:'Shopping', price:'21000', manufacturer:'Apple'},
        {productId:34, productName:'O', categoryName:'D1', price:'13000', manufacturer:'M1'},
        {productId:35, productName:'P', categoryName:'D1', price:'25000', manufacturer:'M1'},
        {productId:36, productName:'Q', categoryName:'D1', price:'35000', manufacturer:'M1'},
        {productId:37, productName:'R', categoryName:'Shopping', price:'46000', manufacturer:'M1'},
        {productId:38, productName:'S', categoryName:'D1', price:'57000', manufacturer:'M1'},
        {productId:39, productName:'T', categoryName:'D1', price:'68000', manufacturer:'M1'},
        {productId:40, productName:'U', categoryName:'D1', price:'80000', manufacturer:'M1'},
        {productId:41, productName:'V', categoryName:'Specialty', price:'97000', manufacturer:'M1'},
        {productId:42, productName:'W', categoryName:'D1', price:'64000', manufacturer:'M1'},
        {productId:43, productName:'X', categoryName:'D1', price:'53000', manufacturer:'M1'},
        {productId:44, productName:'Anti-Virus', categoryName:'Specialty', price:'1000', manufacturer:'NPAV'},
        {productId:45, productName:'Y', categoryName:'D1', price:'27000', manufacturer:'M1'},
        {productId:46, productName:'Z', categoryName:'Food', price:'39000', manufacturer:'M1'},
        {productId:47, productName:'AB', categoryName:'D1', price:'47000', manufacturer:'M1'},
        {productId:48, productName:'Car Loans', categoryName:'Specialty', price:'3000', manufacturer:'HDFC'},
        {productId:49, productName:'AC', categoryName:'D1', price:'41000', manufacturer:'M1'},
        {productId:50, productName:'Tools', categoryName:'Shopping', price:'4000', manufacturer:'Amazon'},
    ];

    function generateTable(dataSource) {

        var columns = Object.keys(dataSource[0]);
        var table = '<table class="table table-bordered table-striped table-dark">';
        var thead = '<thead><tr>';

        for (var i in columns) {
            thead += '<th>' + columns[i] + '</th>';
        }
        thead += '</tr></thead>';
        table += thead;

        var tbody = "<tbody>";
        for (var r = 0; r < dataSource.length; r++) {

            tbody += '<tr  class="table-primary">';
            for (var h = 0; h < columns.length; h++) {
                tbody += '<td>' + dataSource[r][columns[h]] + '</td>';
            }
            tbody += '</tr>';
        }
        tbody += '</tbody>';
        table += tbody;
        table += '</table>';

        return table;
    }

    this.getTableData = function () {
        var tbl = generateTable(productsList);
        return tbl;
    }
}