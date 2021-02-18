const mongoose = require("mongoose");
const dateFormat = require("date-format");
const ProjReqModel = require("../models/project_requests")
const UserModel = require("../models/users");
const sendEmail = require("../utils/Email");
const { body } = require("express-validator");

// date-format : node.js formatting of Date objects as string - 14 Feb

const controllers = {
    newProjectRequest: (req, res) => {
        const projReqCode =
            "PR-" + dateFormat.asString("ddMMyyyy-hhmmss", new Date());
        // render the view project_request and pass variable project request code - 14 Feb
        res.render("project_request", {
            projReqCode: projReqCode,
        });
    },

    postComment: (req, res) => {
        let formValues = req.body

        let commentDetails = []
        commentDetails.push({
            sender_username: formValues.sender_username,
            sender_displayName: formValues.sender_displayName,
            message: formValues.message
        })

        ProjReqModel.updateOne({
            projReqCode: formValues.projReqCode
        }, {
            $addToSet: {
                comments: commentDetails
            }
        }, { upsert: true }) //upsert = update record. if record does not exist, then insert
            .then(result => {
                res.status(200).send({ message: 'ok!' });
            })
            .catch(err => {
                console.log(err)
                res.status(500).send({ message: err });
            })
    },

    /*createProjectRequest: (req, res) => {
        console.log(req.body)
        res.render('dashboard', {
            successMessage: "Project Request has been created."
        })

    }*/


    createProjectRequest: (req, res) => {
        //Get Costs Forecasts

        let projCostsForecastData = JSON.parse(req.body.projCostForecastData)
        let projCostsForecastDetails = []
        for (let i = 0; i < projCostsForecastData.length; i++) {
            projCostsForecastDetails.push({
                cfDescription: projCostsForecastData[i].description,
                cfPlanITCost: projCostsForecastData[i].totalplanneditcost,
                cfCOCAPEX: projCostsForecastData[i].totalcashoutcapex,
                cfCOOPEX: projCostsForecastData[i].totalcashoutopex,
                cfICAPEX: projCostsForecastData[i].totalinternalcapex,
                cfIOPEX: projCostsForecastData[i].totalinternalopex,
                cfPDays: projCostsForecastData[i].totalpersonday
            })
        }

        let all_projCostForecastDetails = []
        all_projCostForecastDetails.push({
            currency: req.body.cfCurrency,
            projCostsForecastDetails: projCostsForecastDetails
        })

        //Get Funding Entities
        let projFundEntitiesData = JSON.parse(req.body.projFundEntitiesData)
        let projFundEntitiesDetails = []
        for (let i = 0; i < projFundEntitiesData.length; i++) {
            projFundEntitiesDetails.push({
                feFundSrc: projFundEntitiesData[i].fundingsource,
                feFundScope: projFundEntitiesData[i].fundingscope,
                feEntity: projFundEntitiesData[i].fundingentity,
                feBizOrgGrp: projFundEntitiesData[i].businessorggroup,
                feBudgetYr: projFundEntitiesData[i].budgetyear,
                feBudgetAmt: projFundEntitiesData[i].budgetamount,
            })
        }

        let all_projFundEntitiesDetails = []
        all_projFundEntitiesDetails.push({
            projFundEntitiesSum: req.body.feBudgetAmtSum,
            projFundEntitiesDetails: projFundEntitiesDetails
        })

        //Get Resources
        let projResourcesData = JSON.parse(req.body.projResourcesData)
        let projResourcesDetails = []
        for (let i = 0; i < projResourcesData.length; i++) {
            projResourcesDetails.push({
                resType: projResourcesData[i].type,
                resDescription: projResourcesData[i].briefdescription,
                resVendor: projResourcesData[i].vendor,
                resCostType: projResourcesData[i].costtype,
                resPersonDay: projResourcesData[i].personday,
                resCost: projResourcesData[i].cost$,
                resTPKey: projResourcesData[i].tpkey,
                resFundEntity: projResourcesData[i].fundingentity,
                resStart: projResourcesData[i].start,
                resEnd: projResourcesData[i].end,
                resRole: projResourcesData[i].resourcetype,
            })
        }

        let all_projResourcesDetails = []
        all_projResourcesDetails.push({
            resPersonDaySum: req.body.resPersonDaySum,
            resCostSum: req.body.resCostSum,
            projResourcesDetails: projResourcesDetails
        })

        //Get Project Stakeholders
        let projStakeHoldersData = JSON.parse(req.body.projStakeholdersData)
        let projStakeHolders = []

        for (let i = 0; i < projStakeHoldersData.length; i++) {
            projStakeHolders.push({
                actorName: projStakeHoldersData[i].actorname,
                actorRole: projStakeHoldersData[i].role,
                actorEmail: projStakeHoldersData[i].emailaddress
            })
        }

        ProjReqModel.create({
            projReqname: req.body.projReqname,
            bizOrgGrp: req.body.bizOrgGrp,
            bizOrgGrpSub1: req.body.bizOrgGrpSub1,
            bizOrgGrpSub2: req.body.bizOrgGrpSub2,
            bizOrgFamily: req.body.bizOrgFamily,
            bizOrgFamilySub1: req.body.bizOrgFamilySub1,
            financialYear: req.body.financialYear,
            workType: req.body.workType,
            projOwner: req.body.projOwner,
            projReqDate: req.body.projReqDate,
            expStartDate: req.body.expStartDate,
            expTGLDate: req.body.expTGLDate,
            expTEDate: req.body.expTEDate,
            projReqCode: req.body.projReqCode,
            projDesc: req.body.projDesc,
            projSummary: req.body.projSummary,
            projRationale: req.body.projRationale,
            projRemarks: req.body.projRemarks,
            projStatus: req.body.projStatus,
            actualStep: req.body.actualStep,
            stepDraft: req.body.stepDraft,
            stepDraftDate: req.body.stepDraftDate,
            stepCreate: req.body.stepCreate,
            stepCreateDate: req.body.stepCreateDate,
            stepValid: req.body.stepValid,
            stepValidDate: req.body.stepValidDate,
            stepPreWork: req.body.stepPreWork,
            stepPreWorkDate: req.body.stepPreWorkDate,
            stepQuote: req.body.stepQuote,
            stepQuoteDate: req.body.stepQuoteDate,
            stepSRB: req.body.stepSRB,
            stepSRBDate: req.body.stepSRBDate,
            stepCosted: req.body.stepCosted,
            stepCostedDate: req.body.stepCostedDate,
            stepScore: req.body.stepScore,
            stepScoreDate: req.body.stepScoreDate,
            stepSelect: req.body.stepSelect,
            stepSelectDate: req.body.stepSelectDate,
            stepOpen: req.body.stepOpen,
            stepOpenDate: req.body.stepOpenDate,
            scoringPriority: req.body.scoringPriority,
            projDesc: req.body.projDesc,
            projSummary: req.body.projSummary,
            projRationale: req.body.projRationale,
            projRemarks: req.body.projRemarks,
            bizAlign: req.body.bizAlign,
            bizStratAreas: req.body.bizStratAreas,
            bizITStratAreas: req.body.bizITStratAreas,
            bizTechDomain: req.body.bizTechDomain,
            systemID: req.body.systemID,
            leadProgram: req.body.leadProgram,
            programDirector: req.body.programDirector,
            projSponsor: req.body.projSponsor,
            projFundEntities: all_projFundEntitiesDetails,
            projResources: all_projResourcesDetails,
            projCostsForecast: all_projCostForecastDetails,
            projStakeHolders: projStakeHolders,
            create_by: req.session.user,
            last_update_by: req.session.user,
            last_update_at: new Date()



        }).then(result => {
            // edit sentence -- 15 Feb
            //Start sending emails
            for (let i = 0; i < projStakeHolders.length; i++) {
                sendEmail("PPMS", projStakeHolders[i].actorEmail, "PPMS - Project Request", "Hi " + projStakeHolders[i].actorName + ", a new project request " + req.body.projReqCode + " has been created.")
            }

            res.render('project_request', {
                projReqCode: req.body.projReqCode,
                successMessage: "Project Request " + req.body.projReqCode + " has been created."
            })
        }).catch(err => {
            console.log(err)
            res.redirect('/ppms')
        })
    },

    updateProjectRequest: (req, res) => {
        //Get Costs Forecasts
        console.log(req.body.projCostForecastData)
        let projCostsForecastData = JSON.parse(req.body.projCostForecastData)
        let projCostsForecastDetails = []
        for (let i = 0; i < projCostsForecastData.length; i++) {
            projCostsForecastDetails.push({
                cfDescription: projCostsForecastData[i].description,
                cfPlanITCost: projCostsForecastData[i].totalplanneditcost,
                cfCOCAPEX: projCostsForecastData[i].totalcashoutcapex,
                cfCOOPEX: projCostsForecastData[i].totalcashoutopex,
                cfICAPEX: projCostsForecastData[i].totalinternalcapex,
                cfIOPEX: projCostsForecastData[i].totalinternalopex,
                cfPDays: projCostsForecastData[i].totalpersonday
            })
        }

        let all_projCostForecastDetails = []
        all_projCostForecastDetails.push({
            currency: req.body.cfCurrency,
            projCostsForecastDetails: projCostsForecastDetails
        })

        //Get Funding Entities
        let projFundEntitiesData = JSON.parse(req.body.projFundEntitiesData)
        let projFundEntitiesDetails = []
        for (let i = 0; i < projFundEntitiesData.length; i++) {
            projFundEntitiesDetails.push({
                feFundSrc: projFundEntitiesData[i].fundingsource,
                feFundScope: projFundEntitiesData[i].fundingscope,
                feEntity: projFundEntitiesData[i].fundingentity,
                feBizOrgGrp: projFundEntitiesData[i].businessorggroup,
                feBudgetYr: projFundEntitiesData[i].budgetyear,
                feBudgetAmt: projFundEntitiesData[i].budgetamount,
            })
        }

        let all_projFundEntitiesDetails = []
        all_projFundEntitiesDetails.push({
            projFundEntitiesSum: req.body.feBudgetAmtSum,
            projFundEntitiesDetails: projFundEntitiesDetails
        })

        //Get Resources
        let projResourcesData = JSON.parse(req.body.projResourcesData)
        let projResourcesDetails = []
        for (let i = 0; i < projResourcesData.length; i++) {
            projResourcesDetails.push({
                resType: projResourcesData[i].type,
                resDescription: projResourcesData[i].briefdescription,
                resVendor: projResourcesData[i].vendor,
                resCostType: projResourcesData[i].costtype,
                resPersonDay: projResourcesData[i].personday,
                resCost: projResourcesData[i].cost$,
                resTPKey: projResourcesData[i].tpkey,
                resFundEntity: projResourcesData[i].fundingentity,
                resStart: projResourcesData[i].start,
                resEnd: projResourcesData[i].end,
                resRole: projResourcesData[i].resourcetype,
            })
        }

        let all_projResourcesDetails = []
        all_projResourcesDetails.push({
            resPersonDaySum: req.body.resPersonDaySum,
            resCostSum: req.body.resCostSum,
            projResourcesDetails: projResourcesDetails
        })

        //Get Project Stakeholders
        let projStakeHoldersData = JSON.parse(req.body.projStakeholdersData)
        let projStakeHolders = []

        for (let i = 0; i < projStakeHoldersData.length; i++) {
            projStakeHolders.push({
                actorName: projStakeHoldersData[i].actorname,
                actorRole: projStakeHoldersData[i].role,
                actorEmail: projStakeHoldersData[i].emailaddress
            })
        }

        ProjReqModel.updateOne({
            projReqCode: req.body.projReqCode,
        }, {
            projReqname: req.body.projReqname,
            bizOrgGrp: req.body.bizOrgGrp,
            bizOrgGrpSub1: req.body.bizOrgGrpSub1,
            bizOrgGrpSub2: req.body.bizOrgGrpSub2,
            bizOrgFamily: req.body.bizOrgFamily,
            bizOrgFamilySub1: req.body.bizOrgFamilySub1,
            financialYear: req.body.financialYear,
            workType: req.body.workType,
            projOwner: req.body.projOwner,
            projReqDate: req.body.projReqDate,
            expStartDate: req.body.expStartDate,
            expTGLDate: req.body.expTGLDate,
            expTEDate: req.body.expTEDate,
            projDesc: req.body.projDesc,
            projSummary: req.body.projSummary,
            projRationale: req.body.projRationale,
            projRemarks: req.body.projRemarks,
            projStatus: req.body.projStatus,
            actualStep: req.body.actualStep,
            stepDraft: req.body.stepDraft,
            stepDraftDate: req.body.stepDraftDate,
            stepCreate: req.body.stepCreate,
            stepCreateDate: req.body.stepCreateDate,
            stepValid: req.body.stepValid,
            stepValidDate: req.body.stepValidDate,
            stepPreWork: req.body.stepPreWork,
            stepPreWorkDate: req.body.stepPreWorkDate,
            stepQuote: req.body.stepQuote,
            stepQuoteDate: req.body.stepQuoteDate,
            stepSRB: req.body.stepSRB,
            stepSRBDate: req.body.stepSRBDate,
            stepCosted: req.body.stepCosted,
            stepCostedDate: req.body.stepCostedDate,
            stepScore: req.body.stepScore,
            stepScoreDate: req.body.stepScoreDate,
            stepSelect: req.body.stepSelect,
            stepSelectDate: req.body.stepSelectDate,
            stepOpen: req.body.stepOpen,
            stepOpenDate: req.body.stepOpenDate,
            scoringPriority: req.body.scoringPriority,
            projDesc: req.body.projDesc,
            projSummary: req.body.projSummary,
            projRationale: req.body.projRationale,
            projRemarks: req.body.projRemarks,
            bizAlign: req.body.bizAlign,
            bizStratAreas: req.body.bizStratAreas,
            bizITStratAreas: req.body.bizITStratAreas,
            bizTechDomain: req.body.bizTechDomain,
            systemID: req.body.systemID,
            leadProgram: req.body.leadProgram,
            programDirector: req.body.programDirector,
            projSponsor: req.body.projSponsor,
            projFundEntities: all_projFundEntitiesDetails,
            projResources: all_projResourcesDetails,
            projCostsForecast: all_projCostForecastDetails,
            projStakeHolders: projStakeHolders,
            create_by: req.session.user,
            last_update_by: req.session.user,
            last_update_at: new Date()


        }).then(result => {
            // edit sentence 15 Feb
            //Start sending emails
            for (let i = 0; i < projStakeHolders.length; i++) {
                sendEmail("PPMS", projStakeHolders[i].actorEmail, "PPMS - Project Request", "Hi " + projStakeHolders[i].actorName + ", exisiting project request " + req.body.projReqCode + " has been updated.")
            }

            res.render('project_request', {
                projReqCode: req.body.projReqCode,
                successMessage: "Project Request " + req.body.projReqCode + " has been updated."
            })
        }).catch(err => {
            console.log(err)
            res.redirect('/ppms')
        })
    },
    // 15 Feb view the PR based on PR Code in URL in case somebody did anyting wrong that result in record not found. Also can be used for subsequent search function (version 2 )

    viewProjectRequest: (req, res) => {
        let pr_code = req.params.pr_code
        if (!pr_code) {
            res.render('dashboard', {
                errorMessage: "Unable to find Project Request " + pr_code
            })
        }

        ProjReqModel.findOne({
            projReqCode: pr_code
        })
            .then(result => {
                if (!result) {
                    res.render('dashboard', {
                        errorMessage: "Unable to find Project Request " + pr_code
                    })
                } else {
                    res.render('project_request', {
                        projReqCode: result.projReqCode,
                        projRequestInfo: result
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })

    },
};

module.exports = controllers;
