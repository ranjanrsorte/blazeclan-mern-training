import { useState } from 'react';

const DataGridComponent = (props) => {

    //const [employeesData, setEmployeesData] = useState({});

    const rowClick = (row) => {
        props.getSelectedRow(row);
        console.log(`Selected Row ${JSON.stringify(row)}`);
    }

    const deleteRecord = (row) => {
        props.deleteSelectedRecord(row);
    }

    if (props.dataSource === undefined || props.dataSource.length === 0) {
        return (
            <div className="container">
                <strong>
                    No records to display
                </strong>
            </div>
        );
    } else {
        let data;
        const columns = Object.keys(props.dataSource[0]);
        if (props.canSort && props.sortKey === 'empname') {
            data = props.dataSource;

            data = data.sort(function (a, b) {
                if (a.empname < b.empname) { return -1; }
                if (a.empname > b.empname) { return 1; }
                return 0;
            });

        } else {
            data = props.dataSource;

            data = data.sort(function (a, b) {
                if (a.empname > b.empname) { return -1; }
                if (a.empname < b.empname) { return 1; }
                return 0;
            });
        }
        let idxForPageCount = [];
        let startIndex = 0;
        let lastIndex = 5;
        if (props.canGroup && props.groupKey === 'deptname') {
            let deptNameSource = props.deptDataSource;
            let result = data.reduce((groupResult, dat) => {
                let key = dat[props.groupKey];
                if (!groupResult[key]) {
                    groupResult[key] = [];
                }
                groupResult[key].push(dat);
                return groupResult;
            }, {});

            if (result !== "") {
                let groupedData = [];
                let resultGroupedData = [];
                let resultValues = Object.values(result);
                for (let i = 0; i < resultValues.length; i++) {
                    groupedData.push(resultValues[i]);
                    //console.log(groupedData);
                }
                for (let j = 0; j < groupedData.length; j++) {
                    let insideGroupedData = groupedData[j];
                    for (let k = 0; k < insideGroupedData.length; k++) {
                        resultGroupedData.push(insideGroupedData[k]);
                    }
                }
                data = resultGroupedData;
            }
        }

        let pages = [];
        let page = Math.ceil(data.length / 5);
        for (let i = 0; i < page; i++) {
            if (page !== 0) {
                pages.push(i + 1);
            }
        }
        let employeesData = data;
        debugger;

        const getPaginatedRecords = (row) => {
            console.log(`row :: ${row}`);
            if (parseInt(row) === 1) {
                startIndex = 0;
                lastIndex = 5;
                employeesData = data;
                employeesData = employeesData.splice(startIndex, lastIndex);
            } else {
                lastIndex = 5 * 2;
                startIndex = lastIndex - props.pageSize;
                employeesData = data;
                debugger;
                employeesData = employeesData.splice(startIndex, lastIndex);
            }
        }

        return (
            <div>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            {
                                columns.map((c, i) => (
                                    <th key={i}>
                                        {c}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employeesData.map((row, rIndex) => (
                                <tr key={rIndex} >
                                    {
                                        columns.map((col, cIndex) => (
                                            <td onClick={() => rowClick(row)} key={cIndex}>
                                                {row[col]}
                                            </td>
                                        ))
                                    }
                                    {
                                        <td canDelete={true}>
                                            <input className="btn btn-sm btn-danger" type="button" value="Delete"
                                                onClick={() => deleteRecord(row)} />
                                        </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <ul className="pagination">
                        {
                            pages.map((row, pIndex) => (
                                <li className="page-item" key={pIndex}
                                    onClick={() => getPaginatedRecords(row)}
                                > <a className="page-link">{row}</a></li>
                            ))
                        }
                    </ul>
                </div>
            </div>);
    }


};

export default DataGridComponent;