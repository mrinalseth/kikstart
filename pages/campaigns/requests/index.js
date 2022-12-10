import React from 'react'
import Layout from '../../../components/Layout'
import {Button, Table} from 'semantic-ui-react'
import {Link} from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'

const index = ({address, requests, approversCount}) => {

    const {Header, Row, HeaderCell, Body} = Table

    const renderRow = () => {
        return requests.map((request, index) => {
            return <RequestRow
                request={request}
                key={index}
                address={address}
                id={index}
                approversCount={approversCount}
            />
        })
    }

    return (
        <Layout>
            <h3>Request</h3>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a><Button primary>Add Request</Button></a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>Id</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount(ETH)</HeaderCell>
                        <HeaderCell>Recipient Address</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>{renderRow()}</Body>
            </Table>
        </Layout>
    )
}

index.getInitialProps = async (props) => {
    const {address} = props.query
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestCount().call()
    const approversCount = await campaign.methods.approversCount().call()
    
    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element, index) => {
            return campaign.methods.requests(index).call()
        })
    )

    console.log(requests)

    return{address, requests, requestCount,approversCount}
}

export default index