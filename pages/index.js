import React, {useState, useEffect} from 'react'
import factory from '../ethereum/factory'
import {Card, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout'
import {Link, Router} from '../routes'

// export const getStaticProps = async () => {
//     const campaigns = await factory.methods.getDeployedCampaign().call()
//     return {
//         props: {campaigns}
//     }
// }
const CampaignIndex = () => {

    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        async function fetchData(){
            setCampaigns(await factory.methods.getDeployedCampaign().call())
        }
        fetchData()
    }, [])

    const renderCampaigns = () => {
        const items = campaigns.map((address) => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`} >
                        <a href="#">View Campaign</a>
                    </Link>
                    
                ),
                fluid: true
            }
        })
        return <Card.Group items={items}/>
    }

    return (
        <Layout>
            <div>
            <h3>Open campaigns</h3>
                <Button
                    floated='right'
                    content='Create campaign'
                    icon='add circle'
                    primary={true}
                    onClick={() => {
                        Router.pushRoute('/campaigns/new')
                    }}
                />
                {renderCampaigns()}
            </div>
        </Layout>
    )
}

export default CampaignIndex