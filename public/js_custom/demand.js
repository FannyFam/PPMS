/** drop down with filtering 
 * Helper function for creating Business Org Group
 **/
function createBizOrgGrp(name, id) {
  return {
    name: name,
    id: id,
  };
}

/**
 * Helper function for creating Business Org Group Sub L1
 **/
function createBizOrgGrpSub1(name, id, orgGrp) {
  return {
    name: name,
    id: id,
    orgGrp: orgGrp,
  };
}

/**
 * Helper function for creating Business Org Group Sub L2
 **/
function createBizOrgGrpSub2(name, id, orgGrpSub1) {
  return {
    name: name,
    id: id,
    orgGrpSub1: orgGrpSub1,
  };
}

/**
 * Helper function for creating Business Org Group Sub L3
 **/
function createBizOrgGrpSub3(name, id, orgGrpSub2) {
  return {
    name: name,
    id: id,
    orgGrpSub2: orgGrpSub2,
  };
}

/**
 * Helper function for creating Business Org Family
 **/
function createBizOrgFamily(name, id) {
  return {
    name: name,
    id: id,
  };
}

/**
 * Helper function for creating Business Org Family Sub L1
 **/
function createBizOrgFamilySub1(name, id, orgFamily) {
  return {
    name: name,
    id: id,
    orgFamily: orgFamily,
  };
}

/**
 * Removes all options but the first value in a given select
 * and than selects the only remaining option
 **/
function removeOptions(select) {
  while (select.options.length > 1) {
    select.remove(1);
  }

  select.value = "";
}

/**
 * Adds given options to a given select
 **/
function addOptions(select, options) {
  console.log(select, options);
  options.forEach(function (option) {
    select.options.add(new Option(option.name, option.id));
  });
}

/**
 * Select elements references
 **/
var bizOrgGrp = document.getElementById("bizOrgGrp");
var bizOrgGrpSub1 = document.getElementById("bizOrgGrpSub1");
var bizOrgGrpSub2 = document.getElementById("bizOrgGrpSub2");
var bizOrgGrpSub3 = document.getElementById("bizOrgGrpSub3");
var bizOrgFamily = document.getElementById("bizOrgFamily");
var bizOrgFamilySub1 = document.getElementById("bizOrgFamilySub1");

/**
 * Available Business Org Group
 **/
var businessOrgGroups = [
  createBizOrgGrp("Commercial", "Commercial"),
  createBizOrgGrp("Manufacturing", "Manufacturing"),
  createBizOrgGrp("R & D", "R & D"),
  createBizOrgGrp("Global Supply Chain", "Global Supply Chain"),
  createBizOrgGrp("Technology Services", "Technology Services"),
];

/**
 * Available Business Org Groups Sub L1
 **/
var businessOrgGrpSub1s = [
  createBizOrgGrpSub1(
    "Business Services Group",
    "Business Services Group",
    "Technology Services"
  ),
  createBizOrgGrpSub1(
    "Governance and Defence",
    "Governance and Defence",
    "Technology Services"
  ),
  createBizOrgGrpSub1(
    "Corporate Services",
    "Corporate Services",
    "Technology Services"
  ),

  createBizOrgGrpSub1("Health", "Health", "Commercial"),
  createBizOrgGrpSub1("Lighting", "Lighting", "Commercial"),
  createBizOrgGrpSub1(
    "Household and products",
    "Household and products",
    "Commercial"
  ),
  createBizOrgGrpSub1("Automotive", "Automotive", "Commercial"),
  createBizOrgGrpSub1("Sound & Vision", "Sound & Vision", "Commercial"),

  createBizOrgGrpSub1(
    "Master Data Mgmt",
    "Master Data Mgmt",
    "Global Supply Chain"
  ),
  createBizOrgGrpSub1("Planning", "Planning", "Global Supply Chain"),
  createBizOrgGrpSub1(
    "Purchasing and Procurement",
    "Purchasing and Procurement",
    "Global Supply Chain"
  ),
  createBizOrgGrpSub1(
    "Transportation and Shipping",
    "Transportation and Shipping",
    "Global Supply Chain"
  ),
  createBizOrgGrpSub1("Warehouse", "Warehouse", "Global Supply Chain"),
  createBizOrgGrpSub1(
    "Adaptation Center",
    "Adaptation Center",
    "Global Supply Chain"
  ),
  createBizOrgGrpSub1(
    "Corporate Services",
    "Corporate Services",
    "Global Supply Chain"
  ),
];

