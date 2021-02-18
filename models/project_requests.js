const mongoose = require('mongoose')

const projReqSchema = new mongoose.Schema({

    projReqname: String,
    bizOrgGrp: String,
    bizOrgGrpSub1: String,
    bizOrgGrpSub2: String,
    bizOrgFamily: String,
    bizOrgFamilySub1: String,
    financialYear: String,
    workType: String,
    projOwner: String,
    projReqDate: String,
    expStartDate: String,
    expTGLDate: String,
    expTEDate: String,
    projReqCode: {
        type: String,
        unique: true
    },
    projDesc: String,
    projSummary: String,
    projRationale: String,
    projRemarks: String,
    projStatus: String,
    actualStep: String,
    stepDraft: String,
    stepDraftDate: String,
    stepCreate: String,
    stepCreateDate: String,
    stepValid: String,
    stepValidDate: String,
    stepPreWork: String,
    stepPreWorkDate: String,
    stepQuote: String,
    stepQuoteDate: String,
    stepSRB: String,
    stepSRBDate: String,
    stepCosted: String,
    stepCostedDate: String,
    stepScore: String,
    stepScoreDate: String,
    stepSelect: String,
    stepSelectDate: String,
    stepOpen: String,
    stepOpenDate: String,
    scoringPriority: String,
    projDesc: String,
    projSummary: String,
    projRationale: String,
    projRemarks: String,
    bizAlign: String,
    bizStratAreas: String,
    bizITStratAreas: String,
    bizTechDomain: String,
    systemID: String,
    leadProgram: String,
    programDirector: String,
    projSponsor: String,

    projFundEntities: [{
        projFundEntitiesSum: {
            type: Number,
            default: 0
        },
        projFundEntitiesDetails: [{
            feFundSrc: String,
            feFundScope: String,
            feEntity: String,
            feBizOrgGrp: String,
            feBudgetYr: String,
            feBudgetAmt: {
                type: Number,
                default: 0
            },
        }]
    }],

    projResources: [{
        resPersonDaySum: {
            type: Number,
            default: 0
        },
        resCostSum: {
            type: Number,
            default: 0
        },
        projResourcesDetails: [{
            resType: String,
            resDescription: String,
            resVendor: String,
            resCostType: String,
            resPersonDay: {
                type: Number,
                default: 0
            },
            resCost: {
                type: Number,
                default: 0
            },
            resTPKey: {
                type: Number,
                default: 0
            },
            resFundEntity: String,
            resStart: String,
            resEnd: String,
            resRole: String
        }]
    }],

    projStakeHolders: [{
        actorName: String,
        actorRole: String,
        actorEmail: String
    }],
    projCostsForecast: [{
        currency: String,
        projCostsForecastDetails: [{
            cfDescription: String,
            cfPlanITCost: {
                type: Number,
                default: 0
            },
            cfCOCAPEX: {
                type: Number,
                default: 0
            },
            cfCOOPEX: {
                type: Number,
                default: 0
            },
            cfICAPEX: {
                type: Number,
                default: 0
            },
            cfIOPEX: {
                type: Number,
                default: 0
            },
            cfPDays: {
                type: Number,
                default: 0
            },
        }]
    }],
    comments: [{
        sender_username: String,
        sender_displayName: String,
        message: String,
        sent_at: {
            type: Date,
            default: Date.now
        }
    }],
    create_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    create_by: String,
    last_update_by: String,
    last_update_at: {
        type: Date,
        required: true,
        default: Date.now
    },
})

const ProjectRequestModel = mongoose.model('Project_Requests', projReqSchema)

module.exports = ProjectRequestModel