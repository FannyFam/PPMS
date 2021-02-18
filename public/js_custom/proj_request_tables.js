//Javascript functions to manipulate the tables in Project Request page
// - Costs Forecast
// - Funding Entities
// - Resources
// - Project Stakeholders

const { truncate } = require("lodash");



function addRow(tableId) {
  let table = document.getElementById(tableId);

  if (tableId == 'projStakeholders') {
    let currTableRowCount = table.rows.length;
    let row = table.insertRow(currTableRowCount);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = "<input type='text' class='form-control font-weight-light' name='actorName' id='actorName'>";
    cell2.innerHTML = "<input type='text' class='form-control font-weight-light' name='actorRole' id='actorRole'>";
    cell3.innerHTML = "<input type='email' class='form-control font-weight-light' name='actorEmail' id='actorEmail'>";
    cell4.innerHTML = "<div class='btn-group'>" +
      "<a class='btn btn-success' href='#proj_sh' onclick='addRow(\"projStakeholders\")'><i class='icon_plus_alt2'></i></a>" +
      "<a class='btn btn-danger' href='#proj_sh' onclick='deleteRow(this, \"projStakeholders\")'><i class='icon_close_alt2'></i></a></div>";
  } else if (tableId == 'projFundEntities') {
    let currTableRowCount = table.rows.length;
    let row = table.insertRow(currTableRowCount);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);


    cell1.innerHTML = "<select class='form-control' id='feFundSrc' name='feFundSrc'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='Entity/Institution Funded'>Entity/Institution Funded</option>" +
      "<option value='Funded'>Funded</option>" +
      "<option value='Seeking Fund'>Seeking Fund</option>" +
      "</select>";

    cell2.innerHTML = "<select class='form-control' id='feFundScope' name='feFundScope'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='Entity/Institution Specific'>Entity/Institution Funded</option>" +
      "<option value='Country'>Funded</option>" +
      "<option value='Region/Cluster'>Seeking Fund</option>" +
      "<option value='Global'>Global</option>" +
      "</select>";

    // added - 14 Feb
    cell3.innerHTML = "<select class='form-control' id='feEntity' name='feEntity'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='FE-0001 SGH' >FE-0001 SGH</option > " +
      "<option value='FE-0002 CGH' >FE-0002 CGH</option > " +
      "<option value='FE-0003 KKH' >FE-0003 KKH</option > " +
      "<option value='FE-0004 SKH' >FE-0004 SKH</option > " +
      "<option value='FE-0005 NHC' >FE-0005 NHC</option > " +
      "<option value='FE-0006 SNEC' >FE-0006 SNEC</option > " +
      "<option value='FE-0007 NCC'>FE-0007 NCC</option > " +
      "<option value='FE-0008 NDC' >FE-0008 NDC</option > " +
      "<option value='FE-0009 Polyclinic' >FE-0009 Polyclinic</option > " +
      "<option value='FE-0010 Others' >FE-0010 Others</option > " +
      "</select>";

    cell4.innerHTML = "<select class='form-control' id='feBizOrgGrp' name='feBizOrgGrp'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='Commercial'>Commercial</option>" +
      "<option value='Manufacturing'>Manufacturing</option>" +
      "<option value='R & D'>R & D</option>" +
      "<option value='Global Supply Chain'>Global Supply Chain</option>" +
      "<option value='Technology Services'>Technology Services</option>" +
      "</select>";

    cell5.innerHTML = "<select class='form-control' id='feBudgetYr' name='feBudgetYr'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='FY20'>FY20</option>" +
      "<option value='FY21'>FY21</option>" +
      "<option value='FY22'>FY22</option>" +
      "<option value='FY23'>FY23</option>" +
      "</select>";

    cell6.innerHTML = "<input type='text' class='form-control font-weight-light text-right' name='feBudgetAmt' id='feBudgetAmt' placeholder='0' onblur='updateBudgetAmtTotals()'>";

    cell7.innerHTML = "<div class='btn-group'>" +
      "<a class='btn btn-success' href='#proj_fe' onclick='addRow(\"projFundEntities\")'><i class='icon_plus_alt2'></i></a>" +
      "<a class='btn btn-danger' href='#proj_fe' onclick='deleteRow(this, \"projFundEntities\")'><i class='icon_close_alt2'></i></a></div>";
  } else if (tableId == 'projResources') {
    let currTableRowCount = table.rows.length;
    let row = table.insertRow(currTableRowCount);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);
    let cell9 = row.insertCell(8);
    let cell10 = row.insertCell(9);
    let cell11 = row.insertCell(10);
    let cell12 = row.insertCell(11);
    let cell13 = row.insertCell(12);

    cell1.innerHTML = currTableRowCount;

    cell2.innerHTML = "<select class='form-control' id='resType' name='resType'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='Internal'>Internal</option>" +
      "<option value='PO-Professional Service'>PO-Professional Service</option>" +
      "<option value='PO-Software'>PO-Software</option>" +
      "<option value='PO-Hardware'>PO-Hardware</option>" +
      "<option value='PO-Cloud hosting'>PO-Cloud hosting</option>" +
      "<option value='PO-SaaS'>PO-SaaS</option>" +
      "<option value='PO-PaaS'>PO-PaaS</option>" +
      "<option value='PO-Facilities'>PO-Facilities</option>" +
      "<option value='PO-Leased Telco Lines'>PO-Leased Telco Lines</option>" +
      "<option value='PO-Minor Asset/Services'>PO-Minor Asset/Services</option>" +
      "<option value='PO-Hardware-Opex'>PO-Hardware-Opex</option>" +
      "<option value='PO-Software-Opex'>PO-Software-Opex</option>" +
      "<option value='PO-Professional Service-Opex'>PO-Professional Service-Opex</option>" +
      "</select>";

    cell3.innerHTML = "<input type='text' class='form-control font-weight-light' name='resDescription' id='resDescription'>";
    cell4.innerHTML = "<input type='text' class='form-control font-weight-light' name='resVendor' id='resVendor'>";

    cell5.innerHTML = "<select class='form-control' id='resCostType' name='resCostType'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='Cashout CAPEX'>Cashout CAPEX</option>" +
      "<option value='Cashout OPEX'>Cashout OPEX</option>" +
      "<option value='Internal CAPEX'>Internal CAPEX</option>" +
      "<option value='Internal OPEX'>Internal OPEX</option>" +
      "</select>";

    // added - 14 Feb
    cell6.innerHTML = "<input type='text' class='form-control font-weight-light text-right' name='resPersonDay' id='resPersonDay' placeholder='0' onblur='updatePersonDaysTotals()'>";
    cell7.innerHTML = "<input type='text' class='form-control font-weight-light text-right' name='resCost' id='resCost' placeholder='0' onblur='updateCostAmtTotals()'>";
    cell8.innerHTML = "<input type='text' class='form-control font-weight-light text-right' name='resTPKey' id='resTPKey' placeholder='0'>"
    cell9.innerHTML = "<select class='form-control' id='resFundEntity' name='resFundEntity'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='FE-0001 SGH' >FE-0001 SGH</option > " +
      "<option value='FE-0002 CGH' >FE-0002 CGH</option > " +
      "<option value='FE-0003 KKH' >FE-0003 KKH</option > " +
      "<option value='FE-0004 SKH' >FE-0004 SKH</option > " +
      "<option value='FE-0005 NHC' >FE-0005 NHC</option > " +
      "<option value='FE-0006 SNEC' >FE-0006 SNEC</option > " +
      "<option value='FE-0007 NCC'>FE-0007 NCC</option > " +
      "<option value='FE-0008 NDC' >FE-0008 NDC</option > " +
      "<option value='FE-0009 Polyclinic' >FE-0009 Polyclinic</option > " +
      "<option value='FE-0010 Others' >FE-0010 Others</option > " +
      "</select>";

    cell10.innerHTML = "<select class='form-control' id='resStart' name='resStart'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='Jan-21' >Jan-21</option > " +
      "<option value='Feb-21' >Feb-21</option > " +
      "<option value='Mar-21' >Mar-21</option > " +
      "<option value='Apr-21' >Apr-21</option > " +
      "<option value='May-21' >May-21</option > " +
      "<option value='Jun-21' >Jun-21</option > " +
      "<option value='Jul-21' >Jul-21</option > " +
      "<option value='Aug-21' >Aug-21</option > " +
      "<option value='Sep-21' >Sep-21</option > " +
      "<option value='Oct-21' >Oct-21</option > " +
      "<option value='Nov-21' >Nov-21</option > " +
      "<option value='Dec-21' >Dec-21</option > " +
      "<option value='Jan-22' >Jan-22</option > " +
      "<option value='Feb-22' >Feb-22</option > " +
      "<option value='Mar-22' >Mar-22</option > " +
      "<option value='Apr-22' >Apr-22</option > " +
      "<option value='May-22' >May-22</option > " +
      "<option value='Jun-22' >Jun-22</option > " +
      "<option value='Jul-22' >Jul-22</option > " +
      "<option value='Aug-22' >Aug-22</option > " +
      "<option value='Sep-22' >Sep-22</option > " +
      "<option value='Oct-22' >Oct-22</option > " +
      "<option value='Nov-22' >Now-22</option > " +
      "<option value='Dec-22' >Dec-22</option > " +
      "<option value='Jan-23' >Jan-23</option > " +
      "<option value='Feb-23' >Feb-23</option > " +
      "<option value='Mar-23' >Mar-23</option > " +
      "</select>";

    cell11.innerHTML = "<select class='form-control' id='resEnd' name='resEnd'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='Jan-21' >Jan-21</option > " +
      "<option value='Feb-21' >Feb-21</option > " +
      "<option value='Mar-21' >Mar-21</option > " +
      "<option value='Apr-21' >Apr-21</option > " +
      "<option value='May-21' >May-21</option > " +
      "<option value='Jun-21' >Jun-21</option > " +
      "<option value='Jul-21' >Jul-21</option > " +
      "<option value='Aug-21' >Aug-21</option > " +
      "<option value='Sep-21' >Sep-21</option > " +
      "<option value='Oct-21' >Oct-21</option > " +
      "<option value='Nov-21' >Nov-21</option > " +
      "<option value='Dec-21' >Dec-21</option > " +
      "<option value='Jan-22' >Jan-22</option > " +
      "<option value='Feb-22' >Feb-22</option > " +
      "<option value='Mar-22' >Mar-22</option > " +
      "<option value='Apr-22' >Apr-22</option > " +
      "<option value='May-22' >May-22</option > " +
      "<option value='Jun-22' >Jun-22</option > " +
      "<option value='Jul-22' >Jul-22</option > " +
      "<option value='Aug-22' >Aug-22</option > " +
      "<option value='Sep-22' >Sep-22</option > " +
      "<option value='Oct-22' >Oct-22</option > " +
      "<option value='Nov-22' >Now-22</option > " +
      "<option value='Dec-22' >Dec-22</option > " +
      "<option value='Jan-23' >Jan-23</option > " +
      "<option value='Feb-23' >Feb-23</option > " +
      "<option value='Mar-23' >Mar-23</option > " +
      "</select>";

    // Added -- 14 Feb
    cell12.innerHTML = "<select class='form-control' id='resRole' name='resRole'>" +
      "<option value='' disabled selected>--- Choose ---</option>" +
      "<option value='Senior PM'>Senior PM</option>" +
      "<option value='Senior System Engineer'>Senior System Engineer</option>" +
      "<option value='System Engineer'>System Engineer</option>" +
      "<option value='Database Engineer'>Database Engineer</option>" +
      "</select>";

    cell13.innerHTML = "<div class='btn-group'>" +
      "<a class='btn btn-success' href='#proj_res' onclick='addRow(\"projResources\")'><i class='icon_plus_alt2'></i></a>" +
      "<a class='btn btn-danger' href='#proj_res' onclick='deleteRow(this, \"projResources\")'><i class='icon_close_alt2'></i></a></div>";
  }
}