/**
 * Available Business Org Groups Sub L2
 **/
var businessOrgGrpSub2s = [
  createBizOrgGrpSub2("PPO", "PPO", "Business Services Group"),
  createBizOrgGrpSub2(
    "Innovation and Project Delivery",
    "Innovation and Project Delivery",
    "Business Services Group"
  ),
  createBizOrgGrpSub2(
    "Service Operations",
    "Service Operations",
    "Business Services Group"
  ),
  createBizOrgGrpSub2(
    "Infrastructure Services",
    "Infrastructure Services",
    "Business Services Group"
  ),
  createBizOrgGrpSub2(
    "Platform Services",
    "Platform Services",
    "Business Services Group"
  ),
  createBizOrgGrpSub2(
    "Data Science and AI",
    "Data Science and AI",
    "Business Services Group"
  ),
  createBizOrgGrpSub2("CIO Office", "CIO Office", "Business Services Group"),
  createBizOrgGrpSub2(
    "Special Projects",
    "Special Projects",
    "Business Services Group"
  ),

  createBizOrgGrpSub2("Cyber Defence", "Cyber Defence", "Governance and Defence"),
  createBizOrgGrpSub2(
    "Policy and Governance",
    "Policy and Governance",
    "Governance and Defence"
  ),
  createBizOrgGrpSub2(
    "Architect Office",
    "Architect Office",
    "Governance and Defence"
  ),

  createBizOrgGrpSub2(
    "Corporate Communicaton",
    "Corporate Communicaton",
    "Corporate Services"
  ),
  createBizOrgGrpSub2(
    "Corporate Strategy and Planning",
    "Corporate Strategy and Planning",
    "Corporate Services"
  ),
  createBizOrgGrpSub2(
    "Corporate Finance",
    "Corporate Finance",
    "Corporate Services"
  ),
  createBizOrgGrpSub2("Procurement", "Procurement", "Corporate Services"),
  createBizOrgGrpSub2("Legal", "Legal", "Corporate Services"),
  createBizOrgGrpSub2("Admin", "Admin", "Corporate Services"),
  createBizOrgGrpSub2("HCM", "HCM", "Corporate Services"),

  createBizOrgGrpSub2("Customer Care", "Customer Care", "Health"),
  createBizOrgGrpSub2("Marketing", "Marketing", "Health"),
  createBizOrgGrpSub2("Sales", "Sales", "Health"),
  createBizOrgGrpSub2("Project Systems", "Project Systems", "Health"),
  createBizOrgGrpSub2("Equipment", "Equipment", "Health"),
  createBizOrgGrpSub2("Corporate Services", "Corporate Services", "Health"),
];

/**
 * Available Business Org Groups Sub L3
 **/
var businessOrgGrpSub3s = [
  createBizOrgGrpSub3("Delivery Group 1", "Delivery Group 1", "Innovation and Project Delivery"),
  createBizOrgGrpSub3("Delivery Group 2", "Delivery Group 2", "Innovation and Project Delivery"),
  createBizOrgGrpSub3("Delivery Group 3", "Delivery Group 3", "Innovation and Project Delivery"),
];

/**
 * Available Business Org Family
 **/
var businessOrgFamilies = [
  createBizOrgFamily("Global", "Global"),
  createBizOrgFamily("Region/Cluster", "Region/Cluster"),
  createBizOrgFamily("Country", "Country"),
  createBizOrgFamily("Entity/Institution", "Entity/Institution"),
  createBizOrgFamily("Distributor", "Distributor"),
  createBizOrgFamily("Client-Specific", "Client-Specific"),
];

/**
 * Available Business Org Family Sub 1
 **/
