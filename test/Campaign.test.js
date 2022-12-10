const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const {interface, bytecode} = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts
let factory
let campaignAddress;
let campaign

beforeEach(async () => {
    
    accounts = await web3.eth.getAccounts()


    factory = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode
    })
    .send({
        from: accounts[0],
        gas: '1000000'
    })

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    })

    

    const addresses = await factory.methods.getDeployedCampaign().call({
        from: accounts[0]
    })
    campaignAddress = addresses[0]

    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    )
})

describe('Campaigns', () => {
    it('Deployed', () => {
        assert(factory.options.address)
        assert(campaign.options.address)
    })
})