function deleteRow(r, tableId) {
  let i = r.parentNode.parentNode.parentNode.rowIndex;
  document.getElementById(tableId).deleteRow(i);

  if (tableId == 'projResources') { //this table have SN running number. We need to re-number the rows when a row is deleted
    let table = document.getElementById('projResources');
    //Reorder SN
    for (let i = 1; i < table.rows.length; i++) {
      let tableRow = table.rows[i];
      tableRow.cells[0].innerHTML = i;
    }

    updatePersonDaysTotals();
    updateCostAmtTotals();
  } else if (tableId == 'projFundEntities') { //recompute the total budget amount when a row is deleted
    updateBudgetAmtTotals();
  }
}

//Get Total Planned IT Cost
function updateCostsForecastTotals() {
  parseTableData("projCostForecast", "projCostForecastData");
  let allCostForecastData = document.getElementById("projCostForecastData").value;

  //If there's no data then do nothing
  if (allCostForecastData === null || allCostForecastData.length === 0) {
    return;
  }

  //If there's data, then convert the data string into a JSON object
  let allCostForecastJSON = JSON.parse(allCostForecastData);

  let total_cfPlanITCost = 0;
  for (let i = 0; i < allCostForecastJSON.length; i++) {
    total_cfPlanITCost += parseInt(allCostForecastJSON[i].totalcashoutcapex) || 0;
    total_cfPlanITCost += parseInt(allCostForecastJSON[i].totalcashoutopex) || 0;
    total_cfPlanITCost += parseInt(allCostForecastJSON[i].totalinternalcapex) || 0;
    total_cfPlanITCost += parseInt(allCostForecastJSON[i].totalinternalopex) || 0;
  }

  document.getElementById("cfPlanITCost").value = total_cfPlanITCost;
}