var businessOrgFamilySub1s = [
  createBizOrgFamilySub1("FE-0001 SGH", "FE-0001 SGH", "Entity/Institution"),
  createBizOrgFamilySub1("FE-0002 CGH", "FE-0002 CGH", "Entity/Institution"),
  createBizOrgFamilySub1("FE-0003 KKH", "FE-0003 KKH", "Entity/Institution"),
  createBizOrgFamilySub1("FE-0004 SKH", "FE-0004 SKH", "Entity/Institution"),
  createBizOrgFamilySub1("FE-0005 NHC", "FE-0005 NHC", "Entity/Institution"),
  createBizOrgFamilySub1("FE-0006 SNEC", "FE-0006 SNEC", "Entity/Institution"),
  createBizOrgFamilySub1("FE-0007 NCC", "FE-0007 NCC", "Entity/Institution"),
  createBizOrgFamilySub1("FE-0008 NDC", "FE-0008 NDC", "Entity/Institution"),
  createBizOrgFamilySub1("FE-0009 Polyclinic", "FE-0009 Polyclinic", "Entity/Institution"),
  createBizOrgFamilySub1("FE-0010 Others", "FE-0010 Others", "Entity/Institution"),
];

/**
 * Updates Business Org Groups Sub 1
 **/
function updateBizOrgGrpSub1() {
  var selectedBizOrgGrp = bizOrgGrp.value;
  var options = businessOrgGrpSub1s.filter(function (bizOrgGrpSub1) {
    return bizOrgGrpSub1.orgGrp === selectedBizOrgGrp;
  });

  removeOptions(bizOrgGrpSub1);
  removeOptions(bizOrgGrpSub2);
  removeOptions(bizOrgGrpSub3);
  addOptions(bizOrgGrpSub1, options);
}

/**
 * Updates Business Org Groups Sub 2
 **/
function updateBizOrgGrpSub2() {
  var selectedBizOrgGrpSub1 = bizOrgGrpSub1.value;
  var options = businessOrgGrpSub2s.filter(function (bizOrgGrpSub2) {
    return bizOrgGrpSub2.orgGrpSub1 === selectedBizOrgGrpSub1;
  });
  removeOptions(bizOrgGrpSub2);
  removeOptions(bizOrgGrpSub3);
  addOptions(bizOrgGrpSub2, options);
}

/**
 * Updates Business Org Groups Sub 3
 **/
function updateBizOrgGrpSub3() {
  var selectedBizOrgGrpSub2 = bizOrgGrpSub2.value;
  var options = businessOrgGrpSub3s.filter(function (bizOrgGrpSub3) {
    return bizOrgGrpSub3.orgGrpSub2 === selectedBizOrgGrpSub2;
  });
  removeOptions(bizOrgGrpSub3);
  addOptions(bizOrgGrpSub3, options);
}

/**
 * Updates Businee Org Family Sub 1
 */
function updateBizOrgGrpFamilySub1() {
  var selectedBizOrgFamily = bizOrgFamily.value;
  var options = businessOrgFamilySub1s.filter(function (bizOrgFamilySub1) {
    return bizOrgFamilySub1.orgFamily === selectedBizOrgFamily;
  });

  removeOptions(bizOrgFamilySub1);
  addOptions(bizOrgFamilySub1, options);
}

/**
 * Adds options to Business Org Group
 **/
addOptions(bizOrgGrp, businessOrgGroups);
addOptions(bizOrgFamily, businessOrgFamilies);


/** 14 Feb
 * Set System date to each gates
*/
function setSystemDate(step, stepDateFieldId) {
  let stepValue = step.value;

  //If there's no value selected
  if (stepValue === null || stepValue.length === 0) {
    return;
  } else if (stepValue == 'Started' || stepValue == 'Completed') {
    let sysDate = new Date();

    // let month = sysDate.getMonth() + 1;
    // month = (month.toString().length == 1 ? "0" + month.toString() : month.toString())
    let month = (sysDate.getMonth() + 101).toString().substring(1);

    // let day = (sysDate.getDate().toString().length == 1 ? "0" + sysDate.getDate().toString() : sysDate.getDate());
    let day = (sysDate.getDate() + 100).toString().substring(1);

    // let year = sysDate.getFullYear();
    let year = sysDate.getFullYear().toString();

    document.getElementById(stepDateFieldId).value = day + "-" + month + "-" + year;
  } else {
    document.getElementById(stepDateFieldId).value = "";
  }

}
