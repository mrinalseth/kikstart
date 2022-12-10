import React from 'react'
import { Card, Grid, Button } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/contributeForm'
import {Link} from '../../routes'

const CampaignShow = (props) => {

    const renderCard = () => {

        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = props

        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign',
                style: {
                    overflowWrap: 'break-word'
                }
            },
            {
                header: minimumContribution,
                meta: 'Minimum contribution',
                description: 'You must contribute at least this much wei.',
                style: {
                    overflowWrap: 'break-word'
                }
            },
            {
                header: requestCount,
                meta: 'Total number of Request',
                description: 'A request tries to withdraw money from contract and it should be approved by approvers',
                style: {
                    overflowWrap: 'break-word'
                }
            },
            {
                header: approversCount,
                meta: 'Total number of Approvers',
                description: 'Total number of prople who have donated in this campaign',
                style: {
                    overflowWrap: 'break-word'
                }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance in ETH',
                description: 'The balance is how much money the campaign has left',
                style: {
                    overflowWrap: 'break-word'
                }
            },
            
        ]

        return <Card.Group items={items} />
    }

    return (
        <Layout>
            <h3>Campaign show</h3>
            <Grid>
                <Grid.Row>
                <Grid.Column
                    width={10} >
                        {renderCard()}
                        
                    </Grid.Column>
                    <Grid.Column
                    width={6} ><ContributeForm
                        address={props.address}
                    /></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                    <Link route={`/campaigns/${props.address}/requests`}>
                        <a><Button primary>View Requests</Button></a>
                    </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
        </Layout>
    )
}

CampaignShow.getInitialProps = async (props) => {
    const campaign = Campaign(props.query.address)
    const summary = await campaign.methods.getSummary().call()
    return {
        address: props.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };
}

export default CampaignShow