//Get Total Budget Amount
function updateBudgetAmtTotals() {
  parseTableData("projFundEntities", "projFundEntitiesData");
  let allProjFundEntitiesData = document.getElementById("projFundEntitiesData").value;

  //If there's no data then do nothing
  if (allProjFundEntitiesData === null || allProjFundEntitiesData.length === 0) {
    return;
  }

  //If there's data, then convert the data string into a JSON object
  let allProjFundEntitiesJSON = JSON.parse(allProjFundEntitiesData);
  let total_budgetAmt = 0;
  for (let i = 0; i < allProjFundEntitiesJSON.length; i++) {
    total_budgetAmt += parseInt(allProjFundEntitiesJSON[i].budgetamount) || 0;
  }

  document.getElementById("feBudgetAmtSum").value = total_budgetAmt;
}

//Get Total Person Days
function updatePersonDaysTotals() {
  parseTableData("projResources", "projResourcesData");
  let allProjResourcesData = document.getElementById("projResourcesData").value;

  //If there's no data then do nothing
  if (allProjResourcesData === null || allProjResourcesData.length === 0) {
    return;
  }

  //If there's data, then convert the data string into a JSON object
  let allProjResourcesJSON = JSON.parse(allProjResourcesData);
  let total_resPersonDays = 0;
  for (let i = 0; i < allProjResourcesJSON.length; i++) {
    total_resPersonDays += parseInt(allProjResourcesJSON[i].personday) || 0;
  }

  document.getElementById("resPersonDaySum").value = total_resPersonDays;
  document.getElementById("cfPDays").value = total_resPersonDays;
}

