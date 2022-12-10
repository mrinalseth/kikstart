import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x7d1Db24133dd83973Ecfe5959570eB45cBaddD6E'
)

export default instance