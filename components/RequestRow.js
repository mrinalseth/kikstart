import React, {useState} from 'react'
import {Table, Button, Message} from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'

const RequestRow = (props) => {
    const {Row, Cell} = Table
    const [errorMessage, setErrorMessage] = useState('')
    const [loadingApprove, setLoadingApprove] = useState(false)
    const [loadingFinalize, setLoadingFinalize] = useState(false)
    const onApprove = async(index) => {
        try{
            setLoadingApprove(true)
            const campaign = Campaign(props.address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.approveRequest(index).send({
                from: accounts[0]
            })
            setLoadingApprove(false)
            window.location.reload()
        }catch(err) {
            setLoadingApprove(false)
            setErrorMessage(err.message)
        }
    }
    const onFinalize = async(index) => {
        try{
            setLoadingFinalize(true)
            const campaign = Campaign(props.address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.finalizeRequest(index).send({
                from: accounts[0]
            })
            setLoadingFinalize(false)
            window.location.reload()
        }catch(err) {
            setLoadingFinalize(false)
            setErrorMessage(err.message)
        }
    }
    return (
        <Row disabled={props.request.complete} >
            <Cell>{props.id+1}</Cell>
            <Cell>{props.request.description}</Cell>
            <Cell>{web3.utils.fromWei(props.request.value, 'ether')}</Cell>
            <Cell>{props.request.recipient}</Cell>
            <Cell>{props.request.approvalCount}/{props.approversCount}</Cell>
            <Cell>
                {props.request.complete? null:
                    (<Button 
                    loading={loadingApprove}
                    color="green" 
                    basic
                    onClick={() => {
                        onApprove(props.id)
                    }} >
                        Approve
                    </Button>)
                }
            </Cell>
            <Cell>
                {props.request.complete?null:
                    (<Button 
                    color="teal" 
                    loading={loadingFinalize}
                    basic
                    onClick={() => {
                        onFinalize(props.id)
                    }} >
                        Finalize
                    </Button>)
                }
            </Cell>
            {errorMessage===''
            ? null
            :<Message 
                error 
                header="Oops!" 
                content={errorMessage}
            /> }
        </Row>
        
    )
}

export default RequestRow