//Get Total Cost $
function updateCostAmtTotals() {
  parseTableData("projResources", "projResourcesData");
  let allProjResourcesData = document.getElementById("projResourcesData").value;

  //If there's no data then do nothing
  if (allProjResourcesData === null || allProjResourcesData.length === 0) {
    return;
  }

  //If there's data, then convert the data string into a JSON object
  let allProjResourcesJSON = JSON.parse(allProjResourcesData);
  let total_resCost$ = 0;
  for (let i = 0; i < allProjResourcesJSON.length; i++) {
    total_resCost$ += parseInt(allProjResourcesJSON[i].cost$) || 0;
  }

  document.getElementById("resCostSum").value = total_resCost$;
}

// 16 Feb Chelsea for date 
function toDate(dateStr) {
  var parts = dateStr.split("-")
  return new Date(parts[2], parts[1] - 1, parts[0])
}

//Get all values from the tables and assign to the respective hidden field
// 16 Feb replace
function prepareSubmit() {
  parseTableData("projStakeholders", "projStakeholdersData");
  parseTableData("projCostForecast", "projCostForecastData");
  parseTableData("projFundEntities", "projFundEntitiesData");
  parseTableData("projResources", "projResourcesData");

  let startDate = document.getElementById("expStartDate").value;
  let goliveDate = document.getElementById("expTGLDate").value;
  let endDate = document.getElementById("expTEDate").value;

  dstartDate = toDate(startDate);
  dgoliveDate = toDate(goliveDate);
  dendDate = toDate(endDate);

  // Date validation
  let status = false;
  if (dgoliveDate <= dstartDate) {
    alert("Expected Target Go Live Date must be later than Expected Start Date");
    status = false;
  } else if (dendDate < dgoliveDate) {
    alert(" Expected Target End Date must be same or later than Expected Target Go Live Date");
    status = false;
  } else {
    status = true;
  }
  return status;
}


//Before submitting the form, call tableToJson() function to format the html tables into JSON format
function parseTableData(tableId, destField1) {
  tableToJson(tableId, destField1);
}

//transform the html table into JSON formatted string before passing to the Node JS controller for further processing
function tableToJson(tabName, destField) {
  let table = document.getElementById(tabName);
  let data = [];

  // first row needs to be headers
  let headers = [];
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
  }

  // go through cells
  for (let i = 1; i < table.rows.length; i++) {

    let tableRow = table.rows[i];
    let rowData = {};

    for (let j = 0; j < tableRow.cells.length; j++) {
      if (tableRow.cells[j].querySelector('input')) {
        rowData[headers[j]] = tableRow.cells[j].querySelector('input').value;
      } else if (tableRow.cells[j].querySelector('select')) {
        let select = tableRow.cells[j].querySelector('select');
        rowData[headers[j]] = select.options[select.selectedIndex].value;
      }
    }

    data.push(rowData);
  }

  // transform the array into string, 
  // when click on submit, value of table pass to hidden field, 
  // hidden field call in the controller
  document.getElementById(destField).value = JSON.stringify(data);
}
